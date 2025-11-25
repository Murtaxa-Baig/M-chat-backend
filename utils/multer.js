const multer = require("multer");

const storage = multer.memoryStorage(); // buffers in memory
const upload = multer({ storage });

module.exports = upload;
