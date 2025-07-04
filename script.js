const express = require('express');
const app = express();
const port = 3000;

// Dados da API (em um caso real, isso viria de um banco de dados)
const periodos = require('./data/periodos.json');
const eventos = require('./data/eventos.json');
const personagens = require('./data/personagens.json');

app.get('/periodos', (req, res) => {
  res.json({ periodos });
});

app.get('/eventos', (req, res) => {
  const periodoId = req.query.periodo;
  const eventosFiltrados = eventos.filter(e => e.periodo_id == periodoId);
  res.json({ eventos: eventosFiltrados });
});

app.get('/personagens', (req, res) => {
  const periodoId = req.query.periodo;
  const personagensFiltrados = personagens.filter(p => p.periodo_id == periodoId);
  res.json({ personagens: personagensFiltrados });
});

app.listen(port, () => {
  console.log(`API de História do Brasil rodando em http://localhost:${port}`);
});