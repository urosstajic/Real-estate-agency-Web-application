import { BuiltinTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import alertify from 'alertify.js';
import { RegistracijaService } from '../registracija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private userService:UserService, private regService:RegistracijaService, private router:Router) { }

  ngOnInit(): void {
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
      if(this.slika==null){
        this.slika="blank.png";
      }else{
        this.slika=this.slika.slice(12);
      }
    this.regService.registracija(this.username, this.password, this.ime, this.prezime, this.slika, this.mail, this.drzava, this.grad, "reg_korisnik").subscribe((user:User)=>{
      if(user["message"]=="user added"){
        alertify.success("Korisnik uspesno dodat");
        location.reload();
      }else{
        alertify.error("Korisnik nije dodat");
      }
    })
    }else{
      alertify.error("Ne slazu se lozinke.")
    }
  }

  prikaziLogin(){
    this.router.navigate([""]);
  }

  reg(){
    this.router.navigate(["registracija"]);
  }

  prikaziNekr(){
    this.router.navigate(["pocetna"]);
  }

}
