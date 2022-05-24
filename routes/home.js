const express = require('express');
const { append } = require('express/lib/response');

const router = express.Router();

router.get((req, res) => {
res.render('index',{title: 'My Express App', mesage: 'Hello'});
});

router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;