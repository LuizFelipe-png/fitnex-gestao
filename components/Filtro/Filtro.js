import styles from "./Filtro.module.css";

export default function Filtro({
  modalidades = [],
  modalidadeId,
  setModalidadeId,
  busca,
  setBusca,
  dia,
  setDia,
}) {
  return (
    <div className={styles.filtroBox}>
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Pesquisar turma ou professor..."
        className={styles.input}
      />

      <select
        value={modalidadeId}
        onChange={(e) => setModalidadeId(Number(e.target.value))}
        className={styles.select}
      >
        <option value={0}>Todas as modalidades</option>
        {modalidades.map((mod) => (
          <option key={mod.id} value={mod.id}>
            {mod.nome}
          </option>
        ))}
      </select>

      <select
        value={dia}
        onChange={(e) => setDia(e.target.value)}
        className={styles.select}
      >
        <option value="">Todos os dias</option>
        <option value="seg">Segunda</option>
        <option value="ter">Terça</option>
        <option value="qua">Quarta</option>
        <option value="qui">Quinta</option>
        <option value="sex">Sexta</option>
        <option value="sab">Sábado</option>
      </select>
    </div>
  );
}