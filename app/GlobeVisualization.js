
// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import Globe from 'react-globe.gl';


// // const GlobeVisualization = ({ points }) => {
// //   const [globeData, setGlobeData] = useState([]);

// //   useEffect(() => {
// //     if (points.length) {
// //       const newPoints = points.map(point => ({
// //         lat: point.latitude,
// //         lng: point.longitude,
// //         size: 0.2,
// //         color: 'green'
// //       }));
// //       setGlobeData([...globeData, ...newPoints]);
// //     }
// //   }, [points]);

// //   const myData = [
// //     { lat: 28.7128, lng: 84.0060, size: 0.2, color: 'red' },
// //     { lat: 25.5074, lng: 51.1278, size: 0.15, color: 'blue' },
// //   ];

// //   return (
// //     <Globe
// //       globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
// //       pointsData={[...myData, ...globeData]}
// //       backgroundColor="#000000"
// //     />
// //   );
// // };

// // export default GlobeVisualization;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import Globe from 'react-globe.gl';

// const GlobeVisualization = ({ points, connectionType }) => {
//   const [globeData, setGlobeData] = useState([]);
//   const [arcsData, setArcsData] = useState([]);

//   useEffect(() => {
//     console.log('connection globe type hello', connectionType);

//     if (points.length) {
//       const newPoints = points.map(point => ({
//         lat: point.latitude,
//         lng: point.longitude,
//         size: 0.2,
//         color: 'green'
//       }));
//       setGlobeData([...globeData, ...newPoints]);

//       if (points.length >= 2) {
//         const arc = {

//           startLat: points[0].latitude,
//           startLng: points[0].longitude,
//           endLat: points[1].latitude,
//           endLng: points[1].longitude,
//           color: connectionType === 'RED' ? 'red' : connectionType === 'INDIRECT' ? 'blue' : 'gray',
//           dashArray: connectionType === 'INDIRECT' ? [5, 5] : null
//         };
//         setArcsData([...arcsData, arc]);
//       }
//     }
//   }, [points, connectionType]);

//   return (
//     <Globe
//       globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
//       pointsData={globeData}
//       arcsData={arcsData}
//       arcColor={'color'}
//       arcDashLength={0.5}
//       arcDashGap={4}
//       arcDashInitialGap={() => Math.random()}
//       arcDashAnimateTime={450}
//       backgroundColor="#000000"
//       arcStroke={2}
//     />
//   );
// };

// export default GlobeVisualization;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import Globe from 'react-globe.gl';

// const GlobeVisualization = ({ points, connectionType }) => {
//   const [globeData, setGlobeData] = useState([]);
//   const [arcsData, setArcsData] = useState([]);

//   useEffect(() => {
//     if (points.length) {
//       const newPoints = points.map((point, index) => ({
//         lat: point.latitude,
//         lng: point.longitude,
//         size: 0.2,
//         color: 'green',
//         name: point.name || `Scientist ${index + 1}`,  // Add the name property here
//         labelLat: point.latitude + 0.5, // Adjust label position slightly above the point
//         labelLng: point.longitude
//       }));
//       setGlobeData([...globeData, ...newPoints]);

//       if (points.length >= 2) {
//         const arc = {
//           startLat: points[0].latitude,
//           startLng: points[0].longitude,
//           endLat: points[1].latitude,
//           endLng: points[1].longitude,
//           color: connectionType === 'RED' ? 'red' : connectionType === 'INDIRECT' ? 'blue' : 'gray',
//           dashArray: connectionType === 'INDIRECT' ? [5, 5] : null
//         };
//         setArcsData([...arcsData, arc]);
//       }
//     }
//   }, [points, connectionType]);

