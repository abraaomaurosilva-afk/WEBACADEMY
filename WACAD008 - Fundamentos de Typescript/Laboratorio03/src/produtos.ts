import { Produto } from "./interfaces";

export class TV implements Produto {
  constructor(
    private readonly _id: number,
    private readonly _modelo: string,
    private readonly _resolucao: string,
    private readonly _tamanho: number,
    private readonly _fabricante: string,
    private readonly _valor: number
  ) {}

  get id(): number { return this._id; }
  get modelo(): string { return this._modelo; }
  get resolucao(): string { return this._resolucao; }
  get tamanho(): number { return this._tamanho; }
  get fabricante(): string { return this._fabricante; }
  get valor(): number { return this._valor; }
  getTipo(): string { return "TV"; }
  getDetalhes(): string { return `${this.resolucao} • ${this.tamanho}"`; }
}

export class Celular implements Produto {
  constructor(
    private readonly _id: number,
    private readonly _modelo: string,
    private readonly _memoria: string,
    private readonly _fabricante: string,
    private readonly _valor: number
  ) {}

  get id(): number { return this._id; }
  get modelo(): string { return this._modelo; }
  get memoria(): string { return this._memoria; }
  get fabricante(): string { return this._fabricante; }
  get valor(): number { return this._valor; }
  getTipo(): string { return "Celular"; }
  getDetalhes(): string { return `Memória: ${this.memoria}`; }
}

export class Bicicleta implements Produto {
  constructor(
    private readonly _id: number,
    private readonly _modelo: string,
    private readonly _tamanhoAro: number,
    private readonly _fabricante: string,
    private readonly _valor: number
  ) {}

  get id(): number { return this._id; }
  get modelo(): string { return this._modelo; }
  get tamanhoAro(): number { return this._tamanhoAro; }
  get fabricante(): string { return this._fabricante; }
  get valor(): number { return this._valor; }
  getTipo(): string { return "Bicicleta"; }
  getDetalhes(): string { return `Aro ${this.tamanhoAro}`; }
}
