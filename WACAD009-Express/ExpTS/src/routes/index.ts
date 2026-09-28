import { Router } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();

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

router.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>');
});

router.get('/lorem/:paragraphs', (req, res) => {
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
});

export default router;
