import mongoose from "mongoose";

const Schema=mongoose.Schema;

let ZahtevProdaja=new Schema({
    idP:{
        type:Number
    },
    nekretnina:{
        type:String
    },
    idN:{
        type:Number
    },
    idPoruke:{
        type:Number
    },
    vlasnik_agencija:{
        type:String
    },
    ime_vlasnika:{
        type:String
    },
    cena:{
        type:Number
    },
    korisnik:{
        type:String
    },
    placanje:{
        type:String
    },
    odobreno:{
        type:Number
    },
    prihod:{
        type:Number
    }
});

export default mongoose.model('ZahtevProdaja', ZahtevProdaja, 'zahtevi_prodaja');