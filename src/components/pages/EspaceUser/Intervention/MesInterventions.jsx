import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { BrowserRouter, Route, Routes, Navigate, useParams  } from 'react-router-dom';

import { firestore } from '../../../../firebase/configFirebase';
import UserHeader from '../../Headers/UserHeader/UserHeader';

const MesInterventions = () => {
  const userEmail = 'papmalik2016@gg.com';
  const [userInterventions, setUserInterventions] = useState([]);

  useEffect(() => {
    console.log('User Email in MesInterventions:', userEmail);

    const fetchUserInterventions = async () => {
      console.log('Fetching interventions for user with email:', userEmail);

      if (userEmail) {
        const interventionsCollection = collection(firestore, 'services');
        const interventionsQuery = query(interventionsCollection, where('email', '==', userEmail));

        console.log('Interventions Query:', interventionsQuery);

        try {
          const interventionsSnapshot = await getDocs(interventionsQuery);
          console.log('Interventions Snapshot:', interventionsSnapshot);

          const interventionsData = interventionsSnapshot.docs.map(doc => doc.data());
          console.log('Interventions Data:', interventionsData);

          setUserInterventions(interventionsData);
        } catch (error) {
          console.error('Error fetching interventions:', error);
        }
      }
    };

    fetchUserInterventions();
  }, [userEmail]);

  return (
    <div>
      <UserHeader />

      <h2>Mes Interventions</h2>

      {userInterventions.length > 0 ? (
        userInterventions.map((intervention, index) => (
          <div key={index}>
            <p>Service réalisé : {intervention.serviceRealise}</p>
            <p>Date du Service : {intervention.dateRealisation}</p>
            {/* ... Autres détails */}
            <hr />
          </div>
        ))
      ) : (
        <p>Aucune intervention trouvée pour cet utilisateur.</p>
      )}
    </div>
  );
};

export default MesInterventions;
