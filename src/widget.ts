// Copyright (c) TileDB
// Distributed under the terms of the MIT License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers
} from '@jupyter-widgets/base';
import * as d3 from 'd3';
import debounce from './debounce';
import workerURL from 'file-loader!../lib/worker.js';
import { MODULE_NAME, MODULE_VERSION } from './version';
import { poll } from './poll';

type NodeType = {
  status: string;
  name: string;
};

type Positions = {
  [s: string]: [number, number];
};

interface IDataType {
  nodes: string[];
  edges: Array<string[]>;
  node_details: {
    [s: string]: NodeType;
  };
  root_nodes?: string[];
  positions: Positions;
}

// const BOX_ASPECT_RATIO = 0.36;
export class DagVisualizeModel extends DOMWidgetModel {
  defaults(): any {
    return {
      ...super.defaults(),
      _model_name: DagVisualizeModel.model_name,
      _model_module: DagVisualizeModel.model_module,
      _model_module_version: DagVisualizeModel.model_module_version,
      _view_name: DagVisualizeModel.view_name,
      _view_module: DagVisualizeModel.view_module,
      _view_module_version: DagVisualizeModel.view_module_version,
      value: ''
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers
    // Add any extra serializers here
  };

  static model_name = 'DagVisualizeModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'DagVisualizeView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

const PADDING = 40;

export class DagVisualizeView extends DOMWidgetView {
  data: IDataType | undefined;
  transform: any;
  svg: any;
  wrapper: any;
  tooltip: any;
  verticalOffset: number | undefined;
  bounds: [number, number] | undefined;
  initialized: boolean | undefined;
  positions: Positions | undefined;

  render(): void {
    this.el.classList.add('tiledb-widget');
    this.createSVG();
    this.value_changed();
    /**
     * Debounce rendering function so it won't rerender too fast
     */
    const debouncedOnChange = debounce(this.value_changed.bind(this), 1500);
    this.model.on('change:value', debouncedOnChange as any, this);
  }

  value_changed(): void {
    this.data = JSON.parse(this.model.get('value'));
    /**
     * Reset html and build new graph
     */
    this.createDag();
  }

  calculateBounds(positions: Positions): [number, number] {
    if (typeof this.bounds === 'undefined') {
      const xNums = Object.keys(positions).map(
        (pos: keyof Positions) => positions[pos][0]
      );
      const yNums = Object.keys(positions).map(
        (pos: keyof Positions) => positions[pos][1]
      );
      const padding = 30;
      const verticalPadding = 60;
      const maxHorizontalCoordinate = Math.max(...xNums);
      const maxVerticalCoordinate = Math.max(...yNums);

      this.bounds = [
        maxHorizontalCoordinate + padding,
        maxVerticalCoordinate + verticalPadding
      ];
    }

    return this.bounds as [number, number];
  }

  createSVG(): void {
    this.wrapper = d3.select(this.el).append('svg').append('g');
    this.svg = d3.select(this.el).select('svg');
    this.createControls();
    this.createTooltip();
  }

  getScale(): [number, number] {
    const [maxWidth, height] = this.bounds as [number, number];
    const scaleX = this.el.offsetWidth / (maxWidth + PADDING);
    const scaleY = 400 / (height + PADDING);

    return [scaleX, scaleY];
  }

  zoom(): void {
    const [width, height] = this.bounds as [number, number];
    const [scaleX, scaleY] = this.getScale();
    const svg = this.svg;

    const zoom: any = d3
      .zoom()
      .translateExtent([
        [0, 0],
        [width * scaleX + PADDING, height * scaleY + PADDING]
      ])
      .on('zoom', () => {
        this.wrapper.attr('transform', d3.event.transform);
      });

    svg.call(zoom).on('wheel.zoom', null);

    function zoomHandler(this: any) {
      d3.event.preventDefault();
      const direction = this.id === 'zoom_in' ? 0.2 : -0.2;
      /**
       * In SVG 1.1 <svg> elements did not support transform attributes. In SVG 2 it is proposed that they should.
       * Chrome and Firefox implement this part of the SVG 2 specification, Safari does not yet do so and IE11 never will.
       * That's why we apply transform to the "g" element instead of the "svg"
       */
      svg
        .transition()
        .duration(300)
        .call(zoom.scaleBy as any, 1 + direction);
    }

    function resetHandler(this: any) {
      svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
    }

    setTimeout(() => {
      d3.select(this.el).selectAll('.zoomControl').on('click', zoomHandler);
      d3.select(this.el).selectAll('.resetControl').on('click', resetHandler);
    }, 0);
    this.initialized = true;
  }

  createTooltip(): void {
    this.tooltip = d3
      .select(this.el)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  }

  /**
   * Method to calculate vertical offset from the hidden "fake" root node
   * @param descendants The hierarchy points
   * @param circleSize The size of the circle
   * @param fauxRootNode The name of the fake root node
   */
  calculateYOffset(
    descendants: d3.HierarchyPointNode<unknown>[],
    circleSize: number,
    fauxRootNode: string
  ): number {
    /**
     * If we have already calculated the offset just return it.
     * If not calculate the offset
     */
    if (typeof this.verticalOffset === 'undefined') {
      const originalRoot = descendants.find((node: any) =>
        Boolean(node.parent && node.parent.id === fauxRootNode)
      );
      /**
       * Calculate the offset of the original root node,
       * since the first faux root node that we added,
       * we hide it and create an empty space to the top.
       */
      const yOffset = originalRoot ? originalRoot.y : 0;
      this.verticalOffset = circleSize - yOffset / 2;
    }

    return this.verticalOffset;
  }

  getRootNodes(nodes: IDataType['nodes'], edges: IDataType['edges']): string[] {
    const hasNoParent = (node: string) =>
      edges.every(([, parent]: string[]) => node !== parent);

    return nodes.filter(hasNoParent);
  }

  /**
   * Calculate the size of the nodes in the graph depending on the number of nodes
   * As the number of nodes in the tree gets bigger and bigger, the tree is becoming
   * squeezed and the size of the nodes have to get smaller in order not to overlap
   * witch each other.
   * @param numberOfNodes Number of the nodes in the tree
   */
  getNodeSize(numberOfNodes: number): number {
    const howManyTens = Math.floor(numberOfNodes / 10);

    /**
     * Don't let node size go bellow 5
     */
    return Math.max(320 / (20 + howManyTens), 5);
  }

  async createDag(): Promise<void> {
    const { nodes, edges, node_details, positions } = this.data as IDataType;
    const bounds = this.calculateBounds(positions);
    const maxHeight = bounds[1];
    /**
     * During initialization the wrapper elemete (this.el) has no width,
     * we wait for that before we do any DOM calculations.
     */
    if (!this.initialized) {
      await poll(() => this.el.offsetWidth > 0, 300);
    }
    const numberOfNodes = nodes.length;
    const lessThanThirtyNodes = numberOfNodes < 30;
    const [scaleX, scaleY] = this.getScale();
    /**
     * Sometimes during updates we are getting different/weird positions object
     * So we save and re-use the first positions object we are getting
     */
    this.positions = this.positions || positions;
    if (!this.initialized) {
      this.zoom();
    }
    const circleSize = this.getNodeSize(numberOfNodes);

    const links = edges.map(([parent, child]) => ({
      source: parent,
      target: child
    }));

    const nodeDetails = Object.keys(node_details).map(
      (node: string, i: number) => ({
        index: i,
        status: node_details[node].status,
        id: node,
        fx: (this.positions as Positions)[node][0] * scaleX,
        /** For Y position we flip tree upside down (that's why: maxHeight - node's Y position) */
        fy: (maxHeight - (this.positions as Positions)[node][1]) * scaleY
      })
    );

    const worker = new Worker(workerURL);
    worker.postMessage({
      nodes: nodeDetails,
      links
    });
    worker.onmessage = event => {
      if (event.data.type !== 'end') {
        return;
      }
      /**
       * Remove previous contents
       */
      this.wrapper.selectAll('*').remove();
      const { nodes, links } = event.data;

      this.wrapper
        .append('g')
        .selectAll('path')
        .data(links)
        .enter()
        .append('path')
        .attr('d', (d: any) => {
          return `M${d.source.x},${d.source.y} C ${d.source.x},${
            (d.source.y + d.target.y) / 2
          } ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${
            d.target.y
          }`;
        })
        .attr('class', (d: any) => `path-${d.target.status}`);

      this.wrapper
        .append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
        .attr('r', circleSize)
        .attr(
          'class',
          (d: NodeType) =>
            `${d.status} ${lessThanThirtyNodes ? 'node--small' : ''}`
        )
        .on('mouseover', (d: any) => {
          this.tooltip.transition().duration(200).style('opacity', 0.9);
          this.tooltip
            .html(`<p>${d.id}: ${d.status}</p>`)
            .style('left', `${d3.event.clientX + 10}px`)
            .style('top', `${d3.event.clientY + 10}px`);
        })
        .on('mouseout', () => {
          this.tooltip.transition().duration(500).style('opacity', 0);
        });
    };
  }

  createControls(): void {
    const zoomInButton = document.createElement('button');
    const zoomOutButton = document.createElement('button');
    const resetButton = document.createElement('button');
    const className = 'zoomControl';
    zoomInButton.id = 'zoom_in';
    zoomOutButton.id = 'zoom_out';
    resetButton.className = 'resetControl';
    zoomInButton.className = className;
    zoomOutButton.className = className;

    this.el.append(zoomInButton);
    this.el.append(zoomOutButton);
    this.el.append(resetButton);
  }
}
