export class Aluno {
  constructor(
    private readonly id: number,
    private nomeCompleto: string,
    private idade: number,
    private altura: number,
    private peso: number
  ) {}

  public getId(): number {
    return this.id;
  }

  public getNomeCompleto(): string {
    return this.nomeCompleto;
  }

  public getIdade(): number {
    return this.idade;
  }

  public getAltura(): number {
    return this.altura;
  }

  public getPeso(): number {
    return this.peso;
  }

  public atualizarDados(
    nomeCompleto: string,
    idade: number,
    altura: number,
    peso: number
  ): void {
    this.nomeCompleto = nomeCompleto;
    this.idade = idade;
    this.altura = altura;
    this.peso = peso;
  }
}