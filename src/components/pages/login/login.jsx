import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate  } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { firestore } from '../../../firebase/configFirebase';
import Modal from 'react-modal';

import './Login.css';
import Header from '../Headers/Header';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { updateUserEmail } = useAuth();
  const auth = getAuth();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const userId = user.uid;
      const userRole = await getUserRole(userId);
      updateUserEmail(user.email);

      navigate("/");
    } catch (err) {
      console.error(err);
      setErr(true);
    }
  };

  const getUserRole = async (userId) => {
    const db = getFirestore();

    try {
      console.log('Fetching user document for user ID:', userId);
      const userDocAdmin = await getDoc(doc(db, 'admins', userId));

      if (userDocAdmin.exists()) {
        console.log('User document found in admins collection:', userDocAdmin.data());
        return 'admin';
      }

      const userRef = doc(firestore, 'users', userId);

      try {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userEmail = userData.email;

          // Utilisez userEmail comme nécessaire...

          return userEmail;
        } else {
          console.error('User document not found in Firestore for user ID:', userId);
          return null;
        }
      } catch (error) {
        console.error('Error getting user role:', error.message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user document in admins collection:', error.message);
      return null;
    }
  };


  const handleResetPassword = async () => {
    try {
      // Add your password reset logic here
    } catch (error) {
      console.error('Reset password error:', error.message);
    }
  };


  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        const userId = user.uid;
        getUserRole(userId).then((role) => {
          setUserRole(role);
        });
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div>
      <Header />

      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Connectez-vous</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign in</button>
            {err && <span>Something went wrong</span>}
            <button onClick={handleResetPassword}>Forgot Password?</button>

            <p>
              You don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
