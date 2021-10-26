import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretninaService } from '../nekretnina.service';
import { UserService } from '../user.service';
import {MatCardModule} from '@angular/material/card';
import { Poruka } from '../models/poruka';
import { PorukaService } from '../poruka.service';
import alertify from "alertify.js";
import {MatMenuModule} from '@angular/material/menu';
import { MatMenuItem } from '@angular/material/menu';
import { ZahtevProdaja } from '../models/zahtev_prodaja';
import { ZProdajaService } from '../z-prodaja.service';
import { ZIzdavanjeService } from '../z-izdavanje.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router:Router, private userService:UserService, private nekretninaService:NekretninaService,
     private porukaService:PorukaService, private prodajaService:ZProdajaService,private izdavanjeService:ZIzdavanjeService) { }

  ngOnInit(): void {
    this.promovisaneNekretnine=[];
    this.prikaziAzuriranje=0;
    this.mojeNekretnine=[];
    this.pomPodesavanja=0;
    this.prikaziPodesavanja=0;
    this.pomNekretnine=0;
    this.prikaziNekretnine=0;
    this.zaPrikaz=[];
    this.nekretnine=[];
    this.user=JSON.parse(localStorage.getItem("ulogovan"));

    this.nekretninaService.dohvatiSve().subscribe((data:Nekretina[])=>{
      if(data!=null){
        for(var i in data){
          if(data[i].odobreno==1){
            this.nekretnine.push(data[i]);
          }
        }

        //this.nekretnine=data;
        for(var i in this.nekretnine){
          this.pom=this.nekretnine[i].galerija.split(",");
          this.nekretnine[i].randomSlika=this.pom[Math.floor(Math.random()*this.pom.length)];
          while(this.nekretnine[i].randomSlika.includes('mp4')){
            this.pom=this.nekretnine[i].galerija.split(",");
          this.nekretnine[i].randomSlika=this.pom[Math.floor(Math.random()*this.pom.length)];
          }
        }
        for(var i in this.nekretnine){
          if(this.nekretnine[i].promocija==1){
            this.promovisaneNekretnine.push(this.nekretnine[i]);
          }
        }
        for(var i in this.nekretnine){
          if(this.nekretnine[i].ime_vlasnika==this.user.username){
            this.mojeNekretnine.push(this.nekretnine[i]);
          }
        }
      }else{
        alert("Ne valja")
      }
    });

    
   
  }

 
  user:User;
  nekretnine:Nekretina[];
  mojeNekretnine:Nekretina[];
  promovisaneNekretnine:Nekretina[];
 

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }
  
  
 pocetna(){
   this.router.navigate(["user"]);
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


  prikaziNekretninu(nekretn){
    localStorage.setItem("nekretnina", JSON.stringify(nekretn));
    this.router.navigate(['nekretnina']);
  }

  kojiGrad:string;
  cenaOd:number;
  cenaDo:number;
  zaPrikaz:Nekretina[];

  pretraziNekretnine(){
    if(this.cenaOd==null && this.cenaDo==null && this.kojiGrad==null){
      alertify.error("Morate uneti neki parametar");
      return;
    }
    this.nekretninaService.pronadjiNekretninu(this.kojiGrad, this.cenaOd, this.cenaDo).subscribe((nekr:Nekretina[])=>{
      if(nekr){
        this.zaPrikaz=[];
        for(var i in nekr){
          if(nekr[i].odobreno==1){
            this.zaPrikaz.push(nekr[i]);
          }
        }
        for(var i in this.zaPrikaz){
          this.pom=this.zaPrikaz[i].galerija.split(",");
          this.zaPrikaz[i].randomSlika=this.pom[Math.floor(Math.random()*this.pom.length)];
        }
      
        this.kojiGrad=null;
        this.cenaDo=null;
        this.cenaOd=null;
      }else{
        alertify.error("Ne postoje nekretnine sa zeljenim parametrima");
      }
    })
  }

  
 

  prikaziAzuriranje:number;
  
  prikaziFormuZaAzuriranje(){
   this.router.navigate(["azuriraj-pod"]);
  }

  prikaziInbox(){
    this.router.navigate(["inbox"]);
  }
 prikaziMojeN(){
  this.router.navigate(["moje-nekretnine"]);
  }

  prikazDodaj(){
    this.router.navigate(["dodaj-nekretninnu"]);
  }

  slikaVideo(z){
    if(z.randomSlika.includes('mp4')){
      return "video";
    }else{
      return "slika";
    }
  }

 
  
}