import mongoose from "mongoose";

const Schema=mongoose.Schema;

let ZahtevIzdavanje=new Schema({
    idI:{
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
    vremeOd:{
        type:String
    }, 
    vremeDo:{
        type:String
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
    odobreno:{
        type:Number
    },
    prihod:{
        type:Number
    }
});

export default mongoose.model('ZahtevIzdavanje', ZahtevIzdavanje, 'zahtevi_izdavanje');