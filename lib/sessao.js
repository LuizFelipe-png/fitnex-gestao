// lib/sessao.js
"use client";

import { useEffect, useState } from "react";

const CHAVE = "fitnex_usuario";

export function lerUsuario() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CHAVE);
}

export function entrar(nome) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE, nome);
}

export function sair() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHAVE);
}