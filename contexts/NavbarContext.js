// contexts/NavbarContext.js

import React, { createContext, useContext, useState } from 'react';

const NavbarContext = createContext(null);

export const useNavbar = () => useContext(NavbarContext);


export const NavbarProvider = ({ children }) => {
  const [navbarData, setNavbarData] = useState({});

  return (
    <NavbarContext.Provider value={{ navbarData, setNavbarData }}>
      {children}
    </NavbarContext.Provider>
  );
};