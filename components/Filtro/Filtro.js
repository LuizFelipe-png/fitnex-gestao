import styles from "./filtro.module.css";

const DIAS = [
  { valor: "", label: "Todos os dias" },
  { valor: "seg", label: "Segunda" },
  { valor: "ter", label: "Terça" },
  { valor: "qua", label: "Quarta" },
  { valor: "qui", label: "Quinta" },
  { valor: "sex", label: "Sexta" },
  { valor: "sab", label: "Sábado" },
];

export default function Filtro({ dia, onMudarDia, busca, onMudarBusca }) {
  return (
    <div className={styles.filtroBox}>
      <input
        type="text"
        placeholder="Pesquisar turma..."
        value={busca}
        onChange={(e) => onMudarBusca(e.target.value)}
        className={styles.input}
      />

      <select
        value={dia}
        onChange={(e) => onMudarDia(e.target.value)}
        className={styles.select}
      >
        {DIAS.map((d) => (
          <option key={d.valor} value={d.valor}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
}