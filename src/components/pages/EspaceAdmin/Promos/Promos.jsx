

import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore, storage } from '../../../../firebase/configFirebase';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Header from '../../../Header';

const Promos = () => {
  const [promoImage, setPromoImage] = useState(null);
  const [promos, setPromos] = useState([]);
  const [uploadedPromo, setUploadedPromo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPromoImage(file);
  };

  const handleUpload = async () => {
    if (promoImage) {
      const storageRef = ref(storage, `promos/${promoImage.name}`);
      await uploadBytes(storageRef, promoImage);

      const downloadURL = await getDownloadURL(storageRef);

      const promosCollection = collection(firestore, 'promos');
      const newDocRef = await addDoc(promosCollection, { imageURL: downloadURL, description: 'Nouvelle promo' });

      setUploadedPromo({ id: newDocRef.id, imageURL: downloadURL });

      setPromoImage(null);
    }
  };

  const handleDelete = async (imageUrl, promoId) => {
    // Supprimer l'image du stockage Firebase
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);

    // Supprimer l'entrée dans la collection Firestore
    const promosCollection = collection(firestore, 'promos');
    await deleteDoc(doc(promosCollection, promoId));
  };

  useEffect(() => {
    const fetchPromos = async () => {
      const promosCollection = collection(firestore, 'promos');
      const promosSnapshot = await getDocs(promosCollection);
      const promosData = promosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPromos(promosData);
    };

    fetchPromos();

    // Mettre à jour la liste des promotions après le téléchargement
    if (uploadedPromo) {
      setPromos((prevPromos) => [...prevPromos, uploadedPromo]);
    }
  }, [uploadedPromo]);

  return (
    <div>
            <Header />


      <div>
        <h2>Gérer les promotions</h2>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload}>Télécharger</button>

        {promoImage && <img src={URL.createObjectURL(promoImage)} alt="Promo" />}

        <div>
          {promos.map((promo) => (
            <div key={promo.id}>
            <img src={promo.imageURL} alt={`Promo ${promo.id}`} style={{ width: '50%' }} />
              <button onClick={() => handleDelete(promo.imageURL, promo.id)}>Supprimer</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promos;