// "use strict";
const express = require('express');
const router = express.Router();

router.get('/test', (req, res)=>{
    // io.emit('outside');
    res.send('hm');
})

const fcode = require('./fcode');
router.use('/fcode', fcode);

module.exports = router;
