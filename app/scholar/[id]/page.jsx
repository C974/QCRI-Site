//  "use client";

// import styles from 'D:/GItHub/QCRI-Site/QCRI-Site/app/page.module.css'; 


// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
// import { useEffect, useState } from "react";

// const Scholar = ({ params }) => {
//   const scientistId = params.id;
//   const [scientist, setScientist] = useState(null);
//   const [view, setView] = useState('students'); // 'students' or 'advisors'

//   useEffect(() => {
//     fetch(`/api/scholar/scholarid/${scientistId}`)
//       .then((response) => response.json())
//       .then((data) => setScientist(data))
//       .catch((error) => console.error("Error fetching scientist data:", error));
//   }, [scientistId]);

//   if (!scientist) {
//     return <p>Loading...</p>;
//   }

//   const handleNext = () => {
//     setView('advisors');
//   };

//   const handlePrevious = () => {
//     setView('students');
//   };

//   let studentlist=[];
//   let advisorlist=[];
  
     
//       // console.log('Students JSON:', scientist.students);
//       studentlist = scientist.students;
//       console.log('Student List:', studentlist);
  
//       advisorlist = scientist.advisors;
//       console.log('Advisor List:', advisorlist);
 
 

//   return (
//     <>
//       <Navbar />
//       <div className={styles.wrapper} >
//         <canvas id="stars"></canvas>

//         <div className="container">
//           <div className="main-content">
//             <div className="profile-container">
//               <div className="avatar-placeholder">
//                 {/* <img src={scientist.imageurls ? JSON.parse(scientist.imageurls)[0] : '/default-avatar.png'} alt="Avatar" /> */}
//               </div>
//               <div className="profile-info">
//                 <h1>{scientist.name}</h1>
//                 <p>Nationality: {scientist.country}</p>
//                 <p>Bio: {scientist.webcontent}</p>
//                 <p>Year of graduation: {scientist.year}</p>
//                 <p>University: {scientist.univ}</p>
//                 <p>Graduation level: {scientist.gradlevel}</p>
//                 <p>Country of graduation: {scientist.country}</p>
//                 <p>Dissertation: {scientist.dissertation}</p>
//                 <p>Summary: {scientist.wikicontent}</p>
//                 <p>Framework: {scientist.framework}</p>
             
//             </div>
//             <table>
//               <thead>
//                 <tr><th>Student Name</th></tr>
//               </thead>
//               <tbody>
//                 {
//         <tr><td>{scientist.students}</td></tr>

//                 }
//               </tbody>
//             </table>
//             <table>
//               <thead>
//                 <tr><th>Advisor Name</th></tr>
//               </thead>
//               <tbody>
    
//            : (
//                   <tr><td>{scientist.advisors}</td></tr>
//                 )
//               </tbody>
//             </table>
//             </div>
//             {/* <div className="students-container">
//               <h2>List of {view === 'students' ? 'Students' : 'Advisors'}</h2>
//               <div className="students-navigation">
//                 <button id="prev-btn" onClick={handlePrevious} disabled={view === 'students'}>&#9664;</button>
                
//                 <ul id="students-list">
//                   {advisorlist.length > 0? (
//                     advisorlist.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))
//                   ) : (
//                     <li>No items available</li>
//                   )}
//                 </ul>
//                 <button id="next-btn" onClick={handleNext} disabled={view === 'advisors'}>&#9654;</button>
//               </div>
//             </div> */}
//           </div>
//         </div>

//         <nav id="side-nav" className="side-nav">
//           <a href="javascript:void(0)" className="close-btn" id="close-btn">&times;</a>
//           <a href="/about-us">About Us</a>
//           <a href="#">FAQ</a>
//           <a href="#">Submit Data</a>
//           <a href="#">Contact Us</a>
//         </nav>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Scholar;
"use client";

import styles from 'D:/GItHub/QCRI-Site/QCRI-Site/app/page.module.css'; 
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

