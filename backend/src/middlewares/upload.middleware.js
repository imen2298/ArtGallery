import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);

        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9) + extension;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage
});

export default upload;