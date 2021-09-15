// Thêm fcode vào elephant postgres database
const config = require("../../../config");
const { Pool } = require('pg');

async function addFcodeToDatabase(fcode) {
    try {
        // pools will use environment variables
        // for connection information
        const pool = new Pool()
        const queryString = `
            INSERT INTO fcode (id, code, hup_time, created_at) 
            VALUES('${fcode["id"]}', '${fcode["code"]}', ${fcode["hup_time"]}, TO_TIMESTAMP('${fcode["created_at"]}', 'YYYY-MM-DD HH:MI:SS'));
        `

        // console.log(queryString)
        const res = await pool.query(queryString)
        await pool.end()

        return res.rows;
    } catch (e) {
        throw e
    }
}

module.exports = addFcodeToDatabase
