import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export function index(_req: Request, res: Response): void {
  res.send('<h1>Hello World!</h1>');
}

export function loremIpsum(req: Request, res: Response): void {
  const paragraphs = Number(req.params.paragraphs);

  if (!Number.isInteger(paragraphs) || paragraphs <= 0 || paragraphs > 100) {
    res.status(400).json({
      error: 'Informe um número inteiro de parágrafos entre 1 e 100.',
      exemplo: '/lorem/3',
    });
    return;
  }

  const text = lorem.generateParagraphs(paragraphs);
  const generatedParagraphs = text.split('\n').filter(Boolean);

  res.send(
    generatedParagraphs
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join('\n')
  );
}

export function hb1(_req: Request, res: Response): void {
  res.render('hb1', {
    title: 'Exemplo Handlebars 1',
    message: 'Olá! Esta mensagem foi enviada pela rota /hb1.',
  });
}

export function hb2(_req: Request, res: Response): void {
  res.render('hb2', {
    title: 'Exemplo Handlebars 2',
    nome: 'Abraão',
    curso: 'Web Academy',
    mostrarMensagem: true,
  });
}

export function hb3(_req: Request, res: Response): void {
  res.render('hb3', {
    title: 'Exemplo Handlebars 3',
    tecnologias: [
      { nome: 'Node.js', tipo: 'Runtime JavaScript' },
      { nome: 'Express', tipo: 'Framework Web' },
      { nome: 'TypeScript', tipo: 'Linguagem tipada' },
      { nome: 'Handlebars', tipo: 'Template Engine' },
    ],
  });
}

export function hb4(_req: Request, res: Response): void {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];

  res.render('hb4', {
    title: 'Tecnologias baseadas em Node.js',
    technologies,
  });
}