const Scholar = ({ params }) => {
  const scientistId = params.id;
  const [scientist, setScientist] = useState(null);
  const [studentNames, setStudentNames] = useState([]);
  const [advisorNames, setAdvisorNames] = useState([]);

  useEffect(() => {
    // Fetch scientist data
    fetch(`/api/scholar/scholarid/${scientistId}`)
      .then((response) => response.json())
      .then((data) => {
        // Log the data for debugging
        console.log('Fetched scientist data:', data);

        setScientist(data);

        // Check and log if data.advisors and data.students are arrays
        console.log('Type of data.students:', typeof data.students);
        console.log('Type of data.advisors:', typeof data.advisors);
        console.log('data.students:', data.students);
        console.log('data.advisors:', data.advisors);

    
        const studentIds = data.students
        .replace(/[{}]/g, '') // Remove curly braces
        .split(',')           // Split by commas
               // Convert to numbers

        const advisorIds = data.advisors
        .replace(/[{}]/g, '') // Remove curly braces  
        .split(',')           // Split by commas
            // Convert to numbers
      

        console.log('Student IDs:', studentIds);
        console.log('Advisor IDs:', advisorIds);

        const fetchStudentNames = async () => {
          const names = await Promise.all(studentIds.map(async (id) => {
            try {
              const response = await fetch(`http://localhost:3000/api/scholar/student/${id}`);
              if (!response.ok) {
                throw new Error(`Error fetching student with ID ${id}`);
              }
              const studentData = await response.json();
              return studentData.name || 'Unknown'; // Return 'Unknown' if name is not available
            } catch (error) {
              console.error(error.message);
              return 'Unknown'; // Return 'Unknown' in case of error
            }
          }));
          setStudentNames(names);
        };
        

        const fetchAdvisorNames = async () => {
          const names = await Promise.all(advisorIds.map(async (id) => {
            try {
              const response = await fetch(`http://localhost:3000/api/scholar/student/${id}`);
              if (!response.ok) {
                throw new Error(`Error fetching student with ID ${id}`);
              }
              const studentData = await response.json();
              return studentData.name || 'Unknown'; // Return 'Unknown' if name is not available
            } catch (error) {
              console.error(error.message);
              return 'Unknown'; // Return 'Unknown' in case of error
            }
          }));
          setAdvisorNames(names);
        };

        fetchStudentNames();
        fetchAdvisorNames();
      })
      .catch((error) => console.error("Error fetching scientist data:", error));
  }, [scientistId]);

  if (!scientist) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <canvas id="stars"></canvas>
        <div className="container">
          <div className="main-content">
            <div className="profile-container">
              <div className="avatar-placeholder">
                {/* <img src={scientist.imageurls ? JSON.parse(scientist.imageurls)[0] : '/default-avatar.png'} alt="Avatar" /> */}
              </div>
              <div className="profile-info">
                <h1>{scientist.name}</h1>
                <p>Nationality: {scientist.country}</p>
                <p>Bio: {scientist.webcontent}</p>
                <p>Year of graduation: {scientist.year}</p>
                <p>University: {scientist.univ}</p>
                <p>Graduation level: {scientist.gradlevel}</p>
                <p>Country of graduation: {scientist.country}</p>
                <p>Dissertation: {scientist.dissertation}</p>
                <p>Summary: {scientist.wikicontent}</p>
                <p>Framework: {scientist.framework}</p>
              </div>

              <table>
                <thead>
                  <tr><th>Student Name</th></tr>
                </thead>
                <tbody>
                  {studentNames.map((name, index) => (
                    <tr key={index}><td>{name}</td></tr>
                  ))}
                </tbody>
              </table>

              <table>
                <thead>
                  <tr><th>Advisor Name</th></tr>
                </thead>
                <tbody>
                  {advisorNames.map((name, index) => (
                    <tr key={index}><td>{name}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <nav id="side-nav" className="side-nav">
          <a href="javascript:void(0)" className="close-btn" id="close-btn">&times;</a>
          <a href="/about-us">About Us</a>
          <a href="#">FAQ</a>
          <a href="#">Submit Data</a>
          <a href="#">Contact Us</a>
        </nav>

        <Footer />
      </div>
    </>
  );
};

export default Scholar;
