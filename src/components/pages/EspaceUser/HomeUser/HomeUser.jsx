import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../../../firebase/configFirebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';

import Header from '../../../Header';




const storage = getStorage();

const Fok = () => {
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

     <div className="limite-marquee">
      <div className="scrolling-text marquee-text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae metus nec massa
          ultricies tincidunt. Nullam lacinia, odio eu fermentum tristique, elit lectus lacinia
          elit, ut consectetur arcu justo in elit. Pellentesque sit amet volutpat elit.
        </p>
      </div>
</div>
     
      </Container>  
      );
};

export default Fok;