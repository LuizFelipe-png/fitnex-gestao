import styles from "./mensagem.module.css";

export default function Mensagem({ tipo = "info", texto, children }) {
  const conteudo = texto || children;
  if (!conteudo) return null;

  return (
    <div className={`${styles.mensagem} ${styles[tipo] || styles.info}`}>
      {conteudo}
    </div>
  );
}