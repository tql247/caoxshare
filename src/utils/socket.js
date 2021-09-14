// Gọi các hàm
const app = require("../index");
const httpServer = require('http').createServer(app);
const {Server} = require("socket.io");
const PORT = process.env.PORT || 5000

// Định nghĩa socket
global.io = new Server(httpServer, {
    cors: {
        origin: "*", /*Cho phép truy cập từ mọi nguồn*/
        methods: ["*"], /*Mọi phương tức*/
        credentials: true
    },
    allowEIO3: true /*Đảm bảo tương thích giữa các phiên bản socket io*/
});

httpServer.listen(PORT);

console.log('Server is running...')