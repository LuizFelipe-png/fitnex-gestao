"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Carregando from "@/components/Carregando/Carregando";
import Mensagem from "@/components/Mensagem/Mensagem";
import { buscarTurma, excluirTurma } from "@/lib/banco";
import { useSessao } from "@/lib/sessao";
import styles from "./detalhe.module.css";

export default function DetalheTurma() {
  const { id } = useParams();
  const router = useRouter();
  const { usuario } = useSessao();
  const [turma, setTurma] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarTurma(id)
      .then((encontrada) => setTurma(encontrada))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  async function handleExcluir() {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir a turma "${turma.nome}"?`
    );
    if (!confirmar) return;

    try {
      await excluirTurma(id);
      router.push("/");
    } catch (e) {
      setErro(e.message);
    }
  }

  if (carregando) return <Carregando />;

  if (!turma) {
    return (
      <main className={styles.container}>
        <Mensagem tipo="erro">{erro}</Mensagem>
        <Link href="/" className={styles.btnVoltar}>
          ← Voltar para turmas
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.btnVoltar}>
        ← Voltar para turmas
      </Link>

      <Mensagem tipo="erro">{erro}</Mensagem>

      <section className={styles.card}>
        <div className={styles.topo}>
          <div>
            {turma.modalidade && (
              <span className={styles.modalidadeTag}>{turma.modalidade}</span>
            )}
            <h1 className={styles.titulo}>{turma.nome}</h1>
          </div>

          {Number(turma.vagas) <= 3 && (
            <span className={styles.badgeAlerta}>Últimas vagas</span>
          )}
        </div>

        <div className={styles.gridInfo}>
          <div className={styles.item}>
            <span className={styles.label}>Professor(a)</span>
            <strong className={styles.valor}>{turma.professor}</strong>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Nível</span>
            <strong className={styles.valor}>
              {turma.nivel || "Não informado"}
            </strong>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Dias da semana</span>
            <strong className={styles.valor}>{turma.dias_semana}</strong>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Horário</span>
            <strong className={styles.valor}>{turma.horario}</strong>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Vagas disponíveis</span>
            <strong className={styles.valor}>{turma.vagas} vagas</strong>
          </div>
        </div>

        {usuario && (
          <div className={styles.acoes}>
            <Link
              href={`/turmas/${turma.id}/editar`}
              className={styles.btnEditar}
            >
              Editar turma
            </Link>
            <button
              type="button"
              onClick={handleExcluir}
              className={styles.btnExcluir}
            >
              Excluir turma
            </button>
          </div>
        )}
      </section>
    </main>
  );
}