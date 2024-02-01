import React, {  useState } from 'react';

import { Link, useNavigate  } from 'react-router-dom'; // Assuming you're using react-router
import logo from '../../../../assets/images/bosch.jpg';
import { getAuth} from 'firebase/auth';

import './AdminHeader.css';
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
                <Link className="nav-link" to="/AjouterService">
                AjouterService
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/LesInterventions">
                LesInterventions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Promos">
                  Promos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AdminChat">
                AdminChat
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
