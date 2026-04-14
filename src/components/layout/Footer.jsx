import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.title}>StaySense</p>
          <p className={styles.copy}>
            Thoughtful hotel discovery for calmer, more confident trip planning.
          </p>
        </div>

        <div className={styles.links}>
          <Link to="/explore">Explore Hotels</Link>
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/assistant">Travel Assistant</Link>
        </div>

        <p className={styles.legal}>&copy; {year} StaySense. Designed for better stays.</p>
      </div>
    </footer>
  );
}

export default Footer;
