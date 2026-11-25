"use client";

import { useEffect, useState } from "react";
import Cabecalho from "@/components/Cabecalho/Cabecalho";
import ListaTurmas from "@/components/ListaTurmas/ListaTurmas";
import { turmasExemplo } from "@/dados/exemplo";
import Filtro from "@/components/Filtro/Filtro";
import { lerUsuario, sair } from "@/lib/sessao";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const [dia, setDia] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setUsuario(lerUsuario());
  }, []);

  function handleSair() {
    sair();
    setUsuario(null);
  }

  const turmasFiltradas = turmasExemplo.filter((turma) => {
    const bateDia = dia === "" || turma.dias_semana.includes(dia);
    const bateBusca = turma.nome.toLowerCase().includes(busca.toLowerCase());
    return bateDia && bateBusca;
  });

  return (
    <>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 20px" }}>
        <h1 style={{ fontSize: "1.6rem", marginBottom: "18px" }}>
          Turmas Disponíveis
        </h1>

        <Filtro
          dia={dia}
          onMudarDia={setDia}
          busca={busca}
          onMudarBusca={setBusca}
        />

        <ListaTurmas turmas={turmasFiltradas} />
      </main>
    </>
  );
}