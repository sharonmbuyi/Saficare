const express = require('express')
const route = express.Router()


router.get('/getAll',getAll)
router.get('getOne/:id',getOne)
router.post('createOne/:id',createOne)
router.put('updateOne/:id',updateOne)
router.delete('deleteOne/:id',deleteOne)
