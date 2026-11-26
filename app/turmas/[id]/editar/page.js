"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Carregando from "@/components/Carregando/Carregando";
import FormTurma from "@/components/FormTurma/FormTurma";
import Mensagem from "@/components/Mensagem/Mensagem";
import RotaProtegida from "@/components/RotaProtegida/RotaProtegida";
import { atualizarTurma, buscarTurma, listarModalidades } from "@/lib/banco";

export default function EditarTurma() {
  const { id } = useParams();
  const router = useRouter();
  const [turma, setTurma] = useState(null);
  const [modalidades, setModalidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    Promise.all([buscarTurma(id), listarModalidades()])
      .then(([encontrada, lista]) => {
        setTurma(encontrada);
        setModalidades(lista);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  async function salvar(dados) {
    await atualizarTurma(id, dados);
    router.push(`/turmas/${id}`);
  }

  return (
    <RotaProtegida>
      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "20px" }}>
          Editar Turma
        </h1>
        {carregando && <Carregando />}
        <Mensagem tipo="erro">{erro}</Mensagem>
        {turma && (
          <FormTurma
            modalidades={modalidades}
            turmaInicial={turma}
            aoSalvar={salvar}
            linkCancelar={`/turmas/${turma.id}`}
          />
        )}
      </main>
    </RotaProtegida>
  );
}