import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import styles from './MainLayout.module.css';

function MainLayout() {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
