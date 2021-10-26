import express from "express";
import ZahtevProdaja from "../models/zahtev_prodaja";

export class ProdajaController{
    dodajZahtev=(req:express.Request, res:express.Response)=>{
        let zahtev=new ZahtevProdaja(req.body);

        zahtev.save().then((zahtev)=>{
            res.status(200).json({"message":"zahtev added"})
            }).catch((err)=>{
                res.status(400).json({"message":err})
            
        })
    }

    dohvatiRedProdaja=(req:express.Request, res:express.Response)=>{
        let nekretnina=req.body.nekretnina;
        let korisnik=req.body.korisnik;
        console.log(nekretnina);
        console.log(korisnik);

        ZahtevProdaja.findOne({"nekretnina":nekretnina, "korisnik":korisnik}, (err, zah)=>{
            if(err) console.log(err);
            else{
                res.json(zah);
            }
        })
    }

    dohvatiSve=(req:express.Request, res:express.Response)=>{
        ZahtevProdaja.find({}, (err, zah)=>{
            if(err) console.log(err);
            else{
                res.json(zah);
            }
        })
    }

    prihvatiZahtevProdajaKorisnik=(req:express.Request, res:express.Response)=>{
        let vlasnik_agencija=req.body.vlasnik_agencija;
        let ime_vlasnika=req.body.ime_vlasnika;
        let cena=req.body.cena;
        let korisnik=req.body.korisnik;
        let placanje=req.body.placanje;
        let idP=req.body.idP;

        ZahtevProdaja.findOne({"idP":idP, "vlasnik_agencija":vlasnik_agencija, "ime_vlasnika":ime_vlasnika, "cena":cena, "korisnik":korisnik, "placanje":placanje}, (err, nekr)=>{
            if(err)console.log(err);
            else{
                if(nekr){
                    ZahtevProdaja.collection.updateOne({"idP":idP, "vlasnik_agencija":vlasnik_agencija, "ime_vlasnika":ime_vlasnika, "cena":cena, "korisnik":korisnik, "placanje":placanje}, {$set:{"odobreno":1}}, (err, n)=>{
                        if(err)console.log(err);
                        else{
                            res.json({"message":"prihvaceno"});
                        }
                    })
                }
            }
        })
    }
//ovde moram da dodam idProdaja i gore
    prihvatiZahtevProdajaAgencija=(req:express.Request, res:express.Response)=>{
        let vlasnik_agencija=req.body.vlasnik_agencija;
        let ime_vlasnika=req.body.ime_vlasnika;
        let cena=req.body.cena;
        let korisnik=req.body.korisnik;
        let placanje=req.body.placanje;
        let idP=req.body.idP;

        ZahtevProdaja.findOne({"idP":idP, "vlasnik_agencija":vlasnik_agencija, "ime_vlasnika":ime_vlasnika, "cena":cena, "korisnik":korisnik, "placanje":placanje}, (err, nekr)=>{
            if(err)console.log(err);
            else{
                if(nekr){
                    ZahtevProdaja.collection.updateOne({"idP":idP, "vlasnik_agencija":vlasnik_agencija, "ime_vlasnika":ime_vlasnika, "cena":cena, "korisnik":korisnik, "placanje":placanje}, {$set:{"odobreno":2}}, (err, n)=>{
                        if(err)console.log(err);
                        else{
                            res.json({"message":"prihvaceno"});
                        }
                    })
                }
            }
        })
    }
//i ovde da dodam idpro
    odbijSveOstalePonude=(req:express.Request, res:express.Response)=>{
        let nekretnina=req.body.nekretnina;
        let ime=req.body.ime;
        let idP=req.body.idP;

        ZahtevProdaja.findOne({"idP":idP}, (err, pro)=>{
            if(err)console.log(err);
            else{
                if(pro){
                    ZahtevProdaja.collection.updateMany({"nekretnina":nekretnina, "idP":{$ne:idP}}, {$set:{"odobreno":3}}, (err, resp)=>{
                        if(err)console.log(err);
                        else{
                            res.json({"message":"odbijeno sve ostalo"})
                        }
                    })
                }
            }
        })
    }

    odbijPonudu=(req:express.Request, res:express.Response)=>{
        let idP=req.body.idP;

        ZahtevProdaja.findOne({"idP":idP}, (err, pr)=>{
            if(err)console.log(pr);
            else{
                ZahtevProdaja.collection.updateOne({"idP":idP}, {$set:{"odobreno":3}}, (err, r)=>{
                    if(err)console.log(err);
                    else{
                        res.json({"message":"uspeh"})
                    }
                })
            }
        })
    }

    postaviPrihod=(req:express.Request, res:express.Response)=>{
        let idP=req.body.idP;
        let prihod=req.body.prihod;

        ZahtevProdaja.findOne({"idP":idP},(err, pro)=>{
            if(err)console.log(err);
            else{
                ZahtevProdaja.collection.updateOne({"idP":idP}, {$set:{"prihod":prihod}}, (err, r)=>{
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
        console.log(stariNaziv, noviNaziv)
        ZahtevProdaja.collection.updateMany({"nekretnina":stariNaziv}, {$set:{"nekretnina":noviNaziv}},(err,r)=>{
            if(err)console.log(err);
            else{
                console.log("uspeh123");
            }
        })
        
    }

    promeniVlasnika=(req:express.Request, res:express.Response)=>{
        let staroIme=req.body.staroIme;
        let novoIme=req.body.novoIme;

        ZahtevProdaja.collection.updateMany({"ime_vlasnika":staroIme}, {$set:{"ime_vlasnika":novoIme}},(err, r)=>{
            if(err)console.log(err)
            else{
                res.json({"message":"uspeh"})
            }
        })
    }

    promeniKorisnik=(req:express.Request, res:express.Response)=>{
        let staroIme=req.body.staroIme;
        let novoIme=req.body.novoIme;

        ZahtevProdaja.collection.updateMany({"korisnik":staroIme}, {$set:{"korisnik":novoIme}},(err, r)=>{
            if(err)console.log(err)
            else{
                res.json({"message":"uspeh"})
            }
        })
    }
}