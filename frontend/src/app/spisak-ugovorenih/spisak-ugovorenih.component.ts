import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../models/agencija';
import { User } from '../models/user';
import { ZahtevIzdavanje } from '../models/zahtev_izdavanje';
import { ZahtevProdaja } from '../models/zahtev_prodaja';
import { ZIzdavanjeService } from '../z-izdavanje.service';
import { ZProdajaService } from '../z-prodaja.service';

@Component({
  selector: 'app-spisak-ugovorenih',
  templateUrl: './spisak-ugovorenih.component.html',
  styleUrls: ['./spisak-ugovorenih.component.css']
})
export class SpisakUgovorenihComponent implements OnInit {

  constructor(private prodajaService:ZProdajaService, private izdavanjeService:ZIzdavanjeService, private router:Router, private agencijaService:AgencijaService) { }

  ngOnInit(): void {
    this.ugovoreneProdaje=[];
    this.ugovorenoIzdavanje=[];
    this.pomNekretnine=0;
    this.pomKorisnik=0;
    this.pomPodesavanja=0;
    this.prihodAgencija=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.prodajaService.dohvSve().subscribe((pro:ZahtevProdaja[])=>{
      if(pro){
        for(var i in pro){
          if(pro[i].odobreno==2){
            this.ugovoreneProdaje.push(pro[i]);
          }
        }
        /*for(var i in this.ugovoreneProdaje){
          if(this.ugovoreneProdaje[i].vlasnik_agencija=="agencija"){
            this.prihodAgencija+=this.ugovoreneProdaje[i].cena;
          }else{
            this.prihodAgencija+=this.ugovoreneProdaje[i].cena*this.agencija.procenatProdaja/100;
          }
        }*/
        for(var i in this.ugovoreneProdaje){
          this.prihodAgencija+=this.ugovoreneProdaje[i].prihod;
        }
      }
    })

    this.izdavanjeService.dohvSve().subscribe((izd:ZahtevIzdavanje[])=>{
      if(izd){
        for(var i in izd){
          if(izd[i].odobreno==2){
            this.ugovorenoIzdavanje.push(izd[i])
          }
        }
        /*for(var i in this.ugovorenoIzdavanje){
          if(this.ugovorenoIzdavanje[i].vlasnik_agencija=="agencija"){
            this.prihodAgencija+=this.ugovorenoIzdavanje[i].cena;
          }else{
            this.prihodAgencija+=this.ugovorenoIzdavanje[i].cena*this.agencija.procenatIzdavanje/100;
          }
        }*/
        for(var i in this.ugovorenoIzdavanje){
          this.prihodAgencija+=this.ugovorenoIzdavanje[i].prihod;
        }
      }
    })
    this.agencijaService.dohvSve().subscribe((a:Agencija)=>{
      if(a){
        this.agencija=a;
      }
    })


  }

  ugovoreneProdaje:ZahtevProdaja[];
  ugovorenoIzdavanje:ZahtevIzdavanje[];
  user:User;
  procenatIzd:number;
  procenatPro:number;
  agencija:Agencija;
  prihodAgencija:number;

  unesiProc(){
    console.log("uslov")
    var pro1:number;
    var pro2:number;
    if(this.procenatIzd==null){
      pro1=this.agencija.procenatIzdavanje
    }else{
      pro1=this.procenatIzd
    }
    if(this.procenatPro==null){
      pro2=this.agencija.procenatProdaja
    }else{
      pro2=this.procenatPro
    }
    this.agencijaService.defProcente(this.agencija.idA, pro1, pro2).subscribe(res=>{
      if(res["message"]=="uspeh"){
        location.reload()
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
  pomKorisnik:number;
  prikaziKorisnik:number;

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

  povecajKorisnik(){
    this.pomKorisnik++;
    if(this.pomKorisnik%2){
      this.prikaziKorisnik=1;
    }else{
      this.prikaziKorisnik=0;
    }
  }

  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  dodaj(){
    this.router.navigate(["dodaj-korisnika"]);
  }

  izmeni(){
    this.router.navigate(["svi-korisnici"]);
  }

  zaOdobri(){
    this.router.navigate(["odobri-nekretninu"]);
  }

   prikazDodaj(){
       this.router.navigate(["dodaj-nekretninnu"]);
  }


  odobriKorisnik(){
    this.router.navigate(["odobri-registraciju"]);
  }

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }

  prikaziMojeN(){
    this.router.navigate(["moje-nekretnine"]);
  }

  prikazSveNekr(){
    this.router.navigate(["spisak-nekretnina"]);
  }


  prikaziInbox(){
    this.router.navigate(["inbox"]);
  }
}
