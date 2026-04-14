import { createContext, useEffect, useState } from 'react';

const AUTH_STORAGE_KEY = 'staysense.auth';
const USERS_STORAGE_KEY = 'staysense.users';

const defaultSeedUser = {
  id: 'usr-alex-traveler-staysense-com',
  name: 'Alex Traveler',
  email: 'alex.traveler@staysense.com',
  password: 'password123',
  membership: 'StaySense Plus',
  homeAirport: 'LED',
  preferredStayStyle: 'Boutique comfort',
  favoriteCity: 'Lisbon',
};

export const AuthContext = createContext(null);

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function getStableUserId(email) {
  return `usr-${normalizeEmail(email).replace(/[^a-z0-9]+/g, '-')}`;
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;
  return safeUser;
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

function getStoredUsers() {
  if (typeof window === 'undefined') {
    return [defaultSeedUser];
  }

  try {
    const savedUsers = window.localStorage.getItem(USERS_STORAGE_KEY);
    const parsedUsers = savedUsers ? JSON.parse(savedUsers) : null;

    if (!Array.isArray(parsedUsers) || !parsedUsers.length) {
      return [defaultSeedUser];
    }

    return parsedUsers;
  } catch {
    return [defaultSeedUser];
  }
}

function createProfileForUser({ email, fullName, membership, preferredStayStyle, favoriteCity }) {
  return {
    id: getStableUserId(email),
    name: fullName,
    email: normalizeEmail(email),
    membership,
    homeAirport: 'LED',
    preferredStayStyle,
    favoriteCity,
  };
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(getStoredUsers);
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

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

  const login = ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const existingUser = users.find((user) => user.email === normalizedEmail);

    if (!existingUser || existingUser.password !== password) {
      throw new Error('We could not match that email and password.');
    }

    const safeUser = sanitizeUser(existingUser);
    setCurrentUser(safeUser);
    return safeUser;
  };

  const register = ({ fullName, email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const existingUser = users.find((user) => user.email === normalizedEmail);

    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }

    const nextUser = {
      ...createProfileForUser({
        email: normalizedEmail,
        fullName: fullName.trim(),
        membership: 'StaySense Access',
        preferredStayStyle: 'Design-led stays',
        favoriteCity: 'Copenhagen',
      }),
      password,
    };

    setUsers((currentUsers) => [...currentUsers, nextUser]);

    const safeUser = sanitizeUser(nextUser);
    setCurrentUser(safeUser);
    return safeUser;
  };

  const emailExists = (email) => {
    const normalizedEmail = normalizeEmail(email);
    return users.some((user) => user.email === normalizedEmail);
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        emailExists,
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
