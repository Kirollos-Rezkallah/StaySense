import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import styles from './AuthPage.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const minimumPasswordLength = 8;

function RegisterPage() {
  const { emailExists, isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const errors = useMemo(() => validateRegisterForm(formState, emailExists), [formState, emailExists]);
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
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    setFormError('');

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      register(formState);
      navigate('/dashboard', { replace: true });
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
          <span className={styles.eyebrow}>Start with a premium foundation</span>
          <h1>Create your account and make every hotel search more intentional.</h1>
          <p>
            Save your preferences once, keep strong candidates organized, and unlock planning tools
            that feel tailored to how you actually travel.
          </p>

          <div className={styles.list}>
            <div className={styles.listItem}>
              <strong>Preference-aware results</strong>
              Keep track of the stay style, pace, and room quality you actually prefer.
            </div>
            <div className={styles.listItem}>
              <strong>Smarter recommendation views</strong>
              Let your planning history shape a more useful shortlist.
            </div>
            <div className={styles.listItem}>
              <strong>Protected planning workspace</strong>
              Reviews, assistant sessions, and profile tools stay tied to your account.
            </div>
          </div>
        </Card>

        <Card className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formHeader}>
              <h2>Create account</h2>
              <p>Set up your StaySense profile and keep your planning progress in one place.</p>
            </div>

            <InputField
              id="register-name"
              label="Full name"
              name="fullName"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.fullName ? errors.fullName : ''}
              value={formState.fullName}
              autoComplete="name"
              description="Use the name you want attached to your reviews and profile."
            />
            <InputField
              id="register-email"
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email ? errors.email : ''}
              type="email"
              value={formState.email}
              autoComplete="email"
              description="This email will be used each time you sign in on this device."
            />
            <InputField
              id="register-password"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password ? errors.password : ''}
              type={showPassword ? 'text' : 'password'}
              value={formState.password}
              autoComplete="new-password"
              description={`Use at least ${minimumPasswordLength} characters.`}
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
            <InputField
              id="register-confirm-password"
              label="Confirm password"
              name="confirmPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.confirmPassword ? errors.confirmPassword : ''}
              type={showConfirmPassword ? 'text' : 'password'}
              value={formState.confirmPassword}
              autoComplete="new-password"
              description="Re-enter your password so we know it was typed the way you intended."
              rightElement={
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              }
            />

            {formError ? <p className={styles.formError}>{formError}</p> : null}

            <div className={styles.submitRow}>
              <Button fullWidth type="submit" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Launch StaySense'}
              </Button>
              <p className={styles.note}>
                Your account stays local to this device while you explore and plan.
              </p>
            </div>

            <p className={styles.redirect}>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

function validateRegisterForm(formState, emailExists) {
  const nextErrors = {};
  const trimmedName = formState.fullName.trim();
  const trimmedEmail = formState.email.trim();

  if (!trimmedName) {
    nextErrors.fullName = 'Enter your full name.';
  }

  if (!trimmedEmail) {
    nextErrors.email = 'Enter your email.';
  } else if (!emailPattern.test(trimmedEmail)) {
    nextErrors.email = 'Use a valid email address.';
  } else if (emailExists(trimmedEmail)) {
    nextErrors.email = 'This email is already in use.';
  }

  if (!formState.password) {
    nextErrors.password = 'Create a password.';
  } else if (formState.password.length < minimumPasswordLength) {
    nextErrors.password = `Use at least ${minimumPasswordLength} characters.`;
  }

  if (!formState.confirmPassword) {
    nextErrors.confirmPassword = 'Confirm your password.';
  } else if (formState.confirmPassword !== formState.password) {
    nextErrors.confirmPassword = 'Passwords do not match yet.';
  }

  return nextErrors;
}

export default RegisterPage;
