// LesInterventions.jsx

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../../firebase/configFirebase';
import AdminHeader from '../../Headers/AdminHeader/AdminHeader';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Promos from '../Promos/Promos';



const LesInterventions = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedService, setSelectedService] = useState(null);
  
    useEffect(() => {
      const fetchServices = async () => {
        const servicesCollection = collection(firestore, 'services');
        const servicesSnapshot = await getDocs(servicesCollection);
        const servicesData = servicesSnapshot.docs.map(doc => doc.data());
        setServices(servicesData);
      };
  
      fetchServices();
    }, []);
  
    useEffect(() => {
      const filtered = services.filter(service =>
        service.nomProprietaire.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }, [services, searchTerm]);
  
    const handleServiceClick = (service) => {
      setSelectedService(service);
    };
  
    const handleSearchTermChange = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      setSelectedService(null); // Réinitialiser les détails lorsqu'une nouvelle recherche est effectuée
    };
  
    return (
      <div>
               <AdminHeader />



        <h2>Les Interventions</h2>
  
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher par nom du propriétaire"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
  
        {/* Liste des noms filtrés */}
        <div>
          {searchTerm && filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div key={index} onClick={() => handleServiceClick(service)}>
                <p>Nom du propriétaire: {service.nomProprietaire}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
        </div>
  
        {/* Afficher les détails du service sélectionné */}
        {selectedService && (
          <div>
            <h3>Détails du service</h3>
            <p>Immatriculation: {selectedService.immatriculation}</p>
            <p>Numéro de châssis: {selectedService.numChassis}</p>
            <p>E-mail du client: {selectedService.email}</p>
            <p>Service: {selectedService.serviceRealise}</p>
            <p>Date du Service: {selectedService.dateRealisation}</p>


            {/* ... Autres détails */}
          </div>
        )}
      </div>
    );
  };
  
  export default LesInterventions;