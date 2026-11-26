"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./cabecalho.module.css";

export default function Cabecalho({ usuario, onSair }) {
  const router = useRouter();
  const [tema, setTema] = useState("escuro");

  useEffect(() => {
    const temaSalvo = localStorage.getItem("fitnex_tema") || "escuro";
    setTema(temaSalvo);
    document.documentElement.setAttribute("data-tema", temaSalvo);
  }, []);

  function alternarTema() {
    const proximo = tema === "escuro" ? "claro" : "escuro";
    setTema(proximo);
    localStorage.setItem("fitnex_tema", proximo);
    document.documentElement.setAttribute("data-tema", proximo);
  }

  function handleLogout() {
    if (onSair) onSair();
    router.refresh();
  }

  return (
    <header className={styles.header}>
      <div className={styles.conteudo}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcone}>⚡</span>
          <span>FitNex</span>
        </Link>
        <Link href="/modalidades">Modalidades</Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Turmas
          </Link>

          <button
            type="button"
            onClick={alternarTema}
            className={styles.btnTema}
            title={tema === "escuro" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            aria-label="Alternar tema"
          >
            {tema === "escuro" ? "☀️" : "🌙"}
          </button>

          {usuario ? (
            <>
              <Link href="/turmas/novo" className={styles.btnNovo}>
                + Nova Turma
              </Link>
              <div className={styles.usuarioBox}>
                <span className={styles.avatar}>
                  {usuario.charAt(0).toUpperCase()}
                </span>
                <span className={styles.nomeUsuario}>{usuario}</span>
                <button onClick={handleLogout} className={styles.btnSair}>
                  Sair
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className={styles.btnEntrar}>
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}