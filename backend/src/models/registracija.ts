import mongoose from "mongoose";

const Schema= mongoose.Schema;

let Registracija=new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    ime:{
       type:String 
    },
    prezime:{
        type:String
    },
    slika:{
        type:String
    },
    mail:{
        type:String
    },
    drzava:{
        type:String
    },
    grad:{
        type:String
    },
    tip:{
        type:String
    }
});

export default mongoose.model("Registracija", Registracija, "registracija");