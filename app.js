const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

const port = 3000

let dados = [ {
    id: uuidv4(),
    Nome: 'amaciante'
},{
    id: uuidv4(),
    Nome: 'shampoo'
},{
    id: uuidv4(),
    Nome: 'carvao'
},{
    id: uuidv4(),
    Nome: 'vassoura'
}]

app.get('/', (req, res) => {
  res.json(dados)
})
app.get('/:id', (req, res) => {
    let p = dados.filter( x=> x.id == req.params.id)

  res.send(p);
})
app.post('/', function (req, res) {
    let p = {
        id: uuidv4(),
        Nome: req.body
    }; 
    dados.push(p); 
    res.send(`Produto inserido!`);
  });

app.put('/:id', function (req, res) {
    let p = req.body;
    
    dados = dados.splice(dados.findIndex(x => x.id == req.params.id));

    dados.push(p);

    res.send(dados);
});

app.delete('/:id', function (req, res) {

    dados = dados.filter(x => x.id != req.params.id)

    res.send(dados).status(200);
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})