import fs from "fs";
import { getTodosOsPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/geminiService.js"

// Esta função lida com a requisição GET para listar todos os posts.
export async function listarPosts(req, res) {
    // Obtém todos os posts do banco de dados usando a função getTodosOsPosts.
    const posts = await getTodosOsPosts();

    // Envia os posts obtidos como uma resposta JSON com o status 200 OK.
    res.status(200).json(posts);
}

// Esta função lida com a requisição POST para criar um novo post.
export async function postarNovoPost(req, res) {
    // Extrai os dados do novo post do corpo da requisição.
    const novoPost = req.body;

    try {
        // Cria o novo post no banco de dados usando a função criarPost.
        const postCriado = await criarPost(novoPost);

        // Envia o post criado como uma resposta JSON com o status 200 OK.
        res.status(200).json(postCriado);
    } catch (erro) {
        // Registra a mensagem de erro no console para depuração.
        console.error(erro.message);

        // Envia uma resposta de erro com o status 500 Internal Server Error.
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Esta função lida com a requisição POST para fazer upload de uma imagem e criar um novo post.
export async function uploadImagem(req, res) {
    // Cria um novo objeto de post com os detalhes da imagem da requisição.
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Cria o novo post no banco de dados.
        const postCriado = await criarPost(novoPost);

        // Constrói o novo caminho da imagem.
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomeia o arquivo enviado para o novo caminho.
        fs.renameSync(req.file.path, imagemAtualizada);

        // Envia o post criado como uma resposta JSON com o status 200 OK.
        res.status(200).json(postCriado);
    } catch (erro) {
        // Registra a mensagem de erro no console para depuração.
        console.error(erro.message);

        // Envia uma resposta de erro com o status 500 Internal Server Error.
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);

        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);

        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

/*import fs from "fs";
import { getTodosOsPosts, criarPost } from "../models/postsModels.js";

export async function listarPosts(req, res) {
    const posts = await getTodosOsPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    }catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}*/