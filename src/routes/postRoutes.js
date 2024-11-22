import express from "express";
import multer from 'multer';
import { listar_posts, postar_novo_post, upload_imagem, atualiza_novo_post } from "../controllers/posts_controller.js";
import cors from 'cors';

const cors_options = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configuração do storage para Multer, especificando o destino e nome do arquivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Especifica o diretório para armazenar as imagens enviadas
        cb(null, 'uploads/'); // Substitua pelo caminho de upload desejado
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
    
});

// Cria uma instância do middleware Multer, assegurando que `storage` é usado corretamente
const upload = multer({ storage: storage });

// Define as rotas e middleware para a aplicação Express
const routes = (app) => {
    app.use(express.json()); // Adiciona middleware para analisar JSON no corpo das requisições
    app.use(cors(cors_options));
    
    app.get("/posts", listar_posts); // Rota para listar posts
    app.post("/posts", postar_novo_post); // Rota para adicionar novo post
    app.post("/upload", upload.single("imagem"), upload_imagem); // Rota para upload de imagem
    app.put("/upload/:id", atualiza_novo_post)
};

// 200 significa sucesso de conexão da requisição
// http.cat mostra todos os códigos HTTP

export default routes;
