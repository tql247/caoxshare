// Cập nhật số lần húp
const { Pool } = require('pg');

async function updateHupTime(id) {
    try {
        // pools will use environment variables
        // for connection information
        const pool = new Pool()
        const queryString = `
            UPDATE fcode SET hup_time=hup_time+1 where id like '${id}';
        `
        const res = await pool.query(queryString)
        await pool.end()

        return res.rows;
    } catch (e) {
        throw e
    }
}

module.exports = updateHupTime
