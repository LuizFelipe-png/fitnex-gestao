"use client";

import { useEffect, useState } from "react";
import styles from "./modalidades.module.css";

const MODALIDADES_INICIAIS = [
  { id: 1, nome: "Musculação", descricao: "Treino de força e hipertrofia com acompanhamento." },
  { id: 2, nome: "Pilates", descricao: "Exercícios de mobilidade, postura e fortalecimento do core." },
  { id: 3, nome: "Spinning", descricao: "Aulas aeróbicas intensas em bicicleta indoor." },
  { id: 4, nome: "Muay Thai", descricao: "Arte marcial focada em condicionamento e defesa pessoal." },
  { id: 5, nome: "Jiu-Jitsu", descricao: "Luta agarrada com foco em técnica e alavancas." },
  { id: 6, nome: "Funcional", descricao: "Circuitos dinâmicos de agilidade, resistência e força." },
];

export default function ModalidadesPage() {
  const [modalidades, setModalidades] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const salvas = localStorage.getItem("fitnex_modalidades");
    setModalidades(salvas ? JSON.parse(salvas) : MODALIDADES_INICIAIS);

    const usuario = localStorage.getItem("fitnex_usuario");
    setLogado(Boolean(usuario));
  }, []);

  function handleCadastrar(event) {
    event.preventDefault();
    if (!nome.trim()) return;

    const novoId =
      modalidades.length > 0
        ? Math.max(...modalidades.map((m) => Number(m.id))) + 1
        : 1;

    const atualizada = [
      ...modalidades,
      {
        id: novoId,
        nome: nome.trim(),
        descricao: descricao.trim() || "Modalidade cadastrada na academia.",
      },
    ];

    setModalidades(atualizada);
    localStorage.setItem("fitnex_modalidades", JSON.stringify(atualizada));
    setNome("");
    setDescricao("");
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.tituloPagina}>Modalidades</h1>

      {logado && (
        <form onSubmit={handleCadastrar} className={styles.form}>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da modalidade (ex: Crossfit)"
            className={styles.input}
          />
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição curta (opcional)"
            className={styles.input}
          />
          <button type="submit" className={styles.btnAdicionar}>
            + Adicionar
          </button>
        </form>
      )}

      <div className={styles.grid}>
        {modalidades.map((mod) => (
          <article key={mod.id} className={styles.card}>
            <h2 className={styles.cardTitulo}>{mod.nome}</h2>
            <p className={styles.cardDesc}>{mod.descricao}</p>
          </article>
        ))}
      </div>
    </main>
  );
}