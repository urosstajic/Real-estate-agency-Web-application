import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-svi-korisnici',
  templateUrl: './svi-korisnici.component.html',
  styleUrls: ['./svi-korisnici.component.css']
})
export class SviKorisniciComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.pomKorisnik=0;
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.useriZaPrikaz=[];

    this.userService.nadjiSveUsers().subscribe((us:User[])=>{
      if(us){
        this.sviKorisnici=us;
        for(var i in this.sviKorisnici){
          if(this.sviKorisnici[i].username!="admin"){
            this.useriZaPrikaz.push(this.sviKorisnici[i]);
          }
        }
      }
    });
  }
user:User;
  sviKorisnici:User[];
  useriZaPrikaz:User[];

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

  zaOdobri(){
    this.router.navigate(["odobri-nekretninu"]);
  }

   prikazDodaj(){
       this.router.navigate(["dodaj-nekretninnu"]);
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

  brisiKorisnika(u){
    this.userService.brisiKorisnika(u).subscribe();
    location.reload();
    
  }

  izmeniKorisnika(kor){
    localStorage.setItem('korisnikZaIzmenu', JSON.stringify(kor));
    this.router.navigate(['azuriraj-korisnik'])
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


}
