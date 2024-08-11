const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conecta ao banco de dados SQLite
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        // Se ocorrer um erro na conexão com o banco de dados, exibe uma mensagem de erro
        return console.error('Falha ao conectar ao banco de dados:', err.message);
    }
    // Mensagem exibida quando a conexão com o banco de dados é bem-sucedida
    console.log('Conectado ao banco de dados SQLite.');
});

// Cria a tabela "digimon" se ela não existir
db.serialize(() => {
    // Executa o comando SQL para criar a tabela
    db.run(`CREATE TABLE IF NOT EXISTS digimon (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL
    )`, (err) => {
        if (err) {
            // Se ocorrer um erro ao criar a tabela, exibe uma mensagem de erro
            return console.error('Falha ao criar a tabela "digimon":', err.message);
        }
        // Mensagem exibida quando a tabela é criada com sucesso
        console.log('Tabela "digimon" está pronta.');
    });
});

module.exports = db;
