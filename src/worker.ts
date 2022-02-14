importScripts('https://d3js.org/d3-collection.v1.min.js');
importScripts('https://d3js.org/d3-dispatch.v3.min.js');
importScripts('https://d3js.org/d3-quadtree.v3.min.js');
importScripts('https://d3js.org/d3-timer.v3.min.js');
importScripts('https://d3js.org/d3-force.v3.min.js');

type Link = {
  source: string;
  target: string;
};

type NodeDetails = {
  fx: number;
  fy: number;
  id: string;
  index: number;
  name: string;
  status: string;
};

type MessageData = {
  links: Link[];
  nodes: NodeDetails[];
};

onmessage = function (event: MessageEvent<MessageData>) {
  const { nodes, links } = event.data;
  const numberOfNodes = nodes.length;
  const width = 1300;
  const height = 500;

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'charge',
      d3
        .forceManyBody()
        .strength(-5500 / numberOfNodes)
        .distanceMax(height)
    )
    .force(
      'link',
      d3.forceLink(links).id((d: any) => d.id)
    )
    .force('x', d3.forceX(width / 2))
    .force('y', d3.forceY(height / 2))
    .stop();

  for (
    let i = 0,
      n = Math.ceil(
        Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
      );
    i < n;
    ++i
  ) {
    /**
     * Run all simulations
     */
    simulation.tick();
  }

  postMessage({ type: 'end', nodes, links });
};
