import mognoose, { Mongoose } from "mongoose";

const Schema=mognoose.Schema;

let Nekretnina=new Schema({
    idN:{
        type:Number
    },
    naziv:{
        type:String
    },
    adresa:{
        type:String
    },
    tip:{
        type:String
    },
    sprat:{
        type:String
    },
    kvadratura:{
        type:Number
    },
    broj_soba:{
        type:String
    },
    namesten:{
        type:String
    },
    galerija:{
        type:String
    },
    izdavanje_prodaja:{
        type:String
    },
    cena:{
        type:Number
    },
    vlasnik:{
        type:String
    },
    promocija:{
        type:Number
    },
    ime_vlasnika:{
        type:String
    },
    odobreno:{
        type:Number
    }
});

export default mognoose.model("Nekretnina", Nekretnina, "nekretnine");