//   return (
//     <Globe
//       globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
//       pointsData={globeData}
//       arcsData={arcsData}
//       labelsData={globeData}  // Add labels data
//       labelLat={(d) => d.labelLat}  // Set label latitude
//       labelLng={(d) => d.labelLng}  // Set label longitude
//       labelText={(d) => d.name}  // Set label text to the name of the scientist
//       labelSize={(d) => 1.5}  // Adjust the size of the label
//       arcColor={'color'}
//       arcDashLength={0.5}
//       arcDashGap={4}
//       arcDashInitialGap={() => Math.random()}
//       arcDashAnimateTime={450}
//       backgroundColor="#000000"
//       arcStroke={2}
//     />
//   );
// };

// export default GlobeVisualization;





// 'use client';
// import React, { useEffect, useState } from 'react';
// import Globe from 'react-globe.gl';

// const GlobeVisualization = ({ points, connectionType }) => {
//   const [globeData, setGlobeData] = useState([]);
//   const [arcsData, setArcsData] = useState([]);

//   useEffect(() => {
//     if (points.length) {
//       const newPoints = points.map((point, index) => ({
//         lat: point.latitude,
//         lng: point.longitude,
//         size: 0.2,
//         color: 'green',
//         name: point.name || `Scientist ${globeData.length + index + 1}`,  // Use the existing globeData length
//         labelLat: point.latitude + 0.5,  // Adjust label position slightly above the point
//         labelLng: point.longitude
//       }));

//       // Append new points to the existing globeData
//       setGlobeData((prevData) => [...prevData, ...newPoints]);

//       if (points.length >= 2) {
//         const arc = {
//           startLat: points[0].latitude,
//           startLng: points[0].longitude,
//           endLat: points[1].latitude,
//           endLng: points[1].longitude,
//           color: connectionType === 'RED' ? 'red' : connectionType === 'INDIRECT' ? 'blue' : 'gray',
//           dashArray: connectionType === 'INDIRECT' ? [5, 5] : null
//         };

//         // Append new arc to the existing arcsData
//         setArcsData((prevData) => [...prevData, arc]);
//       }
//     }
//   }, [points, connectionType]);

//   return (
//     <Globe
//       globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
//       pointsData={globeData}
//       arcsData={arcsData}
//       labelsData={globeData}  // Add labels data
//       labelLat={(d) => d.labelLat}  // Set label latitude
//       labelLng={(d) => d.labelLng}  // Set label longitude
//       labelText={(d) => d.name}  // Set label text to the name of the scientist
//       labelSize={(d) => 1.5}  // Adjust the size of the label
//       arcColor={'color'}
//       arcDashLength={0.5}
//       arcDashGap={4}
//       arcDashInitialGap={() => Math.random()}
//       arcDashAnimateTime={450}
//       backgroundColor="#000000"
//       arcStroke={2}
//     />
//   );
// };

// export default GlobeVisualization;






// 'use client';
// import React, { useEffect, useState } from 'react';
// import Globe from 'react-globe.gl';
// import { Canvas } from '@react-three/fiber';
// import { Stars, OrbitControls } from '@react-three/drei';

// const GlobeVisualization = ({ points, connectionType }) => {
//   const [globeData, setGlobeData] = useState([]);
//   const [arcsData, setArcsData] = useState([]);

//   useEffect(() => {
//     if (points.length) {
//       const newPoints = points.map((point, index) => ({
//         lat: point.latitude,
//         lng: point.longitude,
//         size: 0.2,
//         color: 'green',
//         name: point.name || `Scientist ${globeData.length + index + 1}`,
//         labelLat: point.latitude + 0.5,
//         labelLng: point.longitude,
//       }));

//       setGlobeData((prevData) => [...prevData, ...newPoints]);

//       if (points.length >= 2) {
//         const arc = {
//           startLat: points[0].latitude,
//           startLng: points[0].longitude,
//           endLat: points[1].latitude,
//           endLng: points[1].longitude,
//           color:
//             connectionType === 'RED'
//               ? 'red '
//               : connectionType === 'INDIRECT'
//                 ? 'blue'
//                 : 'gray',
//           dashArray: connectionType === 'INDIRECT' ? [5, 5] : null,
//         };

