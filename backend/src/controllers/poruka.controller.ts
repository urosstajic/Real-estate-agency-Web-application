import express from "express";
import Poruka from "../models/poruka";

export class PorukaController{
    dohvatiSveKonverzacije=(req:express.Request, res:express.Response)=>{
        let username=req.body.username;

        Poruka.find({$or:[{"posiljalac":username}, {"primalac":username}]}, (err, por)=>{
            if(err)console.log(err);
            else{
                res.json(por);
            }
        })
    }


    arhiviraj=(req:express.Request, res:express.Response)=>{
        let naziv=req.body.naziv;
        let posiljalac=req.body.posiljalac;
        let primalac=req.body.primalac;

        Poruka.collection.updateMany({"nazivNekretnine":naziv, $or:[{"posiljalac":posiljalac, "primalac":primalac}, {"primalac":posiljalac, "posiljalac":primalac}]},{$set:{"arhivirana":1}}, function(err, resp){
            if(err)console.log(err);
            else{
                res.json({"message":"Poruka je arhivirana"});
            }
        })
    }

    izbaciIzArhiviranih=(req:express.Request, res:express.Response)=>{
        let naziv=req.body.naziv;
        let posiljalac=req.body.posiljalac;
        let primalac=req.body.primalac;

        Poruka.collection.updateMany({"nazivNekretnine":naziv, $or:[{"posiljalac":posiljalac, "primalac":primalac}, {"primalac":posiljalac, "posiljalac":primalac}]},{$set:{"arhivirana":0}}, (err, re)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"uspeh"});
            }
        })
    }

    dohvatiSvePorukeKonverzacije=(req:express.Request, res:express.Response)=>{
        let naziv=req.body.naziv;
        let primalac=req.body.primalac;
        let posiljalac=req.body.posiljalac;

        Poruka.find({"nazivNekretnine":naziv, $or:[{"posiljalac":posiljalac, "primalac":primalac},{"posiljalac":primalac, "primalac":posiljalac}]}, (err, por)=>{
            if(err)console.log(err);
            else{
                res.json(por);
            }
        })
    }

    dohvatiSvePorukeAgent=(req:express.Request, res:express.Response)=>{
        Poruka.find({$or:[{"posiljalac":"agencija"}, {"primalac":"agencija"}]}, (err, por)=>{
            if(err)console.log(err);
            else{
                res.json(por);
            }
        })
    }


    posaljiPoruku=(req:express.Request, res:express.Response)=>{
        let por=new Poruka(req.body);

        por.save().then((por)=>{
            res.status(200).json({"message":"poruka added"})
            }).catch((err)=>{
                res.status(400).json({"message":err})
            
        })
    }

    dohvatiSve=(req:express.Request, res:express.Response)=>{
        Poruka.find({},(err, r)=>{
            if(err)console.log(err);
            else{
                res.json(r);
            }
        })
    }

    postaviProcitano=(req:express.Request, res:express.Response)=>{
        let naziv=req.body.naziv;
        let primalac=req.body.primalac;
        let posiljalac=req.body.posiljalac;

        Poruka.collection.updateMany({"nazivNekretnine":naziv, "posiljalac":posiljalac, "primalac":primalac}, {$set:{"procitano":1}},(err, r)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"procitano"});
            }
        })
    }

    //novo
    promeniNazivNekr=(req:express.Request, res:express.Response)=>{
        let stariNaziv=req.body.stariNaziv;
        let noviNaziv=req.body.noviNaziv;

        Poruka.collection.updateMany({"nazivNekretnine":stariNaziv}, {$set:{"nazivNekretnine":noviNaziv}},(err, re)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"uspeh"});
            }
        })
    }

    promeniPosiljalac=(req:express.Request, res:express.Response)=>{
        let staroIme=req.body.staroIme;
        let novoIme=req.body.novoIme;

        Poruka.collection.updateMany({"posiljalac":staroIme}, {$set:{"posiljalac":novoIme}}, (err,r)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"uspeh"})
            }
        })
    }

    promeniPrimalac=(req:express.Request, res:express.Response)=>{
        let staroIme=req.body.staroIme;
        let novoIme=req.body.novoIme;

        Poruka.collection.updateMany({"primalac":staroIme}, {$set:{"primalac":novoIme}}, (err,r)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"uspeh"})
            }
        })
    }

    
    promeniImeAgenta=(req:express.Request, res:express.Response)=>{
        let staroIme=req.body.staroIme;
        let novoIme=req.body.novoIme;

        Poruka.collection.updateMany({"ime_agenta":staroIme}, {$set:{"ime_agenta":novoIme}}, (err,r)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"uspeh"})
            }
        })
    }

}