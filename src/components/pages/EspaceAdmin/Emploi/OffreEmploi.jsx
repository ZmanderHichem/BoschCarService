// Assurez-vous que vous avez importé ces modules de Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { storage, firestore } from '../../../../firebase/configFirebase'; // Assurez-vous d'avoir correctement importé storage depuis votre fichier de configuration Firebase
import './OffreEmploi.css';
import AdminHeader from '../../Headers/AdminHeader/AdminHeader';

const OffreEmploi = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [offresEmploi, setOffresEmploi] = useState([]); // Ajoutez cette ligne pour déclarer offresEmploi et setOffresEmploi
  
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
    }, []); // Assurez-vous d'avoir cette ligne dans votre useEffect
  
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleAddOffreEmploi = async () => {
      try {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
  
        // Get the download URL of the image
        const imageUrl = await getDownloadURL(storageRef);
  
        // Add the offer to Firestore with the image URL, title, and description
        const offreRef = await addDoc(collection(firestore, 'offresEmploi'), {
          title,
          description,
          imageUrl,
        });
  
        console.log('Offer added with ID:', offreRef.id);
  
        // Reset the states after adding
        setTitle('');
        setDescription('');
        setImage(null);
  
        // Fetch updated offers
        const querySnapshot = await getDocs(collection(firestore, 'offresEmploi'));
        const offres = [];
        querySnapshot.forEach((doc) => {
          offres.push({ id: doc.id, ...doc.data() });
        });
        setOffresEmploi(offres);
      } catch (error) {
        console.error('Error adding offer:', error);
      }
    };
  
    const handleUpdateOffer = async (id, updatedData) => {
      try {
        const offerRef = doc(firestore, 'offresEmploi', id);
        await updateDoc(offerRef, updatedData);
  
        // Fetch updated offers
        const querySnapshot = await getDocs(collection(firestore, 'offresEmploi'));
        const offres = [];
        querySnapshot.forEach((doc) => {
          offres.push({ id: doc.id, ...doc.data() });
        });
        setOffresEmploi(offres);
      } catch (error) {
        console.error('Error updating offer:', error);
      }
    };
  
    return (
    <div className="container">
             <AdminHeader />
      <h2>Liste des offres d'emploi :</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
  {offresEmploi.map((offre) => (
    <li key={offre.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ marginRight: '20px' }}>
        <strong>Titre:</strong>
        <input
          type="text"
          value={offre.title}
          onChange={(e) => handleUpdateOffer(offre.id, { title: e.target.value })}
        />
      </div>
      <div style={{ marginRight: '20px' }}>
        <strong>Description:</strong>
        <textarea
          value={offre.description}
          onChange={(e) => handleUpdateOffer(offre.id, { description: e.target.value })}
        />
      </div>
      <div>
        <strong>Image:</strong> <img src={offre.imageUrl} alt={`Image for ${offre.title}`} style={{ maxWidth: '100px' }} />
      </div>
    </li>
  ))}
</ul>

      <h2>Ajouter une nouvelle offre d'emploi :</h2>
      <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleAddOffreEmploi}>Ajouter</button>
    </div>
  );
};
  export default OffreEmploi;