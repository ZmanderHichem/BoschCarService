import React, { useEffect, useState } from 'react';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

import { firestore } from '../../../../firebase/configFirebase';
import AdminHeader from '../../Headers/AdminHeader/AdminHeader';

const AjouterService = () => {
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
            <AdminHeader />


    <div>
      <h2>Ajouter un nouveau service</h2>
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

export default AjouterService;
