import { NavLink } from 'react-router-dom';
import styles from './MainNavigation.module.css';

export const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)} end>
        <h2>Form Constructor</h2>
      </NavLink>
    </header>
  );
};
