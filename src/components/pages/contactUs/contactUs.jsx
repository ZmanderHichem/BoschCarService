import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Headers/Header';
import logo2 from '../../../assets/images/aboutus.jpg';

import './contactUs.css';


const ContactUs = () => {
    
  return (
    <div>
         <Header />


      <div className="contact-section">
        <div className="contact-info">
          <h4>Coordonnées</h4>
          <p>Nom de l'entreprise: XYZ Company</p>
          <p>Nom du gérant: John Doe</p>
          <p>Numéro de téléphone: +123456789</p>
          <p>Adresse: 123 Rue Principale, Ville</p>
        </div>
        <div className="contact-image">
          <img src={logo2} alt="Image de contact" />
        </div>
      </div>
      <div className="location">
<h4>Nous localiser</h4>
<iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d199.62465105176372!2d10.129923021155841!3d36.81865370486722!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33abcc712777%3A0xc0b42ef1c03de297!2sBOSCH%20Car%20Service!5e0!3m2!1sen!2stn!4v1705761544935!5m2!1sen!2stn"
  style={{
    width: '1000px',
    height: '600px',
    border: 0,
  }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
</div>





    </div>
  );
}

export default ContactUs;
