import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import styles from './AuthPage.module.css';

function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({
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
    login(formState);
    navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
  };

  return (
    <div className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <Card className={styles.panel} elevated>
          <span className={styles.eyebrow}>Welcome back</span>
          <h1>Pick up your next stay plan without losing momentum.</h1>
          <p>
            Reopen your saved hotels, recommendation sessions, and recent travel preferences in
            one clean workspace.
          </p>

          <div className={styles.list}>
            <div className={styles.listItem}>
              <strong>Saved shortlists</strong>
              Keep promising stays organized across cities and travel styles.
            </div>
            <div className={styles.listItem}>
              <strong>Recommendation flow</strong>
              Move from broad search to a confident decision with clearer context.
            </div>
            <div className={styles.listItem}>
              <strong>Profile-led signals</strong>
              Let the app remember your pace, priorities, and comfort preferences.
            </div>
          </div>
        </Card>

        <Card className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h2>Sign in</h2>
              <p>Use the sample credentials or enter any email to continue.</p>
            </div>

            <InputField
              id="login-email"
              label="Email"
              name="email"
              onChange={handleChange}
              type="email"
              value={formState.email}
            />
            <InputField
              id="login-password"
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.password}
            />

            <Button fullWidth type="submit">
              Continue to dashboard
            </Button>

            <p className={styles.redirect}>
              New to StaySense? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
