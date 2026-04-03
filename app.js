const express = require('express');
const connectDB = require('./apps/config/db');
const User = require('./apps/models/user');
const Category = require('./apps/models/category'); // Gọi Model Thể loại
const Country = require('./apps/models/country');   // Gọi Model Quốc gia

const app = express();

// Khởi chạy kết nối Database
connectDB();

// Cấu hình để đọc dữ liệu từ Form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require('express-session');

// Cấu hình Session
app.use(session({
    secret: 'phim_moi_secret_key_123',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// QUAN TRỌNG: Cấu hình biến toàn cục cho toàn bộ Giao diện (Views)
// Tự động truyền User, Menu Thể Loại và Menu Quốc Gia sang tất cả các file EJS
app.use(async (req, res, next) => {
    try {
        res.locals.user = req.session.user || null;
        res.locals.categories = await Category.find(); // Lấy tất cả thể loại
        res.locals.countries = await Country.find();   // Lấy tất cả quốc gia
        next();
    } catch (error) {
        console.log("Lỗi tải Menu:", error);
        next();
    }
});

// Cấu hình View Engine là EJS
app.set('view engine', 'ejs');
app.set('views', './apps/views');
app.use(express.static('public'));

// Hàm tự động tạo Admin
const createDefaultAdmin = async () => {
    try {
        const adminEmail = 'tovu5810@gmail.com';
        const adminExists = await User.findOne({ email: adminEmail });
        
        if (!adminExists) {
            await User.create({
                name: 'Tô Vũ Hào',
                email: adminEmail,
                password: '123', 
                role: 'admin'
            });
            console.log('👤 Đã tạo tài khoản Admin mặc định!');
        }
    } catch (err) {
        console.log('Lỗi tạo Admin:', err);
    }
};
createDefaultAdmin();

// --- BẢO VỆ ADMIN (MIDDLEWARE) ---
const checkAdmin = (req, res, next) => {
    // Nếu có đăng nhập và role là admin thì đi tiếp, ngược lại đuổi ra login
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.redirect('/login');
    }
};

// --- ĐỊNH NGHĨA CÁC ROUTES ---
const homeController = require('./apps/controllers/homeController');
const adminController = require('./apps/controllers/adminController');
const authController = require('./apps/controllers/authController');
const upload = require('./apps/middleware/upload');

// Routes Đăng nhập / Đăng ký
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);
app.get('/logout', authController.logout);

// Routes cho Trang chủ
app.get('/', homeController.getHomePage);
app.get('/movie/:id', homeController.getMovieDetails); 
app.get('/search', homeController.searchMovies);

// THÊM 2 DÒNG NÀY ĐỂ LỌC PHIM
app.get('/category/:id', homeController.getMoviesByCategory); 
app.get('/country/:id', homeController.getMoviesByCountry);

// --- ROUTES XỬ LÝ BÌNH LUẬN (MỚI THÊM) ---
app.post('/comment/add', homeController.addComment);
app.get('/admin/comment/delete/:id', checkAdmin, homeController.deleteComment); 
// ----------------------------------------

// Routes cho Admin (Đã kẹp checkAdmin vào giữa để bảo vệ)
app.get('/admin', checkAdmin, adminController.getDashboard);
app.post('/admin/category/add', checkAdmin, adminController.addCategory);
app.post('/admin/movie/add', checkAdmin, upload.single('thumbnail'), adminController.addMovie);
app.post('/admin/user/role', checkAdmin, adminController.updateRole);

app.post('/admin/country/add', checkAdmin, adminController.addCountry);
app.post('/admin/country/edit', checkAdmin, adminController.editCountry);
app.get('/admin/country/delete/:id', checkAdmin, adminController.deleteCountry);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});