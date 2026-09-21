import { Aluno } from "./models/Aluno";
import { Turma } from "./models/Turma";

const turma = new Turma(1, "Educação Física");

const form = document.getElementById("form-aluno") as HTMLFormElement;
const idInput = document.getElementById("aluno-id") as HTMLInputElement;
const nomeInput = document.getElementById("nome") as HTMLInputElement;
const idadeInput = document.getElementById("idade") as HTMLInputElement;
const alturaInput = document.getElementById("altura") as HTMLInputElement;
const pesoInput = document.getElementById("peso") as HTMLInputElement;

const btnSalvar = document.getElementById("btn-salvar") as HTMLButtonElement;
const btnCancelar = document.getElementById("btn-cancelar") as HTMLButtonElement;
const formTitulo = document.getElementById("form-titulo") as HTMLElement;
const listaAlunos = document.getElementById("lista-alunos") as HTMLElement;

const statAlunos = document.getElementById("stat-alunos") as HTMLElement;
const statIdade = document.getElementById("stat-idade") as HTMLElement;
const statAltura = document.getElementById("stat-altura") as HTMLElement;
const statPeso = document.getElementById("stat-peso") as HTMLElement;

let proximoId = 1;

function formatarNumero(valor: number, casas: number): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function atualizarEstatisticas(): void {
  statAlunos.textContent = String(turma.getNumAlunos());
  statIdade.textContent = formatarNumero(turma.getMediaIdades(), 1) + " anos";
  statAltura.textContent = formatarNumero(turma.getMediaAlturas(), 2) + " m";
  statPeso.textContent = formatarNumero(turma.getMediaPesos(), 2) + " kg";
}

function escaparHtml(texto: string): string {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function renderizarAlunos(): void {
  const alunos = turma.getAlunos();

  if (alunos.length === 0) {
    listaAlunos.innerHTML = '<div class="empty">Nenhum aluno cadastrado ainda.</div>';
    return;
  }

  listaAlunos.innerHTML = alunos
    .map(
      (aluno) => `
        <article class="student">
          <div class="student-info">
            <div class="avatar">${escaparHtml(aluno.getNomeCompleto().charAt(0).toUpperCase())}</div>
            <div>
              <h3>${escaparHtml(aluno.getNomeCompleto())}</h3>
              <p>ID ${aluno.getId()} • ${aluno.getIdade()} anos • ${formatarNumero(aluno.getAltura(), 2)} m • ${formatarNumero(aluno.getPeso(), 1)} kg</p>
            </div>
          </div>
          <div class="student-actions">
            <button class="edit" data-action="editar" data-id="${aluno.getId()}">Editar</button>
            <button class="delete" data-action="excluir" data-id="${aluno.getId()}">Excluir</button>
          </div>
        </article>
      `
    )
    .join("");
}

function atualizarTela(): void {
  atualizarEstatisticas();
  renderizarAlunos();
}

function limparFormulario(): void {
  form.reset();
  idInput.value = "";
  formTitulo.textContent = "Adicionar aluno";
  btnSalvar.textContent = "Adicionar aluno";
  btnCancelar.classList.add("hidden");
}

function iniciarEdicao(id: number): void {
  const aluno = turma.getAlunos().find((item) => item.getId() === id);

  if (!aluno) {
    return;
  }

  idInput.value = String(aluno.getId());
  nomeInput.value = aluno.getNomeCompleto();
  idadeInput.value = String(aluno.getIdade());
  alturaInput.value = String(aluno.getAltura());
  pesoInput.value = String(aluno.getPeso());

  formTitulo.textContent = "Editar aluno";
  btnSalvar.textContent = "Salvar alterações";
  btnCancelar.classList.remove("hidden");

  nomeInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const idade = Number(idadeInput.value);
  const altura = Number(alturaInput.value);
  const peso = Number(pesoInput.value);
  const id = Number(idInput.value);

  if (!nome || idade <= 0 || altura <= 0 || peso <= 0) {
    alert("Preencha todos os campos com valores válidos.");
    return;
  }

  if (idInput.value) {
    turma.editarAluno(id, nome, idade, altura, peso);
  } else {
    turma.adicionarAluno(new Aluno(proximoId, nome, idade, altura, peso));
    proximoId++;
  }

  limparFormulario();
  atualizarTela();
});

btnCancelar.addEventListener("click", () => {
  limparFormulario();
});

listaAlunos.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const button = target.closest("button");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "editar") {
    iniciarEdicao(id);
  }

  if (action === "excluir") {
    const aluno = turma.getAlunos().find((item) => item.getId() === id);

    if (!aluno) {
      return;
    }

    const confirmar = confirm(`Deseja excluir o aluno "${aluno.getNomeCompleto()}"?`);

    if (confirmar) {
      turma.apagarAluno(id);
      atualizarTela();
    }
  }
});

atualizarTela();