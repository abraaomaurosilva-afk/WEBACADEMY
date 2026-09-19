# WACAD007-NODE — node2 (ES Modules)

Este exercício refaz o Exercício I usando **ES Modules** em vez de CommonJS.

## Estrutura

```text
node2/
├── index.js
├── util.js
├── package.json
├── .gitignore
├── .env.example
└── public/
    ├── commonJS.txt
    ├── esModules.txt
    ├── libuv.txt
    ├── nodejs.txt
    └── nodemon.txt
```

## ES Modules

O projeto utiliza `"type": "module"` no `package.json`, permitindo usar `import` e `export`.

Exemplo:

```javascript
import fs from "fs";
import { createLink } from "./util.js";
```

## Instalação

```bash
npm install
```

Crie localmente `.env.development`:

```env
PORT=3333
```

E `.env.production`:

```env
PORT=8080
```

## Desenvolvimento

```bash
npm start
```

Abra:

```text
http://localhost:3333
```

## Produção

```bash
npm run start:prod
```

Com `PORT=8080`, abra `http://localhost:8080`.

A página inicial lista os arquivos do diretório `public` como links. Ao clicar em um arquivo, seu conteúdo é exibido com a opção **Voltar**.
