'use client';
import React, { useEffect } from 'react';
import styles from '../page.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import Link from "next/link";


const Exterma = () => {
     const [scholars ,setscholars] = useState([]);
     useEffect(() => {

        fetch('/api/scholar')
        .then((response) => response.json())
        .then((data) => setscholars(data))
        .catch((error) => console.error("Error fetching scholar data:", error));

    }, []);
    return(
    <>
    <Navbar/>
    <h2 className='header'> Top Scholars By Descendants </h2>
    <div className='styles.cardContainer' >
      
    {scholars.map((scholar, index) => (
          <Link
            key={index}
            href={
                `/scholar/${scholar.id}`
            }>
            <div className={styles.card}>
              <h3>{scholar.name}</h3>
              <p>{scholar.year}</p>
              <p>{scholar.univ}</p>


            </div>
          </Link>
        ))}

    </div>



    <Footer/>
    </>
    )
}

export default Exterma;

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import styles from '../page.module.css';

// const Exterma = ({ scholars = [] }) => {
//   const [displayCount, setDisplayCount] = useState(50);

//   const handleExpand = () => {
//     setDisplayCount(displayCount + 50);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.cardContainer}>
//         {scholars.slice(0, displayCount).map((scholar, index) => (
//           <Link key={index} href={`/scholar/${scholar.id}`}>
//             <div className={styles.card}>
//               <h3>{scholar.name}</h3>
//               <p>{scholar.year}</p>
//               <p>{scholar.univ}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//       {displayCount < scholars.length && (
//         <button className={styles.expandButton} onClick={handleExpand}>
//           Expand
//         </button>
//       )}
//     </div>
//   );
// };

// export default Exterma;
