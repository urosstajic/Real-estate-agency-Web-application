import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretina } from '../models/nekretnina';
import { NekretninaService } from '../nekretnina.service';
import alertify from "alertify.js";

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private nekretnineService:NekretninaService, private router:Router) { }

  ngOnInit(): void {
    this.zaPrik=0;
    this.zaPrikazivanje=[];
    this.cenaOd=null;
        this.cenaDo=null;
        this.kojiGrad=null;
  }

  zaPrik:number;

  pretraziNekretnine(){
    if(this.cenaOd==null && this.cenaDo==null && this.kojiGrad==null){
      alertify.error("Morate uneti neki od podataka za pretragu.");
      return;
    }
    this.nekretnineService.pronadjiNekretninu(this.kojiGrad, this.cenaOd, this.cenaDo).subscribe((nekr:Nekretina[])=>{
      if(nekr){
        //za prikazivanje samo odobrenih nekretnina
        this.zaPrikazivanje=[];
        for(var i in nekr){
          if(nekr[i].odobreno==1){
            this.zaPrikazivanje.push(nekr[i]);
          }
        }
        this.zaPrik=1;
        for(var i in this.zaPrikazivanje){
          this.pomoc=this.zaPrikazivanje[i].galerija.split(",");
          this.zaPrikazivanje[i].randomSlika=this.pomoc[Math.floor(Math.random()*this.pomoc.length)];
        }

        this.cenaOd=null;
        this.cenaDo=null;
        this.kojiGrad=null;
      
      }else{
        alert("Ne valja");
      }
    })

    this.cenaOd=null;
    this.cenaDo=null;
    this.kojiGrad=null;
  }

  cenaOd:number;
  cenaDo:number;
  kojiGrad:string;
  zaPrikazivanje:Nekretina[];
  pomoc:string[];

  niz:string[];
  dohvatiGradOpstinu(adr){
    this.niz=adr.split(',');
    return this.niz[0].concat(this.niz[1]);

  }

  dohvatiTip(z){
    if(z.tip=="kuca"){
      return "kuca";
    }else{
      return z.broj_soba+" "+z.tip;
    }
  }
  
  pom:string[];
  kojaS:string;

  /*dohvatiSliku(slika){
    this.pom=slika.split(',');
    let ran=Math.floor(Math.random() * ( 2+ 1));
    var s="/assets/"+this.pom[ran];
    return s;


  }*/

  slikaVideo(z){
    if(z.randomSlika.includes('mp4')){
      return "video";
    }else{
      return "slika";
    }
  }

  reg(){
    this.router.navigate(["registracija"]);
  }
prikaziNekr(){
  this.router.navigate(["pocetna"]);
}

prikaziLogin(){
  this.router.navigate([""]);
}
  
}
