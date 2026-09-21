"use strict";
let lembretes = [];
let proximoId = 1;
const form = document.querySelector("#form-lembrete");
const inputIdEdicao = document.querySelector("#id-edicao");
const inputTitulo = document.querySelector("#titulo");
const inputDataLimite = document.querySelector("#data-limite");
const inputDescricao = document.querySelector("#descricao");
const lista = document.querySelector("#lista-lembretes");
const botaoSalvar = document.querySelector("#btn-salvar");
function formatarData(data) {
  if (!data) return "Não informada";
  return data.toLocaleString("pt-BR");
}
function renderizarLembretes() {
  lista.innerHTML = "";
  if (lembretes.length === 0) {
    lista.innerHTML = '<p class="empty">Nenhum lembrete cadastrado.</p>';
    return;
  }
  lembretes.forEach((lembrete) => {
    const [id, titulo, dataInsercao, dataLimite, descricao] = lembrete;
    const div = document.createElement("article");
    div.className = "lembrete";
    div.innerHTML = `
      <h3>${titulo}</h3>
      <p class="meta"><strong>Inserido em:</strong> ${formatarData(dataInsercao)}</p>
      <p class="meta"><strong>Data limite:</strong> ${formatarData(dataLimite)}</p>
      <p><strong>Descrição:</strong> ${descricao?.trim() ? descricao : "Sem descrição"}</p>
      <div class="actions">
        <button class="secondary" type="button" data-acao="editar" data-id="${id}">Editar</button>
        <button class="danger" type="button" data-acao="excluir" data-id="${id}">Excluir</button>
      </div>
    `;
    lista.appendChild(div);
  });
}
function limparFormulario() {
  form.reset();
  inputIdEdicao.value = "";
  botaoSalvar.textContent = "Adicionar lembrete";
  inputTitulo.focus();
}
function criarLembrete() {
  const titulo = inputTitulo.value.trim();
  const descricao = inputDescricao.value.trim();
  const dataLimite = inputDataLimite.value ? new Date(inputDataLimite.value) : undefined;
  const novoLembrete = [proximoId++, titulo, new Date(), dataLimite, descricao || undefined];
  lembretes.push(novoLembrete);
}
function editarLembrete(id) {
  const lembrete = lembretes.find((item) => item[0] === id);
  if (!lembrete) return;
  inputIdEdicao.value = String(lembrete[0]);
  inputTitulo.value = lembrete[1];
  if (lembrete[3]) {
    const data = lembrete[3];
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");
    inputDataLimite.value = `${ano}-${mes}-${dia}T${hora}:${minuto}`;
  } else {
    inputDataLimite.value = "";
  }
  inputDescricao.value = lembrete[4] ?? "";
  botaoSalvar.textContent = "Salvar alterações";
  inputTitulo.focus();
}
function salvarEdicao(id) {
  const indice = lembretes.findIndex((item) => item[0] === id);
  if (indice === -1) return;
  const dataLimite = inputDataLimite.value ? new Date(inputDataLimite.value) : undefined;
  lembretes[indice][1] = inputTitulo.value.trim();
  lembretes[indice][3] = dataLimite;
  lembretes[indice][4] = inputDescricao.value.trim() || undefined;
}
function excluirLembrete(id) {
  lembretes = lembretes.filter((item) => item[0] !== id);
  renderizarLembretes();
}
form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (!inputTitulo.value.trim()) return;
  const idEdicao = Number(inputIdEdicao.value);
  if (idEdicao) salvarEdicao(idEdicao);
  else criarLembrete();
  limparFormulario();
  renderizarLembretes();
});
lista.addEventListener("click", (evento) => {
  const alvo = evento.target;
  if (!(alvo instanceof HTMLButtonElement)) return;
  const id = Number(alvo.dataset.id);
  const acao = alvo.dataset.acao;
  if (acao === "editar") editarLembrete(id);
  if (acao === "excluir") excluirLembrete(id);
});
renderizarLembretes();
