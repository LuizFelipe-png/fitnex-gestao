"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessao } from "@/lib/sessao";
import Carregando from "@/components/Carregando/Carregando";

export default function RotaProtegida({ children }) {
  const router = useRouter();
  const { carregando, usuario } = useSessao();

  useEffect(() => {
    if (!carregando && !usuario) {
      router.replace("/login");
    }
  }, [carregando, usuario, router]);

  if (carregando || !usuario) {
    return <Carregando />;
  }

  return children;
}