import Qualification from '../models/qualifications.js';

export const list = async (req, res) => {
  try {
    const items = await Qualification.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const item = await Qualification.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Qualification not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const item = new Qualification(req.body);
    await item.save();
    res.status(201).json({ message: 'Qualification saved successfully!', item });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Qualification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Qualification removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany();
    res.status(200).json({ message: 'All qualifications removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};