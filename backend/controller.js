const axios = require('axios');
const MODEL_URL = 'http://localhost:8000';

exports.ner = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(`${MODEL_URL}/ner`, { text });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.vlm = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);
    const response = await axios.post(`${MODEL_URL}/vlm`, formData, {
      headers: formData.getHeaders()
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.vlmRedact = async (req, res) => {
  try {
    const { file_path, polygon } = req.body;
    const response = await axios.post(`${MODEL_URL}/vlm/redact`, { file_path, polygon });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.vlmUnredact = async (req, res) => {
  try {
    const { file_path, polygon } = req.body;
    const response = await axios.post(`${MODEL_URL}/vlm/unredact`, { file_path, polygon });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};