import express from 'express'
import { addFood,listFood,removeFood } from '../controllers/foodController.js'
import multer from 'multer'

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});
const upload = multer({ storage: storage });

const foodRouter = express.Router();

foodRouter.post('/add', upload.single('image'), addFood); // image field must be 'image'
foodRouter.get('/list',listFood); // get food list
foodRouter.post('/remove', removeFood); // Assuming you have a removeFood function in your controller
export default foodRouter;
