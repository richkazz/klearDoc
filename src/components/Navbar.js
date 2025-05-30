import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Assuming you're using lucide-react

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">KlearDoc</Link>
      </div>

      <button className="menu-button" onClick={toggleMenu}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/services" onClick={() => setMenuOpen(false)}>
            Services
          </Link>
        </li>
        <li>
          <Link to="/teams" onClick={() => setMenuOpen(false)}>
            Teams
          </Link>
        </li>
        <li>
          <Link to="/collection" onClick={() => setMenuOpen(false)}>
            Collection
          </Link>
        </li>
        <li>
          <Link to="/collaboration" onClick={() => setMenuOpen(false)}>
            Collaboration
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
