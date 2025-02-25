import mysql from 'mysql2/promise';

// Criando um pool de conexões com o banco de dados MySQL
// As variáveis de ambiente (process.env) são definidas no arquivo .env na raiz do projeto
// process.env.DB_PORT contém a porta do banco de dados definida no .env, por exemplo: DB_PORT=3306
const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT, // Obtém a porta do banco de dados da variável de ambiente DB_PORT
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
    ssl: {
        ca: Buffer.from(process.env.DB_SSL_CA_BASE64, 'base64').toString('utf-8'),
    },
});

// Funcção para obter uma conexão do pool
export async function getConnection() {
    return await pool.getConnection();
}

export default pool;