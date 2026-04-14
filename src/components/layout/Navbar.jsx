import { useEffect, useState } from 'react';
import { HiBars3, HiOutlineSparkles, HiXMark } from 'react-icons/hi2';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = isAuthenticated
    ? [
        { label: 'Explore', to: '/explore' },
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Recommendations', to: '/recommendations' },
        { label: 'Profile', to: '/profile' },
      ]
    : [
        { label: 'Explore', to: '/explore' },
        { label: 'Login', to: '/login' },
        { label: 'Register', to: '/register' },
      ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navbar}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>
            <HiOutlineSparkles />
          </span>
          <span>
            StaySense
            <small>Travel intelligence for better stays</small>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button to="/dashboard" size="sm">
              Open App
            </Button>
          )}
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <HiXMark /> : <HiBars3 />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobilePanel}>
          <div className={`container ${styles.mobileInner}`}>
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <Button variant="secondary" onClick={handleLogout} fullWidth>
                Logout
              </Button>
            ) : (
              <Button to="/dashboard" fullWidth>
                Open App
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
