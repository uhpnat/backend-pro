const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
// page 

const authorRouter = require("./routes/author");
const themeRouter = require("./routes/theme");
// addimage
const multer = require("multer");
const path = require("path");

// Cấu hình Multer để lưu tệp vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    // Lấy phần mở rộng của tệp gốc
    const fileExtension = file.originalname.split(".").pop();

    // Tạo tên tệp duy nhất bằng thời gian, một số ngẫu nhiên và phần mở rộng của tệp gốc
    const uniqueFileName =
      Date.now() + "-" + Math.round(Math.random() * 1000) + "." + fileExtension;

    callback(null, uniqueFileName);
  },
});

const upload = multer({ storage });

// addimage

dotenv.config();
//connect

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Kết nối thành công đến MongoDB");
  })
  .catch((error) => {
    console.error("Lỗi kết nối MongoDB:", error);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use("/uploads", express.static("uploads"));
app.use("/v1/author", authorRouter);
app.use("/v1/theme", themeRouter);

app.listen(8000, () => {
  console.log("sevver đang chạy");
});

app.post("/uploads", upload.single("image"), (req, res) => {
  // Kiểm tra xem có tệp hình ảnh đã tải lên không
  if (!req.file) {
    return res.status(400).json({ error: "Vui lòng tải lên một tệp ảnh." });
  }

  const imagePath = req.file.filename;
  res.status(200).json({ imagePath });
});
app.get("/view-image/:filename", (req, res) => {
  const { filename } = req.params;
 res.sendFile(path.join("uploads", filename));
});
