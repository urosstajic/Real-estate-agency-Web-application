import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import alertify from "alertify.js"
import { User } from '../models/user';
import { RegistracijaService } from '../registracija.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dodaj-korisnika',
  templateUrl: './dodaj-korisnika.component.html',
  styleUrls: ['./dodaj-korisnika.component.css']
})
export class DodajKorisnikaComponent implements OnInit {

  constructor(private regService:RegistracijaService, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.prikaziNekretnine=0;
    this.prikaziPodesavanja=0;
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.prikaziKorisnik=0;
    this.pomKorisnik=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    //this.slika="";
    this.userService.nadjiSveUsers().subscribe((us:User[])=>{
      if(us){
        this.sviKorisnici=us;
      }
    });

    this.regService.nadjiSveRegistracije().subscribe((us:User[])=>{
      if(us){
        this.registracije=us;
      }
    })
  }

  username:string;
  password:string;
  ime:string;
  prezime:string;
  potvrdiP:string;
  mail:string;
  grad:string;
  drzava:string;
  slika:string;
  poruka:string;

  sviKorisnici:User[];
  registracije:User[];
  user:User;

  imePromena:string;
  prezimePromena:string;
  mailPromena:string;
  drzavaPromena:string;
  gradPromena:string;
  slikaPromena:string;
  novoUsername:string;
  users:User[];
  useriZaPrikaz:User[];
  tip:string;

  odobriKorisnik(){
    this.router.navigate(["odobri-registraciju"]);
  }

  prikazDodaj(){
    this.router.navigate(["dodaj-nekretninnu"]);
}

zaOdobri(){
  this.router.navigate(["odobri-nekretninu"]);
}

  registracija(){
    for(var i in this.sviKorisnici){
      if(this.sviKorisnici[i].username==this.username){
        alertify.error("Korisnik sa izabranim username-om vec postoji.");
        return;
      }
    }
    for(var i in this.registracije){
      if(this.registracije[i].username==this.username){
        alertify.error("Korisnik sa izabranim username-om vec postoji.");
        return;
      }
    }
    for(var i in this.sviKorisnici){
      if(this.sviKorisnici[i].mail==this.mail){
        alertify.error("Korisnik sa izabranom mail adresom vec postoji.");
        return;
      }
    }
    for(var i in this.registracije){
      if(this.registracije[i].mail==this.mail){
        alertify.error("Korisnik sa izabranom mail adresom vec postoji.");
        return;
      }
    }
    const reg=/(.)\1\1\1/;
    if(reg.test(this.password)){
      alertify.error("Lozinka nije u dobrom formatu.");
      return;
    }
    if(reg.test(this.potvrdiP)){
      alertify.error("Lozinka nije u dobrom formatu.");
      return;
    }
    if(this.password==this.potvrdiP){
      /*if(this.slika==""){
        this.slika="blank.png";
      }else{
        this.slika=this.slika.slice(12);
        console.log(this.slika)
      }*/
      var ga="";
      var fileinput=(<HTMLInputElement>document.getElementById("idfajla"));
      var file=fileinput.files;
      for(var j=0;j<file.length;j++){
        ga+=file.item(j).name;
      }
      if(ga==''){
        ga="blank.png"
      }
      this.slika=ga;
      this.userService.dodajKorisnika(this.username, this.password, this.ime, this.prezime,this.mail ,this.slika, this.drzava, this.grad, this.tip).subscribe(res=>{
        if(res["message"]=='uspeh'){
          alertify.success("Dodat je korisnik");
          location.reload();
        }
      })
    }else{
      alertify.error("Ne slazu se lozinke.")
    }
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
  pomKorisnik:number;
  pomNekretnine:number;
  prikaziNekretnine:number;
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

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }

  prikaziMojeN(){
    this.router.navigate(["moje-nekretnine"]);
    }
}
