const express = require('express')
const router = express.Router()
const { Product, productValidation } = require('../models/product');
const { Category } = require('../models/category')
const _ = require('lodash')
    // const multer = require('multer');
const path = require('path');
const pubPathImage = path.join(__dirname, '../public/images');
const up = require('../middleware/upload');

const multer = require('multer');



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


// route to register products
router.post('/create', async(req, res) => {

    upload(req, res, (err) => {

        if (err) {

            return res.send('err');
        } else {
            if (req.file === undefined) {
                imgMsg: err;
                return res.status(400).send(err);

            }
            else {

                const data = { imgMsg: 'File Uploaded successfully' };
                dataImg = `${pubPathImage}/${req.file.filename}`
            }

            async function ok() {
                const { error } = productValidation(req.body)
                if (error) return res.status(400).send(error.details[0].message);

                const productExist = await Product.findOne({ Name: req.body.Name });
                console.log(productExist)
                if (productExist) {
                    res.status(404).send('Product with Same Name Exist');
                    return
                }

                const cat = await Category.findById(req.body.categoryid);

                new Promise((resolve, reject) => {

                    const product = new Product({
                        // ID: req.body.Name,
                        Name: req.body.Name,
                        Description: req.body.Description,
                        Price: req.body.Price,
                        Category: { _id: req.body.categoryid, category: cat.category },
                        Image: dataImg,
                        Color: req.body.Color,

                    })

                    resolve(product)
                }).then((p) => {
                    const a = p.save();
                    res.send(p)
                })
            }

            ok()

        }
    })


})

//route to get all properties of all products
router.get('/all', async(req, res) => {
    const allProducts = await Product.find();
    const data = _.pick(allProducts, ['ID', 'Name', 'Price']);
    res.send(data);
})

//route to  get properties if specific products based on a selected id
router.get('/:id', async(req, res) => {
    const product = await Product.findById({ _id: req.params.id });
    res.send(product)
})


//route to update products
router.put('/update/:id', async(req, res) => {
    const Val = productValidation(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const productExist = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        Description: req.body.Description,
        Price: req.body.Price,
        Category: req.body.Category,
        Image: req.body.Image,
        Color: req.body.Color,
    }, { new: true })

    if (!productExist) return res.status(400).send('INVALID REQUEST, PRODUCT NOT FOUND')

    res.send(productExist)

})

//route to delete products
router.delete('/delete/:id', async(req, res) => {
    const Val = productValidation(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const productExist = await Product.findByIdAndRemove(req.params.id)

    if (!productExist) return res.status(400).send('INVALID REQUEST, PRODUCT NOT FOUND')

    res.send(productExist)
})

//route to get all products
router.get('/all', async(req, res) => {
    const allProducts = await Product.find()
    res.send(allProducts)
})




//route to get all properties of all products
router.get('/all', async(req, res) => {
    const allProducts = await Product.find();
    const data = _.pick(allProducts, ['ID', 'Name', 'Price']);
    res.send(data);
})

//route to  get properties if specific products based on a selected id
router.get('/:id', async(req, res) => {
    const product = await Product.findById({ _id: req.params.id });
    res.send(product)
})



//route to update products
router.put('/update/:id', async(req, res) => {
    const Val = productValidation(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const productExist = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        Description: Jreq.body.Description,
        Price: req.body.Price,
        Category: req.body.Category,
        Image: req.body.Image,
        Color: req.body.Color,
    }, { new: true })

    if (!productExist) return res.status(400).send('INVALID REQUEST, PRODUCT NOT FOUND')

    res.send(productExist)

})

//route to delete products
router.delete('/delete/:id', async(req, res) => {
    const Val = productValidation(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const productExist = await Product.findByIdAndRemove(req.params.id)

    if (!productExist) return res.status(400).send('INVALID REQUEST, PRODUCT NOT FOUND')

    res.send(productExist)
})

//route to get all products
router.get('/all', async(req, res) => {
    const allProducts = await Product.find()
    res.send(allProducts)
})

//route to  get a products based on a selected id
router.get('/:id', async(req, res) => {
    const product = await Product.findById({ _id: req.params.id })
    res.send(product)
})


module.exports = router