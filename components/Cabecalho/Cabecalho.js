"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Cabecalho.module.css";

export default function Cabecalho({ usuario, onSair }) {
  const router = useRouter();

  function handleLogout() {
    if (onSair) onSair();
    router.refresh();
  }

  return (
    <header className={styles.header}>
      <div className={styles.conteudo}>
        <Link href="/" className={styles.logo}>
          FitNex
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Turmas
          </Link>

          {usuario ? (
            <>
              <Link href="/turmas/novo" className={styles.btnNovo}>
                + Nova Turma
              </Link>
              <div className={styles.usuarioBox}>
                <span>
                  Olá, <strong>{usuario}</strong>
                </span>
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