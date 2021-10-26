import express from "express";
import Registracija from "../models/registracija";

export class RegistracijaController{
    registracija=(req:express.Request, res:express.Response)=>{
        let user=new Registracija(req.body);

        user.save().then((reg)=>{
            res.status(200).json({"message":"user added"})
        }).catch((err)=>{
            res.status(400).json({"message": err})
        })

        
    }

    nadjiSveReg=(req:express.Request, res:express.Response)=>{
        Registracija.find({},(err, reg)=>{
            if(err)console.log(err);
            else{
                res.json(reg);
            }
        })
    }

    odbij=(req:express.Request, res:express.Response)=>{
        let username=req.body.username;
        Registracija.findOne({"username":username}, (err, r)=>{
            if(err)console.log(err)
            else{
                console.log("uslov ovde");
                Registracija.collection.deleteOne({"username":username});
                res.json({"message":"uspeh"})
            }
        })
        
    }

    
}