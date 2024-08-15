from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import networkx as nx
import pandas as pd

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Connect to PostgreSQL database
conn = psycopg2.connect(dbname="postgres",
                        user="postgres",
                        password="fA09112!!",
                        host="localhost",
                        port="5432")

cursor = conn.cursor()

def get_graph_data(name, num_generations):
    cursor.execute("SELECT id, name FROM drehsan WHERE name = %s;", (name,))
    first_node = cursor.fetchone()
    if not first_node:
        return None

    root_id, root_name = first_node
    G = nx.DiGraph()
    G.add_node(root_id, label=root_name)

    id_to_name = {root_id: root_name}

    def add_descendants(node_id, current_generation):
        if current_generation > num_generations:
            return
        cursor.execute("SELECT students FROM drehsan WHERE id = %s;", (node_id,))
        students = cursor.fetchone()[0]
        if not students:
            return
        for student_id in students:
            cursor.execute("SELECT id, name FROM drehsan WHERE id = %s;", (student_id,))
            student = cursor.fetchone()
            if student:
                student_id, student_name = student
                id_to_name[student_id] = student_name
                G.add_node(student_id, label=student_name)
                G.add_edge(node_id, student_id)
                add_descendants(student_id, current_generation + 1)

    def add_advisors(node_id, current_generation):
        if current_generation > num_generations:
            return
        cursor.execute("SELECT advisors FROM drehsan WHERE id = %s;", (node_id,))
        advisors = cursor.fetchone()[0]
        if not advisors:
            return
        for advisor_id in advisors:
            cursor.execute("SELECT id, name FROM drehsan WHERE id = %s;", (advisor_id,))
            advisor = cursor.fetchone()
            if advisor:
                advisor_id, advisor_name = advisor
                id_to_name[advisor_id] = advisor_name
                G.add_node(advisor_id, label=advisor_name)
                G.add_edge(advisor_id, node_id)
                add_advisors(advisor_id, current_generation + 1)

    add_descendants(root_id, 1)
    add_advisors(root_id, 1)

    nodes = [{"id": node, "name": id_to_name[node]} for node in G.nodes]
    links = [{"source": u, "target": v} for u, v in G.edges]

    return {"nodes": nodes, "links": links}

@app.route('/api/graph', methods=['GET'])
def graph():
    name = request.args.get('name')
    num_generations = int(request.args.get('num_generations'))
    data = get_graph_data(name, num_generations)
    if data is None:
        return jsonify({"error": "No data found"}), 404
    return jsonify({"graph": data})

if __name__ == '__main__':
    app.run(debug=True)
