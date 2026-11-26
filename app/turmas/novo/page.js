"use client";

import { useRouter } from "next/navigation";
import { turmasExemplo } from "@/dados/exemplo";
import FormTurma from "@/components/FormTurma/FormTurma";

export default function NovaTurma() {
  const router = useRouter();

  function handleCriar(dadosNovaTurma) {
    const salvas = localStorage.getItem("fitnex_turmas");
    const lista = salvas ? JSON.parse(salvas) : turmasExemplo;

    const novoId =
      lista.length > 0 ? Math.max(...lista.map((t) => Number(t.id))) + 1 : 1;

    const atualizada = [...lista, { id: novoId, ...dadosNovaTurma }];
    localStorage.setItem("fitnex_turmas", JSON.stringify(atualizada));

    router.push("/");
  }

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "20px" }}>
        Nova Turma
      </h1>
      <FormTurma aoSalvar={handleCriar} linkCancelar="/" />
    </main>
  );
}