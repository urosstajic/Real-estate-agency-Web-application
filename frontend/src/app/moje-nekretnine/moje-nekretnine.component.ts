import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretninaService } from '../nekretnina.service';
import alertify from "alertify.js";
import { PorukaService } from '../poruka.service';
import { ZProdajaService } from '../z-prodaja.service';
import { ZIzdavanjeService } from '../z-izdavanje.service';

@Component({
  selector: 'app-moje-nekretnine',
  templateUrl: './moje-nekretnine.component.html',
  styleUrls: ['./moje-nekretnine.component.css']
})
export class MojeNekretnineComponent implements OnInit {

  constructor(private nekretninaService:NekretninaService, private router:Router,private porukaService:PorukaService
    ,private prodajaService:ZProdajaService, private izdavanjeService:ZIzdavanjeService) { }

  ngOnInit(): void {
    this.dodajN=0;
    this.ukloniS=0;
    this.izmena=0;
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.promovisaneNekretnine=[];
    this.mojeNekretnine=[];
    this.user=JSON.parse(localStorage.getItem("ulogovan"));
    this.nekretninaService.dohvatiSve().subscribe((data:Nekretina[])=>{
      if(data!=null){
        this.nekretnine=data;
        for(var i in this.nekretnine){
          this.pom=this.nekretnine[i].galerija.split(",");
          this.nekretnine[i].randomSlika=this.pom[Math.floor(Math.random()*this.pom.length)];
        }
        if(this.user.tip=="reg_korisnik"){
          for(var i in this.nekretnine){
            if(this.nekretnine[i].ime_vlasnika==this.user.username){
              this.mojeNekretnine.push(this.nekretnine[i]);
            }
          }
        }else{
          if(this.user.tip="radnik"){
            for(var i in this.nekretnine){
              if(this.nekretnine[i].vlasnik=="agencija"){
                this.mojeNekretnine.push(this.nekretnine[i]);
              }
            }
          }
        }
        
      }else{
        alert("Ne valja")
      }
    });
  }

  naziv:string;
  iznPro:string;
  namesten:string;
  drzava:string;
  ulica:string;
  grad:string;
  brsoba:string;
  tip:string;
  sprat:string;
  spratovnost:string;
  kvadratura:number;
  cena:number;
  galerija:string;


  user:User;
  mojeNekretnine:Nekretina[];
  nekretnine:Nekretina[];
  promovisaneNekretnine:Nekretina[];

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
 
   prikaziFormuZaAzuriranje(){
    this.router.navigate(["azuriraj-pod"]);
   }

   izmena:number;
   pom:string[];
  kojaS:string;
  kojaZaIzmenu:Nekretina;

