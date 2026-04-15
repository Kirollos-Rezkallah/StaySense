import { useEffect, useRef, useState } from 'react';
import { HiBars3, HiOutlineSparkles, HiXMark } from 'react-icons/hi2';
import { LuCompass, LuLogOut, LuSquarePen, LuUser } from 'react-icons/lu';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const navLinks = isAuthenticated
    ? [
        { label: 'Explore', to: '/explore' },
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'AI Assistant', to: '/assistant', icon: HiOutlineSparkles, assistant: true },
        { label: 'Recommendations', to: '/recommendations' },
        { label: 'Profile', to: '/profile' },
      ]
    : [
        { label: 'Explore', to: '/explore' },
        { label: 'AI Assistant', to: '/assistant', icon: HiOutlineSparkles, assistant: true },
        { label: 'Login', to: '/login' },
        { label: 'Register', to: '/register' },
      ];

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate('/');
  };

  const profileMenuItems = [
    { label: 'Profile', to: '/profile', icon: LuUser },
    { label: 'Recommendations', to: '/recommendations', icon: LuCompass },
    { label: 'Write a review', to: '/reviews/new', icon: LuSquarePen },
  ];
  const mobileQuickLinks = profileMenuItems.filter((item) => item.to === '/reviews/new');

  const userInitials = currentUser?.name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navbar}`}>
        <Link to="/" className={styles.brand}>
          <img
            className={styles.brandLogo}
            src="/staysense-logo.png"
            alt="StaySense"
          />
          <span>
            StaySense
            <small>Find the stay that fits</small>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navLink} ${item.assistant ? styles.assistantLink : ''} ${
                  isActive ? styles.active : ''
                }`
              }
            >
              {item.icon ? <item.icon /> : null}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <div className={styles.profileMenuWrap} ref={profileMenuRef}>
              <button
                type="button"
                className={styles.profileTrigger}
                aria-label="Open profile menu"
                aria-expanded={profileMenuOpen}
                onClick={() => {
                  setProfileMenuOpen((open) => !open);
                  setMenuOpen(false);
                }}
              >
                <span className={styles.profileAvatar}>{userInitials || 'SS'}</span>
                <span className={styles.profileText}>
                  <strong>{currentUser?.name}</strong>
                  <small>Account</small>
                </span>
              </button>

              {profileMenuOpen ? (
                <div className={styles.profileDropdown}>
                  {profileMenuItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={styles.dropdownLink}
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <item.icon />
                      {item.label}
                    </NavLink>
                  ))}
                  <button
                    type="button"
                    className={styles.dropdownButton}
                    onClick={handleLogout}
                  >
                    <LuLogOut />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Button to="/dashboard" size="sm">
              Get started
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
                  `${styles.mobileLink} ${item.assistant ? styles.mobileAssistant : ''} ${
                    isActive ? styles.mobileActive : ''
                  }`
                }
              >
                {item.icon ? <item.icon /> : null}
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                {mobileQuickLinks.map((item) => (
                  <NavLink key={item.to} to={item.to} className={styles.mobileLink}>
                    <item.icon />
                    {item.label}
                  </NavLink>
                ))}
                <Button variant="secondary" onClick={handleLogout} fullWidth>
                  Logout
                </Button>
              </>
            ) : (
              <Button to="/dashboard" fullWidth>
                Get started
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
