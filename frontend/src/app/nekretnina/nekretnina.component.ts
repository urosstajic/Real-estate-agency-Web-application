import { Component, OnInit } from '@angular/core';
import { Nekretina } from '../models/nekretnina';
import { User } from '../models/user';
import { PorukaService } from '../poruka.service';
import { ZIzdavanjeService } from '../z-izdavanje.service';
import { ZProdajaService } from '../z-prodaja.service';
import alertify from "alertify.js";
import { Router } from '@angular/router';
import { ZahtevIzdavanje } from '../models/zahtev_izdavanje';
import { ZahtevProdaja } from '../models/zahtev_prodaja';
import { Poruka } from '../models/poruka';
import { BlokiranService } from '../blokiran.service';
import { Blokiran } from '../models/blokiran';

@Component({
  selector: 'app-nekretnina',
  templateUrl: './nekretnina.component.html',
  styleUrls: ['./nekretnina.component.css']
})
export class NekretninaComponent implements OnInit {

  constructor(private prodajaService:ZProdajaService, private izdavanjeService:ZIzdavanjeService, private porukaService:PorukaService
    ,private router:Router, private blokiranService:BlokiranService) { }

  ngOnInit(): void {
    this.nekretnina=JSON.parse(localStorage.getItem('nekretnina'));

    this.pomoc=this.nekretnina.galerija.split(",");
    this.nekretnina.randomSlika=this.pomoc[Math.floor(Math.random()*this.pomoc.length)];
    while(this.nekretnina.randomSlika.includes('mp4')){
      this.pomoc=this.nekretnina.galerija.split(",");
      this.nekretnina.randomSlika=this.pomoc[Math.floor(Math.random()*this.pomoc.length)];
    }


    this.kliknuto=0;
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.izdavanjeService.dohvSve().subscribe((izd:ZahtevIzdavanje[])=>{
      if(izd){
        this.sveIzdavanje=izd;
      }
    })
    this.prodajaService.dohvSve().subscribe((pro:ZahtevProdaja[])=>{
      if(pro){
        this.sveProdaja=pro;
      }
    })
    this.porukaService.dohvatiSve().subscribe((p:Poruka[])=>{
      if(p){
        this.svePoruke=p;
      }
    })

    this.blokiranService.dohvSve().subscribe((b:Blokiran[])=>{
      if(b){
        this.blokirani=b;
        console.log(this.blokirani)
      }
    })
  }
  nekretnina:Nekretina;
  pocetak:string;
  kraj:string;
  placanje:string;
  kliknuto:number;
  sadrzaj:string;
  user:User;
  sveIzdavanje:ZahtevIzdavanje[];
  sveProdaja:ZahtevProdaja[];
  svePoruke:Poruka[];
  pomoc:string[];
  blokirani:Blokiran[];
  zaBlok:string;


  kontaktirajVlasnika(){
    this.kliknuto=1;
  }


  posaljiPoruku(){
    var datum=new Date();
    datum.setHours(datum.getHours()+2);
    if(this.nekretnina.vlasnik=="vlasnik"){
      var id:number;
      id=this.svePoruke[this.svePoruke.length-1].idPor+1;
      this.porukaService.posaljiPoruku(id,this.user.username, this.nekretnina.ime_vlasnika, this.nekretnina.naziv,this.nekretnina.idN, this.sadrzaj, datum, 0, 0, null).subscribe(mes=>{
        if(mes["message"]=="poruka added"){
          alertify.success("Poruka je uspesno poslata.");
        }
      })
    }else{
      var id:number;
      var agent:string;
      if(this.user.tip=="radnik"){
        agent=this.user.username;
      }else{
        agent=null;
      }
      id=this.svePoruke[this.svePoruke.length-1].idPor+1;
      this.porukaService.posaljiPoruku(id, this.user.username, "agencija", this.nekretnina.naziv,this.nekretnina.idN, this.sadrzaj, datum, 0, 0, agent).subscribe(mes=>{
        if(mes["message"]=="poruka added"){
          alertify.success("Poruka je uspesno poslata.");
        }
      })
    }
    
  }

  daLiBlokiran(){
      for(var i in this.blokirani){
        console.log("a oovoo")
        if((this.blokirani[i].koB==this.user.username && this.blokirani[i].kogaB==this.nekretnina.ime_vlasnika) ||
        (this.blokirani[i].koB==this.nekretnina.ime_vlasnika && this.blokirani[i].kogaB==this.user.username)){
          console.log('neki pro')
          return "blokiran";
        }
      }
      return 'nije'
    
  }

