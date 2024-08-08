
// 'use client';
// import React, { useEffect, useState } from 'react';
// import Globe from 'react-globe.gl';


// const GlobeVisualization = ({ points }) => {
//   const [globeData, setGlobeData] = useState([]);

//   useEffect(() => {
//     if (points.length) {
//       const newPoints = points.map(point => ({
//         lat: point.latitude,
//         lng: point.longitude,
//         size: 0.2,
//         color: 'green'
//       }));
//       setGlobeData([...globeData, ...newPoints]);
//     }
//   }, [points]);

//   const myData = [
//     { lat: 28.7128, lng: 84.0060, size: 0.2, color: 'red' },
//     { lat: 25.5074, lng: 51.1278, size: 0.15, color: 'blue' },
//   ];

//   return (
//     <Globe
//       globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
//       pointsData={[...myData, ...globeData]}
//       backgroundColor="#000000"
//     />
//   );
// };

// export default GlobeVisualization;

'use client';
import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeVisualization = ({ points, connectionType }) => {
  const [globeData, setGlobeData] = useState([]);
  const [arcsData, setArcsData] = useState([]);

  useEffect(() => {
    console.log('connection globe type hello', connectionType);

    if (points.length) {
      const newPoints = points.map(point => ({
        lat: point.latitude,
        lng: point.longitude,
        size: 0.2,
        color: 'green'
      }));
      setGlobeData([...globeData, ...newPoints]);

      if (points.length >= 2) {
        const arc = {

          startLat: points[0].latitude,
          startLng: points[0].longitude,
          endLat: points[1].latitude,
          endLng: points[1].longitude,
          color: connectionType === 'RED' ? 'red' : connectionType === 'INDIRECT' ? 'blue' : 'gray',
          dashArray: connectionType === 'INDIRECT' ? [5, 5] : null
        };
        setArcsData([...arcsData, arc]);
      }
    }
  }, [points, connectionType]);

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      pointsData={globeData}
      arcsData={arcsData}
      arcColor={'color'}
      arcDashLength={0.5}
      arcDashGap={4}
      arcDashInitialGap={() => Math.random()}
      arcDashAnimateTime={450}
      backgroundColor="#000000"
      arcStroke={2}
    />
  );
};

export default GlobeVisualization;