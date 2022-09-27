const express=require('express');
const router=express.Router();

const {
    getAllForms,createForm,getForm,updateForm,deleteForm
} = require('../controllers/forms');

router.route('/').get(getAllForms).post(createForm);
router.route('/:id').get(getForm).patch(updateForm).delete(deleteForm);
module.exports=router