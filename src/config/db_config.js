import { MongoClient } from "mongodb"; // Importa o módulo MongoClient do pacote mongodb

/**
 * Função assíncrona para conectar ao banco de dados MongoDB.
 * @param {string} stringConexao - A string de conexão para o banco de dados MongoDB.
 * @returns {MongoClient} - A instância do cliente MongoDB conectado.
 */

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;
    try {
        mongoClient = new MongoClient(stringConexao); // Cria uma nova instância de MongoClient com a string de conexão
        console.log("Conectando ao banco de dados"); // Mensagem de log informando que a conexão está sendo iniciada
        await mongoClient.connect(); // Tenta conectar ao banco de dados
        console.log("Conectado ao banco de dados!"); // Mensagem de log informando que a conexão foi bem-sucedida
        return mongoClient; // Retorna a instância do cliente MongoDB conectado
    } catch (error) {
        console.log(error); // Imprime qualquer erro que ocorrer durante a conexão
        process.exit(); // Encerra o processo em caso de erro
    }
}
