import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poruka } from '../models/poruka';
import { User } from '../models/user';
import { PorukaService } from '../poruka.service';
import alertify from "alertify.js";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private router:Router, private porukaService:PorukaService) { }

  ngOnInit(): void {
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.inbox=[];
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    if(this.user.tip=='reg_korisnik'){
      this.porukaService.dohvatiSveKonverzacije(this.user.username).subscribe((por:Poruka[])=>{
        if(por!=null){
          for(var i in por){
            if(por[i].arhivirana==0){
              this.inbox.push(por[i])
            }
          }
          //this.inbox=por
          console.log(por);
          if(this.inbox==null){
            this.br=1;
          }
          this.inbox.sort((a,b)=>{
            if(a.datumVreme>b.datumVreme){
              return -1;
            }else{
              if(a.datumVreme<b.datumVreme){
                return 1;
              }else{
                return 0;
              }
            }
          })
  
          this.konver=[];
          if(this.user.tip=='reg_korisnik'){
            for(var i in this.inbox){
              if(this.konver.length==0){
                this.konver.push(this.inbox[i]);
              }else{
                var pom:number;
                pom=0;
                for(var j in this.konver){
                  if(this.konver[j].nazivNekretnine==this.inbox[i].nazivNekretnine && ((this.inbox[i].posiljalac==this.konver[j].posiljalac && this.konver[j].primalac==this.inbox[i].primalac) || (this.inbox[i].posiljalac==this.konver[j].primalac && this.konver[j].posiljalac==this.inbox[i].primalac))){
                    pom=1;
                  }
                }
                if(pom==0){
                  this.konver.push(this.inbox[i]);
                }
              }
            }
          }
          for(var i in this.konver){
            this.konver[i].zaProcitano=1;
          }
          for(var i in this.konver){
            for(var j in this.inbox){
              if(this.konver[i].nazivNekretnine==this.inbox[j].nazivNekretnine && ((this.inbox[j].posiljalac==this.konver[i].posiljalac && this.konver[i].primalac==this.inbox[j].primalac) || (this.inbox[j].posiljalac==this.konver[i].primalac && this.konver[i].posiljalac==this.inbox[j].primalac))){
                if(this.inbox[j].primalac==this.user.username){
                  if(this.inbox[j].procitano==0){
                    this.konver[i].zaProcitano=0;
                  }
                }
                /*if(this.inbox[j].procitano==0){
                  this.konver[i].procitano=0;
                }*/
              }
            }
          }
        }else{
          alert("nije ok")
        }
        
      });
    }else{
      if(this.user.tip=="radnik"){
        
        this.porukaService.dohvatiSveKonverzacije('agencija').subscribe((por:Poruka[])=>{
          if(por!=null){
            this.inbox=por
            this.inbox.sort((a,b)=>{
              if(a.datumVreme>b.datumVreme){
                return -1;
              }else{
                if(a.datumVreme<b.datumVreme){
                  return 1;
                }else{
                  return 0;
                }
              }
            })
            this.konver=[];
            if(this.user.tip='radnik'){
            for(var i in this.inbox){
              if(this.konver.length==0){
                this.konver.push(this.inbox[i]);
                console.log(this.inbox[i])
              }else{
                var pom:number;
                pom=0;
                for(var j in this.konver){
                  if(this.konver[j].nazivNekretnine==this.inbox[i].nazivNekretnine && ((this.inbox[i].posiljalac==this.konver[j].posiljalac && this.inbox[i].primalac==this.konver[j].primalac) || (this.inbox[i].primalac==this.konver[j].posiljalac && this.inbox[i].posiljalac==this.konver[j].primalac))){
                   pom=1;
                }
              }
              if(pom==0){
                this.konver.push(this.inbox[i]);
              }
              }
            }
            }
            console.log(this.konver)
            for(var i in this.konver){
              this.konver[i].zaProcitano=1;
            }

            for(var i in this.konver){
              for(var j in this.inbox){
                if(this.konver[i].nazivNekretnine==this.inbox[j].nazivNekretnine && ((this.inbox[j].posiljalac==this.konver[i].posiljalac && this.inbox[j].primalac==this.konver[i].primalac) || (this.inbox[j].primalac==this.konver[i].posiljalac && this.inbox[j].posiljalac==this.konver[i].primalac))){
                  if(this.inbox[j].primalac=='agencija'){
                    if(this.inbox[j].procitano==0){
                      this.konver[i].zaProcitano=0;
                    }
                  }
                }
              }
            }
           /* for(var i in this.konver){
              for(var j in this.inbox){
                if(this.konver[i].nazivNekretnine==this.inbox[j].nazivNekretnine && ((this.inbox[j].posiljalac==this.konver[i].posiljalac && this.inbox[j].primalac==this.konver[i].primalac) || (this.inbox[j].primalac==this.konver[i].posiljalac && this.inbox[j].posiljalac==this.konver[i].primalac))){
                  if(this.inbox[j].primalac='agencija'){
                    if(this.inbox[j].procitano==0){
                      this.konver[i].zaProcitano=0;
                    }
                  }
                  
                }
              }
            }*/
          }else{
            alertify.error("ne valja");
          }
        })
      }
    }
    
    this.otvori=0;
    this.arhivirane=[];
    this.porukaService.dohvatiSveKonverzacije(this.user.username).subscribe((por:Poruka[])=>{
      if(por){
        for(var i in por){
          if(por[i].arhivirana==1){
            this.arhivirane.push(por[i]);
          }
        }
      }
    })
  }

  user:User;
  proba:Set<Object>;
  konver:Poruka[];


  otvoriKonverzaciju(i){
    
    localStorage.setItem('konverzacija', JSON.stringify(i));
    this.router.navigate(["konverzacija"]);
  }

  mes:string;
  dat:Date;
  br:number;

  
  otvori:number;
  inbox:Poruka[];
  zaKonv:Set<String>;
  prikazInbox:number;
  arhivirane:Poruka[];
  

  arhiviraj(i){
    this.porukaService.arhiviraj(i.nazivNekretnine, i.posiljalac, i.primalac).subscribe(resp=>{
      if(resp["message"]=="Poruka je arhivirana"){
        //alert('Poruka arhivirana');
        location.reload();
      }
    })
  }

  pocetna(){
    if(this.user.tip=="admin"){
      this.router.navigate(["admin"]);
    }else{
      if(this.user.tip=="radnik"){
        this.router.navigate(["radnik"]);
      }else{
        this.router.navigate(["user"]);
      }
    }
    
  }

  prikaziFormuZaAzuriranje(){
    this.router.navigate(["azuriraj-pod"]);
  }

  pomPodesavanja:number;
  prikaziPodesavanja:number;
  pomNekretnine:number;
  prikaziNekretnine:number;

  povecajPodesavanja(){
this.pomPodesavanja++;
if(this.pomPodesavanja%2){
this.prikaziPodesavanja=1;
}else{
  this.prikaziPodesavanja=0;
}
  }

  povecajNekr(){
    this.pomNekretnine++;
    if(this.pomNekretnine%2){
      this.prikaziNekretnine=1;
    }else{
      this.prikaziNekretnine=0;
    }
  }

  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }

  kliknuto:number;
  klik(){
    this.kliknuto=1;
  }

  prikaziAzuriranje:number;
  
  zaOdobri(){
    this.router.navigate(["odobri-nekretninu"]);
      }
 
prikaziMojeN(){
  this.router.navigate(["moje-nekretnine"]);
  }

  prikazDodaj(){
    this.router.navigate(["dodaj-nekretninnu"]);
  }
  prikaziInbox(){
    this.router.navigate(["inbox"]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  prikazSveNekr(){
    this.router.navigate(["spisak-nekretnina"]);
  }

  prikaziArhivirane(){
    this.router.navigate(["arhivirane"]);
  }

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }
}
