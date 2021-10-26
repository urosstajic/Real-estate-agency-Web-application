
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { UserComponent } from '../user/user.component';
import alertify from "alertify.js";

@Component({
  selector: 'app-promeni-lozinku',
  templateUrl: './promeni-lozinku.component.html',
  styleUrls: ['./promeni-lozinku.component.css']
})
export class PromeniLozinkuComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.pomKorisnik=0;
    this.user=JSON.parse(localStorage.getItem("ulogovan"));
  }
  user:User;
  staraL:string;
nova:string;
potvrdiN:string;

promeniLoz(){
  const reg=/(.)\1\1\1/;
    if(reg.test(this.staraL)){
      alertify.error("Lozinka nije u dobrom formatu.");
      return;
    }
    if(reg.test(this.nova)){
      alertify.error("Lozinka nije u dobrom formatu.");
      return;
    }
    if(reg.test(this.potvrdiN)){
      alertify.error("Lozinka nije u dobrom formatu.");
      return;
    }
  if(this.staraL==this.user.password){
    if(this.nova==this.potvrdiN){
      this.userService.promeniLoz(this.user.username, this.nova).subscribe(response=>{
        if(response["message"]=="lozinka je promenjena"){
          localStorage.clear();
          alertify.success("Lozinka uspesno promenjena");
          this.router.navigate([""]);
        }
      })
    }else{
      alertify.error("Nova lozinka i potvrda nove lozinke se ne poklapaju.")
    }
  }else{
    alertify.error("Nije uneta dobra stara lozinka.")
  }
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
  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }

  zaOdobri(){
    this.router.navigate(["odobri-nekretninu"]);
  }


  odobriKorisnik(){
    this.router.navigate(["odobri-registraciju"]);
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
 
   prikaziFormuZaAzuriranje(){
    this.router.navigate(["azuriraj-pod"]);
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

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }


}
