import styles from './FieldError.module.css';

export const FieldError = (props: { children?: string | null }) => {
  return <>{props.children && <p className={styles.error}>{props.children}</p>}</>;
};
