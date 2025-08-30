const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/ner', controller.ner);
router.post('/vlm', controller.vlm);
router.post('/vlm/redact', controller.vlmRedact);
router.post('/vlm/unredact', controller.vlmUnredact);

module.exports = router;