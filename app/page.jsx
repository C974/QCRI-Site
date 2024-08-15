'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Top } from '../app/components/Top.jsx';

const GlobeVisualization = dynamic(() => import('./GlobeVisualization'), { ssr: false });

const HomePage = () => {
  const [points, setPoints] = useState([]);
  const [connectionType, setConnectionType] = useState(null);  // Changed to null to avoid array

  const handleSearch = (newPoints, newConnectionType) => {
    setPoints(newPoints);
    setConnectionType(newConnectionType);  // Correctly updating the connection type
  };

  return (
    <div>
      <Head>
        <title>React App</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <noscript>You need to enable JavaScript to run this app.</noscript>
      <Top onSearch={handleSearch} />
      <div id="root">
        <GlobeVisualization points={points} connectionType={connectionType} />
      </div>
    </div>
  );
};

export default HomePage;



