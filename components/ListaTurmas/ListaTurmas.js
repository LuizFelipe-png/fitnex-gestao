import CardTurma from "@/components/CardTurma/CardTurma";
import styles from "./Listaturmas.module.css";

export default function ListaTurmas({ turmas }) {
  if (turmas.length === 0) {
    return (
      <p className={styles.vazio}>
        Nenhuma turma encontrada com os filtros selecionados.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {turmas.map((turma) => (
        <CardTurma key={turma.id} turma={turma} />
      ))}
    </div>
  );
}