import { Aluno, Genero } from "./models/Aluno";
import { Turma } from "./models/Turma";

interface RandomUser {
  gender: "male" | "female";
  name: { first: string; last: string };
  email: string;
  dob: { age: number };
  picture: { medium: string };
}
interface RandomUserResponse { results: RandomUser[]; }

const turma = new Turma(1, "Educação Física");
const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;
const form = $<HTMLFormElement>("form-aluno");
const idInput = $<HTMLInputElement>("aluno-id");
const nomeInput = $<HTMLInputElement>("nome");
const idadeInput = $<HTMLInputElement>("idade");
const alturaInput = $<HTMLInputElement>("altura");
const pesoInput = $<HTMLInputElement>("peso");
const generoInput = $<HTMLSelectElement>("genero");
const emailInput = $<HTMLInputElement>("email");
const btnSalvar = $<HTMLButtonElement>("btn-salvar");
const btnCancelar = $<HTMLButtonElement>("btn-cancelar");
const btnGerar = $<HTMLButtonElement>("btn-gerar");
const formTitulo = $<HTMLElement>("form-titulo");
const listaAlunos = $<HTMLElement>("lista-alunos");
const apiStatus = $<HTMLElement>("api-status");
let proximoId = 1;

function formatarNumero(valor: number, casas: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}
function escaparHtml(texto: string): string { const div = document.createElement("div"); div.textContent = texto; return div.innerHTML; }
function numeroAleatorio(min: number, max: number, casas = 0): number { const valor = Math.random() * (max - min) + min; return Number(valor.toFixed(casas)); }

function atualizarEstatisticas(): void {
  $("stat-alunos").textContent = String(turma.getNumAlunos());
  $("stat-idade").textContent = `${formatarNumero(turma.getMediaIdades(), 1)} anos`;
  $("stat-altura").textContent = `${formatarNumero(turma.getMediaAlturas(), 2)} m`;
  $("stat-peso").textContent = `${formatarNumero(turma.getMediaPesos(), 2)} kg`;
  $("stat-imc").textContent = formatarNumero(turma.getMediaImc(), 2);
  $("stat-maior-altura").textContent = `${formatarNumero(turma.getMaiorAltura(), 2)} m`;
  $("stat-menor-altura").textContent = `${formatarNumero(turma.getMenorAltura(), 2)} m`;
  $("stat-genero").textContent = `${turma.getQuantidadePorGenero("Masculino")} M • ${turma.getQuantidadePorGenero("Feminino")} F`;
}

function renderizarAlunos(): void {
  const alunos = turma.getAlunos();
  if (!alunos.length) { listaAlunos.innerHTML = '<div class="empty">Nenhum aluno cadastrado ainda.</div>'; return; }
  listaAlunos.innerHTML = alunos.map((aluno) => {
    const avatar = aluno.getFoto()
      ? `<img class="avatar-img" src="${escaparHtml(aluno.getFoto())}" alt="Foto de ${escaparHtml(aluno.getNomeCompleto())}">`
      : `<div class="avatar">${escaparHtml(aluno.getNomeCompleto().charAt(0).toUpperCase())}</div>`;
    return `<article class="student"><div class="student-info">${avatar}<div><h3>${escaparHtml(aluno.getNomeCompleto())}</h3><p>ID ${aluno.getId()} • ${aluno.getIdade()} anos • ${aluno.getGenero()} • ${formatarNumero(aluno.getAltura(),2)} m • ${formatarNumero(aluno.getPeso(),1)} kg • IMC ${formatarNumero(aluno.getImc(),1)}</p><p>${escaparHtml(aluno.getEmail() || "E-mail não informado")}</p></div></div><div class="student-actions"><button class="edit" data-action="editar" data-id="${aluno.getId()}">Editar</button><button class="delete" data-action="excluir" data-id="${aluno.getId()}">Excluir</button></div></article>`;
  }).join("");
}
function atualizarTela(): void { atualizarEstatisticas(); renderizarAlunos(); }
function limparFormulario(): void { form.reset(); idInput.value=""; formTitulo.textContent="Adicionar aluno"; btnSalvar.textContent="Adicionar aluno"; btnCancelar.classList.add("hidden"); }

function iniciarEdicao(id: number): void {
  const aluno = turma.getAlunos().find((item) => item.getId() === id); if (!aluno) return;
  idInput.value=String(aluno.getId()); nomeInput.value=aluno.getNomeCompleto(); idadeInput.value=String(aluno.getIdade()); alturaInput.value=String(aluno.getAltura()); pesoInput.value=String(aluno.getPeso()); generoInput.value=aluno.getGenero(); emailInput.value=aluno.getEmail();
  formTitulo.textContent="Editar aluno"; btnSalvar.textContent="Salvar alterações"; btnCancelar.classList.remove("hidden"); nomeInput.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); const nome=nomeInput.value.trim(); const idade=Number(idadeInput.value); const altura=Number(alturaInput.value); const peso=Number(pesoInput.value); const genero=generoInput.value as Genero; const email=emailInput.value.trim(); const id=Number(idInput.value);
  if(!nome || idade<=0 || altura<=0 || peso<=0){ alert("Preencha todos os campos obrigatórios com valores válidos."); return; }
  if(idInput.value) turma.editarAluno(id,nome,idade,altura,peso,genero,email); else { turma.adicionarAluno(new Aluno(proximoId++,nome,idade,altura,peso,genero,email)); }
  limparFormulario(); atualizarTela();
});
btnCancelar.addEventListener("click", limparFormulario);

listaAlunos.addEventListener("click", (event) => {
  const button=(event.target as HTMLElement).closest("button"); if(!button) return; const id=Number(button.dataset.id); const action=button.dataset.action;
  if(action==="editar") iniciarEdicao(id);
  if(action==="excluir"){ const aluno=turma.getAlunos().find((item)=>item.getId()===id); if(aluno && confirm(`Deseja excluir o aluno "${aluno.getNomeCompleto()}"?`)){ turma.apagarAluno(id); atualizarTela(); } }
});

btnGerar.addEventListener("click", async () => {
  btnGerar.disabled=true; apiStatus.textContent="Buscando alunos na Random User API...";
  try {
    const resposta=await fetch("https://randomuser.me/api/?results=5&nat=br&inc=name,gender,email,dob,picture");
    if(!resposta.ok) throw new Error("Falha ao acessar a API");
    const dados=await resposta.json() as RandomUserResponse;
    dados.results.forEach((pessoa) => {
      const genero: Genero = pessoa.gender === "male" ? "Masculino" : "Feminino";
      const altura=numeroAleatorio(1.50,1.95,2); const peso=numeroAleatorio(50,100,1);
      turma.adicionarAluno(new Aluno(proximoId++,`${pessoa.name.first} ${pessoa.name.last}`,pessoa.dob.age,altura,peso,genero,pessoa.email,pessoa.picture.medium));
    });
    apiStatus.textContent="5 alunos brasileiros foram gerados com sucesso."; atualizarTela();
  } catch(error) { apiStatus.textContent="Não foi possível gerar alunos. Verifique sua conexão e tente novamente."; console.error(error); }
  finally { btnGerar.disabled=false; }
});

atualizarTela();