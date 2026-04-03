const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], // Chỉ được phép là 1 trong 2 quyền này
        default: 'user' // Mặc định ai đăng ký cũng là user thường
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);