import { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import styles from './AuthPage.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const errors = useMemo(() => validateLoginForm(formState), [formState]);
  const isFormValid = Object.keys(errors).length === 0;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setFormError('');
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });
    setFormError('');

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      login(formState);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <Card className={styles.panel} elevated>
          <span className={styles.eyebrow}>Welcome back</span>
          <h1>Pick up your next stay plan without losing momentum.</h1>
          <p>
            Reopen your saved hotels, recommendation sessions, and recent travel preferences in
            one calm workspace.
          </p>

          <div className={styles.list}>
            <div className={styles.listItem}>
              <strong>Saved shortlists</strong>
              Revisit promising stays across cities and travel styles without starting over.
            </div>
            <div className={styles.listItem}>
              <strong>Assistant-led planning</strong>
              Continue from your latest preference brief and keep the shortlist moving.
            </div>
            <div className={styles.listItem}>
              <strong>Profile-linked reviews</strong>
              Keep your stay notes and planning history tied to one account.
            </div>
          </div>
        </Card>

        <Card className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formHeader}>
              <h2>Sign in</h2>
              <p>Use the email and password you already saved on this device.</p>
            </div>

            <InputField
              id="login-email"
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email ? errors.email : ''}
              type="email"
              value={formState.email}
              autoComplete="email"
              description="Use the same address you registered with."
            />
            <InputField
              id="login-password"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password ? errors.password : ''}
              type={showPassword ? 'text' : 'password'}
              value={formState.password}
              autoComplete="current-password"
              description="Passwords stay on this device for your local StaySense account."
              rightElement={
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />

            {formError ? <p className={styles.formError}>{formError}</p> : null}

            <div className={styles.submitRow}>
              <Button fullWidth type="submit" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Continue to dashboard'}
              </Button>
              <p className={styles.note}>
                If you have not created an account yet, you can set one up in a moment.
              </p>
            </div>

            <p className={styles.redirect}>
              New to StaySense? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

function validateLoginForm(formState) {
  const nextErrors = {};

  if (!formState.email.trim()) {
    nextErrors.email = 'Enter your email.';
  } else if (!emailPattern.test(formState.email.trim())) {
    nextErrors.email = 'Use a valid email address.';
  }

  if (!formState.password) {
    nextErrors.password = 'Enter your password.';
  }

  return nextErrors;
}

export default LoginPage;
