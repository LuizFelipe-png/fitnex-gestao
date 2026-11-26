"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Carregando from "@/components/Carregando/Carregando";
import Mensagem from "@/components/Mensagem/Mensagem";
import {
  atualizarModalidade,
  criarModalidade,
  excluirModalidade,
  listarModalidades,
} from "@/lib/banco";
import { useSessao } from "@/lib/sessao";
import styles from "./modalidades.module.css";

export default function ModalidadesPage() {
  const { usuario } = useSessao();
  const [modalidades, setModalidades] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Estados do modal de edição
  const [editando, setEditando] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  const [erroModal, setErroModal] = useState("");
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  useEffect(() => {
    listarModalidades()
      .then((lista) => setModalidades(lista))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  async function handleCadastrar(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const nova = await criarModalidade({ nome, descricao });
      setModalidades([...modalidades, nova]);
      setNome("");
      setDescricao("");
      setSucesso("Modalidade cadastrada com sucesso!");
    } catch (e) {
      setErro(e.message);
    }
  }

  function abrirModalEdicao(mod) {
    setEditando(mod);
    setEditNome(mod.nome);
    setEditDescricao(mod.descricao || "");
    setErroModal("");
    setErro("");
    setSucesso("");
  }

  function fecharModalEdicao() {
    if (salvandoEdicao) return;
    setEditando(null);
    setErroModal("");
  }

  async function handleSalvarEdicao(event) {
    event.preventDefault();
    setErroModal("");
    setSalvandoEdicao(true);

    try {
      const atualizada = await atualizarModalidade(editando.id, {
        nome: editNome,
        descricao: editDescricao,
      });
      setModalidades((lista) =>
        lista.map((m) => (m.id === atualizada.id ? atualizada : m))
      );
      setEditando(null);
      setSucesso("Modalidade atualizada com sucesso!");
    } catch (e) {
      setErroModal(e.message);
    } finally {
      setSalvandoEdicao(false);
    }
  }

  async function handleExcluir(mod) {
    const confirmou = window.confirm(
      `Tem certeza que deseja excluir a modalidade "${mod.nome}"?`
    );
    if (!confirmou) return;

    setErro("");
    setSucesso("");

    try {
      await excluirModalidade(mod.id);
      setModalidades((lista) => lista.filter((m) => m.id !== mod.id));
      setSucesso(`Modalidade "${mod.nome}" excluída.`);
    } catch (e) {
      setErro(e.message);
    }
  }

  if (carregando) return <Carregando />;

  return (
    <main className={styles.container}>
      <h1 className={styles.tituloPagina}>Modalidades</h1>
      <Mensagem tipo="erro">{erro}</Mensagem>
      <Mensagem tipo="sucesso">{sucesso}</Mensagem>

      {usuario && (
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
            + Nova modalidade
          </button>
        </form>
      )}

      <div className={styles.grid}>
        {modalidades.map((mod) => (
          <article key={mod.id} className={styles.card}>
            <div className={styles.cardConteudo}>
              <h2 className={styles.cardTitulo}>{mod.nome}</h2>
              <p className={styles.cardDesc}>{mod.descricao}</p>
            </div>

            {usuario && (
              <div className={styles.cardAcoes}>
                <Link
                  href={`/turmas/novo?modalidadeId=${mod.id}`}
                  className={styles.btnNovaTurma}
                >
                  + Turma
                </Link>

                <div className={styles.acoesSecundarias}>
                  <button
                    type="button"
                    onClick={() => abrirModalEdicao(mod)}
                    className={styles.btnEditar}
                    title={`Editar ${mod.nome}`}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExcluir(mod)}
                    className={styles.btnExcluir}
                    title={`Excluir ${mod.nome}`}
                    aria-label={`Excluir ${mod.nome}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {editando && (
        <div
          className={styles.modalOverlay}
          onClick={fecharModalEdicao}
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-editar"
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id="titulo-modal-editar" className={styles.modalTitulo}>
                Editar modalidade
              </h2>
              <button
                type="button"
                onClick={fecharModalEdicao}
                className={styles.btnFecharModal}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <Mensagem tipo="erro">{erroModal}</Mensagem>

            <form onSubmit={handleSalvarEdicao} className={styles.modalForm}>
              <label className={styles.label}>
                Nome
                <input
                  type="text"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                  className={styles.input}
                  autoFocus
                />
              </label>

              <label className={styles.label}>
                Descrição
                <textarea
                  rows={3}
                  value={editDescricao}
                  onChange={(e) => setEditDescricao(e.target.value)}
                  className={styles.textarea}
                />
              </label>

              <div className={styles.modalRodape}>
                <button
                  type="button"
                  onClick={fecharModalEdicao}
                  className={styles.btnCancelar}
                  disabled={salvandoEdicao}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.btnSalvar}
                  disabled={salvandoEdicao}
                >
                  {salvandoEdicao ? "Salvando..." : "Salvar alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}