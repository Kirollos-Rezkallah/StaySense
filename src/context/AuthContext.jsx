import { createContext, useEffect, useState } from 'react';

const AUTH_STORAGE_KEY = 'staysense.auth';

export const AuthContext = createContext(null);

function getStableUserId(email) {
  return `usr-${email.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function getStoredUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const savedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (currentUser) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [currentUser]);

  const login = ({ email }) => {
    const username = email.split('@')[0].replace(/[._-]/g, ' ');
    const user = {
      id: getStableUserId(email),
      name: username.replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Traveler',
      email,
      membership: 'StaySense Plus',
      homeAirport: 'SVO',
      preferredStayStyle: 'Boutique comfort',
      favoriteCity: 'Lisbon',
    };

    setCurrentUser(user);
    return user;
  };

  const register = ({ fullName, email }) => {
    const user = {
      id: getStableUserId(email),
      name: fullName,
      email,
      membership: 'StaySense Access',
      homeAirport: 'SVO',
      preferredStayStyle: 'Design-led stays',
      favoriteCity: 'Copenhagen',
    };

    setCurrentUser(user);
    return user;
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
