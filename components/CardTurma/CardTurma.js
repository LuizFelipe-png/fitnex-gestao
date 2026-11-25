import Link from "next/link";
import styles from "./cardturma.module.css";

export default function CardTurma({ turma }) {
  const ultimasVagas = turma.vagas <= 3;

  return (
    <Link href={`/turmas/${turma.id}`} className={styles.card}>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>{turma.nome}</h2>
        {ultimasVagas && (
          <span className={styles.badgeAlerta}>Últimas vagas</span>
        )}
      </div>

      <div className={styles.info}>
        <p><strong>Dias:</strong> {turma.dias_semana}</p>
        <p><strong>Horário:</strong> {turma.horario}</p>
        <p><strong>Vagas:</strong> {turma.vagas}</p>
      </div>

      <span className={styles.verMais}>Ver detalhes →</span>
    </Link>
  );
}