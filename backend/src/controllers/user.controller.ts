import express from "express";
import User from "../models/user";

export class UserController{
    login=(req:express.Request, res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;

        User.findOne({"username":username, "password":password},(err, user)=>{
            if(err)console.log(err);
            else{
                res.json(user);
            }
        })

    }

    nadjiPoMejlu= (req:express.Request, res:express.Response)=>{
        let mail=req.body.mail;

        User.findOne({"mail":mail}, (err, user)=>{
            if(err)console.log(err);
            else res.json(user);
        })
    }

    nadjiPoUsername= (req:express.Request, res:express.Response)=>{
        let username=req.body.username;

        User.findOne({"username":username}, (err, user)=>{
            if(err)console.log(err);
            else res.json(user);
        })
    }

    promeniLozinku=(req:express.Request, res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;

        User.findOne({"username":username}, (err, user)=>{
            if(err)console.log(err);
            else{
                if(user){
                    
                    
                    User.collection.updateOne({"username":username}, {$set:{"password":password}}, function(err, ress){
                        if(err)console.log(err)
                        else{
                            console.log("promenjena lozinka");
                        }
                    }
                    );
                    res.json({"message":"lozinka je promenjena"})
                }else{
                    res.json({"message":"lozinka nija promenjena"});
                }
            }
        })
    }

    azurirajPodatke=(req:express.Request, res:express.Response)=>{
        let username=req.body.username;
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let mail=req.body.mail;
        let slika=req.body.slika;
        let drzava=req.body.drzava;
        let grad=req.body.grad;
        let novoUsername=req.body.novoUsername;

        User.collection.updateOne({"username":username}, {$set:{"username":novoUsername, "ime":ime, "prezime":prezime, "mail":mail, "slika":slika, "drzava":drzava, "grad":grad}}, function (err, ress) {
            if(err)console.log(err)
            else{
            console.log("azurirani podaci");
            User.findOne({"username":novoUsername}, (err, r)=>{
                if(err)console.log(err);
                else{
                    res.json(r);
                }
            })
           }
        })
    }

    nadjiSveUsere = (req:express.Request, res:express.Response)=>{
        User.find({}, (err, us)=>{
            if(err)console.log(err);
            else{
                res.json(us);
            }
        })
    }

    brisi=(req:express.Request, res:express.Response)=>{
        let user=req.body.username;

        User.findOne({"username":user}, (err, re)=>{
            if(err)console.log(err);
            else{
                if(re){
                    User.collection.deleteOne({"username":user})
                }
            }
        })
    }

    azurirajPodatkeAdmin=(req:express.Request, res:express.Response)=>{
        let username=req.body.username;
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let mail=req.body.mail;
        let slika=req.body.slika;
        let drzava=req.body.drzava;
        let grad=req.body.grad;
        let novoUsername=req.body.novoUsername;
        let novoPassword=req.body.password;
        let noviTip=req.body.tip;

        User.collection.updateOne({"username":username}, {$set:{"username":novoUsername,"password":novoPassword, "ime":ime, "prezime":prezime, "mail":mail, "slika":slika, "drzava":drzava, "grad":grad, "tip":noviTip}}, function (err, ress) {
            if(err)console.log(err)
            else{
            console.log("azurirani podaci");
            User.findOne({"username":novoUsername}, (err, r)=>{
                if(err)console.log(err);
                else{
                    res.json(r);
                }
            })
           }
        })
    }

    dodajKorisnika=(req:express.Request, res:express.Response)=>{
        let user=new User(req.body);

        user.save().then((user)=>{
            res.status(200).json({"message":"uspeh"})
        }).catch((err)=>{
            res.status(400).json({"message":err})
        })
    }
}