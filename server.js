// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const digimonModel = require('./digimonModel');

const app = express();

// Configura o mecanismo de visualização para EJS (Embedded JavaScript), que será usado para renderizar as views.
app.set('view engine', 'ejs');

// Define o diretório 'public' como a pasta de arquivos estáticos, onde o Express buscará arquivos CSS, JS, imagens, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear os dados do corpo das requisições HTTP. 
// Utilizado para interpretar dados de formulários enviados via POST.
app.use(bodyParser.urlencoded({ extended: true }));

// Rota principal - Exibe a lista de Digimons
app.get('/', (req, res) => {
    // Busca todos os Digimons no banco de dados usando o modelo definido
    digimonModel.getAllDigimon((err, digimons) => {
        if (err) {
            // Em caso de erro ao acessar o banco de dados, retorna uma mensagem de erro com status 500.
            return res.status(500).send('Erro no Banco de Dados');
        }
        // Renderiza a view 'index.ejs' passando o título e a lista de Digimons para o template
        res.render('index', { title: 'Lista de Digimons', digimons });
    });
});

// Rota para criar um novo Digimon
app.post('/create', (req, res) => {
    const { name, type } = req.body; // Desestruturação dos dados do formulário
    // Chama o modelo para criar um novo Digimon com os dados fornecidos
    digimonModel.createDigimon(name, type, (err) => {
        if (err) {
            // Em caso de erro ao criar o Digimon, retorna uma mensagem de falha com status 500.
            return res.status(500).send('Falha ao criar Digimon');
        }
        // Redireciona para a página principal após a criação do Digimon
        res.redirect('/');
    });
});

// Rota para atualizar um Digimon existente
app.post('/update/:id', (req, res) => {
    const { id } = req.params; // Obtém o ID do Digimon a partir dos parâmetros da URL
    const { name, type } = req.body; // Obtém os dados do formulário para atualizar o Digimon
    // Chama o modelo para atualizar o Digimon com o ID e novos dados fornecidos
    digimonModel.updateDigimon(id, name, type, (err) => {
        if (err) {
            // Em caso de erro ao atualizar o Digimon, retorna uma mensagem de falha com status 500.
            return res.status(500).send('Falha ao atualizar Digimon');
        }
        // Redireciona para a página principal após a atualização do Digimon
        res.redirect('/');
    });
});

// Rota para deletar um Digimon
app.post('/delete/:id', (req, res) => {
    const { id } = req.params; // Obtém o ID do Digimon a partir dos parâmetros da URL
    // Chama o modelo para deletar o Digimon com o ID fornecido
    digimonModel.deleteDigimon(id, (err) => {
        if (err) {
            // Em caso de erro ao deletar o Digimon, retorna uma mensagem de falha com status 500.
            return res.status(500).send('Falha ao deletar Digimon');
        }
        // Redireciona para a página principal após a exclusão do Digimon
        res.redirect('/');
    });
});

// Inicia o servidor na porta especificada pela variável de ambiente PORT ou na porta 3000 se não estiver definida
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
