const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true // Tên thể loại không được trùng nhau
    },
    description: String
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

module.exports = mongoose.model('Category', categorySchema);