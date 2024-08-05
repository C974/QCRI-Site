// 'use client';
// import React, { useState } from 'react';
// import styles from 'D:/GItHub/QCRI-Site/QCRI-Site/app/page.module.css';

// export function Top({ onSearch }) {
//     const [searchValue1, setSearchValue1] = useState('');
//     const [searchValue2, setSearchValue2] = useState('');

//     const handleInputChange1 = (event) => {
//         setSearchValue1(event.target.value);
//         console.log('Input 1:', event.target.value); // Debug
//     };

//     const handleInputChange2 = (event) => {
//         setSearchValue2(event.target.value);
//         console.log('Input 2:', event.target.value); // Debug
//     };

//     const handleSearchClick = async () => {
//         try {
//             const fetchData = async (searchValue) => {
//                 const scholarResponse = await fetch(`http://localhost:3000/api/scholar/scholarName/${searchValue}`);
//                 const scholarData = await scholarResponse.json();
//                 console.log('Scholar Data:', scholarData);

//                 const country = scholarData.country || scholarData[0]?.country;
//                 console.log('Country:', country);

//                 if (!country) {
//                     console.error('Country not found in scholar data');
//                     return null;
//                 }

//                 const countryResponse = await fetch(`http://localhost:3000/api/country/${country}`);
//                 const countryData = await countryResponse.json();
//                 console.log('Country Data:', countryData);

//                 const { latitude, longitude } = countryData;

//                 return { latitude, longitude };
//             };

//             const point1 = await fetchData(searchValue1);
//             const point2 = await fetchData(searchValue2);

//             if (point1 && point2) {
//                 onSearch([point1, point2]);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <header>
//             <div className={styles.topNav}>
//                 <button id="menu-btn" className={styles.menuIcon}>&#9776;</button>
//                 <nav className={styles.rightNav}>
//                     <div className='text'>
//                         <a href="home.html">Home</a>
//                         <a href="scientist-details.html">Scientists</a>
//                         <a href="about-us.html">About Us</a>
//                     </div>
//                 </nav>
//                 <div className={styles.searchContainer}>
//                     <input
//                         type="text"
//                         id="search-bar1"
//                         placeholder="Enter the first scholar's name"
//                         value={searchValue1}
//                         onChange={handleInputChange1}
//                     />
//                     <input
//                         type="text"
//                         id="search-bar2"
//                         placeholder="Enter the second scholar's name"
//                         value={searchValue2}
//                         onChange={handleInputChange2}
//                     />
//                     <button
//                         id="search-btn"
//                         onClick={handleSearchClick}
//                     >
//                         Search
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Top;

'use client';
import React, { useState } from 'react';
import styles from 'D:/GItHub/QCRI-Site/QCRI-Site/app/page.module.css';

export function Top({ onSearch }) {
    const [searchValue1, setSearchValue1] = useState('');
    const [searchValue2, setSearchValue2] = useState('');

    const handleInputChange1 = (event) => {
        setSearchValue1(event.target.value);
        console.log('Input 1:', event.target.value); // Debug
    };

    const handleInputChange2 = (event) => {
        setSearchValue2(event.target.value);
        console.log('Input 2:', event.target.value); // Debug
    };

    const checkConnection = async (scholar1, scholar2) => {
        try {
            // const advisorResponse1 = await fetch(`http://localhost:3000/api/scholar/scholarName/${scholar1}/Advisor`);
            // const advisorData1 = await advisorResponse1.json();
            // // const country = scholarData.country || scholarData[0]?.country;
            // console.log('Advisor Data 1:', advisorData1);
            // const advisor1 = advisorData1.advisor || advisorData1[0]?.advisors;
            // console.log('Advisor 1:', advisor1);

            // const advisorResponse2 = await fetch(`http://localhost:3000/api/scholar/scholarName/${scholar2}/Advisor`);
            // const advisorData2 = await advisorResponse2.json();
            // console.log('Advisor Data 2:', advisorData2);
            // const advisor2 = advisorData2.advisor || advisorData2[0]?.advisors;
            // console.log('Advisor 2:', advisor2);
        
            // if (advisor1 === advisor2) {
            //     return 'RED';  // Same advisor
            // }
            

            // Fetch node IDs for the scholars
            const idResponse1 = await fetch(`http://localhost:3000/api/scholar/scholarName/${scholar1}/id`);
            const idData1 = await idResponse1.json();
            console.log('ID Data 1:', idData1);
            const nodeId1 = idData1.id || idData1[0]?.id;
            console.log('Node ID 1:', nodeId1);

            const idResponse2 = await fetch(`http://localhost:3000/api/scholar/scholarName/${scholar2}/id`);
            const idData2 = await idResponse2.json();
            console.log('ID Data 2:', idData2);
            const nodeId2 = idData2.id|| idData2[0]?.id;
            console.log('Node ID 2:', nodeId2);

            
            return 'NO CONNECTION';  // No connection found
        } catch (error) {
            console.error('Error checking connection:', error);
            return 'ERROR';
        }
    };

    const handleSearchClick = async () => {
        try {
            const fetchData = async (searchValue) => {
                const scholarResponse = await fetch(`http://localhost:3000/api/scholar/scholarName/${searchValue}`);
                const scholarData = await scholarResponse.json();
                console.log('Scholar Data:', scholarData);

                const country = scholarData.country || scholarData[0]?.country;
                console.log('Country:', country);

                if (!country) {
                    console.error('Country not found in scholar data');
                    return null;
                }

                const countryResponse = await fetch(`http://localhost:3000/api/country/${country}`);
                const countryData = await countryResponse.json();
                console.log('Country Data:', countryData);

                const { latitude, longitude } = countryData;

                return { latitude, longitude };
            };

            const point1 = await fetchData(searchValue1);
            const point2 = await fetchData(searchValue2);

            if (point1 && point2) {
                onSearch([point1, point2]);

                const connectionColor = await checkConnection(searchValue1, searchValue2);
                console.log(`Connection color: ${connectionColor}`);
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
                        id="search-bar1"
                        placeholder="Enter the first scholar's name"
                        value={searchValue1}
                        onChange={handleInputChange1}
                    />
                    <input
                        type="text"
                        id="search-bar2"
                        placeholder="Enter the second scholar's name"
                        value={searchValue2}
                        onChange={handleInputChange2}
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
