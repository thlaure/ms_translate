const express = require('express');
const server = express();
const port = 3000;
const translate = express.Router();

server.use('/translate', translate);

translate.get('/:service', (req, res) => {
    res.send(req.params.service);
});

server.listen(port, (err) => {
    if (err) console.log(`!!! Error: ${err} on server listening on port ${port}`);
    console.log(`Server listening on port ${port}`);
});