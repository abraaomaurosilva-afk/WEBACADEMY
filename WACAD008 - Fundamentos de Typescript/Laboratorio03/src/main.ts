import { Bicicleta, Celular, TV } from "./produtos";
import { Carrinho } from "./carrinho";
import { Produto } from "./interfaces";

const carrinho = new Carrinho<Produto>();
let proximoId = 1;
const tipo = document.querySelector<HTMLSelectElement>("#tipo")!;
const modelo = document.querySelector<HTMLInputElement>("#modelo")!;
const fabricante = document.querySelector<HTMLInputElement>("#fabricante")!;
const valor = document.querySelector<HTMLInputElement>("#valor")!;
const resolucao = document.querySelector<HTMLInputElement>("#resolucao")!;
const resolucaoLabel = document.querySelector<HTMLLabelElement>("#campo-resolucao-label")!;
const extra = document.querySelector<HTMLInputElement>("#extra")!;
const extraLabel = document.querySelector<HTMLLabelElement>("#campo-extra-label")!;
const adicionar = document.querySelector<HTMLButtonElement>("#adicionar")!;
const lista = document.querySelector<HTMLDivElement>("#lista")!;
const total = document.querySelector<HTMLElement>("#total")!;
const quantidade = document.querySelector<HTMLElement>("#quantidade")!;
const mensagem = document.querySelector<HTMLElement>("#mensagem")!;
const quantidadeStat = document.querySelector<HTMLElement>("#quantidade-stat")!;
const totalStat = document.querySelector<HTMLElement>("#total-stat")!;
const mediaStat = document.querySelector<HTMLElement>("#media-stat")!;
const tiposStat = document.querySelector<HTMLElement>("#tipos-stat")!;

function atualizarCampoExtra(): void {
  const ehTV = tipo.value === "tv";
  resolucaoLabel.style.display = ehTV ? "" : "none";
  resolucao.disabled = !ehTV;
  if (!ehTV) resolucao.value = "";

  if (ehTV) { extraLabel.firstChild!.textContent = "Tamanho (polegadas)"; extra.placeholder = "Ex.: 55"; }
  else if (tipo.value === "celular") { extraLabel.firstChild!.textContent = "Memória"; extra.placeholder = "Ex.: 256 GB"; }
  else { extraLabel.firstChild!.textContent = "Tamanho do aro"; extra.placeholder = "Ex.: 29"; }
}
function moeda(n: number): string { return n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }
function criarProduto(): Produto | null {
  const m=modelo.value.trim(), f=fabricante.value.trim(), v=Number(valor.value), e=extra.value.trim();
  if(!m||!f||!e||!Number.isFinite(v)||v<=0) return null;
  const id=proximoId++;
  if(tipo.value==="tv"){
    const r=resolucao.value.trim();
    const tamanho=Number(e.replace(",","."));
    if(!r||!Number.isFinite(tamanho)||tamanho<=0)return null;
    return new TV(id,m,r,tamanho,f,v);
  }
  if(tipo.value==="celular") return new Celular(id,m,e,f,v);
  const aro=Number(e.replace(",","."));
  if(!Number.isFinite(aro)||aro<=0)return null;
  return new Bicicleta(id,m,aro,f,v);
}
function atualizarEstatisticas(): void {
  quantidadeStat.textContent=String(carrinho.quantidade());
  totalStat.textContent=moeda(carrinho.total());
  mediaStat.textContent=moeda(carrinho.valorMedio());
  tiposStat.textContent=String(carrinho.quantidadeTipos());
  quantidade.textContent=`${carrinho.quantidade()} ${carrinho.quantidade()===1?"produto":"produtos"}`;
  total.textContent=moeda(carrinho.total());
}
function renderizar(): void {
  atualizarEstatisticas();
  const produtos=carrinho.listar();
  if(!produtos.length){ lista.innerHTML='<div class="empty">Nenhum produto adicionado.</div>'; return; }
  lista.innerHTML=produtos.map(p=>`<article class="product"><div class="product-info"><span class="tag">${p.getTipo()}</span><h3>${p.modelo}</h3><p>${p.fabricante} • ${p.getDetalhes()}</p></div><div class="product-actions"><strong>${moeda(p.valor)}</strong><button class="remove" data-id="${p.id}">Excluir</button></div></article>`).join("");
  lista.querySelectorAll<HTMLButtonElement>(".remove").forEach(btn=>btn.addEventListener("click",()=>{carrinho.remover(Number(btn.dataset.id));mensagem.textContent="Produto removido. Estatísticas atualizadas.";renderizar();}));
}
tipo.addEventListener("change",atualizarCampoExtra);
adicionar.addEventListener("click",()=>{
  const produto=criarProduto();
  if(!produto){mensagem.textContent="Preencha todos os dados do produto corretamente.";return;}
  carrinho.adicionar(produto);
  mensagem.textContent="Produto inserido. Estatísticas atualizadas automaticamente.";
  modelo.value="";fabricante.value="";valor.value="";resolucao.value="";extra.value="";
  renderizar();
});
atualizarCampoExtra();renderizar();