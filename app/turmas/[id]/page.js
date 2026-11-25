"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { turmasExemplo } from "@/dados/exemplo";
import Mensagem from "@/components/Mensagem/Mensagem";
import styles from "./detalhe.module.css";

export default function DetalheTurma() {
  const params = useParams();
  const router = useRouter();
  const [turma, setTurma] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const userSalvo = localStorage.getItem("fitnex_usuario");
    if (userSalvo) {
      try {
        setUsuario(JSON.parse(userSalvo));
      } catch {
        setUsuario(userSalvo);
      }
    }

    const salvas = localStorage.getItem("fitnex_turmas");
    const lista = salvas ? JSON.parse(salvas) : turmasExemplo;

    const encontrada = lista.find((item) => String(item.id) === String(params.id));
    setTurma(encontrada || null);
    setCarregando(false);
  }, [params.id]);

  function handleExcluir() {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir a turma "${turma.nome}"?`
    );
    if (!confirmar) return;

    const salvas = localStorage.getItem("fitnex_turmas");
    const lista = salvas ? JSON.parse(salvas) : turmasExemplo;

    const atualizada = lista.filter((item) => String(item.id) !== String(turma.id));
    localStorage.setItem("fitnex_turmas", JSON.stringify(atualizada));
    router.push("/");
  }

  if (carregando) {
    return (
      <main className={styles.container}>
        <Mensagem tipo="info" texto="Carregando detalhes da turma..." />
      </main>
    );
  }

  if (!turma) {
    return (
      <main className={styles.container}>
        <Mensagem tipo="erro" texto="Turma não encontrada." />
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