//         setArcsData((prevData) => [...prevData, arc]);
//       }
//     }
//   }, [points, connectionType]);

//   return (
//     <div style={{ height: '100vh', position: 'relative' }}>
//       {/* Canvas for Stars */}
//       <Canvas
//         style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
//         camera={{ position: [0, 0, 10] }}
//       >
//         {/* <Stars
//           radius={100}
//           depth={50}
//           count={5000}
//           factor={7}
//           saturation={0}
//           fade
//         /> */}
//         <OrbitControls enableZoom={false} />
//       </Canvas>

//       {/* Globe component */}
//       <Globe
//         globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
//         pointsData={globeData}
//         arcsData={arcsData}
//         labelsData={globeData}
//         labelLat={(d) => d.labelLat}
//         labelLng={(d) => d.labelLng}
//         labelText={(d) => d.name}
//         labelSize={(d) => 1.5}
//         arcColor={'color'}
//         arcDashLength={0.5}
//         arcDashGap={4}
//         arcDashInitialGap={() => Math.random()}
//         arcDashAnimateTime={450}
//         backgroundColor="rgba(0,0,0,0)" // Transparent background
//         arcStroke={2}
//         style={{
//           width: '100%',
//           height: '100vh',
//           position: 'relative',
//           zIndex: 1,
//         }}
//       />
//     </div>
//   );
// };

// export default GlobeVisualization;




'use client';
import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { useRouter } from 'next/navigation'; // Use next/navigation for useRouter in app directory
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';

const GlobeVisualization = ({ points, connectionType }) => {
  const [globeData, setGlobeData] = useState([]);
  const [arcsData, setArcsData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (points.length) {
      const newPoints = points.map((point, index) => ({
        lat: point.latitude,
        lng: point.longitude,
        size: 0.2,
        color: 'green',
        name: point.name || `Scientist ${globeData.length + index + 1}`,
        labelLat: point.latitude + 0.5,
        labelLng: point.longitude,
      }));

      setGlobeData((prevData) => [...prevData, ...newPoints]);

      if (points.length >= 2) {
        const arc = {
          startLat: points[0].latitude,
          startLng: points[0].longitude,
          endLat: points[1].latitude,
          endLng: points[1].longitude,
          color: connectionType === 'RED' ? 'red' : connectionType === 'INDIRECT' ? 'blue' : 'gray',
          dashArray: connectionType === 'INDIRECT' ? [5, 5] : null,
        };

        setArcsData((prevData) => [...prevData, arc]);
      }
    }
  }, [points, connectionType]);

  const handlePointClick = async (point) => {
    try {
      // Fetch the scholar data to get the ID
      const response = await fetch(`http://localhost:3000/api/scholar/scholarName/${point.name}`);
      const scholarData = await response.json();
      console.log('response', scholarData);
      const scholarId = scholarData[0]?.id;
      console.log('scholarId', scholarId);
      if (scholarId) {
        // Redirect to the scholar's page
        router.push(`/scholar/${scholarId}`);
      } else {
        console.error('Scholar ID not found.');
      }
    } catch (error) {
      console.error('Error fetching scholar ID:', error);
    }
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      {/* Canvas for Stars */}
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        camera={{ position: [0, 0, 10] }}
      >
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={7}
          saturation={0}
          fade
        />
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Globe component */}
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={globeData}
        arcsData={arcsData}
        labelsData={globeData}
        labelLat={(d) => d.labelLat}
        labelLng={(d) => d.labelLng}
        labelText={(d) => d.name}
        labelSize={(d) => 1.5}
        arcColor={'color'}
        pointRadius={(d) => 0.6} // Increase this value to make points bigger
        arcDashLength={0.5}
        arcDashGap={4}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={450}
        backgroundColor="rgba(0,0,0,0)" // Transparent background
        arcStroke={2}
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
        onPointClick={handlePointClick} // Add click handler
      />
    </div>
  );
};

export default GlobeVisualization;