  izdavanje(){
    var date_regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    if(!date_regex.test(this.pocetak) || !date_regex.test(this.kraj)){
      alertify.error("datum nije u dobrom formatu");
      
      return;
    }
    for(var i in this.sveIzdavanje){
      if(this.sveIzdavanje[i].idN==this.nekretnina.idN && ((this.sveIzdavanje[i].vremeOd>this.pocetak && this.sveIzdavanje[i].vremeOd<this.kraj) || (this.sveIzdavanje[i].vremeOd<this.pocetak && this.sveIzdavanje[i].vremeDo>this.pocetak)) && this.sveIzdavanje[i].odobreno==2){
        alertify.error("U zeljenom periodu nije moguce izdati nekretninu.");
        return;
      }/*else{
        if(this.sveIzdavanje[i].idN==this.nekretnina.idN && this.sveIzdavanje[i].vremeOd<this.pocetak && this.sveIzdavanje[i].vremeDo>this.pocetak  && this.sveIzdavanje[i].odobreno==2){
          alertify.error("U zeljenom periodu nije moguce izdati nekretninu.");
          return;
        }
      }*/
    }
    if(this.kraj<this.pocetak){
      alertify.error("datum nije u dobrom formatu");
      return;
    }
    var pom:number;
    pom=this.sveIzdavanje[this.sveIzdavanje.length-1].idI+1;
    var niz:string[];
    var niz1:string[];
    niz=this.pocetak.split('T');
    niz1=this.kraj.split('T');
    var idPoru=this.svePoruke[this.svePoruke.length-1].idPor+1;
    this.izdavanjeService.izdavanje(pom,this.nekretnina.naziv,this.nekretnina.idN,idPoru, niz[0], niz1[0], this.nekretnina.vlasnik, this.nekretnina.ime_vlasnika,this.nekretnina.cena, this.user.username, 0, null).subscribe(resp=>{
      if(resp["message"]=="zahtev added"){
        var dat=new Date();
        dat.setHours(dat.getHours()+2);
        this.porukaService.posaljiPoruku(idPoru, this.user.username, this.nekretnina.ime_vlasnika, this.nekretnina.naziv, this.nekretnina.idN, "Dajem ponudu.", dat,0, 0, null).subscribe(rr=>{
          if(rr["message"]=="poruka added"){
            alertify.success("Uspesno napravljen zahtev za izdavanje.")
            location.reload();
          }
        })
        
      }
    })
  }

  prodaja(){
    if(this.nekretnina.vlasnik!="agencija"){
      var pom:number;
    pom=this.sveProdaja[this.sveProdaja.length-1].idP+1;
    var id:number;
      id=this.svePoruke[this.svePoruke.length-1].idPor+1;
      this.prodajaService.prodaja(pom, this.nekretnina.naziv,this.nekretnina.idN,id, this.nekretnina.vlasnik, this.nekretnina.ime_vlasnika, this.nekretnina.cena, this.user.username, this.placanje, 0, null).subscribe(res=>{
        var dat=new Date();
        dat.setHours(dat.getHours()+2);
        this.porukaService.posaljiPoruku(id, this.user.username, this.nekretnina.ime_vlasnika, this.nekretnina.naziv,this.nekretnina.idN, "Dajem ponudu.", dat, 0, 0,null).subscribe(rr=>{
          if(rr["message"]=="poruka added"){
            alertify.success("Uspesno napravljen zahtev za kupovinu.")
          }
        })
      })
    }else{
      var pom:number;
    pom=this.sveProdaja[this.sveProdaja.length-1].idP+1;
    var id:number;
      id=this.svePoruke[this.svePoruke.length-1].idPor+1;
      this.prodajaService.prodaja(pom,this.nekretnina.naziv,this.nekretnina.idN,id,  this.nekretnina.vlasnik, "agencija", this.nekretnina.cena, this.user.username, this.placanje, 0, null).subscribe(res=>{
        var dat=new Date();
        dat.setHours(dat.getHours()+2);
        this.porukaService.posaljiPoruku(id, this.user.username, "agencija", this.nekretnina.naziv,this.nekretnina.idN, "Dajem ponudu.", dat, 0, 0, null).subscribe(rr=>{
          if(rr["message"]=="poruka added"){
            alertify.success("Uspesno napravljen zahtev za kupovinu.")
          }
        })
      })
    }
    
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  pocetna(){
    this.router.navigate(["user"]);
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


  prikaziFormuZaAzuriranje(){
    this.router.navigate(["azuriraj-pod"]);
  }

  prikazDodaj(){
    this.router.navigate(["dodaj-nekretninnu"]);
  }

  prikaziMojeN(){
    this.router.navigate(["moje-nekretnine"]);
  }
}
