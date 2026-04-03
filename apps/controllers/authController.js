const User = require('../models/user');

// 1. Mở trang Đăng nhập & Đăng ký
exports.getLogin = (req, res) => res.render('auth/login', { error: null });
exports.getRegister = (req, res) => res.render('auth/register', { error: null });

// 2. Xử lý khi bấm nút Đăng Ký
exports.postRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Kiểm tra xem email đã ai đăng ký chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/register', { error: 'Email này đã được sử dụng!' });
        }

        // Tạo tài khoản mới với quyền mặc định là 'user'
        await User.create({ name, email, password, role: 'user' });
        res.redirect('/login'); // Đăng ký xong đẩy về trang đăng nhập
    } catch (err) {
        res.render('auth/register', { error: 'Lỗi hệ thống khi đăng ký!' });
    }
};

// 3. Xử lý khi bấm nút Đăng Nhập
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Tìm user có email và mật khẩu khớp với dữ liệu nhập vào
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.render('auth/login', { error: 'Sai email hoặc mật khẩu!' });
        }

        // Lưu thông tin user vào Session để duyệt web không bị văng ra
        req.session.user = user;

        // Phân luồng: Admin thì vào trang quản trị, User thường thì về trang chủ
        if (user.role === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.render('auth/login', { error: 'Lỗi hệ thống khi đăng nhập!' });
    }
};

// 4. Xử lý Đăng xuất
exports.logout = (req, res) => {
    req.session.destroy(); // Xóa sạch session
    res.redirect('/');
};