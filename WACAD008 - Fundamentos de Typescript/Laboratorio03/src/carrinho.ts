import { Produto } from "./interfaces";

export class Carrinho<T extends Produto> {
  private produtos: T[] = [];

  public adicionar<P extends T>(produto: P): void {
    this.produtos.push(produto);
  }

  public remover<P extends T>(id: number): P | undefined {
    const index = this.produtos.findIndex((produto) => produto.id === id);
    if (index === -1) return undefined;
    return this.produtos.splice(index, 1)[0] as P;
  }

  public listar(): readonly T[] {
    return [...this.produtos];
  }

  public total(): number {
    return this.produtos.reduce((soma, produto) => soma + produto.valor, 0);
  }

  public quantidade(): number {
    return this.produtos.length;
  }
}