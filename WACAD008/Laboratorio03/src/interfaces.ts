export interface Produto {
  readonly id: number;
  readonly modelo: string;
  readonly fabricante: string;
  readonly valor: number;
  getTipo(): string;
  getDetalhes(): string;
}