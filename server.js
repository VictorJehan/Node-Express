const express = require('express')
const app = express()
const port = 3000;

app.use(express.json())

let pessoas = [
    { id: 1, nome: "Pessoa 1" },
    { id: 2, nome: "Pessoa 2" },
    { id: 3, nome: "Pessoa 3" },
];

app.get('/pessoas', (req, res) => {
    res.json(pessoas)
})

app.post(
    '/pessoas',
    (req, res) => {
        const nome = req.body.nome
        const novaPessoa = {
            id: pessoas.length + 1,
            nome: nome
            }
            pessoas.push(novaPessoa);
            res.status(201).json(novaPessoa)
        }
    )

    app.put(
        '/pessoas/:id',
        (req, res) => {
            const id = parseInt(req.params.id)
            const {nome} = req.body

            const pessoa = pessoas.find(p => p.id === id)

            if(pessoa){
                pessoa.nome = nome
                res.json(pessoa)
            }else{
                res.status(404).json({error: 'Pessoa não encontrada.'})
            }
        }
    )

    app.delete(
        '/pesoas/:id',
        (req, res) => {
            const id = parseInt(req.params.id)
            const index = pessoas.findIndex(p => p.id  === id)

            if(index !== -1){
                const pessoaDeletada = pessoas.splice(index, 1)
                res.json(pessoaDeletada[0])
            }else{
                res.status(404).json({ error: "pessoa não encontrada."})
            }
        }
    )

app.get(
    '/pessoas/:id',
    (req, res) => {
        const id = parseInt(req.params.id);
        const pessoa = pessoas.find(p => p.id === id);

        if (pessoa) {
            res.json(pessoa);
        } else {
            res.status(404).json({ error: 'Pessoa não encontrada.' });
        }
    }
)

app.listen(port, () => {
    console.log(`Servido em execução: http://localhost:${port}`);
})