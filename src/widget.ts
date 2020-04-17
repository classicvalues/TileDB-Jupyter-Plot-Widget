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
import '../css/widget.css'


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
  data: any;
  transform: any;
  svg: any;
  tooltip: any;

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

  createSVG() {
    this.svg = d3.select(this.el).append('svg');
    this.createControls();
    this.createTooltip();
  }

  createTooltip() {
    this.tooltip = d3.select(this.el).append('div')
    .attr('class', 'tooltip')				
    .style("opacity", 0);
  }

  createDag() {
    /**
     * Remove previous contents
     */
    this.svg.selectAll("*").remove();
    /**
     * Render d3 graph
     */
    const height = 500;
    const width = 1300;
    const { nodes, edges, node_details } = this.data;
    const childParentData = edges.map((d: any) => ({
      child: d[1],
      parent: d[0]
    }));
    const numberOfNodes = nodes.length;
    const circleSize = Math.max(20 - (numberOfNodes * 0.08), 3);
    const hasNoParent = (node: string) => edges.every(([,parent]: string[]) => node !== parent);
    const rootNode = nodes.find(hasNoParent);

    childParentData.push({
      child: rootNode,
      parent: ''
    });
    const svg = this.svg;

    const dataStructure = d3.stratify().id((d: any) => {
      return d.child;
    }).parentId((d: any) => d.parent)(childParentData);

    const treeStructure = d3.tree().size([width, height - 100]);
    const information = treeStructure(dataStructure);

    const connections = svg.append('g').selectAll('path').data(information.links());

    connections.enter().append('path').attr('style', `transform: translateY(${circleSize}px)`).attr('d', (d: any) => {
      return `M${d.source.x},${d.source.y} C ${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`
    }).attr('class', (d: any) => {
      const target = d.target.data.child;
      const status = node_details[target].status;

      return `path-${status}`;
    });

    const svgElement = this.el.querySelector('svg');
    svgElement.setAttribute('viewBox',`0 0 ${width} ${height}`);

    const circles = svg.append('g').attr('style', `transform: translateY(${circleSize}px)`).selectAll('circle').data(information.descendants());
    circles.enter().append('circle').attr('cx', (d: any) => d.x)
      .attr('r', circleSize)
      .attr('cy', (d: any) => d.y).attr('class', (d: any) => {
        const name = d.data.child;
        return node_details[name].status;
      }).on('mouseover', (d: any) => {
        const name = d.data.child;
        const status = node_details[name].status;

        this.tooltip.transition()
            .duration(200)
            .style('opacity', .9);		
        this.tooltip.html(`<p>${name}: ${status}</p>`)	
            .style('left', `${d3.event.clientX + 10}px`)
            .style('top', `${d3.event.clientY + 10}px`);	
        }).on('mouseout', () => {
          this.tooltip.transition()
              .duration(500)
              .style('opacity', 0);
        });
    const zoom: any = d3.zoom().translateExtent([[0, 0], [width, height]]).on('zoom', () => {
      this.transform = d3.event.transform;
      
      svg.attr('transform', () => d3.event.transform);
    });

    svg.call(zoom).on('wheel.zoom', null);
    function zoomHandler(this: any) {
      d3.event.preventDefault();
      const direction = (this.id === 'zoom_in') ? .2 : -.2;

      svg.transition().duration(300).call(zoom.scaleBy as any, 1 + direction);
    }
    setTimeout(() => {
      d3.selectAll('.zoomControl').on('click', zoomHandler);
    }, 0)
  }


  createControls() {
    const zoomInButton = document.createElement('button');
    const zoomOutButton = document.createElement('button');
    const className = 'zoomControl';
    zoomInButton.id = 'zoom_in';
    zoomOutButton.id = 'zoom_out';
    zoomInButton.className = className;
    zoomOutButton.className = className;
    zoomInButton.textContent = '+';
    zoomOutButton.textContent = '-';

    this.el.append(zoomInButton);
    this.el.append(zoomOutButton);
  }
}
