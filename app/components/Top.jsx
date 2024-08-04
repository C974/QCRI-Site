'use client';
import React, { useState } from 'react';
import styles from 'C:/Users/gigia/Desktop/QCRI-Site/my-next-app/app/page.module.css';

export function Top({ onSearch }) {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchClick = async () => {
        try {
            const scholarResponse = await fetch(`http://localhost:3001/api/scholar/scholarName/${searchValue}`);
            const scholarData = await scholarResponse.json();
            if (scholarData.length > 0) {
                const country = scholarData[0].country;

                console.log(country); // This will print the country name directly

                const countryResponse = await fetch(`http://localhost:3001/api/country/${country}`);
                const countryData = await countryResponse.json();
                const { latitude, longitude } = countryData;

                onSearch({ latitude, longitude });
            } else {
                console.error('No scholar data found');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <header>
            <div className={styles.topNav}>
                <button id="menu-btn" className={styles.menuIcon}>&#9776;</button>
                <nav className={styles.rightNav}>
                    <div className='text'>
                        <a href="home.html">Home</a>
                        <a href="scientist-details.html">Scientists</a>
                        <a href="about-us.html">About Us</a>
                    </div>
                </nav>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        id="search-bar"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                    <button
                        id="search-btn"
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Top;
