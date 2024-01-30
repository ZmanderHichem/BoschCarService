import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useAuth } from './AuthContext';

const IndexHome = () => {
  const { userEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        const isAdmin = user.email.endsWith('@bosch.com');
        if (isAdmin) {
          navigate('/HomeAdmin');
        } else {
          navigate('/HomeUser');
        }
      } else {
        // User is not logged in, redirect to home
        navigate('/Home');
        console.log('home');

      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // This component might not return anything specific since navigation is handled in the logic above
  return null;
};

export default IndexHome;
