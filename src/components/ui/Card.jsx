import styles from './Card.module.css';

function Card({ children, className = '', elevated = false }) {
  const classes = [styles.card, elevated ? styles.elevated : '', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}

export default Card;
