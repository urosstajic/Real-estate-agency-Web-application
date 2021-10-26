import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretina } from '../models/nekretnina';
import { Poruka } from '../models/poruka';
import { User } from '../models/user';
import { ZahtevIzdavanje } from '../models/zahtev_izdavanje';
import { ZahtevProdaja } from '../models/zahtev_prodaja';
import { NekretninaService } from '../nekretnina.service';
import { PorukaService } from '../poruka.service';
import { ZIzdavanjeService } from '../z-izdavanje.service';
import { ZProdajaService } from '../z-prodaja.service';
import alertify from "alertify.js";
import { BlokiranService } from '../blokiran.service';
import { Blokiran } from '../models/blokiran';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../models/agencija';

@Component({
  selector: 'app-konverzacija',
  templateUrl: './konverzacija.component.html',
  styleUrls: ['./konverzacija.component.css']
})
export class KonverzacijaComponent implements OnInit {

  constructor(private porukaService:PorukaService, private nekretninaService:NekretninaService, private router:Router, 
    private zaIzdavanje:ZIzdavanjeService, private zaProdaju:ZProdajaService, private blokiranService:BlokiranService, private agencijaService:AgencijaService) { }

  ngOnInit(): void {
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.poruke=[];
    this.konverzacija=JSON.parse(localStorage.getItem('konverzacija'));
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    console.log(this.konverzacija.idN);
  

     var prim1:string;
        var pos1:string;
        if(this.user.tip=='radnik'){
          prim1="agencija";
          if('agencija'!=this.konverzacija.posiljalac){
            pos1=this.konverzacija.posiljalac
          }else{
            if('agencija'!=this.konverzacija.primalac){
              pos1=this.konverzacija.primalac
            }
          }
          this.porukaService.postaviProcitano(this.konverzacija.nazivNekretnine,prim1, pos1).subscribe(res=>{
            if(res["message"]=="procitano"){
              
            }
          })
        }else{
          prim1=this.user.username;
          if(this.user.username!=this.konverzacija.posiljalac){
            pos1=this.konverzacija.posiljalac;
          }else{
            if(this.konverzacija.primalac!=this.user.username){
              pos1=this.konverzacija.primalac;
            }
          }
          this.porukaService.postaviProcitano(this.konverzacija.nazivNekretnine,prim1, pos1).subscribe(res=>{
            if(res["message"]=="procitano"){
              
            }
          })

        }

   /* this.porukaService.postaviProcitano(this.konverzacija.nazivNekretnine,prim, pos).subscribe(res=>{
      if(res["message"]=="procitano"){
        
      }
    })*/
    this.nekretninaService.dohvNekrPoId(this.konverzacija.idN).subscribe((nekr:Nekretina)=>{
      console.log(nekr)
      if(nekr){
        this.nekretnina=nekr;
        console.log(this.nekretnina)
        
        

      }
    })

    this.porukaService.dohvatiSve().subscribe((p:Poruka[])=>{
      if(p){
        this.svePoruke=p;
      }
    })

    
    if(this.user.tip=="reg_korisnik"){
      this.porukaService.dohvatiSvePorukeKonverzacije(this.konverzacija.nazivNekretnine, this.konverzacija.primalac, this.konverzacija.posiljalac).subscribe((por:Poruka[])=>{
        if(por){
          this.poruke=por
          console.log(this.poruke)
          if(this.poruke==null){
            alert("ok")
          }
          this.poruke.sort((a,b)=>{
            if(a.datumVreme>b.datumVreme){
              return 1;
            }else{
              if(a.datumVreme<b.datumVreme){
                return -1;
              }else{
                return 0;
              }
            }
          })
        }
      })
    }else{
      var pos:string;
      var prim:string;
      if(this.konverzacija.posiljalac.includes('agencija')){
        pos="agencija";
        prim=this.konverzacija.primalac
      }else{
        prim='agencija';
        pos=this.konverzacija.posiljalac;
      }
      this.porukaService.dohvatiSvePorukeKonverzacije(this.konverzacija.nazivNekretnine, pos, prim).subscribe((por:Poruka[])=>{
        if(por){
          this.poruke=por
          console.log(this.poruke)
          if(this.poruke==null){
            alert("ok")
          }
          this.poruke.sort((a,b)=>{
            if(a.datumVreme>b.datumVreme){
              return 1;
            }else{
              if(a.datumVreme<b.datumVreme){
                return -1;
              }else{
                return 0;
              }
            }
          })
        }
      })
    }
    

    this.zaProdaju.dohvSve().subscribe((zah:ZahtevProdaja[])=>{
      if(zah){
        this.prodaja=zah
      }
    })

    this.zaIzdavanje.dohvSve().subscribe((zah:ZahtevIzdavanje[])=>{
      if(zah){
        this.izdavanje=zah
      }
    })

    this.blokiranService.dohvSve().subscribe((b:Blokiran[])=>{
      if(b){
        this.blokirani=b;
      }
    })
    this.agencijaService.dohvSve().subscribe((a:Agencija)=>{
      if(a){
        this.agencija=a;
      }
    })
   
  }
  konverzacija:Poruka;
  poruke:Poruka[];
  user:User;
  nekretnina:Nekretina;
  prodaja:ZahtevProdaja[];
  izdavanje:ZahtevIzdavanje[];
  sadrzaj:string;
  svePoruke:Poruka[];
  blokirani:Blokiran[];
  agencija:Agencija;


