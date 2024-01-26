import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../../firebase/configFirebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';
import './home.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged  } from 'firebase/auth';


import logo from '../../../assets/images/bosch.jpg';
import facebook from '../../../assets/images/facebook.jpg';
import twitter from '../../../assets/images/twitter.jpg';
import youtube from '../../../assets/images/youtube.jpg';
import handleSignOut from '../login/login';



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

  return (
    <Container>
        <div className="header">
   <div className="logo-container">
  <Link to="/">
    <img id="small-logo" src={logo} alt="Petit Logo" />
  </Link>
</div>
      <div className="social-media-container">
        <a href="#" className="social-media-link"><img src={facebook} alt="Facebook" /></a>
        <a href="#" className="social-media-link"><img src={twitter} alt="Twitter" /></a>
        <a href="#" className="social-media-link"><img src={youtube} alt="YouTube" /></a>
      </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/RendezVous">
                  Rendez-vous
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/About">
                  À propos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactUs">
                  Nous contacter
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Se connecter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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

      <button onClick={handleSignOut}>Se déconnecter</button>
      </Container>  
      );
};

export default Home;