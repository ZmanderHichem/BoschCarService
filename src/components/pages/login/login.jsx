import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged  } from 'firebase/auth';
import './Login.css';
import HomeAdmin from '../EspaceAdmin/HomeAdmin/HomeAdmin';
import logo from '../../../assets/images/bosch.jpg';
import facebook from '../../../assets/images/facebook.jpg';
import twitter from '../../../assets/images/twitter.jpg';
import youtube from '../../../assets/images/youtube.jpg';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const auth = getAuth();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // Obtenez l'ID de l'utilisateur après la connexion réussie
      const userId = user.uid;

      // Obtenez le rôle de l'utilisateur à partir de Firestore
      const userRole = await getUserRole(userId);

      // Mettez à jour l'état de l'utilisateur et redirigez en fonction du rôle
      setUser(user);

      if (userRole === 'admin') {
        setRedirectTo('/HomeAdmin'); // Redirigez vers la page d'administration si l'utilisateur est un administrateur
      } else if (userRole === 'client') {
        setRedirectTo('/HomeUser'); // Redirigez vers la page d'accueil utilisateur si l'utilisateur est un client
      } else {
        console.error('Rôle utilisateur non géré :', userRole);
      }
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Erreur de déconnexion :', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // Obtenez l'ID de l'utilisateur après la création du compte
      const userId = user.uid;

      // Vérifiez si l'utilisateur est un admin (par exemple, si l'e-mail se termine par @bosch.com)
      const isAdmin = email.endsWith('@bosch.com');

      // Créez un objet avec les données à ajouter à Firestore
      const userData = {
        email: user.email,
        isAdmin: isAdmin,
      };

      // Ajoutez l'utilisateur à la collection appropriée dans Firestore
      if (isAdmin) {
        // Ajoutez à la collection 'admins'
        await setDoc(doc(getFirestore(), 'admins', userId), userData);
      } else {
        // Ajoutez à la collection 'users'
        await setDoc(doc(getFirestore(), 'users', userId), userData);
      }

      // Mettez à jour l'état de l'utilisateur
      setUser(user);
    } catch (error) {
      console.error('Erreur d\'inscription :', error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Un e-mail de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.");
      // Redirigez l'utilisateur vers la page de réinitialisation de mot de passe
      setRedirectTo('/reset-password');
    } catch (error) {
      console.error('Erreur d\'envoi de l\'e-mail de réinitialisation :', error.message);
      alert("Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation du mot de passe.");
    }
  };

  const getUserRole = async (userId) => {
    const db = getFirestore();

    try {
      console.log('Fetching user document for user ID:', userId);
      const userDoc = await getDoc(doc(db, 'admins', userId)); // Changement ici pour rechercher dans la collection 'admins'
    
      if (userDoc.exists()) {
        console.log('User document found:', userDoc.data());

        const userData = userDoc.data();
        const userRole = userData.isAdmin ? 'admin' : 'client';
        console.log('User role:', userRole);

        return userRole;
      } else {
        console.error('User document not found in Firestore for user ID:', userId);
        return null;
      }
    } catch (error) {
      console.error('Error getting user role:', error.message);
      return null;
    }
  try {
    console.log('Fetching user document for user ID:', userId);
    const userDoc = await getDoc(doc(db, 'users', userId));

    if (userDoc.exists()) {
      console.log('User document found:', userDoc.data());

      const userData = userDoc.data();
      const userRole = userData.isAdmin ? 'admin' : 'client';
      console.log('User role:', userRole);

      return userRole;
    } else {
      console.error('User document not found in Firestore for user ID:', userId);
      return null;
    }
  } catch (error) {
    console.error('Error getting user role:', error.message);
    return null;
  }
};

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);

    // Si l'utilisateur est connecté, obtenez son rôle
    if (user) {
      const userId = user.uid;
      getUserRole(userId).then((role) => {
        setUserRole(role);
      });
    } else {
      // Si l'utilisateur est déconnecté, réinitialisez le rôle
      setUserRole(null);
    }
  });

  return () => unsubscribe();
}, [auth]);


  return (
    <div>
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
                <Link className="nav-link" to="/nous-contacter">
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

      {user ? (
        <div>
          <p>Bienvenue, {user.email}!</p>
          <button onClick={handleSignOut}>Se déconnecter</button>
          {/* Conditionnellement rediriger l'utilisateur */}
          {redirectTo && <Navigate to={redirectTo} />}
        </div>
      ) : (
        <div id="loginForm">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button onClick={handleSignIn}>Se connecter</button>
          <button onClick={handleResetPassword}>Mot de passe oublié ?</button>

          <h5>Nouveau Client</h5>
          <button onClick={handleSignUp}>S'inscrire</button>
        </div>
      )}
    </div>
  );
};

export default Login;