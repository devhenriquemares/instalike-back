import { MongoClient } from 'mongodb';

// Importa a classe MongoClient do pacote mongodb. Essa classe é essencial para interagir com o banco de dados MongoDB.

export default async function conectarAoBanco(stringConexao) {
    // Define uma função assíncrona chamada conectarAoBanco que recebe uma string de conexão como parâmetro. 
    // Essa função é exportada para ser utilizada em outros módulos.

    let mongoClient;
    // Declara uma variável mongoClient para armazenar a instância do cliente MongoDB.

    try {
        // Bloco try-catch para tratar possíveis erros durante a conexão.

        mongoClient = new MongoClient(stringConexao);
        // Cria uma nova instância do cliente MongoDB, passando a string de conexão como argumento. Essa string contém as informações necessárias para se conectar ao banco de dados.

        console.log('Conectando ao cluster do banco de dados...');
        // Exibe uma mensagem no console indicando que a conexão está sendo estabelecida.

        await mongoClient.connect();
        // Espera a conclusão da conexão com o banco de dados. A palavra-chave await é usada para pausar a execução da função até que a conexão seja estabelecida.

        console.log('Conectado ao MongoDB Atlas com sucesso!');
        // Exibe uma mensagem de sucesso caso a conexão seja estabelecida com êxito.

        return mongoClient;
        // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código.

    } catch (erro) {
        // Bloco catch para tratar os erros que possam ocorrer durante a conexão.

        console.error('Falha na conexão com o banco!', erro);
        // Exibe uma mensagem de erro no console, juntamente com o objeto de erro para mais detalhes.

        process.exit();
        // Encerra a execução do processo em caso de erro, evitando que o programa continue com a conexão falhada.
    }
}

/*import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return mongoClient;
    } catch (erro) {
        console.error('Falha na conexão com o banco!', erro);
        process.exit();
    }
}*/