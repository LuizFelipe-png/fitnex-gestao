import styles from "./Carregando.module.css";

export default function Carregando() {
  return (
    <div className={styles.box}>    
      <span className={styles.spinner} />
      <p>Carregando...</p>
    </div>
  );
}