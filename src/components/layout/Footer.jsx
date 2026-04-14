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
            A calm, premium travel workspace for finding the right stay faster.
          </p>
        </div>

        <div className={styles.links}>
          <Link to="/explore">Explore Hotels</Link>
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/assistant">AI Assistant</Link>
        </div>

        <p className={styles.legal}>© {year} StaySense. Crafted for confident trip planning.</p>
      </div>
    </footer>
  );
}

export default Footer;
