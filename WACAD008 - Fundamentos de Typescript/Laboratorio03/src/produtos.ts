import { Produto } from "./interfaces";

export class TV implements Produto {
  constructor(
    public readonly id: number,
    public readonly modelo: string,
    public readonly resolucao: string,
    public readonly tamanho: number,
    public readonly fabricante: string,
    public readonly valor: number
  ) {}

  getTipo(): string { return "TV"; }

  getDetalhes(): string {
    return `${this.resolucao} • ${this.tamanho}"`;
  }
}

export class Celular implements Produto {
  constructor(
    public readonly id: number,
    public readonly modelo: string,
    public readonly memoria: string,
    public readonly fabricante: string,
    public readonly valor: number
  ) {}

  getTipo(): string { return "Celular"; }

  getDetalhes(): string {
    return `Memória: ${this.memoria}`;
  }
}

export class Bicicleta implements Produto {
  constructor(
    public readonly id: number,
    public readonly modelo: string,
    public readonly tamanhoAro: number,
    public readonly fabricante: string,
    public readonly valor: number
  ) {}

  getTipo(): string { return "Bicicleta"; }

  getDetalhes(): string {
    return `Aro ${this.tamanhoAro}`;
  }
}