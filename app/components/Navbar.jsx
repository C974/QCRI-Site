// import Link from 'next/link';

// const Navbar = () => {

//   const handleSearch = (event) => {
//     event.preventDefault();
//     const searchValue = document.getElementById('search-bar').value;
//     console.log(`Search value: ${searchValue}`);

//   };


//   return (
//     <header>
//       <div className="top-nav">
//         <button id="menu-btn" className="menu-icon">&#9776;</button>
//         <nav className="right-nav">
//                        <Link href="/">Home</Link>;
//                         <Link href="/exterma">Scientists</Link>
//                         <Link href="/aboutus">About Us</Link>
//                         <Link href="/submit">Submit Scholar</Link>
//         </nav>
//         <div className="search-container">
//           <input type="text" id="search-bar" placeholder="Search..." />
//           <button id="search-btn" onClick={handleSearch}>Search</button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// import Link from 'next/link';
// import { useRouter } from 'next/router'; // Import useRouter for navigation
// import { useState } from 'react';

// const Navbar = () => {
//   const router = useRouter(); // Initialize useRouter
//   const [searchValue, setSearchValue] = useState(''); // Local state for search input

//   const handleSearch = async (event) => {
//     event.preventDefault();
    
//     // Get search value from state or directly from input field
//     const searchValue = document.getElementById('search-bar').value;
//     console.log(`Search value: ${searchValue}`);
    
//     try {
//       // Fetch scholar data
//       const response = await fetch(`http://localhost:3000/api/scholar/scholarName/${searchValue}`);
//       if (!response.ok) {
//         throw new Error(`Error fetching scholar with name ${searchValue}`);
//       }
      
//       const data = await response.json();
//       const scholarId = data.id; // Assume the response contains an 'id' field
      
//       if (scholarId) {
//         // Navigate to the scholar's page
//         router.push(`/scholar/${scholarId}`);
//       } else {
//         console.log('Scholar ID not found.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <header>
//       <div className="top-nav">
//         <button id="menu-btn" className="menu-icon">&#9776;</button>
//         <nav className="right-nav">
//           <Link href="/">Home</Link>
//           <Link href="/exterma">Scientists</Link>
//           <Link href="/aboutus">About Us</Link>
//           <Link href="/submit">Submit Scholar</Link>
//         </nav>
//         <div className="search-container">
//           <input 
//             type="text" 
//             id="search-bar" 
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             placeholder="Search..." 
//           />
//           <button id="search-btn" onClick={handleSearch}>Search</button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;




// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    
    const searchValue = document.getElementById('search-bar').value;
    console.log(`Search value: ${searchValue}`);
    
    try {
      const response = await fetch(`http://localhost:3000/api/scholar/scholarName/${searchValue}`);
   
      if (!response.ok) {
        throw new Error(`Error fetching scholar with name ${searchValue}`);
      }
      
      const data = await response.json();
      console.log('DATAAA',data);
      const scholarId = data[0]?.id;
      console.log('SCHOLARIDD',scholarId);
      
      if (scholarId) {
        router.push(`/scholar/${scholarId}`);
      } else {
        console.log('Scholar ID not found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <header>
      <div className="top-nav">
        <button id="menu-btn" className="menu-icon">&#9776;</button>
        <nav className="right-nav">
          <Link href="/">Home</Link>
          <Link href="/exterma">Scientists</Link>
          <Link href="/aboutus">About Us</Link>
          <Link href="/submit">Submit Scholar</Link>
        </nav>
        <div className="search-container">
          <input 
            type="text" 
            id="search-bar" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..." 
          />
          <button id="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
