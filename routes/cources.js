const Joi = require('joi');

const express = require('express');
const router = express.Router();

const cources = [
    { name: "Atul", id: 1},
    { name: "Bihari", id: 2}
]

router.get('/', (req, res) => {
    res.send(cources);
});

router.get('/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource)
        res.status(404).send('The Cource wth the given ID was not found');
    res.send(cource);
})

router.post('', (req, res) => {
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

router.put('/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('The Cource wth the given ID was not found');

    const {
        error
    } = validateCource(req);
    if (error) return res.status(400).send(error.details[0].message)
    cource.name = req.body.name;
    res.send(cource);
})

router.delete('/:id', (req, res) => {
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

module.exports = router;