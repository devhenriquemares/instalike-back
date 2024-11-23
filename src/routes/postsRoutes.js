import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controler/postControler.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optiosSuccessStatus: 200
}

// Configura o armazenamento para uploads de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define o diretório de destino para os arquivos enviados: 'uploads/'
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo enviado
        cb(null, file.originalname);
    }
})

// Instância do middleware Multer para upload de arquivos
const upload = multer({dest: "./uploads", storage});

// Função para definir as rotas da API
const routes = (app) => {
    // Habilita o parsing de dados JSON na requisição
    app.use(express.json());

    app.use(cors(corsOptions));

    // Rota GET para listar todos os posts (tratada pela função listarPosts)
    app.get("/posts", listarPosts);

    // Rota POST para criar um novo post (tratada pela função postarNovoPost)
    app.post("/posts", postarNovoPost);

    // Rota POST para upload de imagem e criação de post (tratada pela função uploadImagem)
    // - O middleware upload.single("imagem") configura o upload para um único arquivo com o nome "imagem"
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
}

// Exporta a função routes como módulo padrão
export default routes;

/*import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controler/postControler.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest: "./uploads", storage});

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes;*/