import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { RegistracijaService } from '../registracija.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-odobri-registraciju',
  templateUrl: './odobri-registraciju.component.html',
  styleUrls: ['./odobri-registraciju.component.css']
})
export class OdobriRegistracijuComponent implements OnInit {

  constructor(private router:Router, private registracijaService:RegistracijaService, private userService:UserService) { }

  ngOnInit(): void {
    this.prikaziNekretnine=0;
    this.prikaziPodesavanja=0;
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.prikaziKorisnik=0;
    this.pomKorisnik=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));

    this.registracijaService.nadjiSveRegistracije().subscribe((u:User[])=>{
      if(u){
        this.sveRegistracije=u;
      }
    })

    this.userService.nadjiSveUsers().subscribe((u:User[])=>{
      if(u){
        this.users=u;
      }
    })
  }

  user:User;
  sveRegistracije:User[];
  users:User[];

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
    this.router.navigate["odobri-registraciju"];
  }


  odbij(reg){
    this.registracijaService.odbij(reg.username).subscribe(resp=>{
      if(resp["message"]=="uspeh"){
        location.reload();
      }
    })
  }

  odobri(reg){
    this.userService.dodajKorisnika(reg.username, reg.password, reg.ime, reg.prezime, reg.mail, reg.slika, reg.drzava, reg.grad, reg.tip).subscribe(resp=>{
      if(resp["message"]=="uspeh"){
        this.registracijaService.odbij(reg.username).subscribe(r=>{
          if(r["message"]=="uspeh"){
            location.reload();
          }
        })
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
