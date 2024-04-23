// Import do framework express

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    //testes para verificar se a rota esta funcionando
    let i = 0;
    if (i == 0) {
        res.status(200).send("Aplicativo funcionando").end();
    } else {
        res.status(404).send("Erro na requisição").end();
    }
})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

app.get ("/consultar", (req,res) => {
    //Destructuring - Desestruturando dados provenientes do back
    let { nome, matricula } = req.query;
    console.log(nome, matricula); 
    res.status(200).send("Realizzando a listagem dos dados").end();
});

const cursos = ['React  Native', 'Javascript', 'NodeJS'];

//Retorna todos os cursos existentes no array
app.get("/cursos", async (req, res) => {
    return res.json(cursos);
});

//retorna o curso selecionado pelo index armazenado no array
app.get("/cursos/:index", (req, res) => {
    const { index } = req.params;
    //console.log('Chegou aqui');

    return res.json(cursos[index])
})

//criando um novo curso
app.post('/cursos', (req, res) => {
    const { nome } = req.body;
    //nomeamos a constante como nome, então no json do inmsonia deve ser nome tambem {"nome" : "PHP"}
    cursos.push(nome);
    return res.json(cursos);
})

//Update - atualizando curso
app.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { nome } = req.body;

    cursos[index] = nome;

    return res.json(cursos);
})

//Deletando curso
app.delete('/cursos/:index', (req,res) => {
    const {index} = req.params;
    
    const cursoDeletado = cursos[index];
    cursos.splice(index,1);
    return res.json({ message: `Curso de ${cursoDeletado} deletado com sucesso!`});

    //nao envia nehum tipo de mensagem
    //return res.send()

})
