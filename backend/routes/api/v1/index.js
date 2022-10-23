const express = require('express');

const artists = require('./artists/');
const categories = require('./categories/');
const places = require('./places/');
const reservations = require('./reservations/');
const reviews = require('./reviews/');
const roles = require('./roles/');
const styles = require('./styles/');
const types = require('./types/');
const users = require('./users/');
const auth = require('./auth/');

const mail = require('./mail');

const router = express.Router();

router.use('/artists/', artists);
router.use('/categories/', categories);
router.use('/places/', places);
router.use('/reservations/', reservations);
router.use('/reviews/', reviews);
router.use('/roles/', roles);
router.use('/styles/', styles);
router.use('/types/', types);
router.use('/users/', users);
router.use('/auth/', auth);
router.use('/mail/', mail);

module.exports = router;