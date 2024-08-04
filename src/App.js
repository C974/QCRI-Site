import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Globe from 'react-globe.gl';

const GlobeVisualization = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [globeData, setGlobeData] = useState([]);

  // Static points data
  const myData = [
    { lat: 28.7128, lng: 84.0060, size: 0.2, color: 'red' },
    { lat: 25.5074, lng: 51.1278, size: 0.15, color: 'blue' },
  ];

  // Fetch data from the server (optional)
  useEffect(() => {
    fetch('http://localhost:3001/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Function to handle the search
  const handleSearch = () => {
    fetch(`http://localhost:3001/search?name=${name}`)
      .then(response => response.json())
      .then(result => {
        const { country, coordinates } = result;
        const newPoint = { lat: coordinates.latitude, lng: coordinates.longitude, size: 0.2, color: 'green' };
        setGlobeData([...globeData, newPoint]);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleSearch}>Search</button>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={[...myData, ...globeData]}
        backgroundColor="#000000"
      />
    </div>
  );
};

// Render the GlobeVisualization component into the DOM
ReactDOM.render(<GlobeVisualization />, document.getElementById('root'));

export default GlobeVisualization;
