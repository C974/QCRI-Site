async function displayGraph() {
    const name = document.getElementById('name').value;
    const numGenerations = document.getElementById('num-generations').value;

    // Fetch the graph data from the Flask API
    const response = await fetch(`http://127.0.0.1:5000/api/graph?name=${name}&num_generations=${numGenerations}`);
    const data = await response.json();

    const graphData = data.graph;  // Adjust based on your actual API response structure

    // Remove any existing SVG
    d3.select("#graph").select("svg").remove();

    const width = 750;
    const height = 750;

    const svg = d3.select("#test2").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50, 50)");

    const root = d3.hierarchy(convertToHierarchy(graphData), d => d.children);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    const link = svg.selectAll(".link")
        .data(root.links())
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", "none")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    const node = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x}, ${d.y})`);

    node.append("circle")
        .attr("r", 15)
        .attr("fill", "steelblue")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(d => d.data.name);  // Display node name on hover

    node.append("text")
        .attr("dy", 3)
        .attr("y", d => d.children ? -25 : 25)
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .text(d => d.data.name);

    function convertToHierarchy(data) {
        const idToNode = {};
        data.nodes.forEach(node => {
            idToNode[node.id] = { id: node.id, name: node.name, children: [] };
        });
        data.links.forEach(link => {
            idToNode[link.source].children.push(idToNode[link.target]);
        });
        return idToNode[data.nodes[0].id];  // Assuming the root node is the first node
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}
