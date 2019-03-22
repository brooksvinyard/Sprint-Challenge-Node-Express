const express = require('express');

const server = express();

server.use(express.json());

const projectsRouter = require('./projects/projects-router.js');
const actionsRouter = require('./actions/actions-router.js');


server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


server.get('/', (req, res) => {
    res.send(`
      <h2>Projects and Actions API</h2>
      <p>Welcome </p>
      `);
});


module.exports = server;