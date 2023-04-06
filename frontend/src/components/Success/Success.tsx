import styles from './Success.module.css';

export const Success = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formDescription}>
          <p>Formulario Preechido com Sucesso!</p>
        </div>
      </div>
    </div>
  );
};
