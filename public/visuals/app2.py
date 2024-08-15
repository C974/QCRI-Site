from flask import Flask, send_file, jsonify, render_template
from islands import fetch_island_data, plot_scatter, plot_bar

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('graph.html')

@app.route('/num_islands.json')
def num_islands():
    num_islands, start_years, end_years, island_lengths = fetch_island_data()
    with open('num_islands.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/scatter')
def scatter():
    _, start_years, end_years, _ = fetch_island_data()
    img = plot_scatter(start_years, end_years)
    return send_file(img, mimetype='image/png')

@app.route('/bargraph')
def bargraph():
    _, _, _, island_lengths = fetch_island_data()
    img = plot_bar(island_lengths)
    return send_file(img, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
