import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../../firebase/configFirebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';
import './home.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged  } from 'firebase/auth';


import Header from '../Headers/Header';
import ContentContainer from '../ContentContainer/ContentContainer';
import Footer from '../Footer/Footer';

const auth = getAuth();



const Home = () => {

  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState(null);
const [redirectTo, setRedirectTo] = useState(null);
const [userRole, setUserRole] = useState(null);
const storage = getStorage();


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

  
  return (
    <>
      <Header />
      <ContentContainer promos={promos} offresEmploi={offresEmploi} />
      <Footer />

    </>
    
  );
};

export default Home;