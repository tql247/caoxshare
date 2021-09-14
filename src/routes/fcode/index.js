const express = require('express');
const {checkPassword} = require("../../utils/bcrypt");
const router = express.Router();
const { v4: uuid } = require('uuid');
let listCode = [];

router.get('/', (req, res)=>{
    // io.emit('outside');
    return res.render('fcode', {listCode: listCode});
})

router.post('/post', (req, res)=>{
    // uuid()
    const newFcode = [{
        time: Date.now(),
        id: uuid(),
        fcode: req.body['fcode'],
        hup: req.body['hup'],
    }];

    listCode = [...newFcode, ...listCode]

    return res.send(newFcode);
})

router.get('/get', async (req, res)=>{
    // io.emit('outside');
    const caoxPass = req.query["caoxPass"];
    const fcodeId = req.query["fcodeId"];
    const isCaox = await checkPassword(caoxPass, process.env.CAOX_PASS_HASH);

    let codeIndex = listCode.findIndex((code => code.id === fcodeId));
    listCode[codeIndex].hup += 1

    const code = {
        status: isCaox,
        fcode: isCaox?listCode[codeIndex].fcode:"Mật khẩu không đúng"
    }

    res.send(code);
})

module.exports = router;
