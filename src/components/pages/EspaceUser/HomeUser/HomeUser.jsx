import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {  onSnapshot, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../../firebase/configFirebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import ContentContainer from '../../ContentContainer/ContentContainer';
import UserHeader from '../../Headers/UserHeader/UserHeader';


import 'bootstrap/dist/css/bootstrap.min.css';
import ChatAdmin from '../../EspaceAdmin/HomeAdmin/ChatAdmin'; // Importez le composant Chat
import ChatLogo from '../../../../assets/images/chat.png';




const storage = getStorage();
const auth = getAuth();



const Fok = () => {
  const [promos, setPromos] = useState([]);
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState(null);
const [redirectTo, setRedirectTo] = useState(null);
const [userRole, setUserRole] = useState(null);
const storage = getStorage();

const [showChat, setShowChat] = useState(false);

const toggleChat = () => {
  setShowChat(!showChat);
};


const userEmail = email;

  useEffect(() => {
    const fetchPromos = async () => {
      const promosCollection = collection(firestore, 'promos');
      const promosSnapshot = await getDocs(promosCollection);
      const promosData = promosSnapshot.docs.map((doc) => doc.data());
      setPromos(promosData);
    };

    fetchPromos();
  }, []);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Erreur de déconnexion :', error.message);
    }
  };


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


  const messagesCollectionRef = collection(firestore, 'messages');

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollectionRef = collection(firestore, 'messages');
        const messagesSnapshot = await getDocs(messagesCollectionRef);
        const messagesData = messagesSnapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);



  useEffect(() => {
    const messagesCollectionRef = collection(firestore, 'messages');
    const unsubscribe = onSnapshot(messagesCollectionRef, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => doc.data());
      setMessages(messagesData);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <>
      <UserHeader />
      <ContentContainer promos={promos} offresEmploi={offresEmploi} />
      <button className="chat-toggle-btn" onClick={toggleChat}>
  <img src={ChatLogo} alt="Chat Icon" style={{ maxWidth: '30px', height: '30px' }} />
</button>
{showChat && <ChatAdmin userRole="user" />}
       </>
  );
};
export default Fok;