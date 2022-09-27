const Form=require('../models/Poly');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllForms=asyncWrapper( async (req,res)=>{
    const forms= await Form.find()
res.status(200).json({forms})
})

const createForm= asyncWrapper(async(req,res)=>{
    const form= await Form.create(req.body)
    res.status(201).json({ form })
})
const getForm = asyncWrapper(async (req, res, next) => {
    const { id: formID } = req.params
    const form = await Form.findOne({ _id: formID })
    if (!form) {
      return next(createCustomError(`No Form with id : ${formID}`, 404))
    }
  
    res.status(200).json({ form })
  })
  const deleteForm = asyncWrapper(async (req, res, next) => {
    const { id: formID } = req.params
    const form = await Form.findOneAndDelete({ _id: formID })
    if (!form) {
      return next(createCustomError(`No form with id : ${formID}`, 404))
    }
    res.status(200).json({ form })
  })
  const updateForm = asyncWrapper(async (req, res, next) => {
    const { id: formID } = req.params
  
    const form = await Form.findOneAndUpdate({ _id: formID }, req.body, {
      new: true,
      runValidators: true,
    })
  
    if (!form) {
      return next(createCustomError(`No form with id : ${formID}`, 404))
    }
  
    res.status(200).json({ form })
  })
  
  module.exports = {
    getAllForms,
    createForm,
    getForm,
    updateForm,
    deleteForm,
  }
  