import Link from 'next/link';

const Navbar = () => {
  return (
    <header>
      <div className="top-nav">
        <button id="menu-btn" className="menu-icon">&#9776;</button>
        <nav className="right-nav">
          <Link href="/">Home</Link>
          <Link href="/scientists">Scientists</Link>
          <Link href="/about-us">About Us</Link>
        </nav>
        <div className="search-container">
          <input type="text" id="search-bar" placeholder="Search..." />
          <button id="search-btn">Search</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;