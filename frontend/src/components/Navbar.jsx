import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
    <Link className="navbar-brand ms-3" to="/">Marting Lenoir Diego</Link>
        <div className="collapse navbar-collapse ms-auto" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
      </div>
    </nav>
  );
}

export default Navbar;
