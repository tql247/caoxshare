// Gọi thư viện/module đã định nghĩa
const path = require('path')
const express = require('express');
const routerDefine = require('./routes');
const {NotFound, ErrorHandler} = require("./handlers");
const passport = require("passport");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

// Set đặt tính async await cho mongoose
// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

// Dùng cho xác thực
app.use(passport.initialize({}))

// Dùng để lấy cookie trong request header
app.use(cookieParser())

// Dùng để lấy nội dung của request
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json())

// Dùng để cho phép truy cập theo cors policy
app.use(cors())

// Dùng để serve một thư mục với đường dẫn /public
app.use('/public', express.static(path.resolve(__dirname, '../public')))

// Định nghĩa view engine
app.set('view engine', 'ejs');

// Định nghĩa thư mục của view engine
app.set('views', path.join(__dirname, '/views'));

// Sử dụng để chấp nhận proxy ip https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

// Gọi và sử dụng các route đã định nghĩa
router.use(routerDefine)
app.use(router)

// Sử dụng các handler
app.use([NotFound, ErrorHandler])

module.exports = app
