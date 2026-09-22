import { Aluno, Genero } from "./Aluno";

export class Turma {
  constructor(
    private readonly id: number,
    private nome: string,
    private alunos: Aluno[] = []
  ) {}

  public getId(): number { return this.id; }
  public getNome(): string { return this.nome; }
  public setNome(nome: string): void { this.nome = nome; }
  public getAlunos(): Aluno[] { return [...this.alunos]; }

  public adicionarAluno(aluno: Aluno): void {
    this.alunos.push(aluno);
  }

  public editarAluno(
    id: number,
    nome: string,
    idade: number,
    altura: number,
    peso: number,
    genero: Genero,
    email: string
  ): boolean {
    const aluno = this.alunos.find((item) => item.getId() === id);
    if (!aluno) return false;
    aluno.atualizarDados(nome, idade, altura, peso, genero, email);
    return true;
  }

  public apagarAluno(id: number): boolean {
    const index = this.alunos.findIndex((item) => item.getId() === id);
    if (index < 0) return false;
    this.alunos.splice(index, 1);
    return true;
  }

  public getNumAlunos(): number { return this.alunos.length; }

  private calcularMedia<T>(itens: T[], seletor: (item: T) => number): number {
    if (itens.length === 0) return 0;
    return itens.reduce((soma, item) => soma + seletor(item), 0) / itens.length;
  }

  public getMediaIdades(): number {
    return this.calcularMedia(this.alunos, (aluno) => aluno.getIdade());
  }

  public getMediaAlturas(): number {
    return this.calcularMedia(this.alunos, (aluno) => aluno.getAltura());
  }

  public getMediaPesos(): number {
    return this.calcularMedia(this.alunos, (aluno) => aluno.getPeso());
  }

  public getMediaImc(): number {
    return this.calcularMedia(this.alunos, (aluno) => aluno.getImc());
  }

  public getMaiorAltura(): number {
    return this.alunos.length ? Math.max(...this.alunos.map((aluno) => aluno.getAltura())) : 0;
  }

  public getMenorAltura(): number {
    return this.alunos.length ? Math.min(...this.alunos.map((aluno) => aluno.getAltura())) : 0;
  }

  public getQuantidadePorGenero(genero: Genero): number {
    return this.alunos.filter((aluno) => aluno.getGenero() === genero).length;
  }
}