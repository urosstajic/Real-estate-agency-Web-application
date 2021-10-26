import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PorukaService {

  constructor(private http:HttpClient) { }

  dohvatiSveKonverzacije(username){
    const data={
      username:username
    }

    return this.http.post(`http://localhost:4000/poruka/dohvatiSveKonverzacije`, data);
  }

  arhiviraj(naziv, posiljalac, primalac){
    const data={
      naziv:naziv,
      posiljalac:posiljalac,
      primalac:primalac
    }

    return this.http.post(`http://localhost:4000/poruka/arhiviraj`, data);
  }

  izbaciIzArhiviranih(naziv, posiljalac, primalac){
    const data={
      naziv:naziv,
      posiljalac:posiljalac,
      primalac:primalac
    }

    return this.http.post(`http://localhost:4000/poruka/izbaciIzArhiviranih`, data);
  }

  dohvatiSvePorukeKonverzacije(naziv, primalac, posiljalac){
    const data={
      naziv:naziv,
      primalac:primalac,
      posiljalac:posiljalac
    }

    return this.http.post(`http://localhost:4000/poruka/dohvatiSvePorukeKonverzacije`, data);
  }

  dohvatiSveKonverzacijeAgent(){

    return this.http.get(`http://localhost:4000/poruka/dohvatiSveKonverzacijeAgent`);
  }

  posaljiPoruku(idPor,posiljalac, primalac, nazivNekretnine,idN, sadrzaj, datumVreme, arhivirana, procitana, ime_agenta){
    const data={
      idPor:idPor,
      posiljalac:posiljalac,
      primalac:primalac,
      nazivNekretnine:nazivNekretnine,
      idN:idN,
      sadrzaj:sadrzaj,
      datumVreme:datumVreme,
      arhivirana:arhivirana,
      procitano:procitana,
      ime_agenta:ime_agenta
    }

    return this.http.post(`http://localhost:4000/poruka/posaljiPoruku`, data);
  }

  dohvatiSve(){
    return this.http.get(`http://localhost:4000/poruka/dohvatiSve`);
  }

  postaviProcitano(naziv, primalac, posiljalac){
    const data={
      naziv:naziv,
      primalac:primalac,
      posiljalac:posiljalac
    }

    return this.http.post(`http://localhost:4000/poruka/postaviProcitano`, data);
  }

  promeniNazivNekr(stariNaziv,noviNaziv){
    const data={
      stariNaziv:stariNaziv,
      noviNaziv:noviNaziv
    }

    return this.http.post(`http://localhost:4000/poruka/promeniNazivNekr`, data);
  }

  promeniPosiljalac(staroIme, novoIme){
    const data={
      staroIme:staroIme,
      novoIme:novoIme
    }

    return this.http.post(`http://localhost:4000/poruka/promeniPosiljalac`, data);
  }

  promeniPrimalac(staroIme, novoIme){
    const data={
      staroIme:staroIme,
      novoIme:novoIme
    }

    return this.http.post(`http://localhost:4000/poruka/promeniPrimalac`, data);
  }

  promeniImeAgenta(staroIme, novoIme){
    const data={
      staroIme:staroIme,
      novoIme:novoIme
    }

    return this.http.post(`http://localhost:4000/poruka/promeniImeAgenta`, data);
  }

}