  posaljiPoruku(){
    for(var i in this.blokirani){
      if((this.blokirani[i].koB==this.konverzacija.posiljalac && this.blokirani[i].kogaB==this.konverzacija.primalac) ||
      (this.blokirani[i].koB==this.konverzacija.primalac && this.blokirani[i].kogaB==this.konverzacija.posiljalac)){
        alertify.error("Nije moguce poslati poruku zeljenom korisniku.");
        return;
      }
    }
    if(this.user.tip=="reg_korisnik"){
      var pomoc:string;
      if(this.konverzacija.primalac==this.user.username){
        pomoc=this.konverzacija.posiljalac;
      }else{
        pomoc=this.konverzacija.primalac;
      }
      var d:Date;
      d=new Date();
      d.setHours(d.getHours()+2);
      var id:number;
      id=this.svePoruke[this.svePoruke.length-1].idPor+1;
      this.porukaService.posaljiPoruku(id,this.user.username, pomoc, this.konverzacija.nazivNekretnine,this.konverzacija.idN, this.sadrzaj,d, 0,0,null).subscribe(res=>{
        if(res["message"]=="poruka added"){
          alertify.success("Poruka je poslata");
          location.reload();
        }
      })
    }else{
      var pomoc:string;
      var d:Date;
      d=new Date();
      d.setHours(d.getHours()+2);
      if(this.konverzacija.primalac=="agencija"){
        pomoc=this.konverzacija.posiljalac;
      }else{
        pomoc=this.konverzacija.primalac;
      }
      var zaAgenta:string="agencija";
      var id:number;
      id=this.svePoruke[this.svePoruke.length-1].idPor+1;
      this.porukaService.posaljiPoruku(id,zaAgenta, pomoc, this.konverzacija.nazivNekretnine,this.konverzacija.idN, this.sadrzaj,d, 0,0, this.user.username).subscribe(res=>{
        if(res["message"]=="poruka added"){
          alertify.success("Poruka je poslata");
          location.reload();
        }
      })
    }
    
  }

  zaDatum(datVre){
    var niz:String[];
    var niz1:String[];
    niz=datVre.split("T");
    niz1=niz[1].split('.');
    return niz[0]+" "+niz1[0];
  }

  provera:Nekretina;

  zaPosiljaoca(por){
    console.log(this.nekretnina.vlasnik)
  if(this.nekretnina.vlasnik=="vlasnik"){
    if(por.posiljalac==this.nekretnina.ime_vlasnika){
      return 'vlasnik';
    }else{
      return por.posiljalac;
    }
  }else{
    if(por.posiljalac==this.nekretnina.vlasnik){
      return "vlasnik";
    }else{
      return por.posiljalac;
    }
  }
    
  }

  tip(p){
    if(this.nekretnina.vlasnik=="vlasnik"){
      if(this.user.username==this.nekretnina.ime_vlasnika){
        return "vlasnik";
      }else{
        if(p.primalac==this.user.username){
          return "notvlasnik";
        }else{
          if(p.posiljalac==this.user.username){
            return "vlasnik";
          }
        }
      }
    }else{
      if(p.primalac==this.user.username){
        return "notvlasnik"
      }else{
        if(p.posiljalac.includes("agencija")){
          return "vlasnik";
        }
      }
    }
    return "vlasnik";
    
  }

