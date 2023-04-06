import styles from "./MainLayout.module.css";

export const MainLayout = (props: { children?: React.ReactNode }) => {
  return <div className={styles.mainLayout}>{props.children}</div>;
};
