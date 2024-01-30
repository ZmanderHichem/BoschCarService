// Import statements
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import './RendezVous.css';
import Header from '../Headers/Header';
import emailjs from 'emailjs-com';
import { firestore } from '../../../firebase/configFirebase';

// Component definition
const RendezVous = () => {
  // State declarations
  const [nom, setNom] = useState('');
  const [modeleVoiture, setModeleVoiture] = useState('');
  const [immatriculation, setImmatriculation] = useState('');
  const [kilometrage, setKilometrage] = useState('');
  const [dateHeure, setDateHeure] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');

  // Function to send email
  const sendEmail = (nom, modeleVoiture, immatriculation, kilometrage, dateHeure, telephone, email) => {
    // Remplacez ces valeurs par les vôtres
    const serviceID = 'service_eeuerzw';
    const templateID = 'template_u8192kh';
    const userID = '045MKDooB2Thc1kTN';

    return emailjs.send(serviceID, templateID, {
      to_name: 'Nom du destinataire',
      from_name: 'Votre Nom',
      message: `Nom: ${nom}\nModèle de voiture: ${modeleVoiture}\nImmatriculation: ${immatriculation}\nKilométrage actuel: ${kilometrage}\nDate et heure: ${dateHeure}\nTéléphone: ${telephone}\nE-mail: ${email}`,
    }, userID);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoi de l'e-mail à l'administrateur
    sendEmail(
      nom,
      modeleVoiture,
      immatriculation,
      kilometrage,
      dateHeure,
      telephone,
      email
    )
      .then((response) => {
        console.log('E-mail envoyé à l\'administrateur avec succès:', response);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail à l\'administrateur:', error);
      });

    // Envoi de l'e-mail au client
    sendEmail(
      'Admin', // Nom de l'administrateur
      nom, // nom du client
      'Votre demande de rendez-vous est en cours de traitement. Nous vous contacterons bientôt.'
    )
      .then((response) => {
        console.log('E-mail envoyé au client avec succès:', response);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail au client:', error);
      });

    // Add data to the "RendezVous" collection in Firestore
    const rendezVousCollection = collection(firestore, 'RendezVous');
    await addDoc(rendezVousCollection, {
      nom,
      modeleVoiture,
      immatriculation,
      kilometrage,
      dateHeure,
      telephone,
      email,
    });

    // Réinitialisation des champs du formulaire
    setNom('');
    setModeleVoiture('');
    setImmatriculation('');
    setKilometrage('');
    setDateHeure('');
    setTelephone('');
    setEmail('');
  };

  // JSX content
  return (
    <div>
               <Header />


      <h2>Prenez un Rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom:</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />

        <label>Modèle de voiture:</label>
        <input type="text" value={modeleVoiture} onChange={(e) => setModeleVoiture(e.target.value)} />

        <label>Immatriculation:</label>
        <input type="text" value={immatriculation} onChange={(e) => setImmatriculation(e.target.value)} />

        <label>Kilométrage actuel:</label>
        <input type="text" value={kilometrage} onChange={(e) => setKilometrage(e.target.value)} />

        <label>Date et heure:</label>
        <input type="text" value={dateHeure} onChange={(e) => setDateHeure(e.target.value)} />

        <label>Téléphone:</label>
        <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />

        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button type="submit">Prendre un Rendez-vous</button>
      </form>
    </div>
  );
};

// Export the component
export default RendezVous;
