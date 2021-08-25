const express = require('express');
const {
  getFsps,
  addFsp,
  deleteFsp
} = require('../controllers/fsps');

const Fsp = require('../models/Fsp');

const router = express.Router();
const getQuerryFilters = require('../middleware/getQuerryFilters');
const { authenticate } = require('../middleware/authenticate');

router.use(authenticate);

router
  .route('/')
  .get(getQuerryFilters(Fsp), getFsps)
  .post(addFsp);

router
  .route('/:id')
  .delete(deleteFsp);

module.exports = router;