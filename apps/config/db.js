const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 'movie_db' ở cuối chính là tên database mới của bạn
        await mongoose.connect('mongodb://localhost:27017/movie_db');
        console.log('✅ Kết nối MongoDB thành công!');
    } catch (error) {
        console.error('❌ Lỗi kết nối MongoDB:', error);
        process.exit(1); // Dừng project nếu lỗi DB
    }
};

module.exports = connectDB;