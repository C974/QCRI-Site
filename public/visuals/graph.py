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
        print(f"Island {i}: {island_nodes}")

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

    # Calculate average and median island lengths
    average_length = np.mean(island_lengths) if island_lengths else 0
    median_length = np.median(island_lengths) if island_lengths else 0
    print(f"Average island length: {average_length}")
    print(f"Median island length: {median_length}")

    # Save num_islands, island details, average length, and median length to a JSON file
    with open('num_islands.json', 'w') as f:
        json.dump({'num_islands': num_islands, 'islands_details': islands_details, 'average_length': average_length, 'median_length': median_length}, f)

    # Plotting the scatter plot
    plt.scatter(start_years, end_years, marker='o', color='blue')
    plt.xlabel('Starting Year')
    plt.ylabel('Ending Year')
    plt.title('Island Start and End Years')
    plt.grid(True)
    plt.show()

# Call the displaying function
displaying()
