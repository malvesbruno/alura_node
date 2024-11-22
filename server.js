import express from "express"; // Importa o módulo Express para criar o servidor web
import routes from "./src/routes/postRoutes.js";


// Conecta ao banco de dados usando a string de conexão fornecida nas variáveis de ambiente
const app = express(); // Cria uma aplicação Express
app.use(express.static("uploads"))
routes(app);


// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

