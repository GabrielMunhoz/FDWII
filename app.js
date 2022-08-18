const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Obtendo Lista de produto')
})
app.get('/:id', (req, res) => {
  res.send(`listando produto ${req.params.id}`);
})
app.post('/', function (req, res) {
    res.send('Inserindo um produto');
  });

app.put('/:id', function (req, res) {
res.send(`Atualizando produto ${req.params.id}`);
});

app.delete('/:', function (req, res) {
    res.send(`Deletando produto ${req.params.id}`);
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})