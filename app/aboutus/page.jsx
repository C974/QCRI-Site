import React from "react";
import styles from '../page.module.css';

export default function AboutUs() {
    return (
     <>

        <div className="wrapper">
            <canvas id="stars"></canvas> 
            <header>
                <div className="top-nav">
                    <button id="menu-btn" className="menu-icon">&#9776;</button>
                    <nav className="right-nav">
                        <a href="home.html">Home</a>
                        <a href="scientist-details.html">Scientists</a>
                        <a href="about-us.html">About Us</a>
                    </nav>
                    <div className="search-container">
                        {/* Example of a controlled input field in React */}
                        <input type="text" id="search-bar" placeholder="Search..." />
                        <button id="search-btn">Search</button>
                    </div>
                </div>
            </header>

            <nav id="side-nav" className="side-nav">
                <a href="javascript:void(0)" className="close-btn" id="close-btn">&times;</a>
                <a href="about-us.html">About Us</a>
                <a href="FAQ.html">FAQ</a>
                <a href="submit-data.html">Submit Data</a>
                <a href="#">Contact Us</a>
            </nav>

            <div className="main-content">
                <h1 style={{ color: 'aliceblue', textAlign: 'center' }}>About Us</h1>
                <hr style={{ borderColor: 'white' }} />
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to showcase the universities where prominent scientists graduated and to highlight their contributions to scientific advancements.
                        <br /><br />
                        Mission Statement
                        <br /><br />
                        Our mission is to create a comprehensive database of key figures in the field of [Your Subject]. We welcome data from institutions and individuals dedicated to the advancement of [Your Subject] and related disciplines.
                        <br /><br />
                        Inclusivity Notice: Our use of "[Your Subject]" and "contributors" is broad and inclusive, covering fields such as [Related Fields]. We encourage the submission of relevant information across these areas.
                        <br /><br />
                        Our Objectives:
                        <br /><br />
                        Our goal is to document the significant contributions of individuals in [Your Subject]. Each profile aims to include:
                        <br />
                        - Full name <br />
                        - Affiliated institution(s) <br />
                        - Year of contribution or significant achievement <br />
                        - Title and summary of key works <br />
                        - Mentors, collaborators, and influential figures <br />
                        Understanding that historical records vary, we acknowledge that the nature of mentorship and collaboration has evolved. We aim to accurately reflect these relationships and trace the intellectual lineage within [Your Subject].
                        <br /><br />
                        Challenges We Face:
                        <br /><br />
                        Names: Discrepancies in data sources and name changes over time can complicate records. We strive to incorporate all known variations and updates.
                        <br />
                        Institutions: Institutional names may have changed. Our approach is to use current names while noting historical ones where relevant.
                        <br />
                        Years: We aim for accuracy but recognize possible variations in reporting years.
                        <br />
                        Titles: Technical constraints might limit the completeness of titles. We welcome corrections to ensure accuracy.
                    </p>
                </div>
                <div className="about-section">
                    <h2>Our Team</h2>
                    <p>We are a team of dedicated professionals with a passion for science and education. Our goal is to provide accurate and engaging information about the scientific community.</p>
                </div>
                <div className="about-section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or suggestions, feel free to reach out to us.</p>
                    <p>Email: info@scientistprofile.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
            </div>

            <footer>
                <div className="footer-container">
                    <div className="footer-column">
                        <h3>About Us</h3>
                        <a href="about-us.html">Read more</a>
                    </div>
                    <div className="footer-column">
                        <h3>FAQ</h3>
                        <a href="FAQ.html">Read more</a>
                    </div>
                    <div className="footer-column">
                        <h3>Contact Us</h3>
                        <a href="#">Read more</a>
                    </div>
                </div>
            </footer>
        </div>
        </>
    );
}


     
     
    