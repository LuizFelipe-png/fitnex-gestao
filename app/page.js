"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { turmasExemplo } from "@/dados/exemplo";
import Filtro from "@/components/Filtro/Filtro";
import ListaTurmas from "@/components/ListaTurmas/ListaTurmas";
import Mensagem from "@/components/Mensagem/Mensagem";

export default function Home() {
  const [turmas, setTurmas] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [dia, setDia] = useState("");
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const salvas = localStorage.getItem("fitnex_turmas");
    setTurmas(salvas ? JSON.parse(salvas) : turmasExemplo);

    const usuario = localStorage.getItem("fitnex_usuario");
    setLogado(Boolean(usuario));
  }, []);

  const turmasFiltradas = turmas.filter((turma) => {
    const bateBusca =
      turma.nome.toLowerCase().includes(busca.toLowerCase()) ||
      turma.professor.toLowerCase().includes(busca.toLowerCase());

    const bateModalidade =
      modalidade === "" || turma.modalidade === modalidade;

    const bateDia =
      dia === "" ||
      turma.dias_semana.toLowerCase().includes(dia.toLowerCase());

    return bateBusca && bateModalidade && bateDia;
  });

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "22px",
        }}
      >
        <h1 style={{ fontSize: "1.65rem", fontWeight: 800 }}>
          Turmas Disponíveis
        </h1>

        {logado && (
          <Link
            href="/turmas/novo"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#ffffff",
              padding: "10px 18px",
              borderRadius: "10px",
              fontSize: "0.9rem",
              fontWeight: 700,
            }}
          >
            + Nova turma
          </Link>
        )}
      </div>

      <Filtro
        busca={busca}
        setBusca={setBusca}
        modalidade={modalidade}
        setModalidade={setModalidade}
        dia={dia}
        setDia={setDia}
      />

      {turmasFiltradas.length === 0 ? (
        <Mensagem tipo="info" texto="Nenhuma turma encontrada." />
      ) : (
        <ListaTurmas turmas={turmasFiltradas} />
      )}
    </main>
  );
} 