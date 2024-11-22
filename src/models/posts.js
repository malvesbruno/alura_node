import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/db_config.js"; // Importa a função de conexão com o banco de dados


const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

/**
 * Função assíncrona para obter todos os posts da coleção "posts" no banco de dados.
 * @returns {Array} - Array de documentos da coleção "posts".
 */
async function get_todos_posts(){
    const db = conexao.db("Imersão-instabytes"); // Obtém a referência ao banco de dados "Imersão-instabytes"
    const colecao = db.collection("posts"); // Obtém a referência à coleção "posts"
    return colecao.find().toArray(); // Retorna todos os documentos da coleção como um array
}

async function create_post(post_novo){
    const db = conexao.db("Imersão-instabytes"); // Obtém a referência ao banco de dados "Imersão-instabytes"
    const colecao = db.collection("posts"); // Obtém a referência à coleção "posts"
    return colecao.insertOne(post_novo);
}

async function upload_imagem(params) {
    const db = conexao.db("Imersão-instabytes"); // Obtém a referência ao banco de dados "Imersão-instabytes"
    const colecao = db.collection("posts"); // Obtém a referência à coleção "posts"
    return colecao.insertOne(post_novo);
}

async function update_post(id, post) {
    const objectId = ObjectId.createFromHexString(id);
    const db = conexao.db("Imersão-instabytes"); // Obtém a referência ao banco de dados "Imersão-instabytes"
    const colecao = db.collection("posts"); // Obtém a referência à coleção "posts"
    return colecao.updateOne({_id: new ObjectId(objectId)}, {$set: post});
}

export {get_todos_posts, create_post, upload_imagem, update_post};