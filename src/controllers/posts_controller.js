import {get_todos_posts, create_post, update_post} from "../models/posts.js";
import gerarDescricaoComGemini from "../services/service_gemini.js"
import fs from "fs";



export async function listar_posts(req, res){
    const resultados = await get_todos_posts(); // Chama a função para obter todos os posts
    res.status(200).json(resultados); // Responde com o array de posts em formato JSON
}

export async function postar_novo_post(req, res){
    const novo_post = req.body;
    try{
        const post_criado = await create_post(novo_post);
        res.status(200).json(post_criado)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}

export async function upload_imagem(req, res) {
    if (!req.file) {
        return res.status(400).json({ Erro: "Nenhum arquivo foi enviado." });
    }

    const novo_post = {
        descricao: "",
        imgUrl: req.file.originalname,
    };

    try {
        const postCriado = await create_post(novo_post);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomear o arquivo
        fs.renameSync(req.file.path, imagemAtualizada);

        res.status(200).json({
            mensagem: "Upload concluído!",
            post: postCriado,
            caminhoImagem: imagemAtualizada,
        });
    } catch (erro) {
        console.error("Erro ao fazer upload:", erro.message);
        res.status(500).json({ Erro: "Falha na requisição." });
    }
}

export async function atualiza_novo_post(req, res) {
    const id = req.params.id;
    const url_imagem = `http://localhost:3000/${id}.png`
    try{
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const post = {
            imgUrl: url_imagem,
            descricao: descricao
        }
        const post_criado = await update_post(id, post);
        res.status(200).json(post_criado)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}
