import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Blokiran=new Schema({
    idB:{
        type:Number
    },
    koB:{
        type:String
    },
    kogaB:{
        type:String
    }
});

export default mongoose.model("Blokiran", Blokiran, "blokirani");