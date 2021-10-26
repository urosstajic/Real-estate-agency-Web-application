import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poruka } from '../models/poruka';
import { User } from '../models/user';
import { PorukaService } from '../poruka.service';

@Component({
  selector: 'app-arhivirane',
  templateUrl: './arhivirane.component.html',
  styleUrls: ['./arhivirane.component.css']
})
export class ArhiviraneComponent implements OnInit {

  constructor(private porukaService:PorukaService, private router:Router) { }

  ngOnInit(): void {
    this.arhivirane=[];
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.porukaService.dohvatiSve().subscribe((p:Poruka)=>{
      if(p){
        for(var i in p){
          if(p[i].arhivirana==1){
            this.arhivirane.push(p[i]);
        }
        }
        console.log(this.arhivirane)

      this.arhivirane.sort((a,b)=>{
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
            for(var i in this.arhivirane){
              if(this.konver.length==0){
                this.konver.push(this.arhivirane[i]);
              }else{
                var pom:number;
                pom=0;
                for(var j in this.konver){
                  if(this.konver[j].nazivNekretnine==this.arhivirane[i].nazivNekretnine && ((this.arhivirane[i].posiljalac==this.konver[j].posiljalac && this.konver[j].primalac==this.arhivirane[i].primalac) || (this.arhivirane[i].posiljalac==this.konver[j].primalac && this.konver[j].posiljalac==this.arhivirane[i].primalac))){
                    pom=1;
                  }
                }
                if(pom==0){
                  this.konver.push(this.arhivirane[i]);
                }
              }
            }
          }

      }
      

    })
  }

  arhivirane:Poruka[];
  user:User;
  konver:Poruka[];

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

  izbaciIzArhiviranih(i){
    this.porukaService.izbaciIzArhiviranih(i.nazivNekretnine, i.posiljalac, i.primalac).subscribe(resp=>{
      if(resp["message"]=="uspeh"){
        //alert('Poruka arhivirana');
        location.reload();
      }
    })
  }

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }

}
