import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretninaService } from '../nekretnina.service';

@Component({
  selector: 'app-spisak-nekretnina',
  templateUrl: './spisak-nekretnina.component.html',
  styleUrls: ['./spisak-nekretnina.component.css']
})
export class SpisakNekretninaComponent implements OnInit {

  constructor(private router:Router, private nekretninaService:NekretninaService) { }

  ngOnInit(): void {
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.nekretnine=[];
    this.user=JSON.parse(localStorage.getItem("ulogovan"));
    this.nekretninaService.dohvatiSve().subscribe((nekr:Nekretina[])=>{
      if(nekr){
        for(var i in nekr){
          if(nekr[i].odobreno==1){
            this.nekretnine.push(nekr[i])
          }
        }
        
        for(var i in this.nekretnine){
          this.pom=this.nekretnine[i].galerija.split(",");
          this.nekretnine[i].randomSlika=this.pom[Math.floor(Math.random()*this.pom.length)];
          while(this.nekretnine[i].randomSlika.includes('mp4')){
            this.pom=this.nekretnine[i].galerija.split(",");
          this.nekretnine[i].randomSlika=this.pom[Math.floor(Math.random()*this.pom.length)];
          }
        }
        console.log(this.nekretnine)
      }
    });
  }

  nekretnine:Nekretina[];
  user:User;
  pom:string[];

  pocetna(){
    this.router.navigate(["radnik"]);
  }

  prikaziInbox(){
    this.router.navigate(["inbox"]);
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

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }

  odobriKorisnik(){
    this.router.navigate(["odobri-registraciju"]);
  }


  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }

  zaOdobri(){
this.router.navigate(["odobri-nekretninu"]);
  }


  prikaziFormuZaAzuriranje(){
    this.router.navigate(["azuriraj-pod"]);
  }

  prikazDodaj(){
    this.router.navigate(["dodaj-nekretninnu"]);
  }

  
  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  prikazSveNekr(){
    this.router.navigate(["spisak-nekretnina"]);
  }

  izbaciIzPromovisanih(id){
    this.nekretninaService.izbaciIzPromovisanih(id).subscribe(resp=>{
      if(resp["message"]=="izbaceno iz promovisanih"){
        alert('ok');
        location.reload();
      }
    })
  }

  promovisi(id){
    this.nekretninaService.promovisi(id).subscribe(resp=>{
      if(resp["message"]=="uspesno promovisano"){
        alert("ok")
        location.reload();
      }
    })
  }



  prikaziMojeN(){
    this.router.navigate(["moje-nekretnine"]);
  }

 
}
