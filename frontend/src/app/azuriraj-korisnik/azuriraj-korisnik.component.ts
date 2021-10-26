import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import alertify from "alertify.js";
import { PorukaService } from '../poruka.service';
import { NekretninaService } from '../nekretnina.service';
import { ZIzdavanjeService } from '../z-izdavanje.service';
import { ZProdajaService } from '../z-prodaja.service';

@Component({
  selector: 'app-azuriraj-korisnik',
  templateUrl: './azuriraj-korisnik.component.html',
  styleUrls: ['./azuriraj-korisnik.component.css']
})
export class AzurirajKorisnikComponent implements OnInit {

  constructor(private router:Router, private userService:UserService, private porukaService:PorukaService, private nekretninaService:NekretninaService,
    private izdavanjeService:ZIzdavanjeService,private prodajaService:ZProdajaService) { }

  ngOnInit(): void {
    this.pomKorisnik=0;
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.korisnikZaIzmenu=JSON.parse(localStorage.getItem('korisnikZaIzmenu'));
    this.userService.nadjiSveUsers().subscribe((u:User[])=>{
      if(u){
        this.sviUseri=u;
      }
    })
  }


  imePromena:string;
  prezimePromena:string;
  mailPromena:string;
  drzavaPromena:string;
  gradPromena:string;
  slikaPromena:string;
  novoUsername:string;
  noviTip:string;
  passwordPromena:string;
  useriZaPrikaz:User[];
  user:User;
  korisnikZaIzmenu:User;
  sviUseri:User[];


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


  azuriraj(){
    if(this.novoUsername!=null){
      for(var i in this.sviUseri){
        if(this.sviUseri[i].username==this.novoUsername){
          alertify.error("Zeljeno korisnicko ime je vec iskorisceno");
          return;
        }
      }
    }
    if(this.mailPromena!=null){
      for(var i in this.sviUseri){
        if(this.sviUseri[i].mail==this.mailPromena){
          alertify.error("Zeljena mejl adresa je vec iskoriscena");
          return;
        }
      }
    }
    if(this.passwordPromena!=null){
      const reg=/(.)\1\1\1/;
      if(reg.test(this.passwordPromena)){
        alertify.error("Lozinka nije u dobrom formatu.");
        return;
      }
    }
    var zaime:number=0;
    
    
    //ubaci deo za proveru lozinke
    var novoI, novoP, novaD, noviG, novaS, noviT, novoU,novoPs, novoMl;
    if(this.novoUsername==null){
      novoU=this.korisnikZaIzmenu.username
    }else{
      novoU=this.novoUsername
      zaime=1;
    }
    if(this.passwordPromena==null){
      novoPs=this.korisnikZaIzmenu.password
    }else{
      novoPs=this.passwordPromena
    }
      if(this.imePromena==null){
         novoI=this.korisnikZaIzmenu.ime;
      }else{
        novoI=this.imePromena;
     }
      if(this.prezimePromena==null){
        novoP=this.korisnikZaIzmenu.prezime;
    }else{
      novoP=this.prezimePromena;
    }
    if(this.drzavaPromena==null){
        novaD=this.korisnikZaIzmenu.drzava;
    }else{
            novaD=this.drzavaPromena;
  }
  if(this.gradPromena==null){
     noviG=this.korisnikZaIzmenu.grad;
   }else{
     noviG=this.gradPromena;
 }
  if(this.slikaPromena==null){
    novaS=this.korisnikZaIzmenu.slika;
}else{
    novaS=this.slikaPromena.slice(12);
  }
    if(this.noviTip==null){
       noviT=this.korisnikZaIzmenu.tip
  }else{
    noviT=this.noviTip
  }
  if(this.mailPromena==null){
    novoMl=this.korisnikZaIzmenu.mail;
  }else{
    novoMl=this.mailPromena
  }
  if(zaime==1){
    this.porukaService.promeniImeAgenta(this.korisnikZaIzmenu.username, this.novoUsername).subscribe(res=>{
      if(res["message"]=="uspeh"){

      }
    })
    this.porukaService.promeniPosiljalac(this.korisnikZaIzmenu.username, this.novoUsername).subscribe(res=>{
      if(res["message"]=="uspeh"){

      }
    })
    this.porukaService.promeniPrimalac(this.korisnikZaIzmenu.username, this.novoUsername).subscribe(res=>{
      if(res["message"]=="uspeh"){

      }
    })
    this.nekretninaService.promeniImeVlasnik(this.korisnikZaIzmenu.username, this.novoUsername).subscribe(res=>{
      if(res["message"]=="uspeh"){

      }
    })
    this.prodajaService.promeniKorisnik(this.korisnikZaIzmenu.username, this.novoUsername).subscribe(res=>{
      if(res["message"]=="uspeh"){

      }
    })
    this.prodajaService.promeniVlasnik(this.korisnikZaIzmenu.username, this.novoUsername).subscribe(res=>{
      if(res["message"]=="uspeh"){

      }
    })
    this.izdavanjeService.promeniKorisnik(this.korisnikZaIzmenu.username, this.novoUsername).subscribe(res=>{
      if(res["message"]=="uspeh"){

      }
    })
    this.izdavanjeService.promeniVlasnik(this.korisnikZaIzmenu.username, this.novoUsername).subscribe(res=>{
      if(res["message"]=="uspeh"){

      }
    })
  }

  this.userService.azurirajPodatkeAdmin(this.korisnikZaIzmenu.username,novoU, novoPs, novoI, novoP, novoMl, novaS, novaD, noviG, noviT).subscribe((us:User)=>{
    if(us){
        localStorage.removeItem('korisnikZaIzmenu');
        localStorage.setItem('korisnikZaIzmenu', JSON.stringify(us));
        this.korisnikZaIzmenu=us;
        alertify.success("Podaci su uspesno azurirani!");
        location.reload();
        console.log(this.user.username)
    }
  });
    
    
 }

 prikaziMojeN(){
  this.router.navigate(["moje-nekretnine"]);
  }

}
