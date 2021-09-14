const NotFound = (req, res, next) => {
    return res.send('Not found url');
}

const ErrorHandler = (err, req, res, next) => {
    console.log(Object.entries(err))

    if (err.name === "TokenExpiredError") {
        err.status = 401
        res.redirect('/user/login')
    }

    if (err.name === "Unauthorized") {
        err.status = 401
        res.redirect('/user/login')
    }

    if (err.name === "Access Denies") {
        err.status = 401
        res.clearCookie('jwt')
        res.redirect('/user/login')
    }

    if (err.name === "Page not found") {
        err.status = 404;
    }

    if (!err.status) err.status = 400
    return res.status(err.status).json({
        name: err.name,
        message: err.message
    });
};

module.exports = {
    NotFound,
    ErrorHandler,
}
