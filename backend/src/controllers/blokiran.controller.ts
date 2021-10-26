import express, { json } from "express";
import Blokiran from "../models/blokiran";

export class BlokiranController{
    dohvatiSve=(req:express.Request, res:express.Response)=>{
        Blokiran.find({},(err, r)=>{
            if(err)console.log(err);
            else{
                res.json(r);
            }
        })
    }

    blokiraj=(req:express.Request, res:express.Response)=>{
        let blok=new Blokiran(req.body);

        blok.save().then((blok)=>{
            res.status(200).json({'message':'uspeh'})
        }).catch((err)=>{
            res.status(400).json({"message":err})
        })
    }

    odblokiraj=(req:express.Request, res:express.Response)=>{
        let idB=req.body.idB;

        Blokiran.findOne({"idB":idB}, (err, re)=>{
            if(err)console.log(err);
            else{
                Blokiran.collection.deleteOne({"idB":idB});
                res.json({"message":"uspeh"})
            }
        })
    }
}