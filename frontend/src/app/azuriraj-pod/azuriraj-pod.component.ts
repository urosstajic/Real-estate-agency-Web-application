import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import alertify from "alertify.js";
import { User } from '../models/user';
import { Router } from '@angular/router';
import { NekretninaService } from '../nekretnina.service';
import { ZProdajaService } from '../z-prodaja.service';
import { ZIzdavanjeService } from '../z-izdavanje.service';
import { PorukaService } from '../poruka.service';

@Component({
  selector: 'app-azuriraj-pod',
  templateUrl: './azuriraj-pod.component.html',
  styleUrls: ['./azuriraj-pod.component.css']
})
export class AzurirajPodComponent implements OnInit {

  constructor(private userService:UserService, private router:Router, private nekretninaService:NekretninaService, private prodajaService:ZProdajaService,
    private izdavanjeService:ZIzdavanjeService, private porukaService:PorukaService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.pomKorisnik=0;
    this.userService.nadjiSveUsers().subscribe((u:User[])=>{
      if(u)
      {
        this.sviU=u;
      }
    })

  }

  user:User;
  novoUsername:string;
  sviU:User[];
  
  ime:string;
  prezime:string;
  mail:string;
  drzava:string;
  grad:string;
  slika:string;

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

  prikaziInbox(){
    this.router.navigate(["inbox"]);
  }
  zaOdobri(){
    this.router.navigate(["odobri-nekretninu"]);
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

  prikazDodaj(){
    this.router.navigate(["dodaj-nekretninnu"]);
  }
  logout(){
    localStorage.clear();
    this.router.navigate([""]);
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


  azuriraj(){
    if(this.novoUsername!=null){
      this.userService.nadjiPoUsername(this.novoUsername).subscribe((us:User)=>{
        if(us){
  alertify.error("Izabrano korisnicko ime je vec zauzeto.")
        }else{
          if(this.mail!=null){
            for(var i in this.sviU){
              if(this.sviU[i].mail==this.mail){
                alertify.error("Izabrana mail adresa je vec zauzeta.")
                return;
              }
            }
            this.userService.nadjiPoMejlu(this.mail).subscribe((u:User)=>{
              if(u){
                alertify.error("Izabrana mail adresa je vec zauzeta.")

              }else{
                var novoI, novoP, novaD, noviG, novaS;
                
                if(this.ime==null){
                  novoI=this.user.ime;
                }else{
                  novoI=this.ime;
                }
                if(this.prezime==null){
                  novoP=this.user.prezime;
                }else{
                  novoP=this.prezime;
                }
                if(this.drzava==null){
                  novaD=this.user.drzava;
                }else{
                novaD=this.drzava;
                }
                if(this.grad==null){
                  noviG=this.user.grad;
                }else{
                  noviG=this.grad;
                }
                if(this.slika==null){
                  novaS=this.user.slika;
                }else{
                  novaS=this.slika.slice(12);
                }
                this.porukaService.promeniImeAgenta(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.porukaService.promeniPosiljalac(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.porukaService.promeniPrimalac(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.nekretninaService.promeniImeVlasnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.prodajaService.promeniKorisnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.prodajaService.promeniVlasnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.izdavanjeService.promeniKorisnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.izdavanjeService.promeniVlasnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
          
                this.userService.azurirajPodatke(this.user.username,this.novoUsername, novoI, novoP, this.mail, novaS, novaD, noviG).subscribe((us:User)=>{
                if(us){
                    localStorage.removeItem('ulogovan');
                    localStorage.setItem('ulogovan', JSON.stringify(us));
                    this.user=us;
                    alertify.success("Podaci su uspesno azurirani!");
                    location.reload();
                    console.log(this.user.username)
                }
              });
              }
            })
          }else{
                var novoI, novoP, novaD, noviG, novaS;
                if(this.ime==null){
                  novoI=this.user.ime;
                }else{
                  novoI=this.ime;
                }
                if(this.prezime==null){
                  novoP=this.user.prezime;
                }else{
                  novoP=this.prezime;
                }
                if(this.drzava==null){
                  novaD=this.user.drzava;
                }else{
                novaD=this.drzava;
                }
                if(this.grad==null){
                  noviG=this.user.grad;
                }else{
                  noviG=this.grad;
                }
                if(this.slika==null){
                  novaS=this.user.slika;
                }else{
                  novaS=this.slika.slice(12);
                }
                var novoM=this.user.mail;
                this.porukaService.promeniImeAgenta(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.porukaService.promeniPosiljalac(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.porukaService.promeniPrimalac(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.nekretninaService.promeniImeVlasnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.prodajaService.promeniKorisnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.prodajaService.promeniVlasnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.izdavanjeService.promeniKorisnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.izdavanjeService.promeniVlasnik(this.user.username, this.novoUsername).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
          
                this.userService.azurirajPodatke(this.user.username,this.novoUsername, novoI, novoP, novoM, novaS, novaD, noviG).subscribe((us:User)=>{
                if(us){
                    localStorage.removeItem('ulogovan');
                    localStorage.setItem('ulogovan', JSON.stringify(us));
                    this.user=us;
                    alertify.success("Podaci su uspesno azurirani!");
                    console.log(this.user.username)
                    location.reload();
                }
              });
          }
        
        }
      })
    }else{
        if(this.mail!=null){
          for(var i in this.sviU){
            if(this.sviU[i].mail==this.mail){
              alertify.error("Izabrana mail adresa je vec zauzeta.")
              return;
            }
          }
          this.userService.nadjiPoMejlu(this.mail).subscribe((u:User)=>{
            if(u){
              alertify.error("Izabrana mail adresa je vec zauzeta.")
              return;
            }else{
                var novoI, novoP, novaD, noviG, novaS, novoUser;
                if(this.ime==null){
                  novoI=this.user.ime;
                }else{
                  novoI=this.ime;
                }
                if(this.prezime==null){
                  novoP=this.user.prezime;
                }else{
                  novoP=this.prezime;
                }
                if(this.drzava==null){
                  novaD=this.user.drzava;
                }else{
                  novaD=this.drzava;
                }
                if(this.grad==null){
                  noviG=this.user.grad;
                }else{
                  noviG=this.grad;
                }
                if(this.slika==null){
                  novaS=this.user.slika;
                }else{
                  novaS=this.slika.slice(12);
                }
                novoUser=this.user.username;
                this.userService.azurirajPodatke(this.user.username,novoUser, novoI, novoP, this.mail, novaS, novaD, noviG).subscribe((us:User)=>{
                  if(us){
                    localStorage.removeItem('ulogovan');
                    localStorage.setItem('ulogovan', JSON.stringify(us));
                    this.user=us;
                    alertify.success("Podaci su uspesno azurirani!");
                    console.log(this.user.username)
                    location.reload();
                  }
                });
            }
          })
        }else{
          var novoI, novoP, noviM, novaD, noviG, novaS, novoUser;
          if(this.ime==null){
            novoI=this.user.ime;
          }else{
            novoI=this.ime;
          }
          if(this.prezime==null){
            novoP=this.user.prezime;
          }else{
            novoP=this.prezime;
          }
          if(this.mail==null){
            noviM=this.user.mail;
          }else{
            noviM=this.mail;
          }
          if(this.drzava==null){
            novaD=this.user.drzava;
          }else{
            novaD=this.drzava;
          }
          if(this.grad==null){
            noviG=this.user.grad;
          }else{
            noviG=this.grad;
          }
          if(this.slika==null){
            novaS=this.user.slika;
          }else{
            novaS=this.slika.slice(12);
          }
          novoUser=this.user.username;
          this.userService.azurirajPodatke(this.user.username,novoUser, novoI, novoP, noviM, novaS, novaD, noviG).subscribe((us:User)=>{
            if(us){
              localStorage.removeItem('ulogovan');
              localStorage.setItem('ulogovan', JSON.stringify(us));
              this.user=us;
              alertify.success("Podaci su uspesno azurirani!");
              console.log(this.user.username)
              location.reload();
              
            }
          });
        }

      
    }
 }

}
