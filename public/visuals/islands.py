import logging
import networkx as nx
import psycopg2
import json
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import os
from matplotlib.ticker import MaxNLocator

# Setup logging
logging.basicConfig(filename="log.txt", level=logging.INFO, format='%(asctime)s %(message)s')

# Connect to PostgreSQL database
conn = psycopg2.connect(dbname="postgres",
                        user="postgres",
                        password="fA09112!!",
                        host="localhost",
                        port="5432")

cursor = conn.cursor()

def displaying():
    # create a static directory to store the graph imgs
    static_dir = 'static'
    os.makedirs(static_dir, exist_ok=True)

    cursor.execute("SELECT id, name, students, advisors FROM people2;")
    rows = cursor.fetchall()

    G = nx.DiGraph()

    # Add nodes and edges 
    for row in rows:
        node_id, node_name, students, advisors = row
        G.add_node(node_id, label=node_name)
        if students:
            for student_id in students:
                G.add_edge(node_id, student_id)
        if advisors:
            for advisor_id in advisors:
                G.add_edge(advisor_id, node_id)

    num_islands = nx.number_connected_components(G.to_undirected())
    print(f"Number of islands (connected components): {num_islands}")

    islands_details = []
    island_lengths = []

    start_years = []
    end_years = []
    counter = 0

    longest_island_length = 0
    shortest_island_length = float('inf')
    longest_island_number = None
    shortest_island_number = None
    longest_island_start_node = None
    shortest_island_start_node = None

    for i, c in enumerate(nx.connected_components(G.to_undirected()), start=1):
        island_nodes = list(c)  # Convert to sorted list
        island_length = len(island_nodes)
        island_lengths.append(island_length)
        print(f"Island {i}: {island_nodes} with length {island_length}")

        if island_length > longest_island_length:
            longest_island_length = island_length
            longest_island_number = i
            longest_island_start_node = island_nodes[0]

        if island_length < shortest_island_length:
            shortest_island_length = island_length
            shortest_island_number = i
            shortest_island_start_node = island_nodes[0]

        start_node_id = island_nodes[0]
        end_node_id = island_nodes[-1] if len(island_nodes) > 1 else start_node_id

        cursor.execute("SELECT year FROM people2 WHERE id = %s;", (start_node_id,))
        start_year = cursor.fetchone()[0] if cursor.rowcount > 0 else None

        cursor.execute("SELECT year FROM people2 WHERE id = %s;", (end_node_id,))
        end_year = cursor.fetchone()[0] if cursor.rowcount > 0 else None

        islands_details.append({
            "island_number": i,
            "nodes": island_nodes,
            "start_year": start_year,
            "end_year": end_year
        })

        if start_year and end_year:
            start_years.append(start_year)
            end_years.append(end_year)
            if end_year < start_year:
                counter += 1
                print(f"Island {i} has an invalid year range: {start_year} - {end_year}, first node: {start_node_id}, last node: {end_node_id}")
    print(f"Number of islands with invalid year range: {counter}")

    # Calculate and print average and median island lengths
    if island_lengths:
        average_length = np.mean(island_lengths)
        median_length = np.median(island_lengths)
        print(f"Average island length: {average_length}")
        print(f"Median island length: {median_length}")
        
    else:
        print("No islands found to calculate average and median lengths.")

    # Plotting the scatter plot with Seaborn
    sns.set(style="whitegrid")
    plt.figure(figsize=(10, 6))
    ax = sns.scatterplot(x=start_years, y=end_years, marker='o', color='blue')
    ax.xaxis.set_major_locator(MaxNLocator(20))
    ax.yaxis.set_major_locator(MaxNLocator(20))
    plt.xlabel('Starting Year')
    plt.ylabel('Ending Year')
    plt.title('Island Start and End Years')
    plt.grid(True)
    plt.savefig(os.path.join(static_dir, 'island_years.png'))  
    plt.close()

    # Create a bar graph based on island lengths
    bins = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, float('inf')]
    labels = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '100+']
    bin_counts, _ = np.histogram(island_lengths, bins=bins)

    print(f"Bin counts: {bin_counts}")  # Debugging line

    plt.figure(figsize=(10, 6))
    sns.barplot(x=labels, y=bin_counts, palette='Blues_d')
    plt.yscale('log')  # Set y-axis to logarithmic scale
    plt.xlabel('Island Length Ranges')
    plt.ylabel('Number of Islands')
    plt.title('Number of Islands by Length Range')
    plt.savefig(os.path.join(static_dir, 'island_lengths.png'))  
    plt.close()

    # Calculate network density
    density = nx.density(G)
    nodes = G.number_of_nodes()
    edges = G.number_of_edges()
    print(f"Network density: {density}")
    print(f"Number of nodes: {G.number_of_nodes()}")
    print(f"Number of edges: {G.number_of_edges()}")

    # Calculate PageRank
    pagerank = nx.pagerank(G)
    sorted_pagerank = sorted(pagerank.items(), key=lambda item: item[1], reverse=True)[:10]
    print("Top 10 nodes by PageRank:")
    for node, rank in sorted_pagerank[:10]:
        print(f"Node {node}: {rank}")

    print(f"Longest island number: {longest_island_number}, start node: {longest_island_start_node}")
    print(f"Shortest island number: {shortest_island_number}, start node: {shortest_island_start_node}")
    with open(os.path.join(static_dir, 'num_islands.json'), 'w') as f:
            json.dump({'num_islands': num_islands, 'islands_details': islands_details,'average_length': average_length, 'median_length': median_length,'network_density':density,'number_of_nodes':nodes,"number_of_edges":edges,"top_pagerank":sorted_pagerank,'longest_island_number':longest_island_number,'longest_island_start_node':longest_island_start_node,'shortest_island_number':shortest_island_number,'shortest_island_start_node':shortest_island_start_node}, f)

    return longest_island_number, longest_island_start_node, shortest_island_number, shortest_island_start_node, density, pagerank

# Call the displaying function and get the results
longest_island_number, longest_island_start_node, shortest_island_number, shortest_island_start_node, density, pagerank = displaying()

print(f"Longest island number: {longest_island_number}, starting node: {longest_island_start_node}")
print(f"Shortest island number: {shortest_island_number}, starting node: {shortest_island_start_node}")
print(f"Network density: {density}")
