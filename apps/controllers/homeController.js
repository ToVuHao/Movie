const Movie = require('../models/movie');
const Category = require('../models/category');
const Comment = require('../models/comment'); // <-- Gọi thêm Model Bình luận
const Country = require('../models/country');

// Chức năng 1: Hiển thị Trang chủ
exports.getHomePage = async (req, res) => {
    try {
        const categories = await Category.find();

        // Lấy phim theo các tiêu chí bạn yêu cầu
        const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(12); // Phim mới nhất
        const topViews = await Movie.find().sort({ views: -1 }).limit(12);     // Xem nhiều nhất
        const topLikes = await Movie.find().sort({ likes: -1 }).limit(12);     // Yêu thích nhất

        // Đổ dữ liệu ra giao diện home/index.ejs
        res.render('home/index', { 
            categories, 
            newMovies, 
            topViews, 
            topLikes 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi tải trang chủ");
    }
};

// Chức năng 2: Mở trang xem chi tiết phim và Tự động tăng lượt xem
exports.getMovieDetails = async (req, res) => {
    try {
        const movieId = req.params.id; // Lấy ID của phim từ thanh địa chỉ (URL)

        // Tìm phim theo ID, đồng thời tự động cộng thêm 1 vào cột views (lượt xem)
        const movie = await Movie.findByIdAndUpdate(
            movieId, 
            { $inc: { views: 1 } }, 
            { new: true }
        ).populate('category').populate('country');

        if (!movie) {
            return res.status(404).send('Không tìm thấy phim này!');
        }

        // Lấy danh sách bình luận của phim này, sắp xếp từ mới nhất đến cũ nhất
        const comments = await Comment.find({ movie: movieId }).populate('user').sort({ createdAt: -1 });

        // Đổ dữ liệu movie và comments ra file detail.ejs
        res.render('home/detail', { movie, comments });
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi tải trang xem phim");
    }
};

// Chức năng 3: Thêm Bình Luận Mới
exports.addComment = async (req, res) => {
    try {
        // Phải đăng nhập mới được bình luận
        if (!req.session.user) return res.redirect('/login'); 
        
        const { movieId, content } = req.body;
        await Comment.create({
            user: req.session.user._id,
            movie: movieId,
            content: content
        });
        
        res.redirect('/movie/' + movieId); // Thêm xong thì load lại đúng trang phim đó
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi thêm bình luận");
    }
};

// Chức năng 4: Xóa Bình Luận (Chỉ Admin)
exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);
        
        if (comment) {
            await Comment.findByIdAndDelete(commentId);
            res.redirect('/movie/' + comment.movie); // Xóa xong load lại trang phim đó
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi xóa bình luận");
    }
};

// Chức năng 5: Tìm kiếm phim
exports.searchMovies = async (req, res) => {
    try {
        // Lấy từ khóa người dùng gõ vào thanh tìm kiếm (name="keyword" trong form HTML)
        const keyword = req.query.keyword || '';

        // Dùng $regex của MongoDB để tìm kiếm gần đúng, chữ 'i' nghĩa là không phân biệt hoa/thường
        const movies = await Movie.find({
            title: { $regex: keyword, $options: 'i' }
        });

        // Đổ dữ liệu ra trang search.ejs
        res.render('home/search', { movies, keyword });
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi tìm kiếm phim");
    }
};

// ... (các code cũ giữ nguyên)

// Chức năng 6: Lọc phim theo Thể Loại
exports.getMoviesByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        // Tìm tên thể loại để hiển thị ra màn hình
        const category = await Category.findById(categoryId); 
        if (!category) return res.status(404).send('Không tìm thấy thể loại');

        // Tìm tất cả phim có chứa categoryId này
        const movies = await Movie.find({ category: categoryId });

        // Tái sử dụng lại giao diện search.ejs
        res.render('home/search', { movies, keyword: `Thể loại: ${category.name}` });
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi lọc phim theo thể loại");
    }
};

// Chức năng 7: Lọc phim theo Quốc Gia
exports.getMoviesByCountry = async (req, res) => {
    try {
        const countryId = req.params.id;
        const country = await Country.findById(countryId);
        if (!country) return res.status(404).send('Không tìm thấy quốc gia');

        const movies = await Movie.find({ country: countryId });

        res.render('home/search', { movies, keyword: `Quốc gia: ${country.name}` });
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi lọc phim theo quốc gia");
    }
};