// Thêm fcode vào elephant postgres database
const config = require("../../../config");
const { Pool } = require('pg');

async function getListFcode() {
    try {
        // pools will use environment variables
        // for connection information
        const pool = new Pool()
        const queryString = `
            SELECT id, code, hup_time, created_at FROM fcode
            order by id desc;
        `
        const res = await pool.query(queryString)
        await pool.end()

        return res.rows;
    } catch (e) {
        throw e
    }
}

module.exports = getListFcode
