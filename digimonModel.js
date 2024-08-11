const db = require('./db');

// Create: Insere um novo Digimon no banco de dados
function createDigimon(name, type, callback) {
    const sql = `INSERT INTO digimon (name, type) VALUES (?, ?)`;
    
    // Executa a inserção no banco de dados
    db.run(sql, [name, type], function(err) {
        if (err) {
            // Retorna o erro através do callback em caso de falha na inserção
            return callback(err);
        }
        // Retorna o Digimon criado com seu novo ID
        callback(null, { id: this.lastID, name, type });
    });
}

// Read: Obtém todos os Digimons do banco de dados
function getAllDigimon(callback) {
    const sql = `SELECT * FROM digimon`;
    
    // Executa a consulta no banco de dados
    db.all(sql, [], (err, rows) => {
        if (err) {
            // Retorna o erro através do callback em caso de falha na consulta
            return callback(err);
        }
        // Retorna todas as linhas (Digimons) encontradas
        callback(null, rows);
    });
}

// Read: Obtém um único Digimon pelo ID
function getDigimonById(id, callback) {
    const sql = `SELECT * FROM digimon WHERE id = ?`;
    
    // Executa a consulta para obter um Digimon específico pelo ID
    db.get(sql, [id], (err, row) => {
        if (err) {
            // Retorna o erro através do callback em caso de falha na consulta
            return callback(err);
        }
        // Retorna o Digimon encontrado
        callback(null, row);
    });
}

// Update: Atualiza o nome e tipo de um Digimon pelo ID
function updateDigimon(id, name, type, callback) {
    const sql = `UPDATE digimon SET name = ?, type = ? WHERE id = ?`;
    
    // Executa a atualização no banco de dados
    db.run(sql, [name, type, id], function(err) {
        if (err) {
            // Retorna o erro através do callback em caso de falha na atualização
            return callback(err);
        }
        // Retorna o Digimon atualizado
        callback(null, { id, name, type });
    });
}

// Delete: Remove um Digimon pelo ID
function deleteDigimon(id, callback) {
    const sql = `DELETE FROM digimon WHERE id = ?`;
    
    // Executa a exclusão do Digimon no banco de dados
    db.run(sql, [id], function(err) {
        if (err) {
            // Retorna o erro através do callback em caso de falha na exclusão
            return callback(err);
        }
        // Retorna uma mensagem de sucesso indicando que o Digimon foi deletado
        callback(null, { message: `Digimon com ID ${id} deletado com sucesso` });
    });
}

// Exporta as funções CRUD
module.exports = {
    createDigimon,
    getAllDigimon,
    getDigimonById,
    updateDigimon,
    deleteDigimon
};
