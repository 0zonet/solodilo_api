const  mongoose = require('mongoose');

/*MATCH PARA COMPROBAR SI ES UN CORREO*/
const match_email = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Debes ingresar un correo valido"];

/*GENEROS*/
const generos = ["f", "m"];

/*COMPROBAR QUE LAS CONTRASEÑAS COINCIDAN*/
const password_validation = {
    validator: function(_password){
        return this.password_confirmation = _password;
    },                       
    message: "Las contraseñas no coinciden"
}

/*JSON esqueleto modelo usuario*/
const userJSON ={
    username: {type: String, required: true, index: {unique: true}},
    email:{type: String, required: true, index: {unique: true}, match: match_email},
    password: {type: String, required: true, validate: password_validation},
    pic: {type: String, required: false},
    gender: {type: String, enum: {values: generos, message: "GENERO NO VALIDO"}},
    created_at: {type: Date, default: Date.now}
};


const userSchema = new mongoose.Schema(userJSON);

/*CONTRSEÑA DE CONFIRMACION, SOLO ES UN VIRTUAL*/
userSchema.virtual("password_confirmation").get(function(){
    return this.password_c;
}).set(function(_password){
    this.password_c = _password;
});



module.exports = mongoose.model('User', userSchema);