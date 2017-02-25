const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

// set to use slug plugin 
mongoose.plugin(slug);

//Falta agregar creador
//Categorias

const postJSON = {
    title: {type: String, required: true, minlength: [5,"Titulo demaciado corto"]},
    body: {type: String, required: true, minlength:[20, "Texto demaciado corto"]},
    name:{type: String, default: 'Anonimo'},
    slug: {type: String, slug : "title",slug_padding_size: 4, unique: true},
    views: {type: Number, default: 0, min: 0},
    isApproved: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now}
};


const postSchema = new mongoose.Schema(postJSON);
module.exports = mongoose.model('Post', postSchema);


