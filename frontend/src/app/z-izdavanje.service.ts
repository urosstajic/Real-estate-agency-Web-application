import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NekretninaComponent } from './nekretnina/nekretnina.component';

@Injectable({
  providedIn: 'root'
})
export class ZIzdavanjeService {

  constructor(private http:HttpClient) { }

  izdavanje(idI,nekretnina,idN,idPoruka, vremeOd, vremeDo, vlasnik_agencija, ime_vlasnika, cena, korisnik, odobreno, prihod){
    const data={
      idI:idI,
      nekretnina:nekretnina,
      idN:idN,
      idPoruke:idPoruka,
      vremeOd:vremeOd,
      vremeDo:vremeDo,
      vlasnik_agencija:vlasnik_agencija,
      ime_vlasnika:ime_vlasnika,
      cena:cena,
      korisnik: korisnik,
      odobreno:odobreno,
      prihod:prihod
    }

    return this.http.post(`http://localhost:4000/izdavanje/dodajZahtev`, data);
  }

  dohvRedUTabeli(nekrenina, korisnik){
    const data={
      nekretnina:nekrenina,
      korisnik:korisnik
    }

    return this.http.post(`http://localhost:4000/izdavanje/dohvatiRed`, data);
  }

  dohvSve(){
    return this.http.get(`http://localhost:4000/izdavanje/dohvatiSve`);
  }

  prihvatiZahtevIzdavanjeKorisnik(idI,idN, vlasnik_agencija, ime_vlasnika,cena, korisnik,vremeOd, vremeDo){
    const data={
      idI:idI,
      idN:idN,
      vlasnik_agencija:vlasnik_agencija,
      ime_vlasnika:ime_vlasnika,
      cena:cena,
      korisnik:korisnik,
      vremeDo:vremeDo,
      vremeOd:vremeOd
    };

    return this.http.post(`http://localhost:4000/izdavanje/prihvatiZahtevIzdavanjeKorisnik`, data);
  }

  prihvatiZahtevIzdavanjeAgencija(idI,idN, vlasnik_agencija, ime_vlasnika,cena, korisnik,vremeOd, vremeDo){
    const data={
      idI:idI,
      idN:idN,
      vlasnik_agencija:vlasnik_agencija,
      ime_vlasnika:ime_vlasnika,
      cena:cena,
      korisnik:korisnik,
      vremeDo:vremeDo,
      vremeOd:vremeOd
    };

    return this.http.post(`http://localhost:4000/izdavanje/prihvatiZahtevIzdavanjeAgencija`, data);
  }

  odbijPonudu(idI){
    const data={
      idI:idI
    }

    return this.http.post(`http://localhost:4000/izdavanje/odbijPonudu`,data);
  }

  odbijSve(idI, nekretnina, vremeOd, vremeDo){
    const data={
      idI:idI,
      nekretnina:nekretnina,
      vremeDo:vremeDo,
      vremeOd:vremeOd
    }

    return this.http.post(`http://localhost:4000/izdavanje/odbijSveZahteve`, data);
  }

  postaviPrihod(idI, prihod){
    const data={
      idI:idI,
      prihod:prihod
    }

    return this.http.post(`http://localhost:4000/izdavanje/prihod`, data);
  }

  promeniNazivNekr(stariNaziv, noviNaziv){
    const data={
      stariNaziv:stariNaziv,
      noviNaziv:noviNaziv
    }

    return this.http.post(`http://localhost:4000/izdavanje/promeniNazivNekr`, data);
  }

  promeniVlasnik(staroIme, novoIme){
    const data={
      staroIme:staroIme,
      novoIme:novoIme
    }

    return this.http.post(`http://localhost:4000/izdavanje/promeniVlasnik`, data);
  }

  promeniKorisnik(staroIme, novoIme){
    const data={
      staroIme:staroIme,
      novoIme:novoIme
    }

    return this.http.post(`http://localhost:4000/izdavanje/promeniKorisnik`, data);
  }
}
