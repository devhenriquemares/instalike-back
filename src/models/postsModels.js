import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para obter todos os posts do banco de dados
export async function getTodosOsPosts() {
    // Seleciona o banco de dados 'imersao-instabytes'
    const db = conexao.db("imersao-instabytes");

    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");

    // Busca todos os documentos da coleção 'posts' e retorna como um array
    return colecao.find().toArray();
}

// Função para criar um novo post no banco de dados
export async function criarPost(novoPost) {
    // Seleciona o banco de dados 'imersao-instabytes'
    const db = conexao.db("imersao-instabytes");

    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");

    // Insere o novo post na coleção 'posts' e retorna o resultado da inserção
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}

/*import conectarAoBanco from "../config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosOsPosts() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    return colecao.insertOne(novoPost);
}*/