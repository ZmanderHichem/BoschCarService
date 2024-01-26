// LesRendezVous.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../../firebase/configFirebase';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import logo from '../../../../assets/images/logo.png';
import './LesRendezVous.css'; // Créez ce fichier CSS pour styliser la page

const LesRendezVous = () => {
  const [rendezVous, setRendezVous] = useState([]);

  useEffect(() => {
    const fetchRendezVous = async () => {
      const rendezVousCollection = collection(firestore, 'rendezVous'); // Assurez-vous que 'rendezVous' est le nom de votre collection dans Firestore
      const rendezVousSnapshot = await getDocs(rendezVousCollection);
      const rendezVousData = rendezVousSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRendezVous(rendezVousData);
    };

    fetchRendezVous();
  }, []);

  return (
    <div>
      <div id="logoContainer">
        <img src={logo} alt="Logo" />
        </div>
      <nav className="navbar navbar-expand-lg navbar">
        <div className="container">
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/LesRendezVous">
                  Les Rendez-vous
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Promos">Gérer les Promos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/les-interventions">Les Interventions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ajouterService">Ajouter Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <h2>Les RendezVous</h2>
        <div className="rendezVous-list">
          {rendezVous.map((rendezVousItem) => (
            // Affichez les détails du rendez-vous dans une carte ou tout autre composant
            <div key={rendezVousItem.id} className="rendezVous-card">
              {/* Affichez les détails du rendez-vous ici */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LesRendezVous;
