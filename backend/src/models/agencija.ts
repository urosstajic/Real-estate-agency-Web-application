import mongoose, { mongo } from "mongoose";

const Schema=mongoose.Schema;

let Agencija=new Schema({
    procenatProdaja:{
        type:Number
    },
    procenatIzdavanje:{
        type:Number
    }
});

export default mongoose.model("Agencija", Agencija, "agencija");