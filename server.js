const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Projects and Actions API</h2>
      <p>Welcome </p>
      `);
});


module.exports = server;