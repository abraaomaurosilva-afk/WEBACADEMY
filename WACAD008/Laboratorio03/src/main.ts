import { Bicicleta, Celular, TV } from "./produtos";
import { Carrinho } from "./carrinho";
import { Produto } from "./interfaces";

const carrinho = new Carrinho<Produto>();
let proximoId = 1;

const tipo = document.querySelector<HTMLSelectElement>("#tipo")!;
const modelo = document.querySelector<HTMLInputElement>("#modelo")!;
const fabricante = document.querySelector<HTMLInputElement>("#fabricante")!;
const valor = document.querySelector<HTMLInputElement>("#valor")!;
const extra = document.querySelector<HTMLInputElement>("#extra")!;
const extraLabel = document.querySelector<HTMLLabelElement>("#campo-extra-label")!;
const adicionar = document.querySelector<HTMLButtonElement>("#adicionar")!;
const lista = document.querySelector<HTMLDivElement>("#lista")!;
const total = document.querySelector<HTMLElement>("#total")!;
const quantidade = document.querySelector<HTMLElement>("#quantidade")!;
const mensagem = document.querySelector<HTMLElement>("#mensagem")!;

function atualizarCampoExtra(): void {
  if (tipo.value === "tv") {
    extraLabel.firstChild!.textContent = "Resolução";
    extra.placeholder = "Ex.: 4K";
  } else if (tipo.value === "celular") {
    extraLabel.firstChild!.textContent = "Memória";
    extra.placeholder = "Ex.: 256 GB";
  } else {
    extraLabel.firstChild!.textContent = "Tamanho do aro";
    extra.placeholder = "Ex.: 29";
  }
}

function moeda(valorNumerico: number): string {
  return valorNumerico.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function criarProduto(): Produto | null {
  const modeloValue = modelo.value.trim();
  const fabricanteValue = fabricante.value.trim();
  const valorValue = Number(valor.value);
  const extraValue = extra.value.trim();

  if (!modeloValue || !fabricanteValue || !extraValue ||
      !Number.isFinite(valorValue) || valorValue < 0) return null;

  const id = proximoId++;

  if (tipo.value === "tv") {
    const tamanho = Number(extraValue.replace(",", "."));
    if (!Number.isFinite(tamanho)) return null;
    return new TV(id, modeloValue, "4K", tamanho, fabricanteValue, valorValue);
  }

  if (tipo.value === "celular") {
    return new Celular(id, modeloValue, extraValue, fabricanteValue, valorValue);
  }

  const aro = Number(extraValue.replace(",", "."));
  if (!Number.isFinite(aro)) return null;
  return new Bicicleta(id, modeloValue, aro, fabricanteValue, valorValue);
}

function renderizar(): void {
  const produtos = carrinho.listar();
  quantidade.textContent = `${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}`;
  total.textContent = moeda(carrinho.total());

  if (produtos.length === 0) {
    lista.innerHTML = '<div class="empty">Nenhum produto adicionado.</div>';
    return;
  }

  lista.innerHTML = produtos.map((produto) => `
    <article class="product">
      <div class="product-info">
        <span class="tag">${produto.getTipo()}</span>
        <h3>${produto.modelo}</h3>
        <p>${produto.fabricante} • ${produto.getDetalhes()}</p>
      </div>
      <div class="product-actions">
        <strong>${moeda(produto.valor)}</strong>
        <button class="remove" data-id="${produto.id}">Excluir</button>
      </div>
    </article>
  `).join("");

  lista.querySelectorAll<HTMLButtonElement>(".remove").forEach((button) => {
    button.addEventListener("click", () => {
      carrinho.remover(Number(button.dataset.id));
      mensagem.textContent = "Produto removido.";
      renderizar();
    });
  });
}

tipo.addEventListener("change", atualizarCampoExtra);

adicionar.addEventListener("click", () => {
  const produto = criarProduto();

  if (!produto) {
    mensagem.textContent = "Preencha todos os campos corretamente.";
    return;
  }

  carrinho.adicionar(produto);
  mensagem.textContent = "Produto adicionado ao carrinho.";
  modelo.value = "";
  fabricante.value = "";
  valor.value = "";
  extra.value = "";
  renderizar();
});

atualizarCampoExtra();
renderizar();