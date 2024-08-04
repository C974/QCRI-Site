'use client';

import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeVisualization = ({ newPoint }) => {
  const [globeData, setGlobeData] = useState([]);
  const [arcsData, setArcsData] = useState([]);

  useEffect(() => {
    if (newPoint) {
      const point = { lat: newPoint.latitude, lng: newPoint.longitude, size: 0.2, color: 'green' };
      setGlobeData([...globeData, point]);

      if (globeData.length > 0) {
        const lastPoint = globeData[globeData.length - 1];
        const arc = {
          startLat: lastPoint.lat,
          startLng: lastPoint.lng,
          endLat: newPoint.latitude,
          endLng: newPoint.longitude,
          color: ['red', 'blue'],
        };
        setArcsData([...arcsData, arc]);
      }
    }
  }, [newPoint]);

  const myData = [
    { lat: 28.7128, lng: 84.0060, size: 0.2, color: 'red' },
    { lat: 25.5074, lng: 51.1278, size: 0.15, color: 'blue' },
  ];

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      pointsData={[...myData, ...globeData]}
      arcsData={arcsData}
      arcColor={'color'}
      arcDashLength={0.5}
      arcDashGap={4}
      arcDashInitialGap={() => Math.random()}
      arcDashAnimateTime={2000}
      backgroundColor="#000000"
    />
  );
};

export default GlobeVisualization;
