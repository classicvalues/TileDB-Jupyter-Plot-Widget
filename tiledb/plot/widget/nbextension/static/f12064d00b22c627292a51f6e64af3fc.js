importScripts("https://d3js.org/d3-collection.v1.min.js");
importScripts("https://d3js.org/d3-dispatch.v1.min.js");
importScripts("https://d3js.org/d3-quadtree.v1.min.js");
importScripts("https://d3js.org/d3-timer.v1.min.js");
importScripts("https://d3js.org/d3-force.v1.min.js");


addEventListener('message', event => {
  postMessage('message received!!!!!');
});

onmessage = function(event) {
  const nodes = event.data.nodes;
  const links = event.data.links;
  const numberOfNodes = nodes.length;
  const width = 1300;
  const height = 500;

  var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-5000 / numberOfNodes).distanceMax(height))
        .force("link", d3.forceLink(links).id((d) => d.id))
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .stop();

  for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
    postMessage({type: "tick", progress: i / n});
    simulation.tick();
  }

  postMessage({type: "end", nodes: nodes, links: links});
};