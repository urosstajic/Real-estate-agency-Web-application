import e from "express";
import express from "express";
import Nekretnina from "../models/nekretnina";

export class NekretninaController{
    pronadjiNekretninu=(req:express.Request, res:express.Response)=>{
        let grad=req.body.grad;
        let cenaOd=req.body.cenaOd;
        let cenaDo=req.body.cenaDo;
        if(grad==null){
            grad="";
        }
        if(cenaOd==null){
            cenaOd=0;
        }
        if(cenaDo==null){
            cenaDo=1000000;
        }

        Nekretnina.find({"adresa":{$regex:grad},"cena":{$gt:cenaOd, $lt:cenaDo}}, (err, nek)=>{
            if(err) console.log(err);
            else{
                res.json(nek);
                console.log("pronadjeno");
            }
        });
    }

    dohvatiSve=(req:express.Request, res:express.Response)=>{
        Nekretnina.find({}, (err, nekr)=>{
            if(err)console.log(err);
            else{
                res.json(nekr);
            }
        })
    }

    dohvatiNekrPoId=(req:express.Request, res:express.Response)=>{
        let idN=req.body.idN;

        Nekretnina.findOne({"idN":idN}, (err, nekr)=>{
            if(err){
                console.log(err);
            }else{
                res.json(nekr);
                console.log(nekr);
            }
        })
    }

    odobri=(req:express.Request, res:express.Response)=>{
        let idN=req.body.idN;

        Nekretnina.collection.updateOne({"idN":idN}, {$set:{"odobreno":1}}, function(err, nekr){
            if(err) console.log(err);
            else{
                res.json({"message":"odobreno"});
            }
        })
    }
    //kad se odbije nekretnina neka se brise iz baze
    odbij=(req:express.Request, res:express.Response)=>{
        let idN=req.body.idN;

        Nekretnina.collection.deleteOne({"idN":idN},(err, nekr)=>{
            if(err) console.log(err);
            else{
                res.json({"message":"uspeh"});
            }
        })
    }

    dodajNekrentinu=(req:express.Request, res:express.Response)=>{
        let nekretnina=new Nekretnina(req.body);

        nekretnina.save().then((nekrentina)=>{
            res.status(200).json({"message":"nekretnina je dodata"})
        }).catch((err)=>{
            res.status(400).json({"message":err});
        })
    }

    promovisi=(req:express.Request, res:express.Response)=>{
        let idN=req.body.idN;

        Nekretnina.collection.updateOne({"idN":idN}, {$set:{"promocija":1}}, (err, re)=>{
            if(err) console.log(err);
            else{
                res.json({"message":"uspesno promovisano"})
            }
        })
    }

    izbaciIzPromovisanih=(req:express.Request, res:express.Response)=>{
        let idN=req.body.idN;

        Nekretnina.collection.updateOne({"idN":idN}, {$set:{"promocija":0}}, (err, re)=>{
            if(err) console.log(err);
            else{
                res.json({"message":"izbaceno iz promovisanih"})
            }
        })
    }

    azuriraj=(req:express.Request, res:express.Response)=>{
        let naziv=req.body.naziv;
        let adresa=req.body.adresa;
        let tip=req.body.tip;
        let sprat=req.body.sprat;
        let kvadratura=req.body.kvadratura;
        let namesten=req.body.namesten;
        let galerija=req.body.galerija;
        let brsoba=req.body.brsoba;
        let iznPro=req.body.iznPro;
        let cena=req.body.cena;
        let idN=req.body.idN;

        Nekretnina.findOne({"idN":idN}, (err, nekr)=>{
            if(err)console.log(err);
            else{
                Nekretnina.collection.updateOne({"idN":idN}, {$set:{"naziv":naziv, "adresa":adresa, "tip":tip, "sprat":sprat, "kvadratura":kvadratura, "namesten":namesten, "galerija":galerija, "cena":cena, "izdavanje_prodaja":iznPro, "broj_soba":brsoba}}, (err, r)=>{
                    if(err)console.log(err);
                    else{
                        res.json({"message":"azurirano"});
                    }
                })
            }
        })
    }

    azurirajDodaj=(req:express.Request, res:express.Response)=>{
        let naziv=req.body.naziv;
        let adresa=req.body.adresa;
        let tip=req.body.tip;
        let sprat=req.body.sprat;
        let kvadratura=req.body.kvadratura;
        let namesten=req.body.namesten;
        let galerija=req.body.galerija;
        let brsoba=req.body.brsoba;
        let iznPro=req.body.iznPro;
        let cena=req.body.cena;
        let idN=req.body.idN;
        console.log(galerija)

        Nekretnina.findOne({"idN":idN}, (err, nekr)=>{
            if(err){
                console.log(err);
            }else{
                Nekretnina.collection.updateOne({"idN":idN},{$set:{"naziv":naziv, "adresa":adresa, "tip":tip,
                 "sprat":sprat, "kvadratura":kvadratura, "namesten":namesten,"cena":cena, 
                 "izdavanje_prodaja":iznPro, "broj_soba":brsoba, push:{"galerija":galerija}}}, (err, r)=>{
                    if(err)console.log(err);
                    else{
                        res.json({"message":"azurirano"});
                    }
                })
            }
        })
    }

    nePrikazuj=(req:express.Request, res:express.Response)=>{
        let idN=req.body.idN;

        Nekretnina.findOne({"idN":idN}, (err, n)=>{
            if(err)console.log(err);
            else{
                Nekretnina.collection.updateOne({"idN":idN},{$set:{"odobreno":2}},(err, r)=>{
                    if(err)console.log(err);
                    else{
                        res.json({"message":"uspeh"});
                    }
                })
            }
        })
    }

    promeniImeVlasnik=(req:express.Request, res:express.Response)=>{
        let ime=req.body.staroIme;
        let novoIme=req.body.novoIme;

        Nekretnina.collection.updateMany({"ime_vlasnika":ime}, {$set:{"ime_vlasnika":novoIme}}, (err,r)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"uspeh"})
            }
        })
    }
}