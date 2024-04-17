const Koleksi = require('../models/koleksi.model');

const koleksiController = {};

koleksiController.create = async (req, res) => {
    try {
        const koleksi = await Koleksi.create(req.body);
        res.status(200).send(koleksi)
    } catch (error) {
        res.status(400).send(error)
    }
}

koleksiController.findAll = async (req, res) => {
    try {
        const koleksi = await Koleksi.find();
        res.status(200).send(koleksi)
    } catch (error) {
        res.status(400).send(error)
    }
}

koleksiController.findById = async (req, res) => {
    try {
        const koleksi = await Koleksi.findById(req.params.id, req.body);
        res.status(200).send(koleksi)
    } catch (error) {
        res.status(400).send(error)
    }
}

koleksiController.delete = async (req, res) => {
    try {
        const koleksi = await Koleksi.findByIdAndDelete(req.params.id);
        res.status(200).json('koleksi deleted')
    } catch (error) {
        res.status(400).send(error)
    }
}

koleksiController.update = async (req, res) => {
    try {
        const koleksi = await Koleksi.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(koleksi)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = koleksiController;