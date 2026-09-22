const areaLogin = document.getElementById("area-login");
const aplicacao = document.getElementById("aplicacao");
const formLogin = document.getElementById("form-login");
const inputUsuario = document.getElementById("usuario");
const inputSenha = document.getElementById("senha");
const mensagemLogin = document.getElementById("mensagem-login");
const usuarioLogadoTexto = document.getElementById("usuario-logado");
const btnSair = document.getElementById("btn-sair");

const formLembrete = document.getElementById("form-lembrete");
const inputId = document.getElementById("id-edicao");
const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const inputDataLimite = document.getElementById("data-limite");
const inputDataInsercao = document.getElementById("data-insercao");
const listaLembretes = document.getElementById("lista-lembretes");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

let usuarioAtual = null;

const USUARIO_PADRAO = "admin";
const SENHA_PADRAO = "1234";

formLogin.addEventListener("submit", function(event) {
  event.preventDefault();

  const usuario = inputUsuario.value.trim();
  const senha = inputSenha.value;

  if (usuario === USUARIO_PADRAO && senha === SENHA_PADRAO) {
    usuarioAtual = usuario;

    mensagemLogin.textContent = "";
    areaLogin.classList.add("oculto");
    aplicacao.classList.remove("oculto");

    usuarioLogadoTexto.textContent = "Usuário: " + usuarioAtual;

    definirDataHoraAtual();
    mostrarLembretes();
  } else {
    mensagemLogin.textContent = "Usuário ou senha incorretos.";
  }
});

btnSair.addEventListener("click", function() {
  usuarioAtual = null;

  aplicacao.classList.add("oculto");
  areaLogin.classList.remove("oculto");

  formLogin.reset();
  listaLembretes.innerHTML = "";
});

function obterDataHoraLocal() {
  const agora = new Date();

  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  const hora = String(agora.getHours()).padStart(2, "0");
  const minuto = String(agora.getMinutes()).padStart(2, "0");

  return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
}

function definirDataHoraAtual() {
  inputDataInsercao.value = obterDataHoraLocal();
}

function formatarData(data) {
  if (!data) {
    return "Não informada";
  }

  const objetoData = new Date(data);
  return objetoData.toLocaleString("pt-BR");
}

function obterChaveStorage() {
  return `lembretes_${usuarioAtual}`;
}

function obterLembretes() {
  const dados = localStorage.getItem(obterChaveStorage());

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

function salvarLembretes(lembretes) {
  localStorage.setItem(
    obterChaveStorage(),
    JSON.stringify(lembretes)
  );
}

formLembrete.addEventListener("submit", function(event) {
  event.preventDefault();

  const titulo = inputTitulo.value.trim();
  const descricao = inputDescricao.value.trim();
  const dataLimite = inputDataLimite.value;
  const idEdicao = inputId.value;

  if (!titulo) {
    alert("Informe o título do lembrete.");
    return;
  }

  const lembretes = obterLembretes();

  if (idEdicao) {
    const indice = lembretes.findIndex(
      lembrete => lembrete.id === idEdicao
    );

    if (indice !== -1) {
      lembretes[indice].titulo = titulo;
      lembretes[indice].descricao = descricao;
      lembretes[indice].dataLimite = dataLimite;
      lembretes[indice].dataEdicao = new Date().toISOString();
    }
  } else {
    const novoLembrete = {
      id: Date.now().toString(),
      titulo: titulo,
      descricao: descricao,
      dataLimite: dataLimite,
      dataInsercao: new Date().toISOString(),
      dataEdicao: null
    };

    lembretes.push(novoLembrete);
  }

  salvarLembretes(lembretes);
  limparFormulario();
  mostrarLembretes();
});

function mostrarLembretes() {
  const lembretes = obterLembretes();

  listaLembretes.innerHTML = "";

  if (lembretes.length === 0) {
    listaLembretes.innerHTML = `
      <div class="empty">
        Nenhuma atividade pendente.
      </div>
    `;
    return;
  }

  lembretes.forEach(function(lembrete) {
    const elemento = document.createElement("div");
    elemento.className = "lembrete";

    let ultimaEdicao = "";

    if (lembrete.dataEdicao) {
      ultimaEdicao = `
        <p class="meta">
          <strong>Última edição:</strong>
          ${formatarData(lembrete.dataEdicao)}
        </p>
      `;
    }

    elemento.innerHTML = `
      <h3>${lembrete.titulo}</h3>

      <p>
        ${lembrete.descricao || "Sem descrição"}
      </p>

      <p class="meta">
        <strong>Data e Hora de Inserção:</strong>
        ${formatarData(lembrete.dataInsercao)}
      </p>

      <p class="meta">
        <strong>Data limite:</strong>
        ${formatarData(lembrete.dataLimite)}
      </p>

      ${ultimaEdicao}

      <div class="actions">
        <button
          class="edit"
          onclick="editarLembrete('${lembrete.id}')">
          Editar
        </button>

        <button
          class="danger"
          onclick="apagarLembrete('${lembrete.id}')">
          Apagar
        </button>
      </div>
    `;

    listaLembretes.appendChild(elemento);
  });
}

function editarLembrete(id) {
  const lembretes = obterLembretes();

  const lembrete = lembretes.find(
    item => item.id === id
  );

  if (!lembrete) {
    return;
  }

  inputId.value = lembrete.id;
  inputTitulo.value = lembrete.titulo;
  inputDescricao.value = lembrete.descricao;
  inputDataLimite.value = lembrete.dataLimite || "";

  const dataInsercao = new Date(lembrete.dataInsercao);

  const ano = dataInsercao.getFullYear();
  const mes = String(dataInsercao.getMonth() + 1).padStart(2, "0");
  const dia = String(dataInsercao.getDate()).padStart(2, "0");
  const hora = String(dataInsercao.getHours()).padStart(2, "0");
  const minuto = String(dataInsercao.getMinutes()).padStart(2, "0");

  inputDataInsercao.value =
    `${ano}-${mes}-${dia}T${hora}:${minuto}`;

  btnSalvar.textContent = "Salvar alterações";
  btnCancelar.classList.remove("oculto");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function apagarLembrete(id) {
  const confirmar = confirm(
    "Deseja realmente apagar este lembrete?"
  );

  if (!confirmar) {
    return;
  }

  let lembretes = obterLembretes();

  lembretes = lembretes.filter(
    lembrete => lembrete.id !== id
  );

  salvarLembretes(lembretes);
  mostrarLembretes();
}

btnCancelar.addEventListener("click", function() {
  limparFormulario();
});

function limparFormulario() {
  formLembrete.reset();

  inputId.value = "";
  btnSalvar.textContent = "Adicionar lembrete";
  btnCancelar.classList.add("oculto");

  definirDataHoraAtual();
}
