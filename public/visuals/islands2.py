import logging
import networkx as nx
from matplotlib import pyplot as plt
import psycopg2
import json
import numpy as np

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

    for i, c in enumerate(nx.connected_components(G.to_undirected()), start=1):
        island_nodes = list(c)  # Convert to sorted list
        island_length = len(island_nodes)
        island_lengths.append(island_length)
        print(f"Island {i}: {island_nodes} with length {island_length}")

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
        with open('num_islands.json', 'a') as f:
            json.dump({'num_islands': num_islands, 'islands_details': islands_details,'average_length': average_length, 'median_length': median_length}, f)
    else:
        print("No islands found to calculate average and median lengths.")

    # Plotting the scatter plot
    plt.scatter(start_years, end_years, marker='o', color='blue')
    plt.xlabel('Starting Year')
    plt.ylabel('Ending Year')
    plt.title('Island Start and End Years')
    plt.grid(True)
    plt.show()

    # Create a bar graph based on island lengths
    bins = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, float('inf')]
    labels = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '100+']
    bin_counts, _ = np.histogram(island_lengths, bins=bins)

    print(f"Bin counts: {bin_counts}")  # Debugging line

    plt.bar(labels, bin_counts, color='blue')
    plt.xlabel('Island Length Ranges')
    plt.ylabel('Number of Islands')
    plt.title('Number of Islands by Length Range')
    plt.show()

# Call the displaying function
displaying()
