import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Poruka=new Schema({
    idPor:{
        type:Number
    },
    posiljalac:{
        type:String
    },
    primalac:{
        type:String
    },
    nazivNekretnine:{
        type:String
    },
    idN:{
        type:Number
    },
    sadrzaj:{
        type:String
    },
    datumVreme:{
        type:String
    },
    arhivirana:{
        type:Number
    },
    procitano:{
        type:Number
    },
    ime_agenta:{
        type:String
    }
});

export default mongoose.model("Poruka", Poruka, "poruke");