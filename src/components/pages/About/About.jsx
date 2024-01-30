import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Assurez-vous d'importer le fichier CSS
import about1 from '../../../assets/images/about1.jpg';
import about2 from '../../../assets/images/about2.jpg';
import about3 from '../../../assets/images/about3.jpg';
import Header from '../Headers/Header';

const About = () => {
  const [imageOnLeft, setImageOnLeft] = useState(true);

  const toggleContentPosition = () => {
    setImageOnLeft((prev) => !prev);
  };

  return (
    <div>
          <Header />




    <div>     
           <h2>Bienvenue chez votre station Bosch !

    </h2>
    <div className={`about-container ${imageOnLeft ? 'image-left' : 'description-left'}`}>
      <div className="content">
        <p>
        Spécialistes de la mécanique automobile, notre équipe dévouée offre des services de réparation et d'entretien de haute qualité. De la vidange à la révision complète, nous prenons soin de votre véhicule avec expertise.        </p>
      </div>
      <div className="image" onClick={toggleContentPosition}>
        {/* Ajoutez ici votre image */}
        <img src={about1} alt="About Us" />
      </div>
    </div>


    <div className={`about-container ${imageOnLeft ? 'image-left' : 'description-left'}`}>
      <div className="content">
        <p>
        Forts d'une équipe expérimentée, nous sommes fiers de travailler avec diverses marques, assurant une prise en charge complète pour répondre à vos besoins. Votre satisfaction est notre priorité, et nous nous engageons à fournir un service fiable et transparent.    
         </p>
          </div>
      <div className="image" onClick={toggleContentPosition}>
        {/* Ajoutez ici votre image */}
        <img src={about2} alt="About Us" />
      </div>
    </div>

    <div className={`about-container ${imageOnLeft ? 'image-left' : 'description-left'}`}>
      <div className="content">
        <p>
        Chez nous, chaque client est important. Venez découvrir un service professionnel, des délais rapides et une approche personnalisée. Votre confiance est notre motivation.    </p>  
        </div>

      <div className="image" onClick={toggleContentPosition}>
        {/* Ajoutez ici votre image */}
        <img src={about3} alt="About Us" />
      </div>
      
    </div>

    </div>

    </div>

  );
};

export default About;
