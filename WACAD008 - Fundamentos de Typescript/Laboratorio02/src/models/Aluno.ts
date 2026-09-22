export type Genero = "Masculino" | "Feminino" | "Outro";

export class Aluno {
  constructor(
    private readonly id: number,
    private nomeCompleto: string,
    private idade: number,
    private altura: number,
    private peso: number,
    private genero: Genero = "Outro",
    private email: string = "",
    private foto: string = ""
  ) {}

  public getId(): number { return this.id; }
  public getNomeCompleto(): string { return this.nomeCompleto; }
  public getIdade(): number { return this.idade; }
  public getAltura(): number { return this.altura; }
  public getPeso(): number { return this.peso; }
  public getGenero(): Genero { return this.genero; }
  public getEmail(): string { return this.email; }
  public getFoto(): string { return this.foto; }

  public getImc(): number {
    return this.altura > 0 ? this.peso / (this.altura * this.altura) : 0;
  }

  public atualizarDados(
    nomeCompleto: string,
    idade: number,
    altura: number,
    peso: number,
    genero: Genero,
    email: string,
    foto: string = this.foto
  ): void {
    this.nomeCompleto = nomeCompleto;
    this.idade = idade;
    this.altura = altura;
    this.peso = peso;
    this.genero = genero;
    this.email = email;
    this.foto = foto;
  }
}