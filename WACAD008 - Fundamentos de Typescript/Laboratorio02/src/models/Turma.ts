import { Aluno } from "./Aluno";

export class Turma {
  constructor(
    private readonly id: number,
    private nome: string,
    private alunos: Aluno[] = []
  ) {}

  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getAlunos(): Aluno[] {
    return [...this.alunos];
  }

  public adicionarAluno(aluno: Aluno): void {
    this.alunos.push(aluno);
  }

  public editarAluno(
    id: number,
    nome: string,
    idade: number,
    altura: number,
    peso: number
  ): boolean {
    const aluno = this.alunos.find((item) => item.getId() === id);

    if (!aluno) {
      return false;
    }

    aluno.atualizarDados(nome, idade, altura, peso);
    return true;
  }

  public apagarAluno(id: number): boolean {
    const index = this.alunos.findIndex((item) => item.getId() === id);

    if (index < 0) {
      return false;
    }

    this.alunos.splice(index, 1);
    return true;
  }

  public getNumAlunos(): number {
    return this.alunos.length;
  }

  public getMediaIdades(): number {
    if (this.alunos.length === 0) {
      return 0;
    }

    return this.alunos.reduce((soma, aluno) => soma + aluno.getIdade(), 0) / this.alunos.length;
  }

  public getMediaAlturas(): number {
    if (this.alunos.length === 0) {
      return 0;
    }

    return this.alunos.reduce((soma, aluno) => soma + aluno.getAltura(), 0) / this.alunos.length;
  }

  public getMediaPesos(): number {
    if (this.alunos.length === 0) {
      return 0;
    }

    return this.alunos.reduce((soma, aluno) => soma + aluno.getPeso(), 0) / this.alunos.length;
  }
}