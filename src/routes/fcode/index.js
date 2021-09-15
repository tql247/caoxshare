const express = require('express');
const addFcodeToDatabase = require("../../data/services/addFcodeToDatabase");
const getListFcode = require("../../data/services/getListFcode");
const getFcode = require("../../data/services/getFcode");
const updateHupTime = require("../../data/services/updateHupTime");
const {checkPassword} = require("../../utils/bcrypt");
const router = express.Router();
const { v4: uuid } = require('uuid');


router.get('/', async (req, res)=>{
    const listCode = await getListFcode();
    return res.render('fcode', {listCode: listCode});
})

router.post('/post', async (req, res)=>{
    // uuid()
    const newFcode = {
        created_at: req.body['created_at'],
        id: uuid(),
        code: req.body['fcode'],
        hup_time: req.body['hup'],
    };

    await addFcodeToDatabase(newFcode)

    return res.send(newFcode);
})

router.get('/get', async (req, res)=>{
    // io.emit('outside');
    const caoxPass = req.query["caoxPass"];
    const fcodeId = req.query["fcodeId"];

    const isCaox = await checkPassword(caoxPass, process.env.CAOX_PASS_HASH);

    if (!isCaox) {
        res.send({
            status: false,
            fcode: "Mật khẩu không đúng"
        })
    } else {
        const fcode = await getFcode(fcodeId);
        await updateHupTime(fcodeId);

        const code = {
            status: true,
            fcode: fcode.code
        }

        res.send(code);
    }
})

module.exports = router;
