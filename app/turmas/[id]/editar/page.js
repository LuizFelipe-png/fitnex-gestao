"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { turmasExemplo } from "@/dados/exemplo";
import FormTurma from "@/components/FormTurma/FormTurma";
import Mensagem from "@/components/Mensagem/Mensagem";

export default function EditarTurma() {
  const params = useParams();
  const router = useRouter();
  const [turma, setTurma] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const salvas = localStorage.getItem("fitnex_turmas");
    const lista = salvas ? JSON.parse(salvas) : turmasExemplo;
    const encontrada = lista.find((item) => String(item.id) === String(params.id));

    setTurma(encontrada || null);
    setCarregando(false);
  }, [params.id]);

  function handleAtualizar(dadosEditados) {
    const salvas = localStorage.getItem("fitnex_turmas");
    const lista = salvas ? JSON.parse(salvas) : turmasExemplo;

    const atualizada = lista.map((item) =>
      String(item.id) === String(params.id)
        ? { ...item, ...dadosEditados }
        : item
    );

    localStorage.setItem("fitnex_turmas", JSON.stringify(atualizada));
    router.push(`/turmas/${params.id}`);
  }

  if (carregando) {
    return (
      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 20px" }}>
        <Mensagem tipo="info" texto="Carregando turma..." />
      </main>
    );
  }

  if (!turma) {
    return (
      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 20px" }}>
        <Mensagem tipo="erro" texto="Turma não encontrada." />
        <Link href="/">← Voltar para turmas</Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "20px" }}>
        Editar Turma
      </h1>
      <FormTurma
        turmaInicial={turma}
        aoSalvar={handleAtualizar}
        linkCancelar={`/turmas/${turma.id}`}
      />
    </main>
  );
}