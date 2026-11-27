"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Carregando from "@/components/Carregando/Carregando";
import FormTurma from "@/components/FormTurma/FormTurma";
import Mensagem from "@/components/Mensagem/Mensagem";
import RotaProtegida from "@/components/RotaProtegida/RotaProtegida";
import { criarTurma, listarModalidades } from "@/lib/banco";

function ConteudoNovaTurma() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalidadeIdUrl = searchParams.get("modalidadeId") || "";

  const [modalidades, setModalidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarModalidades()
      .then((lista) => setModalidades(lista))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  async function handleCriar(dados) {
    setErro("");
    try {
      const nova = await criarTurma(dados);
      router.push(`/turmas/${nova.id}`);
    } catch (e) {
      setErro(e.message);
    }
  }

  if (carregando) return <Carregando />;

  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Nova Turma</h1>
      <Mensagem tipo="erro">{erro}</Mensagem>
      <FormTurma
        modalidades={modalidades}
        valoresIniciais={{ modalidade_id: modalidadeIdUrl }}
        textoBotao="Cadastrar turma"
        aoSalvar={handleCriar}
      />
    </main>
  );
}

export default function NovaTurmaPage() {
  return (
    <RotaProtegida>
      <Suspense fallback={<Carregando />}>
        <ConteudoNovaTurma />
      </Suspense>
    </RotaProtegida>
  );
}