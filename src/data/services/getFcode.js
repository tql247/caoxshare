// Lấy ra 1 code
const { Pool } = require('pg');

async function getFcode(id) {
    try {
        // pools will use environment variables
        // for connection information
        const pool = new Pool()
        const queryString = `
            SELECT id, code, hup_time, created_at FROM fcode
            where id like '${id}';
        `
        const res = await pool.query(queryString)
        await pool.end()

        return res.rows[0];
    } catch (e) {
        throw e
    }
}

module.exports = getFcode
