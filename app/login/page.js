import { useState } from "react";
import styles from "@/app/login/login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    if (!email.trim() || !senha.trim()) {
      setErro("Preencha e-mail e senha para entrar.");
      return;
    }

    setSucesso(`Login enviado para ${email}`);
    setSenha("");
  }

  return (
    <main className={styles["login-page"]}>
      <form className={styles["login-card"]} onSubmit={handleSubmit} noValidate>
        <h1 className={styles["login-title"]}>Entrar</h1>
        <p className={styles["login-subtitle"]}>
          Acesse sua conta com e-mail e senha.
        </p>

        {erro && (
          <p className={`${styles["login-feedback"]} ${styles["login-error"]}`}>
            {erro}
          </p>
        )}
        {sucesso && (
          <p
            className={`${styles["login-feedback"]} ${styles["login-success"]}`}
          >
            {sucesso}
          </p>
        )}

        <div className={styles["login-field"]}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="voce@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles["login-field"]}>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles["login-button"]}>
          Acessar
        </button>
      </form>
    </main>
  );
}

export default Login;
