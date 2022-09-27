const mongoose = require('mongoose')

const polySchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'must provide name'],
    maxlength: [15, 'name can not be more than 15 characters'],
  },
  color: {
    type: String,
    required: true,
    enum : ['BLUE','GREEN','YELLOW','RED'],
  },
})


module.exports = mongoose.model('Poly', polySchema)