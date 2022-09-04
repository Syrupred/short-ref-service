import React, { useMemo, useState } from 'react';

import { AuthContext } from '../contexts/index.jsx';

function AuthProvider({ children }) {
  const availabilityUser = JSON.parse(localStorage.getItem('accessToken'));
  const [user, setUser] = useState(availabilityUser);
  const logIn = (data) => {
    localStorage.setItem('accessToken', JSON.stringify(data));
    setUser(data);
  };
  const logOut = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };
  const context = useMemo(() => ({
    user, logIn, logOut,
  }), [user]);
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
