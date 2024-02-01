import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useParams, Link  } from 'react-router-dom';
import { getAuth , onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import Home from './components/pages/home/home';
import Login from './components/pages/login/login';
import LesRendezVous from './components/pages/EspaceAdmin/LesRendezVous/LesRendezVous';
import RendezVous from './components/pages/RendezVous/RendezVous';
import Promos from './components/pages/EspaceAdmin/Promos/Promos';
import AjouterService from './components/pages/EspaceAdmin/AjouterService/AjouterService';
import LesInterventions from './components/pages/EspaceAdmin/LesInterventions/LesInterventions';
import About from './components/pages/About/About';
import ContactUs from './components/pages/contactUs/contactUs';
import HomeUser from './components/pages/EspaceUser/HomeUser/HomeUser';
import HomeAdmin from './components/pages/EspaceAdmin/HomeAdmin/HomeAdmin';
import MesInterventions from './components/pages/EspaceUser/Intervention/MesInterventions';
import OffreEmploi from './components/pages/EspaceAdmin/Emploi/OffreEmploi';
import Register from './components/pages/pages/Register';
import AdminChat from './components/pages/EspaceAdmin/ChatAdmin/AdminChat';

import './App.css';
import IndexHome from './components/pages/IndexHome';




function App() {
  
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);


  const { userEmail } = useParams();
  console.log('User Email in EspaceUser:', userEmail);



  const auth = getAuth();

  const getUserRole = async (userId) => {
    const firestore = getFirestore();

    try {
      console.log('Fetching user document for user ID:', userId);
      const userDoc = await getDoc(doc(firestore, 'users', userId));

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
    <div className="app">
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<IndexHome />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/LesInterventions" element={<LesInterventions />} />
          <Route path="/RendezVous" element={<RendezVous />} />
          <Route path="/About" element={<About />} />
          <Route path="/LesRendezVous" element={<LesRendezVous />} />
          <Route path="/promos" element={<Promos />} />
          <Route path="/ajouterService" element={<AjouterService />} />
          <Route path="/HomeUser" element={<HomeUser />} />
          <Route path="/MesInterventions/:userEmail" element={<MesInterventions />} />
          <Route path="/HomeAdmin" element={<HomeAdmin/>} />
          <Route path="/OffreEmploi" element={<OffreEmploi/>} />
          <Route path="/AdminChat" element={<AdminChat/>} />

          


          

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
