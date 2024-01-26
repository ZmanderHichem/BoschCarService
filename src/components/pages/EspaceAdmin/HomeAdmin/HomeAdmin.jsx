import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../../../firebase/configFirebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';
import './HomeAdmin.css';

import Header from '../../../Header';



const storage = getStorage();

const HomeAdmin = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const fetchPromos = async () => {
      const promosCollection = collection(firestore, 'promos');
      const promosSnapshot = await getDocs(promosCollection);
      const promosData = promosSnapshot.docs.map((doc) => doc.data());
      setPromos(promosData);
    };

    fetchPromos();
  }, []);

  return (
    <Container>
         <Header />

    
      <div className="container">
        <div className="container">
          <Carousel>
            {promos.map((promo, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={promo.imageURL}
                  alt={`Promo ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      </Container>  
      );
};

export default HomeAdmin;