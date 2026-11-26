import styles from "./filtro.module.css";

export default function Filtro({
  busca,
  setBusca,
  modalidade,
  setModalidade,
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
        value={modalidade}
        onChange={(e) => setModalidade(e.target.value)}
        className={styles.select}
      >
        <option value="">Todas as modalidades</option>
        <option value="Musculação">Musculação</option>
        <option value="Pilates">Pilates</option>
        <option value="Spinning">Spinning</option>
        <option value="Muay Thai">Muay Thai</option>
        <option value="Jiu-Jitsu">Jiu-Jitsu</option>
        <option value="Funcional">Funcional</option>
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