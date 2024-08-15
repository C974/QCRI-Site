'use client'
import React, { useEffect } from 'react';
import 'D:/GItHub/QCRI-Site/QCRI-Site/app/submit/submit.css';

const Submit = () => {
  useEffect(() => {
    // Open side navigation
    const openNav = () => {
      document.getElementById('side-nav').style.width = '200px';
    };

    // Close side navigation
    const closeNav = () => {
      document.getElementById('side-nav').style.width = '0';
    };

    // Event listener for opening the side navigation
    document.getElementById('menu-btn').addEventListener('click', openNav);

    // Event listener for closing the side navigation
    
    document.getElementById('close-btn').addEventListener('click', closeNav);


    // Star animation setup
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 100;
    const speed = 0.5;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      createStars();
    };

    const createStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width / (window.devicePixelRatio || 1),
          y: Math.random() * canvas.height / (window.devicePixelRatio || 1),
          radius: Math.random() * 1.5,
          vx: speed * (Math.random() * 2 - 1),
          vy: speed * (Math.random() * 2 - 1)
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    };

    const updateStars = () => {
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > canvas.width / (window.devicePixelRatio || 1)) star.vx = -star.vx;
        if (star.y < 0 || star.y > canvas.height / (window.devicePixelRatio || 1)) star.vy = -star.vy;
      }
    };

    const animate = () => {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    };

    // Initial setup
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createStars();
    animate();

    return () => {
      // Cleanup event listeners when the component unmounts
      document.getElementById('menu-btn').removeEventListener('click', openNav);
      document.getElementById('close-btn').removeEventListener('click', closeNav);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="wrapper">
      <canvas id="stars"></canvas>
      <header>
        <div className="top-nav">
          <button id="menu-btn" className="menu-icon">&#9776;</button>
          <nav className="right-nav">
            <a href="/home">Home</a>
            <a href="/scientist-details">Scientists</a>
            <a href="/about-us">About Us</a>
          </nav>
        </div>
      </header>
      <nav id="side-nav" className="side-nav">
        <a href="javascript:void(0)" className="close-btn" id="close-btn">&times;</a>
        <a href="/about-us">About Us</a>
        <a href="/FAQ">FAQ</a>
        <a href="/submit-data">Submit Data</a>
        <a href="/contact-us">Contact Us</a>
      </nav>
      <div className="form-container">
        <h2>Submit Your Data</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="Institution">Institution</label>
            <input type="text" id="Institution" name="Institution" placeholder="Enter your Institution name" required />
          </div>
          <div className="form-group">
            <label htmlFor="data">Data</label>
            <input type="text" id="data" name="data" placeholder="Provide your data" required />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <footer>
        <div className="footer-container">
          <div className="footer-column">
            <h3>About Us</h3>
            <a href="/about-us">Read more</a>
          </div>
          <div className="footer-column">
            <h3>FAQ</h3>
            <a href="/FAQ">Read more</a>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <a href="/contact-us">Read more</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Submit;
