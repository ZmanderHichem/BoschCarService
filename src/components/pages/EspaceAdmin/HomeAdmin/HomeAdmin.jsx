import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../../../firebase/configFirebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';
import './HomeAdmin.css';
import ContentContainer from '../../ContentContainer/ContentContainer';
import AdminHeader from '../../Headers/AdminHeader/AdminHeader';

import ChatAdmin from './ChatAdmin';
import Chat from '../../../../assets/images/chat.png';


const storage = getStorage();

const HomeAdmin = () => {
  const [promos, setPromos] = useState([]);

  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    const fetchPromos = async () => {
      const promosCollection = collection(firestore, 'promos');
      const promosSnapshot = await getDocs(promosCollection);
      const promosData = promosSnapshot.docs.map((doc) => doc.data());
      setPromos(promosData);
    };

    fetchPromos();
  }, []);

  const [offresEmploi, setOffresEmploi] = useState([]);

  useEffect(() => {
    const fetchOffresEmploi = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'offresEmploi'));
        const offres = [];
        querySnapshot.forEach((doc) => {
          offres.push({ id: doc.id, ...doc.data() });
        });
        setOffresEmploi(offres);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffresEmploi();
  }, []);

  

  return (
    <>
      <AdminHeader />
      <ContentContainer promos={promos} offresEmploi={offresEmploi} />
      
      <button className="chat-toggle-btn" onClick={toggleChat}>
      <img src={Chat} alt="Chat Icon" style={{ maxWidth: '30px', height: '30px' }} />
</button>
{showChat && <ChatAdmin userRole="admin" />}

    </>
  );
};


export default HomeAdmin;