const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate')
mongoose.connect('mongodb://localhost:27017/pws', { useNewUrlParser: true, useCreateIndex: true, });
var conn = mongoose.Collection;
var productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product_name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
productSchema.plugin(mongoosePaginate);
var productModel = mongoose.model('products', productSchema);
module.exports = productModel;