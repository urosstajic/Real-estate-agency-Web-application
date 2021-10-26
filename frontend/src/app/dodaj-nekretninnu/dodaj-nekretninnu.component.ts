import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NekretninaService } from '../nekretnina.service';
import alertify from "alertify.js";
import { User } from '../models/user';
import { Nekretina } from '../models/nekretnina';

@Component({
  selector: 'app-dodaj-nekretninnu',
  templateUrl: './dodaj-nekretninnu.component.html',
  styleUrls: ['./dodaj-nekretninnu.component.css']
})
export class DodajNekretninnuComponent implements OnInit {

  constructor(private router:Router, private nekretninaService:NekretninaService) { }

  ngOnInit(): void {
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.pomKorisnik=0;
    this.prikaziFormuZaUnos=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));

    this.nekretninaService.dohvatiSve().subscribe((n:Nekretina[])=>{
      if(n){
        this.sveNekr=n;
      }
    })
  }

  user:User;
  sveNekr:Nekretina[];

  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }
  
  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  zaOdobri(){
    this.router.navigate(["odobri-nekretninu"]);
      }


  prikaziFormuZaAzuriranje(){
    this.router.navigate(["azuriraj-pod"]);
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

  prikaziInbox(){
    this.router.navigate(["inbox"]);
  }

  naziv:string;
  cena:number;
  gradZaNekr:string;
  deograda:string;
  ulica:string;
  tip:string;
  sprat:string;
  spratovnost:string;
  kvadratura:number;
  brsoba:string;
  namesten:string;
  izdpro:string;

  odobriKorisnik(){
    this.router.navigate(["odobri-registraciju"]);
  }



  dodajNekretninu(){
    if(this.user.tip=="radnik" || this.user.tip=="admin"){
      var ga="";
      var fileinput=(<HTMLInputElement>document.getElementById("idfajla"));
      var file=fileinput.files;
      for(var i=0;i<file.length;i++){
        ga+=file.item(i).name;
        if(i+1!=file.length){
          ga+=",";
        }
      }
      console.log(ga);
      var adresa=this.gradZaNekr+", "+this.deograda+", "+this.ulica;
      if(this.tip=="stan"){
        var spr="sprat:"+this.sprat+",ukupno:"+this.spratovnost;
      }else{
        var spr=this.sprat;
      }
      
      
      /*for(var id in this.galerija){
        ga+=this.galerija[id];
      }*/
      var id:number;
      id=this.sveNekr[this.sveNekr.length-1].idN+1;
      this.nekretninaService.dodajNekretninuAgencija(id,this.naziv, adresa, this.tip, spr, this.kvadratura, this.brsoba, this.namesten, ga, this.izdpro, this.cena).subscribe(resp=>{
        if(resp["message"]=="nekretnina je dodata"){
          alert('ok');
        }
      })
    }else{
      var ga="";
      var fileinput=(<HTMLInputElement>document.getElementById("idfajla"));
      var file=fileinput.files;
      if(file.length<3){
        alertify.error("Mora najmanje 3 fajla da se unesu");
        return;
        
      }
      for(var i=0;i<file.length;i++){
        ga+=file.item(i).name;
        if(i+1!=file.length){
          ga+=",";
        }
      }
      console.log(ga);
      var adresa=this.gradZaNekr+", "+this.deograda+", "+this.ulica;
      if(this.tip=="stan"){
        var spr="sprat:"+this.sprat+",ukupno:"+this.spratovnost;
      }else{
        var spr=this.sprat;
      }
      /*for(var id in this.galerija){
        ga+=this.galerija[id];
      }*/
      var id:number;
      id=this.sveNekr[this.sveNekr.length-1].idN+1;
      this.nekretninaService.dodajNekretninuUser(id,this.naziv, adresa, this.tip, spr, this.kvadratura, this.brsoba, this.namesten, ga, this.izdpro, this.cena, this.user.username).subscribe(resp=>{
        if(resp["message"]=="nekretnina je dodata"){
          alertify.success("Nekretnina je uspesno dodata");
          location.reload();
        }
      })
    }
    
  }

   
prikaziMojeN(){
  this.router.navigate(["moje-nekretnine"]);
  }

  prikazDodaj(){
    this.router.navigate(["dodaj-nekretninnu"]);
  }

  prikazSveNekr(){
    this.router.navigate(["spisak-nekretnina"]);
  }

  dodaj(){
    this.router.navigate(["dodaj-korisnika"]);
  }

  izmeni(){
    this.router.navigate(["svi-korisnici"]);
  }

  pomKorisnik:number;
  prikaziKorisnik:number;

  povecajKorisnik(){
    this.pomKorisnik++;
    if(this.pomKorisnik%2){
      this.prikaziKorisnik=1;
    }else{
      this.prikaziKorisnik=0;
    }
  }

  prikaziFormuZaUnos:number;

 izaberiTipNekretnine(){
  this.prikaziFormuZaUnos=1;
 }

 ugovorene(){
  this.router.navigate(['spisak-ugovorenih']);
}

}
