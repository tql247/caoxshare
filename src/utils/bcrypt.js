// dùng để ẩn đi mật khẩu của người dùng
// nhằm tăng cao tính bảo mật và độ tin cậy của trang web
const bcrypt = require('bcryptjs');

// hash password một chiều, nghĩa là không thể revert lại mật khẩu đã hash
// thành mật khẩu ban đầu, chỉ có thể kiểm tra password có khớp hay không
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

// kiểm tra password nhập vào có khớp với password lưu trong db hay không
// password: là mật khẩu người dùng nhập (vd: 123456, password, 123)
// hash_string: là mật khẩu đã được hash từ trước (vd: $2y$10$PN7Vd0XL2WIzt5h2wHUxQ.AuiMLf5StlEELtGHvbcWhH06jJ70M0y)
async function checkPassword(password, hash_string) {
    return bcrypt.compare(password, hash_string);
}

module.exports = {
    hashPassword, checkPassword
};
