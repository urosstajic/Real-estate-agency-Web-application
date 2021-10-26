import express from "express";
import ZahtevIzdavanje from "../models/zahtev_izdavanje";

export class IzdavanjeController{
    dodajZahtev=(req:express.Request, res:express.Response)=>{
        let zahtev=new ZahtevIzdavanje(req.body);

        zahtev.save().then((zahtev)=>{
            res.status(200).json({"message":"zahtev added"})
            }).catch((err)=>{
                res.status(400).json({"message":err})
            
        })

    }

    dohvatiRed=(req:express.Request, res:express.Response)=>{
        let nekretnina=req.body.nekretnina;
        let korisnik=req.body.korisnik;

        ZahtevIzdavanje.findOne({"nekretnina":nekretnina, "korisnik":korisnik}, (err, zah)=>{
            if(err)console.log(err);
            else{
                res.json(zah);
            }
        })
    }

    dohvatiSve=(req:express.Request, res:express.Response)=>{
        ZahtevIzdavanje.find({}, (err, zah)=>{
            if(err) console.log(err);
            else{
                res.json(zah);
            }
        })
    }

    prihvatiZahtevIzdavanjeKorisnik=(req:express.Request, res:express.Response)=>{
        let vlasnik_agencija=req.body.vlasnik_agencija;
        let ime_vlasnika=req.body.ime_vlasnika;
        let cena=req.body.cena;
        let korisnik=req.body.korisnik;
        let vremeOd=req.body.vremeOd;
        let vremeDo=req.body.vremeDo;
        let idI=req.body.idI;

        ZahtevIzdavanje.findOne({"idI":idI}, (err, nekr)=>{
            if(err)console.log(err);
            else{
                if(nekr){
                    ZahtevIzdavanje.collection.updateOne({"idI":idI}, {$set:{"odobreno":1}}, (err, n)=>{
                        if(err)console.log(err);
                        else{
                            res.json({"message":"prihvaceno"});
                        }
                    })
                }
            }
        })
    }

    prihvatiZahtevIzdavanjeAgencija=(req:express.Request, res:express.Response)=>{
        let vlasnik_agencija=req.body.vlasnik_agencija;
        let ime_vlasnika=req.body.ime_vlasnika;
        let cena=req.body.cena;
        let korisnik=req.body.korisnik;
        let vremeOd=req.body.vremeOd;
        let vremeDo=req.body.vremeDo;
        let idI=req.body.idI;

        ZahtevIzdavanje.findOne({"idI":idI}, (err, nekr)=>{
            if(err)console.log(err);
            else{
                if(nekr){
                    ZahtevIzdavanje.collection.updateOne({"idI":idI}, {$set:{"odobreno":2}}, (err, n)=>{
                        if(err)console.log(err);
                        else{
                            res.json({"message":"prihvaceno"});
                        }
                    })
                }
            }
        })
    }


    odbijPonudu=(req:express.Request, res:express.Response)=>{
        let idI=req.body.idI;

        ZahtevIzdavanje.findOne({"idI":idI}, (err, pr)=>{
            if(err)console.log(pr);
            else{
                ZahtevIzdavanje.collection.updateOne({"idI":idI}, {$set:{"odobreno":3}}, (err, r)=>{
                    if(err)console.log(err);
                    else{
                        res.json({"message":"uspeh"})
                    }
                })
            }
        })
    }

    odbijSveZahteve=(req:express.Request, res:express.Response)=>{
        let idI=req.body.idI;
        let vremeOd=req.body.vremeOd;
        let vremeDo=req.body.vremeDo;
        let nekretnina=req.body.nekretnina;
        console.log("ovo je id"+idI)
        console.log(vremeOd+"    do"+vremeDo)

        ZahtevIzdavanje.collection.updateMany({"nekretnina":nekretnina,"idI":{$ne:idI}, $or:[{"vremeOd":{$gt:vremeOd, $lt:vremeDo}},
        {"vremeOd":{$lt:vremeOd}, "vremeDo":{$gt:vremeOd}}]},{$set:{"odobreno":3}}, (err, r)=>{
             if(err){
                 console.log(err);
             }else{
                 res.json({"message":"uspeh"});
             }
         })
    }

    postaviPrihod=(req:express.Request, res:express.Response)=>{
        let idI=req.body.idI;
        let prihod=req.body.prihod;

        ZahtevIzdavanje.findOne({"idI":idI},(err, pro)=>{
            if(err)console.log(err);
            else{
                ZahtevIzdavanje.collection.updateOne({"idI":idI}, {$set:{"prihod":prihod}}, (err, r)=>{
                    if(err)console.log(err);
                    else{
                        res.json({"message":"uspeh"});
                    }
                })
            }
        })
    }

    promeniNazivNekr=(req:express.Request, res:express.Response)=>{
        let stariNaziv=req.body.stariNaziv;
        let noviNaziv=req.body.noviNaziv;

        ZahtevIzdavanje.collection.updateMany({"nekretnina":stariNaziv}, {$set:{"nekretnina":noviNaziv}},(err, re)=>{
            if(err)console.log(err);
            else{
                res.json({"message":"uspeh"});
            }
        })
    }

    promeniVlasnika=(req:express.Request, res:express.Response)=>{
        let staroIme=req.body.staroIme;
        let novoIme=req.body.novoIme;

        ZahtevIzdavanje.collection.updateMany({"ime_vlasnika":staroIme}, {$set:{"ime_vlasnika":novoIme}},(err, r)=>{
            if(err)console.log(err)
            else{
                res.json({"message":"uspeh"})
            }
        })
    }

    promeniKorisnik=(req:express.Request, res:express.Response)=>{
        let staroIme=req.body.staroIme;
        let novoIme=req.body.novoIme;

        ZahtevIzdavanje.collection.updateMany({"korisnik":staroIme}, {$set:{"korisnik":novoIme}},(err, r)=>{
            if(err)console.log(err)
            else{
                res.json({"message":"uspeh"})
            }
        })
    }
}