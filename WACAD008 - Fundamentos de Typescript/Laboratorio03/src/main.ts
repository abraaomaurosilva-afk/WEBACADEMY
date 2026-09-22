import { Bicicleta, Celular, TV } from "./produtos";
import { Carrinho } from "./carrinho";
import { Produto } from "./interfaces";

const carrinho = new Carrinho<Produto>();
let proximoId = 1;

function elemento<T extends Element>(seletor: string): T {
  const el = document.querySelector<T>(seletor);
  if (!el) throw new Error(`Elemento não encontrado: ${seletor}`);
  return el;
}

const form = elemento<HTMLFormElement>("#produto-form");
const tipo = elemento<HTMLSelectElement>("#tipo");
const modelo = elemento<HTMLInputElement>("#modelo");
const fabricante = elemento<HTMLInputElement>("#fabricante");
const valor = elemento<HTMLInputElement>("#valor");
const resolucao = elemento<HTMLInputElement>("#resolucao");
const resolucaoLabel = elemento<HTMLLabelElement>("#campo-resolucao-label");
const extra = elemento<HTMLInputElement>("#extra");
const extraTexto = elemento<HTMLSpanElement>("#extra-texto");
const lista = elemento<HTMLDivElement>("#lista");
const total = elemento<HTMLElement>("#total");
const quantidade = elemento<HTMLElement>("#quantidade");
const mensagem = elemento<HTMLElement>("#mensagem");
const quantidadeStat = elemento<HTMLElement>("#quantidade-stat");
const totalStat = elemento<HTMLElement>("#total-stat");
const mediaStat = elemento<HTMLElement>("#media-stat");
const tiposStat = elemento<HTMLElement>("#tipos-stat");

function atualizarCampos(): void {
  const ehTV = tipo.value === "tv";
  resolucaoLabel.hidden = !ehTV;
  resolucao.disabled = !ehTV;
  resolucao.required = ehTV;
  if (!ehTV) resolucao.value = "";

  if (ehTV) {
    extraTexto.textContent = "Tamanho (polegadas)";
    extra.placeholder = "Ex.: 55";
    modelo.placeholder = "Ex.: Smart TV Crystal";
  } else if (tipo.value === "celular") {
    extraTexto.textContent = "Memória";
    extra.placeholder = "Ex.: 256 GB";
    modelo.placeholder = "Ex.: Galaxy S25";
  } else {
    extraTexto.textContent = "Tamanho do aro";
    extra.placeholder = "Ex.: 29";
    modelo.placeholder = "Ex.: Mountain Bike";
  }
}

function moeda(numero: number): string {
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function numero(valorDigitado: string): number {
  return Number(valorDigitado.trim().replace(",", "."));
}

function criarProduto(): Produto | null {
  const m = modelo.value.trim();
  const f = fabricante.value.trim();
  const v = numero(valor.value);
  const e = extra.value.trim();

  if (!m || !f || !e || !Number.isFinite(v) || v <= 0) return null;

  if (tipo.value === "tv") {
    const r = resolucao.value.trim();
    const tamanho = numero(e);
    if (!r || !Number.isFinite(tamanho) || tamanho <= 0) return null;
    return new TV(proximoId++, m, r, tamanho, f, v);
  }

  if (tipo.value === "celular") {
    return new Celular(proximoId++, m, e, f, v);
  }

  const aro = numero(e);
  if (!Number.isFinite(aro) || aro <= 0) return null;
  return new Bicicleta(proximoId++, m, aro, f, v);
}

function atualizarEstatisticas(): void {
  const qtd = carrinho.quantidade();
  quantidadeStat.textContent = String(qtd);
  totalStat.textContent = moeda(carrinho.total());
  mediaStat.textContent = moeda(carrinho.valorMedio());
  tiposStat.textContent = String(carrinho.quantidadeTipos());
  quantidade.textContent = `${qtd} ${qtd === 1 ? "produto" : "produtos"}`;
  total.textContent = moeda(carrinho.total());
}

function renderizar(): void {
  atualizarEstatisticas();
  const produtos = carrinho.listar();

  if (produtos.length === 0) {
    lista.innerHTML = '<div class="empty"><span>🛒</span><strong>Carrinho vazio</strong><p>Adicione seu primeiro produto ao lado.</p></div>';
    return;
  }

  lista.innerHTML = produtos.map((p) => `
    <article class="product">
      <div class="product-icon">${p.getTipo() === "TV" ? "📺" : p.getTipo() === "Celular" ? "📱" : "🚲"}</div>
      <div class="product-info">
        <span class="tag">${p.getTipo()}</span>
        <h3>${p.modelo}</h3>
        <p>${p.fabricante} • ${p.getDetalhes()}</p>
      </div>
      <div class="product-actions">
        <strong>${moeda(p.valor)}</strong>
        <button type="button" class="remove" data-id="${p.id}">Excluir</button>
      </div>
    </article>`).join("");

  lista.querySelectorAll<HTMLButtonElement>(".remove").forEach((botao) => {
    botao.addEventListener("click", () => {
      carrinho.remover(Number(botao.dataset.id));
      mensagem.className = "message success";
      mensagem.textContent = "Produto removido. Carrinho atualizado.";
      renderizar();
    });
  });
}

tipo.addEventListener("change", atualizarCampos);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  mensagem.className = "message";

  const produto = criarProduto();
  if (!produto) {
    mensagem.className = "message error";
    mensagem.textContent = "Confira os campos. Preencha todos os dados com valores válidos.";
    return;
  }

  carrinho.adicionar(produto);
  mensagem.className = "message success";
  mensagem.textContent = `${produto.getTipo()} adicionado com sucesso!`;

  form.reset();
  tipo.value = "tv";
  atualizarCampos();
  renderizar();
  modelo.focus();
});

atualizarCampos();
renderizar();
