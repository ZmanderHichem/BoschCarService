import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };






  const [registrationInput, setRegistrationInput] = useState('');

  const handleRegistrationChange = (e) => {
    const value = e.target.value;
    // Vérifiez si la valeur entrée est un nombre
    if (!isNaN(value)) {
      setRegistrationInput(value);
    }
    // Vous pouvez également ajouter une logique de traitement ou un message d'erreur ici
  };

  const handleSignUp = async () => {
    try {
      console.log(email);
      const isAdmin = email.endsWith('@bosch.com');

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Extract additional user data
      const name = nameInput; 
      const registration = registrationInput;
const telephone = TelInput;
      // Create user data object
      const userData = {
        email: email,
        isAdmin: isAdmin,
        name: name,
        telephone: TelInput,
        registration: registrationType === 'RS' ? rsValue : `${tuValue1}TU${tuValue2}`,
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
      } else {
        console.error('Sign up error:', error.message);
      }
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;




