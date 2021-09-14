// Xoá code vượt quá 20 hoặc quá 48 tiếng
function clearListCode(codes) {
    const crrTime = Date.now();
    codes.filter((code) => {
        isExceed48h(crrTime, code);
    })

    codes.splice(20, codes.length - 20);
}

// Kiểm tra thời gian vượt quá 48 tiếng hay chưa
function isExceed48h(crrTime, timeCheck) {
    return (crrTime - timeCheck)/1000/60/60 > 48
}

module.exports = clearListCode
