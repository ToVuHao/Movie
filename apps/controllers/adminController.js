const Category = require('../models/category');
const Country = require('../models/country'); // Gọi thêm Model Country
const Movie = require('../models/movie');
const User = require('../models/user');

exports.getDashboard = async (req, res) => {
    try {
        const categories = await Category.find();
        const countries = await Country.find(); // Lấy danh sách quốc gia
        // populate('country') để lấy luôn tên quốc gia hiển thị ra bảng
        const movies = await Movie.find().populate('category').populate('country'); 
        const users = await User.find();

        res.render('admin/index', { categories, countries, movies, users });
    } catch (error) {
        res.status(500).send('Lỗi máy chủ');
    }
};

exports.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        await Category.create({ name, description });
        res.redirect('/admin');
    } catch (error) { res.status(500).send('Lỗi thêm thể loại'); }
};

// --- CHỨC NĂNG QUẢN LÝ QUỐC GIA ---
exports.addCountry = async (req, res) => {
    try {
        const { name, description } = req.body;
        await Country.create({ name, description });
        res.redirect('/admin');
    } catch (error) { res.status(500).send('Lỗi thêm quốc gia'); }
};

exports.editCountry = async (req, res) => {
    try {
        const { countryId, name, description } = req.body;
        await Country.findByIdAndUpdate(countryId, { name, description });
        res.redirect('/admin');
    } catch (error) { res.status(500).send('Lỗi sửa quốc gia'); }
};

exports.deleteCountry = async (req, res) => {
    try {
        await Country.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) { res.status(500).send('Lỗi xóa quốc gia'); }
};
// ---------------------------------

// --- ĐÃ CẬP NHẬT: Nhận thêm views, likes và releaseYear từ form ---
exports.addMovie = async (req, res) => {
    try {
        // Khai báo thêm biến releaseYear ở đây
        const { title, description, category, country, videoUrl, views, likes, releaseYear } = req.body;
        const thumbnailPath = req.file ? '/images/' + req.file.filename : '';

        await Movie.create({ 
            title, 
            description, 
            category, 
            country, 
            thumbnail: thumbnailPath, 
            videoUrl,
            views: views || 0, // Lưu lượt xem vào DB
            likes: likes || 0, // Lưu lượt thích vào DB
            releaseYear: releaseYear // Lưu năm phát hành vào DB
        });
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        res.status(500).send('Lỗi thêm phim');
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        await User.findByIdAndUpdate(userId, { role: role });
        res.redirect('/admin');
    } catch (error) { res.status(500).send('Lỗi cập nhật quyền'); }
};