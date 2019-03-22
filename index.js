// play this: https://www.youtube.com/watch?v=d-diB65scQU
require('dotenv').config();
const server = require('./server.js');

// code away!
const port = process.env.PORT || 4444;

server.listen(port, () => {
  console.log(` http://localhost:${port} `);
});