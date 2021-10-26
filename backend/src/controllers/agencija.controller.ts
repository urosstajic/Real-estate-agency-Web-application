import express from "express";
import Agencija from "../models/agencija";

export class AgencijaController{
    dohvatiSve=(req:express.Request, res:express.Response)=>{
        Agencija.findOne({},(err, r)=>{
            if(err)console.log(err);
            else{
                res.json(r);
            }
        })
    }

    defProcente=(req:express.Request, res:express.Response)=>{
        let procenatIzd=req.body.procenatIzdavanje;
        let procenatPro=req.body.procenatProdaja;
        let idA=req.body.idA;
        console.log(procenatPro, procenatIzd,idA);

        Agencija.findOne({"idA":idA}, (err, r)=>{
            if(err)console.log(err);
            else{
                Agencija.collection.updateOne({"idA":idA}, {$set:{"procenatIzdavanje":procenatIzd, "procenatProdaja":procenatPro}}, (err, re)=>{
                    if(err)console.log(err);
                    else{
                        res.json({"message":"uspeh"});
                    }
                })
            }
        })
    }
}