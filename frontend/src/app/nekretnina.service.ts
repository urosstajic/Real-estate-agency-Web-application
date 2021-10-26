import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NekretninaService {

  constructor(private http:HttpClient) { }


  pronadjiNekretninu(grad, cenaOd, cenaDo){
    const data={
      grad:grad,
      cenaOd:cenaOd,
      cenaDo:cenaDo
    }
    return this.http.post(`http://localhost:4000/nekretnine/pronadjiNekretninu`, data);
  }

  dohvatiSve(){
    return this.http.get(`http://localhost:4000/nekretnine/dohvatiSve`);
  }

  dohvNekrPoId(idN){
    const data={
      idN:idN
    }

    return this.http.post(`http://localhost:4000/nekretnine/dohvatiNekrPoId`, data)
  }

  odobri(idN){
    const data={
      idN:idN
    }

    return this.http.post(`http://localhost:4000/nekretnine/odobri`, data);
  }

  odbij(idN){
    const data={
      idN:idN
    }

    return this.http.post(`http://localhost:4000/nekretnine/odbij`, data);
  }

  dodajNekretninuAgencija(idN,naziv, adresa, tip, sprat, kvadratura, brsoba, namesten, galerija, izdpro, cena){
    const data={
      idN:idN,
      naziv:naziv,
      adresa:adresa,
      tip:tip,
      sprat:sprat,
      kvadratura:kvadratura,
      broj_soba:brsoba,
      namesten:namesten,
      galerija:galerija,
      izdavanje_prodaja:izdpro,
      cena:cena,
      vlasnik:"agencija",
      promocija:0,
      ime_vlasnika:"agencija",
      odobreno:1
    }

    return this.http.post(`http://localhost:4000/nekretnine/dodajNekretninu`, data);
  }

  promovisi(idN){
    const data={
      idN:idN
    }

    return this.http.post(`http://localhost:4000/nekretnine/promovisi`, data);
  }

  izbaciIzPromovisanih(idN){
    const data={
      idN:idN
    }

    return this.http.post(`http://localhost:4000/nekretnine/izbaciIzPromovisanih`, data);
  }

  dodajNekretninuUser(idN,naziv, adresa, tip, sprat, kvadratura, brsoba, namesten, galerija, izdpro, cena, username){
    const data={
      idN:idN,
      naziv:naziv,
      adresa:adresa,
      tip:tip,
      sprat:sprat,
      kvadratura:kvadratura,
      broj_soba:brsoba,
      namesten:namesten,
      galerija:galerija,
      izdavanje_prodaja:izdpro,
      cena:cena,
      vlasnik:"vlasnik",
      promocija:0,
      ime_vlasnika:username,
      odobreno:0
    }

    return this.http.post(`http://localhost:4000/nekretnine/dodajNekretninu`, data);
  }

  azurirajNekr(idN, naziv,adresa, tip, sprat, kvadratura, galerija,brsoba, iznPro, namesten, cena){
    const data={
      idN:idN,
      naziv:naziv,
      adresa:adresa,
      tip:tip,
      sprat:sprat,
      kvadratura:kvadratura,
      galerija:galerija,
      brsoba:brsoba,
      iznPro:iznPro,
      namesten:namesten,
      cena:cena
    }

    return this.http.post(`http://localhost:4000/nekretnine/azuriraj`, data);
  }

  azurirajNekrDodaj(idN, naziv, adresa, tip, sprat, kvadratura, galerija, brsoba, iznPro, namesten, cena){
    const data={
      idN:idN,
      naziv:naziv,
      adresa:adresa,
      tip:tip,
      sprat:sprat,
      kvadratura:kvadratura,
      galerija:galerija,
      brsoba:brsoba,
      iznPro:iznPro,
      namesten:namesten,
      cena:cena
    }

    return this.http.post(`http://localhost:4000/nekretnine/azurirajDodaj`, data);
  }

  nePrikazuj(idN){
    const data={
      idN:idN
    }

    return this.http.post(`http://localhost:4000/nekretnine/nePrikazuj`, data)
  }

  promeniImeVlasnik(staroIme, novoIme){
    const data={
      staroIme:staroIme,
      novoIme:novoIme
    }

    return this.http.post(`http://localhost:4000/nekretnine/promeniImeVlasnik`, data)
  }
}
