const axios = require("axios");
const MODEL_URL = "http://localhost:8000";

exports.ner = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(`${MODEL_URL}/ner`, { text });
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.vlm = async (req, res) => {
  try {
    let { image_base64 } = req.body;
    if (typeof image_base64 === 'string' && image_base64.startsWith('data:image/png;base64,')) {
      image_base64 = image_base64.replace('data:image/png;base64,', '');
    }
    const response = await axios.post(`${MODEL_URL}/vlm`, { image_base64 });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.vlmRedact = async (req, res) => {
  try {
    const { file_path, polygon } = req.body;
    const response = await axios.post(`${MODEL_URL}/vlm/redact`, {
      file_path,
      polygon,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.vlmUnredact = async (req, res) => {
  try {
    const { file_path, polygon } = req.body;
    const response = await axios.post(`${MODEL_URL}/vlm/unredact`, {
      file_path,
      polygon,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
