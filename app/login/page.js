"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/login/login.module.css";
import { entrar } from "@/lib/sessao";

function Login() {
  const router = useRouter();
  const [painelAtivo, setPainelAtivo] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    setErro("");

    const dados = new FormData(event.target);
    const email = String(dados.get("email")).trim();
    const senha = String(dados.get("senha"));

    if (email === "" || senha === "") {
      setErro("Preencha e-mail e senha.");
      return;
    }

    entrar(email.split("@")[0]);
    router.replace("/");
  }

  function handleCadastro(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    const dados = new FormData(event.target);
    const nome = String(dados.get("nome")).trim();
    const email = String(dados.get("email")).trim();
    const senha = String(dados.get("senha"));

    if (nome === "" || email === "" || senha === "") {
      setErro("Preencha nome, e-mail e senha.");
      return;
    }

    event.target.reset();
    setSucesso("Conta criada! Agora faça seu login.");
    setPainelAtivo(false);
  }

  function trocarPainel(ativo) {
    setErro("");
    setSucesso("");
    setPainelAtivo(ativo);
  }

  return (
    <main className={styles.wrapper}>
      <div
        className={`${styles.container} ${
          painelAtivo ? styles["right-panel-active"] : ""
        }`}
      >
        <div className={`${styles["form-container"]} ${styles["sign-up-container"]}`}>
          <form onSubmit={handleCadastro} noValidate>
            <h1>Criar conta</h1>
            <span className={styles.subtitulo}>Preencha seus dados para começar</span>

            {painelAtivo && erro && <p className={styles.erro}>{erro}</p>}

            <input type="text" name="nome" placeholder="Nome completo" />
            <input type="email" name="email" placeholder="E-mail" />
            <input type="password" name="senha" placeholder="Senha" />
            <button type="submit" className={styles.btnPrimary}>
              Cadastrar
            </button>
          </form>
        </div>

        <div className={`${styles["form-container"]} ${styles["sign-in-container"]}`}>
          <form onSubmit={handleLogin} noValidate>
            <h1>Entrar</h1>
            <span className={styles.subtitulo}>Use seu e-mail e senha cadastrados</span>

            {!painelAtivo && erro && <p className={styles.erro}>{erro}</p>}
            {!painelAtivo && sucesso && <p className={styles.sucesso}>{sucesso}</p>}

            <input type="email" name="email" placeholder="E-mail" />
            <input type="password" name="senha" placeholder="Senha" />
            <button type="submit" className={styles.btnPrimary}>
              Entrar
            </button>
          </form>
        </div>

        <div className={styles["overlay-container"]}>
          <div className={styles.overlay}>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}>
              <h1>Bem-vindo de volta!</h1>
              <p>Já possui uma conta? Faça login aqui!</p>
              <button
                type="button"
                className={styles.ghost}
                onClick={() => trocarPainel(false)}
              >
                Já tenho conta
              </button>
            </div>

            <div className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}>
              <h1>Olá, visitante!</h1>
              <p>Não tem cadastro? Crie sua conta aqui!</p>
              <button
                type="button"
                className={styles.ghost}
                onClick={() => trocarPainel(true)}
              >
                Criar conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;