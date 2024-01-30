import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  const updateUserEmail = (email) => {
    setUserEmail(email);
  };

  return (
    <AuthContext.Provider value={{ userEmail, updateUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
