const express = require('express')
const router = express.Router()
const { Category, categoryVal } = require('../models/category')




router.post('/', async(req, res) => {

    const { error } = categoryVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let categoryExist = await Category.findOne({ category: req.body.category })

    if (categoryExist) return res.status(404).send('Category with Same Name Exist')
    const newCategory = new Category({
        category: req.body.category
    })

    const data = await newCategory.save();
    res.send(data)
})


router.put('/:id', async(req, res) => {
    const Val = categoryVal(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const categoryExist = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!categoryExist) return res.status(400).send('INVALID REQUEST, Category NOT FOUND')

    res.send(categoryExist)

})

router.delete('/:id', async(req, res) => {
    const Val = genreVal(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const catergoryExist = await Category.findByIdAndRemove(req.params.id)


    if (!catergoryExist) return res.status(400).send('INVALID REQUEST, Category NOT FOUND')

    res.send(catergoryExist)
})

router.get('/', async(req, res) => {
    const categoryAll = await Category.find()
    res.send(categoryAll)
})

router.get('/:id', async(req, res) => {
    const genreId = await Category.findById({ _id: req.params.id })
    res.send(genreId)
})


module.exports = router