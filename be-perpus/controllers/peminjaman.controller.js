const Peminjaman = require('../models/peminjaman.model');

const peminjamanController = {};

peminjamanController.create = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.create(req.body);
        res.status(200).send(peminjaman)
    } catch (error) {
        res.status(400).send(error)
    }
}

peminjamanController.findAll = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.find().populate('userId').populate('bukuId');
        res.status(200).send(peminjaman);
    } catch (error) {
        res.status(400).send(error);
    }
}

peminjamanController.findById = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findById(req.params.id).populate('userId').populate('bukuId');
        res.status(200).send(peminjaman);
    } catch (error) {
        res.status(400).send(error);
    }
}


peminjamanController.delete = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findByIdAndDelete(req.params.id);
        res.status(200).json('peminjaman deleted')
    } catch (error) {
        res.status(400).send(error)
    }
}

peminjamanController.update = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(peminjaman)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = peminjamanController;