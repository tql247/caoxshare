const jwt = require('jsonwebtoken');

function cookieHandle(cookie, next) {
    if (!cookie) {
        const err = new Error()
        err.status = 400;
        err.name = "Bad request"
        err.message = "Invalid access to specific url"
        return next(err);
    }

    if (!cookie["jwt"]) {
        const err = new Error();
        err.name = 'Unauthorized'
        err.status = 401;
        return next(err);
    }

    const token = cookie["jwt"]
    const data = jwt.verify(token, process.env.JWT_KEY);

    if (!data) {
        const err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    }

    return data
}

async function auth(req, res, next) {
    try {
        const data = cookieHandle(req.cookies, next)
        // req.user_profile = await get_account_data(data._id);
        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = {auth};
