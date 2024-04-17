const Kategori = require('../models/kategori.model');

const kategoriController = {};

kategoriController.create = async (req, res) => {
    try {
        const kategori = await Kategori.create(req.body);
        res.status(200).send(kategori)
    } catch (error) {
        res.status(400).send(error)
    }
}

kategoriController.findAll = async (req, res) => {
    try {
        const kategori = await Kategori.find();
        res.status(200).send(kategori)
    } catch (error) {
        res.status(400).send(error)
    }
}

kategoriController.findById = async (req, res) => {
    try {
        const kategori = await Kategori.findById(req.params.id, req.body);
        res.status(200).send(kategori)
    } catch (error) {
        res.status(400).send(error)
    }
}

kategoriController.delete = async (req, res) => {
    try {
        const kategori = await Kategori.findByIdAndDelete(req.params.id);
        res.status(200).json('kategori deleted')
    } catch (error) {
        res.status(400).send(error)
    }
}

kategoriController.update = async (req, res) => {
    try {
        const kategori = await Kategori.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(kategori)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = kategoriController;