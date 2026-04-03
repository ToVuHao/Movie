const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Tên phim
    description: { type: String, required: true }, // Mô tả
    
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category' // Liên kết với bảng Category ở trên
    },
    country: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Country' // Liên kết với bảng Country
    },
    
    releaseYear: { type: Number }, // <-- ĐÃ THÊM: Năm phát hành

    thumbnail: { type: String }, // Link ảnh bìa
    videoUrl: { type: String }, // Link video phim
    views: { type: Number, default: 0 }, // Lượt xem mặc định là 0
    likes: { type: Number, default: 0 }, // Lượt yêu thích mặc định là 0
    isNewMovie: { type: Boolean, default: true } // Đánh dấu phim mới
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);