import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createLink } from "./util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ambiente = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, `.env.${ambiente}`)
});

const PORT = process.env.PORT || 3333;
const diretorioInformado = process.argv[2];

if (!diretorioInformado) {
  console.log("Informe um diretório.");
  console.log("Exemplo: npm start -- ./public");
  process.exit(1);
}

const diretorio = path.resolve(diretorioInformado);

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readdir(diretorio, (erro, arquivos) => {
      if (erro) {
        res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        res.end("Erro ao acessar o diretório.");
        return;
      }

      const links = arquivos.map(createLink).join("");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(links);
    });
    return;
  }

  const nomeArquivo = decodeURIComponent(req.url.substring(1));
  const caminhoArquivo = path.join(diretorio, nomeArquivo);

  fs.readFile(caminhoArquivo, "utf8", (erro, conteudo) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("Arquivo não encontrado.");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<a href="/">Voltar</a><br><br><pre>${conteudo}</pre>`);
  });
});

server.listen(PORT, () => {
  console.log("------------------------------------");
  console.log("Servidor ES Modules iniciado!");
  console.log(`Ambiente: ${ambiente}`);
  console.log(`Diretório: ${diretorio}`);
  console.log(`Porta: ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log("------------------------------------");
});
