const Buku = require('../models/buku.model');

const bukuController = {};

bukuController.create = async (req, res) => {
    try {
        const buku = await Buku.create(req.body);
        res.status(200).send(buku)
    } catch (error) {
        res.status(400).send(error)
    }
}

bukuController.findAll = async (req, res) => {
    try {
        const buku = await Buku.find().populate('kategoriId');
        res.status(200).send(buku)
    } catch (error) {
        res.status(400).send(error)
    }
}

bukuController.findById = async (req, res) => {
    try {
        const buku = await Buku.findById(req.params.id, req.body);
        res.status(200).send(buku)
    } catch (error) {
        res.status(400).send(error)
    }
}

bukuController.delete = async (req, res) => {
    try {
        const buku = await Buku.findByIdAndDelete(req.params.id);
        res.status(200).json('buku deleted')
    } catch (error) {
        res.status(400).send(error)
    }
}

bukuController.update = async (req, res) => {
    try {
        const buku = await Buku.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(buku)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = bukuController;