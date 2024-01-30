import React, { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { firestore } from '../../../firebase/configFirebase';
import Modal from 'react-modal';
import './Login.css';
import Header from '../Headers/Header';

import { useAuth } from '../AuthContext'; // Adjust the path accordingly




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); // Set the root element for accessibility



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { updateUserEmail } = useAuth();
  const auth = getAuth();
  const [nameInput, setNameInput] = useState('');
  const [registrationInput, setRegistrationInput] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false); // State for managing modal visibility

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      const userId = user.uid;
      const userRole = await getUserRole(userId);

      updateUserEmail(user.email);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      console.log (email);
      const isAdmin = email.endsWith('@bosch.com'); // Define isAdmin before using it

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
      // Extract additional user data
      const name = nameInput; // Replace with the actual user's name from the form
      const registration = registrationInput;

      // Create user data object
      const userData = {
        email:email,
        isAdmin: isAdmin,
          name: name,
        registration: registration,
        // Add any other fields you want to store
      };
  
     
     
  

    // Store user data in Firestore
    const userId = user.uid;
    if (isAdmin) {
      await setDoc(doc(getFirestore(), 'admins', userId), userData);
    } else {
      await setDoc(doc(getFirestore(), 'users', userId), userData);
    }

    // Set the user state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user);
      setUser(user);
    });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.error('Sign up error:', error);
      // Optionally, you can display a user-friendly message to the user.
    } else {
      console.error('Sign up error:', error.message);
    }
  }
};


  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email has been sent to your email address.");
      setRedirectTo('/reset-password');
    } catch (error) {
      console.error('Reset password email error:', error.message);
      alert("An error occurred while sending the password reset email.");
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
      {/* Your JSX for the header and navigation goes here */}

      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
          { <Navigate to="/" />}
        </div>
      ) : (



        <div>
                  <Header />

                  <div id="loginForm">
            <h2>Connectez-vous</h2>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleResetPassword}>Forgot Password?</button>

            <h5>New Customer</h5>
            <button onClick={openModal}>Sign Up</button>

            <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  style={customStyles}
  contentLabel="Sign Up Modal"
>
  <div>
    <h2>Sign Up</h2>
    <label>Name:</label>
<input type="text" placeholder="Your Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />

<label>Registration:</label>
<input type="text" placeholder="Your Registration" value={registrationInput} onChange={(e) => setRegistrationInput(e.target.value)} />



    <button onClick={handleSignUp}>Sign Up</button>
    <button onClick={closeModal}>Close</button>
  </div>
</Modal>
           
          </div>
        </div>
      )}
    </div>
    
  );
  
};

export default Login;
