"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./formturma.module.css";

const MODALIDADES = [
  { id: 1, nome: "Musculação" },
  { id: 2, nome: "Pilates" },
  { id: 3, nome: "Spinning" },
  { id: 4, nome: "Muay Thai" },
  { id: 5, nome: "Jiu-Jitsu" },
  { id: 6, nome: "Funcional" },
];

export default function FormTurma({ turmaInicial = null, aoSalvar, linkCancelar = "/" }) {
  const [nome, setNome] = useState(turmaInicial?.nome || "");
  const [modalidade, setModalidade] = useState(turmaInicial?.modalidade || "Musculação");
  const [professor, setProfessor] = useState(turmaInicial?.professor || "");
  const [diasSemana, setDiasSemana] = useState(turmaInicial?.dias_semana || "");
  const [horario, setHorario] = useState(turmaInicial?.horario || "");
  const [vagas, setVagas] = useState(turmaInicial?.vagas ? String(turmaInicial.vagas) : "");
  const [nivel, setNivel] = useState(turmaInicial?.nivel || "iniciante");

  function handleSubmit(event) {
    event.preventDefault();

    const modEncontrada = MODALIDADES.find((m) => m.nome === modalidade);

    aoSalvar({
      nome,
      modalidade,
      modalidade_id: modEncontrada ? modEncontrada.id : 1,
      professor,
      dias_semana: diasSemana,
      horario,
      vagas: Number(vagas) || 0,
      nivel,
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.campo}>
        <label htmlFor="nome" className={styles.label}>
          Nome da turma
        </label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Pilates manhã"
          className={styles.input}
        />
      </div>

      <div className={styles.linhaDupla}>
        <div className={styles.campo}>
          <label htmlFor="modalidade" className={styles.label}>
            Modalidade
          </label>
          <select
            id="modalidade"
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value)}
            className={styles.select}
          >
            {MODALIDADES.map((mod) => (
              <option key={mod.id} value={mod.nome}>
                {mod.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.campo}>
          <label htmlFor="nivel" className={styles.label}>
            Nível
          </label>
          <select
            id="nivel"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className={styles.select}
          >
            <option value="iniciante">Iniciante</option>
            <option value="intermediário">Intermediário</option>
            <option value="avançado">Avançado</option>
          </select>
        </div>
      </div>

      <div className={styles.campo}>
        <label htmlFor="professor" className={styles.label}>
          Professor(a)
        </label>
        <input
          id="professor"
          type="text"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
          placeholder="Ex: Carla"
          className={styles.input}
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="dias_semana" className={styles.label}>
          Dias da semana
        </label>
        <input
          id="dias_semana"
          type="text"
          value={diasSemana}
          onChange={(e) => setDiasSemana(e.target.value)}
          placeholder="Ex: seg,qua,sex"
          className={styles.input}
        />
      </div>

      <div className={styles.linhaDupla}>
        <div className={styles.campo}>
          <label htmlFor="horario" className={styles.label}>
            Horário
          </label>
          <input
            id="horario"
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="vagas" className={styles.label}>
            Vagas
          </label>
          <input
            id="vagas"
            type="number"
            value={vagas}
            onChange={(e) => setVagas(e.target.value)}
            placeholder="Ex: 15"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.acoes}>
        <Link href={linkCancelar} className={styles.btnCancelar}>
          Cancelar
        </Link>
        <button type="submit" className={styles.btnSalvar}>
          {turmaInicial ? "Salvar alterações" : "Cadastrar turma"}
        </button>
      </div>
    </form>
  );
}