  izmeni(mm){
    this.izmena=1;
    this.kojaZaIzmenu=mm;
  }

  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }


  dodajN:number;
  ukloniS:number;
  dodajNove(){
    this.dodajN=1;
    this.ukloniS=0;
  }

  ukloniStare(){
    this.ukloniS=1;
    this.dodajN=0;
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

    ugovorene(){
      this.router.navigate(['spisak-ugovorenih']);
    }

    zaOdobri(){
      this.router.navigate(["odobri-nekretninu"]);
    }

    izmenaNekretnine(){
      var pomNaz, pomNamesten, pomKvadr, pomIznPro, pomCena, pomTip, pomBrs,pomSprat, pomAdr;
      var menjanNaziv:number=0;
      if(this.naziv==null ){
        pomNaz=this.kojaZaIzmenu.naziv
      }else{
        pomNaz=this.naziv;
        menjanNaziv=1;
      }
      if(this.namesten==null ){
        pomNamesten=this.kojaZaIzmenu.namesten
      }else{
        pomNamesten=this.namesten
      }
      if(this.kvadratura==null ){
        pomKvadr=this.kojaZaIzmenu.kvadratura
      }else{
        pomKvadr=this.kvadratura
      }
      if(this.iznPro==null ){
        pomIznPro=this.kojaZaIzmenu.izdavanje_prodaja;
      }else{
        pomIznPro=this.iznPro
      }
      if(this.cena==null){
        pomCena=this.kojaZaIzmenu.cena
      }else{
        pomCena=this.cena
      }
      if(this.tip==null){
        pomTip=this.kojaZaIzmenu.tip
      }else{
        pomTip=this.tip;
      }
      if(this.brsoba==null){
        pomBrs=this.kojaZaIzmenu.broj_soba;
      }else{
        pomBrs=this.brsoba
      }
      if(this.kojaZaIzmenu.tip=="stan"){
        if(this.sprat==null && this.spratovnost==null){
          pomSprat=this.kojaZaIzmenu.sprat
        }else{
          var pom:string[];
          pom=this.kojaZaIzmenu.sprat.split(',ukupno:');
          if(this.sprat==null  && this.spratovnost!=null){
            
            pomSprat="sprat:"+pom[0].slice(6)+",ukupno:"+this.spratovnost;
  
          }else{
            if(this.sprat!=null && this.spratovnost==null ){
              pomSprat="sprat:"+this.sprat+",ukupno:"+pom[1];
          }else{
            pomSprat="sprat:"+this.sprat+",ukupno:"+this.spratovnost;
          }
        }
      }
      }else{
        if(this.kojaZaIzmenu.tip=="kuca"){
          if(this.sprat==null){
            pomSprat=this.kojaZaIzmenu.sprat;
          }else{
            pomSprat=this.sprat;
          }
        }
      }
      
    if(this.drzava==null && this.ulica==null && (this.grad==null)){
      pomAdr=this.kojaZaIzmenu.adresa
    }else{
      var pom:string[];
        pom=this.kojaZaIzmenu.adresa.split(', ');
        //alert(pom.length)
       if(this.drzava!=null && this.ulica==null  && this.grad==null){
          pomAdr=this.drzava+", "+pom[1]+", "+pom[2];

      }else{
        if((this.drzava!=null) && (this.ulica!=null) && (this.grad==null )){
          pomAdr=this.drzava+", "+pom[1]+", "+this.ulica;
        }else{
          if((this.drzava!=null ) && (this.ulica!=null ) && (this.grad!=null )){
           pomAdr=this.drzava+", "+this.grad+", "+this.ulica;
          }else{
            if((this.drzava!=null ) && (this.ulica==null ) && (this.grad!=null )){
              pomAdr=this.drzava+", "+this.grad+", "+pom[2];
            }else{
              if((this.drzava==null) && (this.ulica==null) && this.grad!=null){
                pomAdr=pom[0]+", "+this.grad+", "+pom[2];
              }else{
                if(this.drzava==null  && (this.ulica!=null ) && (this.grad==null)){
                  pomAdr=pom[0]+", "+pom[1]+", "+this.ulica;
              }else{
                if((this.drzava==null ) && (this.ulica!=null) && (this.grad!=null )){
                  pomAdr=pom[0]+", "+this.grad+", "+this.ulica;
                }
              }
            }
            }
          }
        }
      }
    }
    var ga="";
    var zaProveru:number=0;
    if(this.galerija==null){
      ga=this.kojaZaIzmenu.galerija
    }else{
      console.log('staa');
      var fileinput=(<HTMLInputElement>document.getElementById("idfajla"));
      var file=fileinput.files;
      zaProveru=file.length
      
      for(var i=0;i<file.length;i++){
        ga+=file.item(i).name;
        if(i+1!=file.length){
          ga+=",";
        }
      }
    }
    
    if(this.dodajN==1){
      if(menjanNaziv==1){
        var zaizm:string=this.kojaZaIzmenu.naziv;
        this.porukaService.promeniNazivNekr(zaizm, pomNaz).subscribe(res=>{
          if(res["message"]=="uspeh"){

          }
        })
        if(this.kojaZaIzmenu.izdavanje_prodaja=='prodaja'){
          this.prodajaService.promeniNazivNekr(zaizm, pomNaz).subscribe();
        }else{
          this.izdavanjeService.promeniNazivNekr(zaizm, pomNaz).subscribe(res=>{
            if(res["message"]=="uspeh"){
              
            }
          })
        }
        

        
      }
      var zaGal:string;
      console.log(ga)
      zaGal=this.kojaZaIzmenu.galerija+","+ga;
      console.log(zaGal)
      this.nekretninaService.azurirajNekr(this.kojaZaIzmenu.idN, pomNaz, pomAdr, pomTip, pomSprat, pomKvadr, zaGal, pomBrs, pomIznPro,pomNamesten , pomCena).
      subscribe(res=>{
        if(res["message"]=="azurirano"){
          alertify.success("Uspesno azurirano");
          location.reload();
        }
      })

    }else{
      if(this.ukloniS==1){
        if(zaProveru<3){
          alertify.error('Morate uneti barem tri fajla');
          return;
        }
        if(menjanNaziv==1){
          var zaizm:string=this.kojaZaIzmenu.naziv;
          this.porukaService.promeniNazivNekr(zaizm, pomNaz).subscribe(res=>{
            if(res["message"]=="uspeh"){

            }
          })
          if(this.kojaZaIzmenu.izdavanje_prodaja=='prodaja'){
            this.prodajaService.promeniNazivNekr(zaizm, pomNaz).subscribe();
          }else{
            this.izdavanjeService.promeniNazivNekr(zaizm, pomNaz).subscribe(res=>{
              if(res["message"]=="uspeh"){
                
              }
            })
          }
          

          
        }

        
        this.nekretninaService.azurirajNekr(this.kojaZaIzmenu.idN, pomNaz, pomAdr, pomTip, pomSprat, pomKvadr, ga, pomBrs, pomIznPro,pomNamesten , pomCena).
        subscribe(res=>{
          if(res["message"]=="azurirano"){
            alertify.success("Uspesno azurirano");
            location.reload();
          }
        })
      }else{
        if(menjanNaziv==1){
          var zaizm:string=this.kojaZaIzmenu.naziv;
          this.porukaService.promeniNazivNekr(zaizm, pomNaz).subscribe(res=>{
            if(res["message"]=="uspeh"){

            }
          })
          if(this.kojaZaIzmenu.izdavanje_prodaja=='prodaja'){
            this.prodajaService.promeniNazivNekr(zaizm, pomNaz).subscribe();
          }else{
            this.izdavanjeService.promeniNazivNekr(zaizm, pomNaz).subscribe(res=>{
              if(res["message"]=="uspeh"){
                
              }
            })
          }
          

          
        }
        this.nekretninaService.azurirajNekr(this.kojaZaIzmenu.idN, pomNaz, pomAdr, pomTip, pomSprat, pomKvadr, this.kojaZaIzmenu.galerija, pomBrs, pomIznPro,pomNamesten , pomCena).
        subscribe(res=>{
          if(res["message"]=="azurirano"){
            location.reload();
            alertify.success("Uspesno azurirano");
            
          }
        })
      }
    }
}

prikazSveNekr(){
  this.router.navigate(["spisak-nekretnina"]);
}
}
