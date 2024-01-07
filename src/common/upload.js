const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //(null,__dirname + '/public/uploads')
        cb(null, './public/uploads');
    },
    //destination: "./public/uploads/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, Date.now() + "--" + file.originalname);
    }

})


module.exports.upload = multer({ storage: storage })
