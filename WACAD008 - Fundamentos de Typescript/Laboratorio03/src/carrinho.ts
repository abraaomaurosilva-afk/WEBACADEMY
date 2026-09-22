import { Produto } from "./interfaces";

export class Carrinho<T extends Produto> {
  private produtos: T[] = [];

  public adicionar<P extends T>(produto: P): void { this.produtos.push(produto); }
  public remover(id: number): T | undefined {
    const index = this.produtos.findIndex((produto) => produto.id === id);
    if (index === -1) return undefined;
    return this.produtos.splice(index, 1)[0];
  }
  public listar(): readonly T[] { return [...this.produtos]; }
  public total(): number { return this.produtos.reduce((soma, produto) => soma + produto.valor, 0); }
  public quantidade(): number { return this.produtos.length; }
  public valorMedio(): number { return this.quantidade() === 0 ? 0 : this.total() / this.quantidade(); }
  public quantidadeTipos(): number { return new Set(this.produtos.map((produto) => produto.getTipo())).size; }
}