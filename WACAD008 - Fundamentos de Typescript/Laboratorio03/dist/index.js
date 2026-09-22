class TV {
  constructor(id, modelo, resolucao, tamanho, fabricante, valor) { this.id=id; this.modelo=modelo; this.resolucao=resolucao; this.tamanho=tamanho; this.fabricante=fabricante; this.valor=valor; }
  getTipo(){ return "TV"; }
  getDetalhes(){ return this.resolucao + " • " + this.tamanho + '"'; }
}
class Celular {
  constructor(id, modelo, memoria, fabricante, valor) { this.id=id; this.modelo=modelo; this.memoria=memoria; this.fabricante=fabricante; this.valor=valor; }
  getTipo(){ return "Celular"; }
  getDetalhes(){ return "Memória: " + this.memoria; }
}
class Bicicleta {
  constructor(id, modelo, tamanhoAro, fabricante, valor) { this.id=id; this.modelo=modelo; this.tamanhoAro=tamanhoAro; this.fabricante=fabricante; this.valor=valor; }
  getTipo(){ return "Bicicleta"; }
  getDetalhes(){ return "Aro " + this.tamanhoAro; }
}
class Carrinho {
  constructor(){ this.produtos=[]; }
  adicionar(produto){ this.produtos.push(produto); }
  remover(id){ const i=this.produtos.findIndex(p=>p.id===id); return i===-1?undefined:this.produtos.splice(i,1)[0]; }
  listar(){ return [...this.produtos]; }
  total(){ return this.produtos.reduce((s,p)=>s+p.valor,0); }
  quantidade(){ return this.produtos.length; }
  valorMedio(){ return this.quantidade()===0?0:this.total()/this.quantidade(); }
  quantidadeTipos(){ return new Set(this.produtos.map(p=>p.getTipo())).size; }
}
const carrinho=new Carrinho(); let proximoId=1;
const $=s=>document.querySelector(s);
const tipo=$("#tipo"),modelo=$("#modelo"),fabricante=$("#fabricante"),valor=$("#valor"),extra=$("#extra"),extraLabel=$("#campo-extra-label"),adicionar=$("#adicionar"),lista=$("#lista"),total=$("#total"),quantidade=$("#quantidade"),mensagem=$("#mensagem"),quantidadeStat=$("#quantidade-stat"),totalStat=$("#total-stat"),mediaStat=$("#media-stat"),tiposStat=$("#tipos-stat");
function atualizarCampoExtra(){
  if(tipo.value==="tv"){extraLabel.firstChild.textContent="Tamanho (polegadas)";extra.placeholder="Ex.: 55";}
  else if(tipo.value==="celular"){extraLabel.firstChild.textContent="Memória";extra.placeholder="Ex.: 256 GB";}
  else{extraLabel.firstChild.textContent="Tamanho do aro";extra.placeholder="Ex.: 29";}
}
function moeda(n){return n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});}
function criarProduto(){
 const m=modelo.value.trim(),f=fabricante.value.trim(),v=Number(valor.value),e=extra.value.trim();
 if(!m||!f||!e||!Number.isFinite(v)||v<=0)return null;
 const id=proximoId++;
 if(tipo.value==="tv"){const t=Number(e.replace(",","."));return Number.isFinite(t)&&t>0?new TV(id,m,"4K",t,f,v):null;}
 if(tipo.value==="celular")return new Celular(id,m,e,f,v);
 const aro=Number(e.replace(",","."));return Number.isFinite(aro)&&aro>0?new Bicicleta(id,m,aro,f,v):null;
}
function atualizarEstatisticas(){
 quantidadeStat.textContent=String(carrinho.quantidade()); totalStat.textContent=moeda(carrinho.total()); mediaStat.textContent=moeda(carrinho.valorMedio()); tiposStat.textContent=String(carrinho.quantidadeTipos()); quantidade.textContent=carrinho.quantidade()+" "+(carrinho.quantidade()===1?"produto":"produtos"); total.textContent=moeda(carrinho.total());
}
function renderizar(){
 atualizarEstatisticas(); const produtos=carrinho.listar();
 if(!produtos.length){lista.innerHTML='<div class="empty">Nenhum produto adicionado.</div>';return;}
 lista.innerHTML=produtos.map(p=>'<article class="product"><div class="product-info"><span class="tag">'+p.getTipo()+'</span><h3>'+p.modelo+'</h3><p>'+p.fabricante+' • '+p.getDetalhes()+'</p></div><div class="product-actions"><strong>'+moeda(p.valor)+'</strong><button class="remove" data-id="'+p.id+'">Excluir</button></div></article>').join("");
 lista.querySelectorAll(".remove").forEach(btn=>btn.addEventListener("click",()=>{carrinho.remover(Number(btn.dataset.id));mensagem.textContent="Produto removido. Estatísticas atualizadas.";renderizar();}));
}
tipo.addEventListener("change",atualizarCampoExtra);
adicionar.addEventListener("click",()=>{const produto=criarProduto();if(!produto){mensagem.textContent="Preencha todos os dados do produto corretamente.";return;}carrinho.adicionar(produto);mensagem.textContent="Produto inserido. Estatísticas atualizadas automaticamente.";modelo.value="";fabricante.value="";valor.value="";extra.value="";renderizar();});
atualizarCampoExtra();renderizar();