  dajPonudu(por){
    if(this.nekretnina){
      localStorage.setItem("nekretnina", JSON.stringify(this.nekretnina));
      this.router.navigate(['nekretnina']);
    }
  }

  daLiDataPonuda(por){
    var pom="";
    if(this.nekretnina.vlasnik!="agencija"){
      if(por.posiljalac!=this.nekretnina.ime_vlasnika){
        if(this.nekretnina.izdavanje_prodaja=="prodaja"){
          for(var i in this.prodaja){
            if(this.prodaja[i].korisnik==por.posiljalac && por.idPor==this.prodaja[i].idPoruke && por.sadrzaj=="Dajem ponudu." && this.prodaja[i].odobreno==0 && this.user.username!=por.posiljalac){
              pom="prikazi"
            }
          }
        }else{
          for(var j in this.izdavanje){
            if(this.izdavanje[j].korisnik==por.posiljalac && this.izdavanje[j].idPoruke==por.idPor && por.sadrzaj=="Dajem ponudu." && this.izdavanje[j].odobreno==0 && this.user.username!=por.posiljalac){
              pom="prikazi";
            }
          }
        }
      }
    }else{
      if(por.posiljalac!="agencija"){
        if(this.nekretnina.izdavanje_prodaja=="prodaja"){
          for(var i in this.prodaja){
            if(por.sadrzaj=="Dajem ponudu." && por.idPor==this.prodaja[i].idPoruke && this.prodaja[i].odobreno==0 && this.user.username!=por.posiljalac){
              pom="prikazi";
            }
          }
        }else{
          for(var i in this.izdavanje){
            if(por.sadrzaj=="Dajem ponudu." && this.izdavanje[i].idPoruke==por.idPor && this.izdavanje[i].odobreno==0 && this.user.username!=por.posiljalac){
              pom="prikazi";
            }
          }
        }
      }
    }
    
  
    return pom;
  }

