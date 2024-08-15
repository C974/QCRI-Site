import Link from 'next/link';

const Navbar = () => {
  return (
    <header>
      <div className="top-nav">
        <button id="menu-btn" className="menu-icon">&#9776;</button>
        <nav className="right-nav">
                       <Link href="/">Home</Link>;
                        <Link href="/exterma">Scientists</Link>
                        <Link href="/aboutus">About Us</Link>
                        <Link href="/submit">Submit Scholar</Link>
        </nav>
        <div className="search-container">
          <input type="text" id="search-bar" placeholder="Search..." />
          {/* <button id="search-btn" onClick={handleSearch()}>Search</button> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;