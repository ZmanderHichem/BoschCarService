import React from 'react';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import {firestore} from '../../../firebase/configFirebase';
import './EspaceAdmin.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from '../login/login';
import LesInterventions from './LesInterventions/LesInterventions'; 
import LesRendezVous from './LesRendezVous/LesRendezVous';
import logo from '../../../assets/images/logo.png';



const EspaceAdmin = () => {
  const ajouterService = (event) => {
    event.preventDefault();
    console.log('Fonction ajouterService() appelée.');

    // Récupérer les valeurs du formulaire
    const immatriculation = document.getElementById('immatriculation').value;
    const numChassis = document.getElementById('numChassis').value;
    const nomProprietaire = document.getElementById('nomProprietaire').value;
    const email = document.getElementById('email').value;
    const serviceRealise = document.getElementById('serviceRealise').value;
    const dateRealisation = document.getElementById('dateRealisation').value;

    console.log('Valeurs récupérées :', immatriculation, numChassis, nomProprietaire, email, serviceRealise, dateRealisation);

    // Ajouter les données dans la collection "services"
    const servicesCollection = collection(firestore, 'services');
    const newServiceRef = doc(servicesCollection);

    setDoc(newServiceRef, {
      immatriculation: immatriculation,
      numChassis: numChassis,
      nomProprietaire: nomProprietaire,
      email: email,
      serviceRealise: serviceRealise,
      dateRealisation: dateRealisation,
    })
      .then(() => {
        console.log('Service ajouté avec succès.');
      })
      .catch((error) => {
        console.log('Erreur lors de l\'ajout du service : ', error);
      });
  };

  return (
    <div>
      <div id="logoContainer">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="navbar navbar-expand-lg navbar ">
        <div className="container">
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/LesRendezVous">
                  Les Rendez-vous
                </Link>
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

    <div>
      <h2>Espace Admin</h2>
      <h1>Ajouter un service</h1>
      {/* Formulaire pour ajouter un service */}
      <form id="serviceForm">
        <label htmlFor="immatriculation">Immatriculation :</label>
        <input type="text" id="immatriculation" required /><br />

        <label htmlFor="numChassis">Numéro de châssis :</label>
        <input type="text" id="numChassis" required /><br />

        <label htmlFor="nomProprietaire">Nom du propriétaire :</label>
        <input type="text" id="nomProprietaire" required /><br />

        <label htmlFor="email">E-mail du client :</label>
        <input type="email" id="email" required /><br />

        <label htmlFor="serviceRealise">Service réalisé :</label>
        <textarea id="serviceRealise" required></textarea><br />

        <label htmlFor="dateRealisation">Date de réalisation :</label>
        <input type="date" id="dateRealisation" required /><br />

        <button onClick={ajouterService}>Ajouter Service</button>
        </form>
      </div>
    </div>
  );
};

export default EspaceAdmin;
