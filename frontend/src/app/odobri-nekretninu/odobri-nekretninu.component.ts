import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../models/agencija';
import { Nekretina } from '../models/nekretnina';
import { Poruka } from '../models/poruka';
import { User } from '../models/user';
import { ZahtevIzdavanje } from '../models/zahtev_izdavanje';
import { ZahtevProdaja } from '../models/zahtev_prodaja';
import { NekretninaService } from '../nekretnina.service';
import { ZIzdavanjeService } from '../z-izdavanje.service';
import { ZProdajaService } from '../z-prodaja.service';

@Component({
  selector: 'app-odobri-nekretninu',
  templateUrl: './odobri-nekretninu.component.html',
  styleUrls: ['./odobri-nekretninu.component.css']
})
export class OdobriNekretninuComponent implements OnInit {

  constructor(private nekretninaService:NekretninaService, private router:Router, private prodajaService:ZProdajaService, 
    private izdavanjeService:ZIzdavanjeService, private agencijaService:AgencijaService) { }

  ngOnInit(): void {
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.pomKorisnik=0;
    this.ugovorenePonudeIzdavanje=[];
    this.ugovorenePonudeProdaja=[];
    this.user=JSON.parse(localStorage.getItem("ulogovan"));
    this.nekretninaService.dohvatiSve().subscribe((nekr:Nekretina[])=>{
      if(nekr){
        this.nekretnine=nekr;
        console.log(this.nekretnine)
      }
    });

    this.prodajaService.dohvSve().subscribe((pro:ZahtevProdaja[])=>{
      if(pro){
        for(var i in pro){
          if(pro[i].odobreno==1){
            this.ugovorenePonudeProdaja.push(pro[i])
          }
        }
      }
    })

    this.izdavanjeService.dohvSve().subscribe((izd:ZahtevIzdavanje[])=>{
      if(izd){
        for(var i in izd){
          if(izd[i].odobreno==1){
            this.ugovorenePonudeIzdavanje.push(izd[i])
            console.log(izd[i])
          }
        }
      }
    })

    this.agencijaService.dohvSve().subscribe((a:Agencija)=>{
      if(a){
        this.agencija=a;
      }
    })
  }

  nekretnine:Nekretina[];
  user:User;
  ugovorenePonudeProdaja:ZahtevProdaja[];
  ugovorenePonudeIzdavanje:ZahtevIzdavanje[];
  agencija:Agencija;


  odobri(nekr){
    this.nekretninaService.odobri(nekr.idN).subscribe(rep=>{
      if(rep["message"]=="odobreno"){
        alert("ok");
        location.reload();
      }
    })
  }

  odbij(nekr){
    this.nekretninaService.odbij(nekr.idN).subscribe(rep=>{
      if(rep["message"]=="uspeh"){
        alert("ok");
        location.reload();
      }
    })
  }

  pocetna(){
    if(this.user.tip=="radnik"){

      this.router.navigate(["radnik"]);
    }else{
      this.router.navigate(["admin"]);
    }
    
  }
  
  odobriKorisnik(){
    this.router.navigate(["odobri-registraciju"]);
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

  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }

  zaOdobri(){
    this.router.navigate(["odobri-nekretninu"]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
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

  odobriDogovorenuProdaju(p){
    this.prodajaService.prihvatiZahtevProdajaAgencija(p.idP, p.idN, p.vlasnik_agencija, p.ime_vlasnika, p.cena, p.korisnik, p.placanje).subscribe(resp=>{
        if(resp["message"]=="prihvaceno"){
          var prih:number;
          if(p.vlasnik_agencija=='agencija'){
              prih=p.cena;
          }else{
             prih=p.cena*this.agencija.procenatProdaja/100;
         }

          this.prodajaService.postaviPrihod(p.idP, prih).subscribe(res=>{
            if(res["message"]=="uspeh"){

                  }
          })
          this.prodajaService.odbijSveOstalePonude(p.nekretnina, p.korisnik, p.idP).subscribe(re=>{
            if(re["message"]=="odbijeno sve ostalo"){
              location.reload();
            }
          })

          this.nekretninaService.nePrikazuj(p.idN).subscribe(res=>{
            if(res["message"]=="uspeh"){

            }
          })
          
        }
      })
    
  }

  odobriDogovorenoIzdavanje(p){
      this.izdavanjeService.prihvatiZahtevIzdavanjeAgencija(p.idI, p.idN, p.vlasnik_agencija, p.ime_vlasnika, p.cena, p.korisnik, p.vremeOd, p.vremeDo).subscribe(resp=>{
        if(resp["message"]=="prihvaceno"){
          var prih:number;
          var pomocD1:string=p.vremeOd+"T00:00:00";
          var pomocD2:string=p.vremeDo+"T00:00:00";
          var pomDat1=new Date(pomocD1);
         var pomDat2=new Date(pomocD2);
          var razlika=(pomDat2.getFullYear()-pomDat1.getFullYear())*12+(pomDat2.getMonth()-pomDat1.getMonth());
          /*var dat1=new Date(p.vremeOd);
          var dat2=new Date(p.vremeDo);
          console.log(dat1, dat2);
          var pomd1:string=p.vremeOd.split('-')[1];
         var pomd2:string=p.vremeDo.split('-')[1];
         console.log(pomd2);
        console.log(pomd1)*/
        if(p.vlasnik_agencija=="agencija"){
           prih=p.cena*razlika;
        }else{
         prih=p.cena*this.agencija.procenatIzdavanje/100*razlika;
         }
         this.izdavanjeService.postaviPrihod(p.idI, prih).subscribe(res=>{
        if(res["message"]=="uspeh"){

         }
      })

          this.izdavanjeService.odbijSve(p.idI, p.nekretnina, p.vremeOd, p.vremeDo).subscribe(re=>{
            if(re["message"]=="uspeh"){
              location.reload();
            }
          })
          
        }
      })
  }

  odbijDogovorenoIzdavanje(p){
    this.izdavanjeService.odbijPonudu(p.idI).subscribe(resp=>{
      if(resp["message"]=="uspeh"){
        location.reload();
      }
    })
  }

  odbijDogovorenuProdaju(p){
    this.prodajaService.odbijPonudu(p.idP).subscribe(resp=>{
      if(resp["message"]=="uspeh"){
        location.reload();
      }
    })
  }

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }

  prikaziMojeN(){
    this.router.navigate(["moje-nekretnine"]);
  }
}
