// ResetPassword.jsx
import React, { useState } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Ajoutez ici la logique pour réinitialiser le mot de passe
    // Assurez-vous de vérifier que les deux champs sont conformes
  };

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      <label>Nouveau mot de passe:</label>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

      <label>Confirmer le mot de passe:</label>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <button onClick={handleResetPassword}>Réinitialiser le mot de passe</button>
    </div>
  );
};

export default ResetPassword;
