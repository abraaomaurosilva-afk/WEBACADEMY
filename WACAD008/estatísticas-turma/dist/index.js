class Aluno {
    constructor(id, nomeCompleto, idade, altura, peso) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
    getId() {
        return this.id;
    }
    getNomeCompleto() {
        return this.nomeCompleto;
    }
    getIdade() {
        return this.idade;
    }
    getAltura() {
        return this.altura;
    }
    getPeso() {
        return this.peso;
    }
    atualizarDados(nomeCompleto, idade, altura, peso) {
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
}
class Turma {
    constructor(id, nome, alunos = []) {
        this.id = id;
        this.nome = nome;
        this.alunos = alunos;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getAlunos() {
        return [...this.alunos];
    }
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }
    editarAluno(id, nome, idade, altura, peso) {
        const aluno = this.alunos.find((item) => item.getId() === id);
        if (!aluno) {
            return false;
        }
        aluno.atualizarDados(nome, idade, altura, peso);
        return true;
    }
    apagarAluno(id) {
        const index = this.alunos.findIndex((item) => item.getId() === id);
        if (index < 0) {
            return false;
        }
        this.alunos.splice(index, 1);
        return true;
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        if (this.alunos.length === 0) {
            return 0;
        }
        return this.alunos.reduce((soma, aluno) => soma + aluno.getIdade(), 0) / this.alunos.length;
    }
    getMediaAlturas() {
        if (this.alunos.length === 0) {
            return 0;
        }
        return this.alunos.reduce((soma, aluno) => soma + aluno.getAltura(), 0) / this.alunos.length;
    }
    getMediaPesos() {
        if (this.alunos.length === 0) {
            return 0;
        }
        return this.alunos.reduce((soma, aluno) => soma + aluno.getPeso(), 0) / this.alunos.length;
    }
}
const turma = new Turma(1, "Educação Física");
const form = document.getElementById("form-aluno");
const idInput = document.getElementById("aluno-id");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const alturaInput = document.getElementById("altura");
const pesoInput = document.getElementById("peso");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const formTitulo = document.getElementById("form-titulo");
const listaAlunos = document.getElementById("lista-alunos");
const statAlunos = document.getElementById("stat-alunos");
const statIdade = document.getElementById("stat-idade");
const statAltura = document.getElementById("stat-altura");
const statPeso = document.getElementById("stat-peso");
let proximoId = 1;
function formatarNumero(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}
function atualizarEstatisticas() {
    statAlunos.textContent = String(turma.getNumAlunos());
    statIdade.textContent = formatarNumero(turma.getMediaIdades(), 1) + " anos";
    statAltura.textContent = formatarNumero(turma.getMediaAlturas(), 2) + " m";
    statPeso.textContent = formatarNumero(turma.getMediaPesos(), 2) + " kg";
}
function escaparHtml(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}
function renderizarAlunos() {
    const alunos = turma.getAlunos();
    if (alunos.length === 0) {
        listaAlunos.innerHTML = '<div class="empty">Nenhum aluno cadastrado ainda.</div>';
        return;
    }
    listaAlunos.innerHTML = alunos.map((aluno) => `
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
      `).join("");
}
function atualizarTela() {
    atualizarEstatisticas();
    renderizarAlunos();
}
function limparFormulario() {
    form.reset();
    idInput.value = "";
    formTitulo.textContent = "Adicionar aluno";
    btnSalvar.textContent = "Adicionar aluno";
    btnCancelar.classList.add("hidden");
}
function iniciarEdicao(id) {
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
    }
    else {
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
    const target = event.target;
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