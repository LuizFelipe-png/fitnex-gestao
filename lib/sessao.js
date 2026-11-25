// lib/sessao.js
"use client";

import { useState, useEffect } from "react";

const CHAVE = "sessao";

export function entrar(nome) {
  localStorage.setItem(CHAVE, JSON.stringify({ nome }));
  window.dispatchEvent(new Event("sessao-mudou"));
}

export function sair() {
  localStorage.removeItem(CHAVE);
  window.dispatchEvent(new Event("sessao-mudou"));
}

export function useSessao() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const ler = () => {
      try {
        const bruto = localStorage.getItem(CHAVE);
        setUsuario(bruto ? JSON.parse(bruto) : null);
      } catch {
        setUsuario(null);
      }
      setCarregando(false);
    };
    ler();
    window.addEventListener("sessao-mudou", ler);
    return () => window.removeEventListener("sessao-mudou", ler);
  }, []);

  return { usuario, carregando };
}