  prihvatiZahtev(p){
    if(this.nekretnina.izdavanje_prodaja=="izdavanje"){
      for(var id in this.izdavanje){
        if(this.izdavanje[id].idPoruke==p.idPor){
          if(this.izdavanje[id].vlasnik_agencija=="vlasnik"){
            this.zaIzdavanje.prihvatiZahtevIzdavanjeKorisnik(this.izdavanje[id].idI,this.izdavanje[id].idN, this.izdavanje[id].vlasnik_agencija, this.izdavanje[id].ime_vlasnika, this.izdavanje[id].cena, this.izdavanje[id].korisnik, this.izdavanje[id].vremeOd,this.izdavanje[id].vremeDo).subscribe(res=>{
              if(res["message"]=="prihvaceno"){
                
              }
            })
          }else{
            console.log(this.izdavanje[id].idI)
            var pom:number=this.izdavanje[id].idI;
            var dat1:string=this.izdavanje[id].vremeOd;
            var dat2:string=this.izdavanje[id].vremeDo;
            var dat11=new Date(p.vremeOd);
          var dat22=new Date(p.vremeDo);
          console.log(dat11, dat22);
            this.zaIzdavanje.prihvatiZahtevIzdavanjeAgencija(this.izdavanje[id].idI,this.izdavanje[id].idN, this.izdavanje[id].vlasnik_agencija, 
              this.izdavanje[id].ime_vlasnika, this.izdavanje[id].cena, this.izdavanje[id].korisnik, this.izdavanje[id].vremeOd,this.izdavanje[id].vremeDo).subscribe(res=>{
              if(res["message"]=="prihvaceno"){
                console.log(pom)
                var prih:number;
                /*var pomd1:string=this.izdavanje[id].vremeOd.split('-')[1];
                var pomd2:string=this.izdavanje[id].vremeDo.split('-')[1];
                console.log(pomd2);
                console.log(pomd1)*/
                /*var zaDat1:Date=new Date();
                var zaDat2:Date=new Date();
                zaDat1.setFullYear(parseInt(this.izdavanje[id].vremeOd.split('-')[0]));
                zaDat1.setMonth(parseInt(this.izdavanje[id].vremeOd.split('-')[1]));
                zaDat2.setFullYear(parseInt(this.izdavanje[id].vremeDo.split('-')[0]));
                zaDat2.setMonth(parseInt(this.izdavanje[id].vremeDo.split('-')[1]));*/

                var pomocD1:string=dat1+"T00:00:00";
                var pomocD2:string=dat2+"T00:00:00";
                var pomDat1=new Date(pomocD1);
                var pomDat2=new Date(pomocD2);
                var razlika=(pomDat2.getFullYear()-pomDat1.getFullYear())*12+(pomDat2.getMonth()-pomDat1.getMonth());
          
               // console.log(new Date(pomoc1), new Date(pomoc2))
                if(this.izdavanje[id].vlasnik_agencija=="agencija"){
                  prih=this.izdavanje[id].cena*razlika;
                }else{
                  prih=this.izdavanje[id].cena*this.agencija.procenatIzdavanje/100*razlika;
                }
                this.zaIzdavanje.postaviPrihod(pom, prih).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
                this.zaIzdavanje.odbijSve(pom,this.izdavanje[id].nekretnina,dat1, dat2 ).subscribe(r=>{
                  if(r['message']=="uspeh"){
                    
                  }
                })
                
              }
            })
          }
        }
      }

    }else{
      //prodaja
      for(var id in this.prodaja){
        if(this.prodaja[id].idPoruke==p.idPor){
          if(this.prodaja[id].vlasnik_agencija=="vlasnik"){
            this.zaProdaju.prihvatiZahtevProdajaKorisnik(this.prodaja[id].idP,this.prodaja[id].idN, this.prodaja[id].vlasnik_agencija, this.prodaja[id].ime_vlasnika, this.prodaja[id].cena, this.prodaja[id].korisnik, this.prodaja[id].placanje).subscribe(resp=>{
              if(resp["message"]=="prihvaceno"){
                
              }
            })
          }else{
            var pom:number=this.prodaja[id].idP;
            var idNekretnine:number=this.prodaja[id].idN;
            this.zaProdaju.prihvatiZahtevProdajaAgencija(this.prodaja[id].idP,this.prodaja[id].idN, this.prodaja[id].vlasnik_agencija, this.prodaja[id].ime_vlasnika, this.prodaja[id].cena, this.prodaja[id].korisnik, this.prodaja[id].placanje).subscribe(resp=>{
              if(resp["message"]=="prihvaceno"){
                var prih:number;
                if(this.prodaja[id].vlasnik_agencija=='agencija'){
                  prih=this.prodaja[id].cena;
                }else{
                  prih=this.prodaja[id].cena*this.agencija.procenatProdaja/100;
                }

                this.zaProdaju.postaviPrihod(pom, prih).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })

                this.zaProdaju.odbijSveOstalePonude(p.nazivNekretnine, p.posiljalac, pom).subscribe(r=>{
                  if(r["message"]=="odbijeno sve ostalo"){
                    
                  }
                })

                this.nekretninaService.nePrikazuj(idNekretnine).subscribe(res=>{
                  if(res["message"]=="uspeh"){

                  }
                })
              }

            })
          }
          
        }
      }
    }
    location.reload();
  }

  odbijZahtev(p){
    if(this.nekretnina.izdavanje_prodaja=="prodaja"){
      for(var i in this.prodaja){
        if(this.prodaja[i].idPoruke==p.idPor){
          this.zaProdaju.odbijPonudu(this.prodaja[i].idP).subscribe(res=>{
            if(res["message"]=="uspeh"){

            }
          })
        }
      }
    }else{
      for(var i in this.izdavanje){
        if(this.izdavanje[i].idPoruke==p.idPor){
          this.zaIzdavanje.odbijPonudu(this.izdavanje[i].idI).subscribe(res=>{
            if(res["message"]=="uspeh"){

            }
          })
        }
      }
    }
    location.reload();
  }

  kojaStrana(por){
    if(this.user.tip=="reg_korisnik"){
      if(this.user.username==por.posiljalac){
        return "leva";
      }else{
        return "desna";
      }
    }else{
      if(this.user.tip=="radnik"){
        if(por.posiljalac.includes("agencija")){
          return "leva";
        }else{
          return "desna";
        }
      }
    }
    
  }

  blokiraj(){
    if(this.user.username==this.konverzacija.posiljalac){
      if(this.konverzacija.primalac=='agencija'){
        alertify.error("Nije moguce blokirati zeljenog korisnika");
        return;
      }
      var id:number;
      if(this.blokirani.length==0){
       id=1;
      }else{
        id=this.blokirani[this.blokirani.length-1].idB+1;
      }
      this.blokiranService.blokiraj(id, this.user, this.konverzacija.primalac).subscribe(re=>{
        if(re["message"]=="uspeh"){
          alertify.success("Korisnik uspesno blokiran");
          location.reload();
        }
      })
    }else{
      if(this.user.username==this.konverzacija.primalac){
        if(this.konverzacija.posiljalac=='agencija'){
          alertify.error("Nije moguce blokirati zeljenog korisnika");
        return;
        }
        var id:number;
        if(this.blokirani.length==0){
         id=1;
        }else{
          id=this.blokirani[this.blokirani.length-1].idB+1;
        }
      this.blokiranService.blokiraj(id, this.user.username, this.konverzacija.posiljalac).subscribe(re=>{
        if(re["message"]=="uspeh"){
          alertify.success("Korisnik uspesno blokiran");
          location.reload();
        }
      })
      }
    }
  }

  blokirajAgencija(){
    if(this.nekretnina.ime_vlasnika=='agencija'){
     if(this.konverzacija.posiljalac=='agencija'){
       var id:number;
       if(this.blokirani.length==0){
        id=1;
       }else{
         id=this.blokirani[this.blokirani.length-1].idB+1;
       }
      this.blokiranService.blokiraj(id, "agencija", this.konverzacija.primalac).subscribe(re=>{
        if(re["message"]=="uspeh"){
          alertify.success("Korisnik uspesno blokiran");
          location.reload();
        }
      })
     }else{
       if(this.konverzacija.primalac=='agencija'){
        var id:number;
        if(this.blokirani.length==0){
         id=1;
        }else{
          id=this.blokirani[this.blokirani.length-1].idB+1;
        }
        this.blokiranService.blokiraj(id, 'agencija', this.konverzacija.posiljalac).subscribe(re=>{
          if(re["message"]=="uspeh"){
            alertify.success("Korisnik uspesno blokiran");
            location.reload();
          }
        })
       }
     }
    }
  }

  odblokiraj(){
    if(this.user.tip=="reg_korisnik"){
      for(var i in this.blokirani){
        if(this.blokirani[i].koB==this.user.username && (this.blokirani[i].kogaB==this.konverzacija.primalac || this.blokirani[i].kogaB==this.konverzacija.posiljalac)){
          this.blokiranService.odblokiraj(this.blokirani[i].idB).subscribe(res=>{
            if(res["message"]=='uspeh'){
              alertify.success("Korisnik uspesno odblokiran");
              location.reload();
            }
          })
        }
      }
    }else{
      for(var i in this.blokirani){
        if(this.blokirani[i].koB=="agencija" && (this.blokirani[i].kogaB==this.konverzacija.primalac || this.blokirani[i].kogaB==this.konverzacija.posiljalac)){
          this.blokiranService.odblokiraj(this.blokirani[i].idB).subscribe(res=>{
            if(res["message"]=='uspeh'){
              alertify.success("Korisnik uspesno odblokiran");
              location.reload();
            }
          })
        }
      }
    }
    
  }

  daLiBlokiran(){
    if(this.nekretnina.vlasnik!="agencija"){
      if(this.konverzacija.posiljalac==this.user.username){
        for(var i in this.blokirani){
          if(this.blokirani[i].koB==this.user.username && this.blokirani[i].kogaB==this.konverzacija.primalac){
            return "blokiran"
          }
        }
      }else{
        if(this.konverzacija.primalac==this.user.username){
          for(var i in this.blokirani){
            if(this.blokirani[i].koB==this.user.username && this.blokirani[i].kogaB==this.konverzacija.posiljalac){
              return "blokiran"
            }
          }
        }
      }
      return "nije"
      
    }else{
      for(var i in this.blokirani){
        if((this.blokirani[i].koB==this.konverzacija.posiljalac && this.blokirani[i].kogaB==this.konverzacija.primalac) ||
        (this.blokirani[i].koB==this.konverzacija.primalac && this.blokirani[i].kogaB==this.konverzacija.posiljalac)){
          if(this.user.tip=='reg_korisnik'){
            if(this.user.username==this.blokirani[i].koB){
              return "blokiran";
            }
          }
          if(this.user.tip=='radnik'){
            if('agencija'==this.blokirani[i].koB){
              return "blokiran"
            }
          }
          
          
        }
      }
      return "nije"
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

  prikazSveNekr(){
    this.router.navigate(["spisak-nekretnina"]);
  }

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }
}
