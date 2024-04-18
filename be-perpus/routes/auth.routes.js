const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user.model');
const auth = require('../middlewares/auth.middleware');

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send("user deleted");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByCredentials(username, password);
        const token = jwt.sign({ userId: user._id }, "access_token");
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/profile', auth, async (req, res) => {
    res.send(req.user);
});

module.exports = router;