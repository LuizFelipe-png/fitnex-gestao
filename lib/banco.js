import {
    modalidadesExemplo as modalidadesIniciais,
    turmasExemplo as turmasIniciais,
  } from "@/dados/exemplo";
  import { pegarToken } from "@/lib/sessao";
  
  const CHAVES = {
    modalidades: "banco-modalidades",
    turmas: "banco-turmas",
    usuarios: "banco-usuarios",
  };
  
  function ler(chave, inicial) {
    try {
      const texto = localStorage.getItem(chave);
      return texto ? JSON.parse(texto) : inicial;
    } catch {
      return inicial;
    }
  }
  
  function gravar(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
  }
  
  function erro(status, mensagem) {
    const e = new Error(mensagem);
    e.status = status;
    return e;
  }
  
  const esperar = (ms = 300) => new Promise((resolver) => setTimeout(resolver, ms));
  
  function usuarioLogado() {
    const token = pegarToken();
    const usuario = ler(CHAVES.usuarios, []).find(
      (u) => u.token && u.token === token
    );
    if (!usuario) throw erro(401, "Faça login para continuar.");
    return usuario;
  }
  
  // Modalidades
  export async function listarModalidades() {
    await esperar();
    return ler(CHAVES.modalidades, modalidadesIniciais);
  }
  
  export async function criarModalidade({ nome, descricao = "" }) {
    await esperar();
    usuarioLogado();
  
    if (!nome || nome.trim() === "") {
      throw erro(400, "O nome da modalidade é obrigatório.");
    }
  
    const modalidades = ler(CHAVES.modalidades, modalidadesIniciais);
    const nomeLimpo = nome.trim();
  
    const duplicada = modalidades.some(
      (m) => m.nome.toLowerCase() === nomeLimpo.toLowerCase()
    );
    if (duplicada) {
      throw erro(409, "Já existe uma modalidade com esse nome.");
    }
  
    const nova = {
      id: Date.now(),
      nome: nomeLimpo,
      descricao: descricao.trim() || "Modalidade cadastrada na academia.",
    };
  
    gravar(CHAVES.modalidades, [...modalidades, nova]);
    return nova;
  }
  
  export async function atualizarModalidade(id, { nome, descricao = "" }) {
    await esperar();
    usuarioLogado();
  
    if (!nome || nome.trim() === "") {
      throw erro(400, "O nome da modalidade é obrigatório.");
    }
  
    const modalidades = ler(CHAVES.modalidades, modalidadesIniciais);
    const posicao = modalidades.findIndex((m) => Number(m.id) === Number(id));
    if (posicao === -1) throw erro(404, "Modalidade não encontrada.");
  
    const nomeLimpo = nome.trim();
    const duplicada = modalidades.some(
      (m) =>
        Number(m.id) !== Number(id) &&
        m.nome.toLowerCase() === nomeLimpo.toLowerCase()
    );
    if (duplicada) {
      throw erro(409, "Já existe outra modalidade com esse nome.");
    }
  
    const atualizada = {
      ...modalidades[posicao],
      nome: nomeLimpo,
      descricao: descricao.trim() || "Modalidade cadastrada na academia.",
    };
  
    gravar(
      CHAVES.modalidades,
      modalidades.map((m, i) => (i === posicao ? atualizada : m))
    );
  
    // Mantém o nome da modalidade atualizado nas turmas vinculadas
    const turmas = ler(CHAVES.turmas, turmasIniciais);
    const turmasAtualizadas = turmas.map((t) =>
      Number(t.modalidade_id) === Number(id)
        ? { ...t, modalidade: atualizada.nome }
        : t
    );
    gravar(CHAVES.turmas, turmasAtualizadas);
  
    return atualizada;
  }
  
  export async function excluirModalidade(id) {
    await esperar();
    usuarioLogado();
  
    const modalidades = ler(CHAVES.modalidades, modalidadesIniciais);
    if (!modalidades.some((m) => Number(m.id) === Number(id))) {
      throw erro(404, "Modalidade não encontrada.");
    }
  
    const turmas = ler(CHAVES.turmas, turmasIniciais);
    const possuiTurmas = turmas.some(
      (t) => Number(t.modalidade_id) === Number(id)
    );
    if (possuiTurmas) {
      throw erro(
        409,
        "Não é possível excluir: existem turmas cadastradas nesta modalidade."
      );
    }
  
    gravar(
      CHAVES.modalidades,
      modalidades.filter((m) => Number(m.id) !== Number(id))
    );
  }
  
  // Turmas
  export async function listarTurmas() {
    await esperar();
    return ler(CHAVES.turmas, turmasIniciais);
  }
  
  export async function buscarTurma(id) {
    await esperar();
    const turma = ler(CHAVES.turmas, turmasIniciais).find(
      (t) => Number(t.id) === Number(id)
    );
    if (!turma) throw erro(404, "Turma não encontrada.");
    return turma;
  }
  
  function montarTurma(dados) {
    if (!dados.nome || dados.nome.trim() === "") {
      throw erro(400, "O nome da turma é obrigatório.");
    }
    if (!dados.professor || dados.professor.trim() === "") {
      throw erro(400, "O nome do professor é obrigatório.");
    }
    if (!dados.dias_semana || dados.dias_semana.trim() === "") {
      throw erro(400, "Os dias da semana são obrigatórios.");
    }
    if (!dados.horario || dados.horario.trim() === "") {
      throw erro(400, "O horário é obrigatório.");
    }
    if (!dados.vagas || Number(dados.vagas) <= 0) {
      throw erro(400, "Informe uma quantidade de vagas válida.");
    }
  
    const modalidades = ler(CHAVES.modalidades, modalidadesIniciais);
    const modalidade = modalidades.find(
      (m) =>
        Number(m.id) === Number(dados.modalidade_id) ||
        m.nome.toLowerCase() === String(dados.modalidade || "").toLowerCase()
    );
  
    if (!modalidade) throw erro(400, "Modalidade inválida.");
  
    return {
      nome: dados.nome.trim(),
      professor: dados.professor.trim(),
      dias_semana: dados.dias_semana.trim(),
      horario: dados.horario.trim(),
      vagas: Number(dados.vagas),
      nivel: dados.nivel || "iniciante",
      modalidade_id: modalidade.id,
      modalidade: modalidade.nome,
    };
  }
  
  export async function criarTurma(dados) {
    await esperar();
    const usuario = usuarioLogado();
    const nova = {
      id: Date.now(),
      ...montarTurma(dados),
      usuario_id: usuario.id,
    };
  
    const turmas = ler(CHAVES.turmas, turmasIniciais);
    gravar(CHAVES.turmas, [...turmas, nova]);
    return nova;
  }
  
  export async function atualizarTurma(id, dados) {
    await esperar();
    usuarioLogado();
  
    const turmas = ler(CHAVES.turmas, turmasIniciais);
    const posicao = turmas.findIndex((t) => Number(t.id) === Number(id));
    if (posicao === -1) throw erro(404, "Turma não encontrada.");
  
    const atualizada = { ...turmas[posicao], ...montarTurma(dados) };
    gravar(
      CHAVES.turmas,
      turmas.map((t, i) => (i === posicao ? atualizada : t))
    );
    return atualizada;
  }
  
  export async function excluirTurma(id) {
    await esperar();
    usuarioLogado();
  
    const turmas = ler(CHAVES.turmas, turmasIniciais);
    if (!turmas.some((t) => Number(t.id) === Number(id))) {
      throw erro(404, "Turma não encontrada.");
    }
  
    gravar(
      CHAVES.turmas,
      turmas.filter((t) => Number(t.id) !== Number(id))
    );
  }
  
  // Usuários
  export async function cadastrarUsuario({ nome, email, senha }) {
    await esperar();
    if (!nome || !email || !senha) {
      throw erro(400, "Preencha nome, e-mail e senha.");
    }
  
    const usuarios = ler(CHAVES.usuarios, []);
    const emailLimpo = email.trim().toLowerCase();
  
    if (usuarios.some((u) => u.email === emailLimpo)) {
      throw erro(409, "Este e-mail já está cadastrado.");
    }
  
    const novo = {
      id: Date.now(),
      nome: nome.trim(),
      email: emailLimpo,
      senha,
      token: null,
    };
  
    gravar(CHAVES.usuarios, [...usuarios, novo]);
    return { id: novo.id, nome: novo.nome, email: novo.email };
  }
  
  export async function fazerLogin({ email, senha }) {
    await esperar();
    if (!email || !senha) {
      throw erro(400, "Preencha e-mail e senha.");
    }
  
    const usuarios = ler(CHAVES.usuarios, []);
    const usuario = usuarios.find(
      (u) => u.email === email.trim().toLowerCase()
    );
  
    if (!usuario || usuario.senha !== senha) {
      throw erro(401, "E-mail ou senha incorretos.");
    }
  
    const token = `token-${usuario.id}-${Date.now()}`;
    gravar(
      CHAVES.usuarios,
      usuarios.map((u) => (u.id === usuario.id ? { ...u, token } : u))
    );
  
    return { token, nome: usuario.nome };
  }