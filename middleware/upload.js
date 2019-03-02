const multer = require('multer');
const path = require('path');
const pubPathImage = path.join(__dirname, '../public/images');




var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, pubPathImage)
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage,
    limits: { fileSize: 10000000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).single('image');

//check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error : Images Only!');
    }
}

module.exports = async function(req, res, next) {
    upload(req, res, next, (err) => {

        if (err) {

            res.send({ imgMsg: err });
        } else if (req.file === undefined) {

            imgMsg: err;
            res.status(400).send({ imgMsg: err });

        }
        else {

            const data = { imgMsg: 'File Uploaded successfully' };
            dataImg = {
                file: `${pubPathImage}/${req.file.filename}`
            }; //end of else block
            console.log(dataImg)
        }


        console.log(dataImg)

    })

}