const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const cources = [{
        "id": 1,
        "name": "cource1"
    },
    {
        "id": 2,
        "name": "cource2"
    },
    {
        "id": 3,
        "name": "cource3"
    }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/cources/', (req, res) => {
    res.send(cources);
});

app.get('/api/cources/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource)
        res.status(404).send('The Cource wth the given ID was not found');
    res.send(cource);
})

app.post('/api/cources', (req, res) => {
    const {
        error
    } = validateCource(req);
    if (error) return res.status(400).send(error.details[0].message)


    const cource = {
        id: cources.length + 1,
        name: req.body.name
    };
    cources.push(cource);
    res.status(201).send(cource);
});

app.put('/api/cources/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('The Cource wth the given ID was not found');

    const {
        error
    } = validateCource(req);
    if (error) return res.status(400).send(error.details[0].message)
    cource.name = req.body.name;
    res.send(cource);
})

app.delete('/api/cources/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('The Cource wth the given ID was not found');
    const index = cources.indexOf(cource);
    cources.splice(index, 1);
    res.send(cource);
})

function validateCource(req) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(req.body);
}

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening on the port ${port}...`));