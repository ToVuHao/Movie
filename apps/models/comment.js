const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ai là người bình luận?
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true }, // Bình luận ở phim nào?
    content: { type: String, required: true } // Nội dung bình luận
}, { timestamps: true }); // Tự động lưu thời gian bình luận

module.exports = mongoose.model('Comment', commentSchema);