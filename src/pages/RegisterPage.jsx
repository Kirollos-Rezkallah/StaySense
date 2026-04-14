import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import styles from './AuthPage.module.css';

function RegisterPage() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    fullName: 'Alex Traveler',
    email: 'alex.traveler@staysense.com',
    password: 'password123',
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(formState);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <Card className={styles.panel} elevated>
          <span className={styles.eyebrow}>Start with a premium foundation</span>
          <h1>Create your account and make every hotel search more intentional.</h1>
          <p>
            Save preferences once, keep strong candidates organized, and unlock recommendation
            tools designed for real travel planning.
          </p>

          <div className={styles.list}>
            <div className={styles.listItem}>
              <strong>Preference-aware results</strong>
              Keep track of the stay style, pace, and room quality you actually prefer.
            </div>
            <div className={styles.listItem}>
              <strong>Smarter recommendation views</strong>
              See better-fit stays based on your profile and recent browsing patterns.
            </div>
            <div className={styles.listItem}>
              <strong>Protected planning workspace</strong>
              Reviews, assistant sessions, and profile tools stay tied to your account.
            </div>
          </div>
        </Card>

        <Card className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h2>Create account</h2>
              <p>Set up your profile and open the private planning surfaces instantly.</p>
            </div>

            <InputField
              id="register-name"
              label="Full name"
              name="fullName"
              onChange={handleChange}
              value={formState.fullName}
            />
            <InputField
              id="register-email"
              label="Email"
              name="email"
              onChange={handleChange}
              type="email"
              value={formState.email}
            />
            <InputField
              id="register-password"
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.password}
            />

            <Button fullWidth type="submit">
              Launch StaySense
            </Button>

            <p className={styles.redirect}>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
