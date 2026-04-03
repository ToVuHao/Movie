🎬 Movie Hub - Website Xem Phim Fullstack (Node.js & MongoDB)
Dự án Website xem phim trực tuyến được xây dựng dựa trên mô hình MVC (Model-View-Controller), cho phép người dùng xem phim, tìm kiếm, lọc theo thể loại/quốc gia và tham gia bình luận. Hệ thống có trang quản trị (Admin) dành riêng cho việc quản lý nội dung.

🚀 Tính năng cốt lõi
Đối với Người dùng (User):
Trang chủ: Hiển thị phim mới nhất, phim xem nhiều và phim yêu thích.

Xem chi tiết: Trình phát video (Youtube Embed), thông tin năm phát hành, thể loại, quốc gia.

Tìm kiếm & Lọc: Tìm phim theo tên, lọc phim theo Thể loại hoặc Quốc gia.

Bình luận: Đăng nhập để gửi bình luận và xem bình luận của người khác (lưu trữ vĩnh viễn).

Đối với Quản trị viên (Admin):
Dashboard: Thống kê và quản lý toàn bộ hệ thống.

Quản lý Phim: Thêm phim mới (Upload ảnh bìa, nhúng link video, buff view/like ảo, set năm phát hành).

Quản lý Danh mục: Thêm/Sửa/Xóa Thể loại và Quốc gia.

Phân quyền: Quản lý danh sách người dùng và cấp quyền Admin.

🛠 Công nghệ sử dụng
Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

View Engine: EJS (Embedded JavaScript templates)

Middleware: Multer (Upload file), Express-Session (Xác thực người dùng)

Styling: CSS3 (Giao diện Responsive)

💻 Hướng dẫn cài đặt & Setup dự án
Để chạy dự án này trên máy cục bộ, bạn hãy thực hiện theo các bước sau:

1. Cài đặt môi trường
Đảm bảo máy tính của bạn đã cài đặt:

Node.js (Phiên bản 16.x trở lên)

MongoDB (Hoặc sử dụng MongoDB Atlas)

2. Tải mã nguồn
Mở Terminal/Command Prompt và chạy lệnh:



3. Cài đặt các thư viện phụ thuộc
Chạy lệnh sau để tự động cài đặt các package trong file package.json:

Bash
npm install
4. Cấu hình Database
Mở file apps/config/db.js và đảm bảo đường dẫn kết nối MongoDB của bạn chính xác:

JavaScript
mongoose.connect('mongodb://localhost:27017/ten_database_cua_ban');
5. Khởi chạy dự án
Dùng lệnh sau để bắt đầu chạy Server:

Bash
node app.js
Sau đó, truy cập địa chỉ: http://localhost:3000 trên trình duyệt.

👤 Tài khoản Admin mặc định
Hệ thống sẽ tự động tạo một tài khoản Admin khi bạn chạy dự án lần đầu tiên:

Email: tovu5810@gmail.com

Password: 123

📂 Cấu trúc thư mục
Plaintext
├── apps/
│   ├── config/       # Cấu hình Database
│   ├── controllers/  # Xử lý logic (Admin, Home, Auth)
│   ├── middleware/   # Upload file, Check quyền
│   ├── models/       # Schema MongoDB (Movie, User, Category...)
│   └── views/        # Giao diện EJS (Partial, Home, Admin)
├── public/           # Chứa ảnh upload, CSS, JS frontend
├── app.js            # File khởi chạy chính
└── package.json      # Danh sách thư viện sử dụng
