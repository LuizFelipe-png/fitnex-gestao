import styles from "./mensagem.module.css";

export default function Mensagem({ tipo = "info", texto }) {
  if (!texto) return null;

  return (
    <div className={`${styles.box} ${styles[tipo] || ""}`} role="alert">
      {texto}
    </div>
  );
}