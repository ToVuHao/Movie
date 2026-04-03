const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Lưu ảnh vào thư mục public/images mà chúng ta đã tạo từ bài 1
        cb(null, './public/images'); 
    },
    filename: function (req, file, cb) {
        // Gắn thêm thời gian (Date.now) vào trước tên file để đảm bảo không bao giờ trùng tên
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;