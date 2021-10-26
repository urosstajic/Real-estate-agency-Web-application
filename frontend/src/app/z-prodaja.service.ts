import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZProdajaService {

  constructor(private http:HttpClient) { }

  prodaja(idP, nekretnina, idN,idPoruka, vlasnik_agencija, ime_vlasnika, cena, korisnik, placanje, odobreno, prihod){
    const data={
      idP:idP,
      nekretnina:nekretnina,
      idN:idN,
      idPoruke:idPoruka,
      vlasnik_agencija:vlasnik_agencija, 
      ime_vlasnika:ime_vlasnika,
      cena:cena,
      korisnik:korisnik,
      placanje:placanje,
      odobreno:odobreno,
      prihod:prihod
    }

    return this.http.post(`http://localhost:4000/prodaja/dodajZahtev`, data);
  }


  dohvRedUTabeli(nekretnina, korisnik){
    const data={
      nekretnina:nekretnina,
      korisnik:korisnik
    }

    return this.http.post(`http://localhost:4000/prodaja/dohvatiRedProdaja`, data);
  }


  dohvSve(){
    return this.http.get(`http://localhost:4000/prodaja/dohvatiSve`);
  }

  prihvatiZahtevProdajaKorisnik(idP,idN, vlasnik_agencija, ime_vlasnika,cena, korisnik, placanje ){
    const data={
      idP:idP,
      idN:idN,
      vlasnik_agencija:vlasnik_agencija,
      ime_vlasnika:ime_vlasnika,
      cena:cena,
      korisnik:korisnik,
      placanje:placanje
    }

    return this.http.post(`http://localhost:4000/prodaja/prihvatiZahtevProdajaKorisnik`, data);
  }

  prihvatiZahtevProdajaAgencija(idP,idN, vlasnik_agencija, ime_vlasnika,cena, korisnik, placanje){
    const data={
      idP:idP,
      idN:idN,
      vlasnik_agencija:vlasnik_agencija,
      ime_vlasnika:ime_vlasnika,
      cena:cena,
      korisnik:korisnik,
      placanje:placanje
    }

    return this.http.post(`http://localhost:4000/prodaja/prihvatiZahtevProdajaAgencija`, data);
  }

  odbijSveOstalePonude(nekretnina, ime, idP){
    const data={
      nekretnina:nekretnina,
      ime:ime,
      idP:idP
    }

    return this.http.post(`http://localhost:4000/prodaja/odbijSveOstalePonude`, data);
  }

  odbijPonudu(idP){
    const data={
      idP:idP
    }

    return this.http.post(`http://localhost:4000/prodaja/odbijPonudu`,data);
  }

  postaviPrihod(idP, prihod){
    const data={
      idP:idP,
      prihod:prihod
    }

    return this.http.post(`http://localhost:4000/prodaja/prihod`, data);
  }

  promeniNazivNekr(stariNaziv, noviNaziv){
    const data={
      stariNaziv:stariNaziv,
      noviNaziv:noviNaziv
    }

    return this.http.post(`http://localhost:4000/prodaja/promeniNazivNekr`, data);
  }

  promeniVlasnik(staroIme, novoIme){
    const data={
      staroIme:staroIme,
      novoIme:novoIme
    }

    return this.http.post(`http://localhost:4000/prodaja/promeniVlasnik`, data);
  }

  promeniKorisnik(staroIme, novoIme){
    const data={
      staroIme:staroIme,
      novoIme:novoIme
    }

    return this.http.post(`http://localhost:4000/prodaja/promeniKorisnik`, data);
  }
}
