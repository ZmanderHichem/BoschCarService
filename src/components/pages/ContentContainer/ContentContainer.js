// ContentContainer.jsx

import React, { useEffect, useState } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../../firebase/configFirebase';
import '../home/home.css';
import OffreCard from '../home/OffreCard';
import experience from '../../../assets/images/+10 Years Experience.jpg';
import affiche2 from '../../../assets/images/affiche2.jpg';

const ContentContainer = ({ promos, offresEmploi }) => {
  return (
    <Container>
      <div className="limite-marquee">
        <div className="scrolling-text marquee-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae metus nec massa
            ultricies tincidunt. Nullam lacinia, odio eu fermentum tristique, elit lectus lacinia
            elit, ut consectetur arcu justo in elit. Pellentesque sit amet volutpat elit.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="container">
          <Carousel>
            {promos.map((promo, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={promo.imageURL} alt={`Promo ${index + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
       

        <img src={experience} alt="experience" style={{ maxwidth: 'auto', height: 'auto',  margin:'20px auto' }}
/>
<img src={affiche2} alt="affiche2" style={{ maxwidth: 'auto', height: 'auto',  margin:'20px auto' }}
/>

<h2>Rejoignez Notre Equipe</h2>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {offresEmploi.map((offre) => (
            <OffreCard key={offre.id} offre={offre} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ContentContainer;
