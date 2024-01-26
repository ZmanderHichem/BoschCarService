
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router
import logo from '../assets/images/bosch.jpg';

import './Header.css';
const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img id="small-logo" src={logo} alt="Petit Logo" />
        </Link>
      </div>
      
      <nav className="navbar navbar-expand-lg navbar">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/RendezVous">
                  Rendez-vous
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/About">
                  À propos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactUs">
                  Nous contacter
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Se connecter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
