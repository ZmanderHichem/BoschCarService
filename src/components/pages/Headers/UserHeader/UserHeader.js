import React, {  useState } from 'react';

import { Link, useNavigate  } from 'react-router-dom'; // Assuming you're using react-router
import logo from '../../../../assets/images/bosch.jpg';
import { getAuth} from 'firebase/auth';

import './UserHeader.css';
const auth = getAuth();

const AdminHeader = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [redirectTo, setRedirectTo] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const handleSignOut = async () => {
        try {
          await auth.signOut();
          setUser(null);
          navigate('/');
                } catch (error) {
          console.error('Erreur de déconnexion :', error.message);
        }
      };
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
                <Link className="nav-link" to="/MesInterventions/:userEmail">
                Mes Interventions
                </Link>
              </li>
              <li className="nav-item">
              <button className="nav-link" onClick={handleSignOut}>
                Se déconnecter
              </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;
