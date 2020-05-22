// Copyright (c) TileDB
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView, ISerializers
} from '@jupyter-widgets/base';
import * as d3 from 'd3';
import debounce from './debounce';
import {
  MODULE_NAME, MODULE_VERSION
} from './version';
import '../css/widget.css';
import workerURL from 'file-loader!../lib/worker.js';

type NodeType = {
  status: string;
  name: string;
};

type Positions = {
  [s: string]: [number, number];
}

interface DataType {
  nodes: string[];
  edges: Array<string[]>;
  node_details: {
    [s: string]: NodeType;
  };
  root_nodes?: string[];
  positions: Positions;
}

export
class DagVisualizeModel extends DOMWidgetModel {
  defaults() {
    return {...super.defaults(),
      _model_name: DagVisualizeModel.model_name,
      _model_module: DagVisualizeModel.model_module,
      _model_module_version: DagVisualizeModel.model_module_version,
      _view_name: DagVisualizeModel.view_name,
      _view_module: DagVisualizeModel.view_module,
      _view_module_version: DagVisualizeModel.view_module_version,
      value : ''
    };
  }

  static serializers: ISerializers = {
      ...DOMWidgetModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'DagVisualizeModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'DagVisualizeView';   // Set to null if no view
  static view_module = MODULE_NAME;   // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export
class DagVisualizeView extends DOMWidgetView {
  data: DataType | undefined;
  transform: any;
  svg: any;
  wrapper: any;
  tooltip: any;
  verticalOffset: number | undefined;
  bounds: [number, number] | undefined;
  initialized: boolean | undefined;
  positions: Positions | undefined;

  render() {
    this.el.classList.add('tiledb-widget');
    this.createSVG();
    this.value_changed();
    /**
     * Debounce rendering function so it won't rerender too fast
     */
    const debouncedOnChange = debounce(this.value_changed.bind(this) as any, 1500)
    this.model.on('change:value', debouncedOnChange as any, this);
  }

  value_changed() {
    this.data = JSON.parse(this.model.get('value'));
    /**
     * Reset html and build new graph
     */
    this.createDag();
  }

  calculateBounds(positions: Positions): [number, number] {
    if (typeof this.bounds === 'undefined') {
      const xNums = Object.keys(positions).map((pos: keyof Positions) => positions[pos][0]);
      const yNums = Object.keys(positions).map((pos: keyof Positions) => positions[pos][1]);
      const padding = 30;
      const verticalPadding = 60;
      const maxHorizontalCoordinate = Math.max(...xNums);
      let maxVerticalCoordinate = Math.max(...yNums);
      // We don't want the ratio of width / height to be too disproportionate
      const constrainRatio = .25;
      maxVerticalCoordinate = Math.max(maxHorizontalCoordinate * constrainRatio, maxVerticalCoordinate + verticalPadding);

      this.bounds = [maxHorizontalCoordinate + padding, maxVerticalCoordinate];
    }

    return this.bounds as [number, number];
  }

  createSVG() {
    this.wrapper = d3.select(this.el).append('svg').append('g');
    this.svg = d3.select(this.el).select('svg');
    this.createControls();
    this.createTooltip();
  }


  zoom() {
    if (this.initialized) {
      return;
    }
    const [width, height] = this.bounds as [number, number];
    const svg = this.svg;
    const zoom: any = d3.zoom().translateExtent([[0, 0], [width, height]]).on('zoom', () => {
      this.wrapper.attr('transform', d3.event.transform);
    });

    svg.call(zoom).on('wheel.zoom', null);

    function zoomHandler(this: any) {
      d3.event.preventDefault();
      const direction = (this.id === 'zoom_in') ? .2 : -.2;
      /**
       * In SVG 1.1 <svg> elements did not support transform attributes. In SVG 2 it is proposed that they should.
       * Chrome and Firefox implement this part of the SVG 2 specification, Safari does not yet do so and IE11 never will.
       * That's why we apply transform to the "g" element instead of the "svg"
       */
      svg.transition().duration(300).call(zoom.scaleBy as any, 1 + direction);
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

  createTooltip() {
    this.tooltip = d3.select(this.el).append('div')
    .attr('class', 'tooltip')				
    .style("opacity", 0);
  }

  /**
   * Method to calculate vertical offset from the hidden "fake" root node
   * @param descendants The hierarchy points
   * @param circleSize The size of the circle
   * @param fauxRootNode The name of the fake root node
   */
  calculateYOffset(descendants: d3.HierarchyPointNode<unknown>[], circleSize: number, fauxRootNode: string): number {
    /**
     * If we have already calculated the offset just return it.
     * If not calculate the offset
     */
    if (typeof this.verticalOffset === 'undefined') {
      const originalRoot = descendants.find((node: any) => Boolean(node.parent && node.parent.id === fauxRootNode));
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

  getRootNodes(nodes: DataType['nodes'], edges: DataType['edges']): string[] {
    const hasNoParent = (node: string) => edges.every(([, parent]: string[]) => node !== parent);

    return nodes.filter(hasNoParent);
  }

  createDag() {
    const { nodes, edges, node_details, positions } = this.data as DataType;
    const bounds = this.calculateBounds(positions);
    /**
     * Sometimes during updates we are getting different/weird positions object
     * So we save and re-use the first positions object we are getting
     */
    this.positions = this.positions || positions;
    this.svg.attr("viewBox", "0 0 " + bounds[0] + " " + bounds[1] );
    this.zoom();
    const numberOfNodes = nodes.length;
    const biggestSide = Math.max(...bounds) - 20; // Remove padding
    const circleSize = Math.min((biggestSide / numberOfNodes), 30);
    const links = edges.map(([parent, child]) => ({
      source: parent,
      target: child,
    }));
    const padding = 20;
    const nodeDetails = Object.keys(node_details).map((node: string, i: number) => ({
      index: i,
      status: node_details[node].status,
      id: node,
      fx: (this.positions as Positions)[node][0],
      fy: (this.positions as Positions)[node][1] + padding,
    }))

    const worker = new Worker(workerURL);
    worker.postMessage({
      nodes: nodeDetails,
      links
    });
    worker.onmessage = (event) => {
      if (event.data.type !== 'end') {
        return;
      }
      /**
       * Remove previous contents
       */
      this.wrapper.selectAll("*").remove();
      const { nodes, links } = event.data

      this.wrapper.append("g")
      .selectAll("path")
      .data(links)
      .enter().append("path")
      .attr('d', (d: any) => {
        return `M${d.source.x},${d.source.y} C ${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`
      })
      .attr('class', (d: any) => `path-${d.target.status}`);

    this.wrapper.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("cx", (d:any) => d.x)
      .attr("cy", (d:any) => d.y)
      .attr("r", circleSize)
      .attr('class', (d: NodeType) => d.status)
      .on('mouseover', (d: any) => {
        this.tooltip.transition()
          .duration(200)
          .style('opacity', .9);		
      this.tooltip.html(`<p>${d.id}: ${d.status}</p>`)	
          .style('left', `${d3.event.clientX + 10}px`)
          .style('top', `${d3.event.clientY + 10}px`);	
      }).on('mouseout', () => {
        this.tooltip.transition()
            .duration(500)
            .style('opacity', 0);
      });
    };
  }

  createControls() {
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