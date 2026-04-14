import { Link } from 'react-router-dom';
import styles from './Button.module.css';

function Button({
  children,
  className = '',
  fullWidth = false,
  size = 'md',
  to,
  variant = 'primary',
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
