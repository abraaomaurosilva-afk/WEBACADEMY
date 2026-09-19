# WACAD007-NODE — Exercício node1

Exercício do módulo de Node.js utilizando `fs.readdir()`, servidor HTTP, variáveis de ambiente, scripts npm, nodemon e um módulo separado para criação dos links dos arquivos.

## Estrutura do projeto

```text
WACAD007-NODE/
└── node1/
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

## O que a aplicação faz

A aplicação recebe o nome de um diretório como parâmetro, usa a função `readdir` do módulo `fs` para obter seus arquivos e cria um servidor Web que mostra esses arquivos como links.

Ao clicar em um arquivo, seu conteúdo é exibido no navegador com um link **Voltar** para retornar à listagem.

A função `createLink(filename)` fica separada no módulo `util.js`.

## Pré-requisitos

- Node.js instalado
- npm instalado

Para verificar:

```bash
node --version
npm --version
```

## 1. Baixar o repositório

```bash
git clone https://github.com/abraaomaurosilva-afk/WEBACADEMY.git
cd WEBACADEMY/WACAD007-NODE/node1
```

Se o clone não abrir automaticamente a branch do exercício, use:

```bash
git checkout Branch
```

## 2. Instalar as dependências

Dentro de `WACAD007-NODE/node1`:

```bash
npm install
```

As principais dependências utilizadas são:

- `dotenv`: leitura das variáveis de ambiente;
- `nodemon`: reinicia a aplicação automaticamente durante o desenvolvimento;
- `cross-env`: permite definir `NODE_ENV` de forma compatível com diferentes sistemas.

## 3. Configurar as variáveis de ambiente

O repositório contém o arquivo:

```text
.env.example
```

Crie localmente:

```text
.env.development
.env.production
```

Conteúdo sugerido para `.env.development`:

```env
PORT=3333
```

Conteúdo sugerido para `.env.production`:

```env
PORT=8080
```

Esses arquivos estão no `.gitignore` e não são enviados ao GitHub.

## 4. Executar em desenvolvimento

Execute:

```bash
npm start
```

O script executa a aplicação em modo development usando nodemon e o diretório `./public`.

Abra no navegador:

```text
http://localhost:3333
```

A página deverá listar:

```text
commonJS.txt
esModules.txt
libuv.txt
nodejs.txt
nodemon.txt
```

## 5. Abrir os arquivos

Cada nome exibido na página é um link.

Por exemplo, clique em:

```text
nodejs.txt
```

O servidor exibirá o conteúdo do arquivo e apresentará o link:

```text
Voltar
```

## 6. Executar em produção

Execute:

```bash
npm run start:prod
```

A aplicação utilizará o arquivo:

```text
.env.production
```

Com `PORT=8080`, abra:

```text
http://localhost:8080
```

## Scripts disponíveis

```bash
npm start
npm run start:prod
```

- `npm start`: ambiente de desenvolvimento com nodemon.
- `npm run start:prod`: ambiente de produção usando Node.js.

## Arquivos principais

### index.js

Responsável por:

- receber o diretório por parâmetro;
- carregar a configuração do ambiente;
- criar o servidor HTTP;
- utilizar `fs.readdir()`;
- listar os arquivos;
- utilizar `fs.readFile()` para abrir o arquivo selecionado.

### util.js

Contém a função solicitada no exercício:

```javascript
function createLink(filename) {
  return `<a href="/${filename}">${filename}</a><br>\n`;
}
```

## Resultado esperado

Ao executar `npm start`, o terminal informa o ambiente, diretório, porta e endereço do servidor. Em seguida, acesse `http://localhost:3333` para visualizar e abrir os arquivos do diretório `public`.
