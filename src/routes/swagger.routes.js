const express = require("express");
const router = express.Router();
const { serve, setup } = require("../configs/swagger.config");

router.use('/swagger', serve, setup);
router.get('/', (req, res) => {
    res.redirect('/swagger');
});


module.exports = router;