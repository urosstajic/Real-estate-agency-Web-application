import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  login(username, password){
    const data={
      username:username,
      password:password
    }

    return this.http.post(`http://localhost:4000/user/login`, data);
  }


  nadjiPoUsername(username){
    const data={
      username:username
    }
    return this.http.post(`http://localhost:4000/user/nadjiPoUsername`,data)
  }

  nadjiPoMejlu(mail){
    const data={
      mail:mail
    }
    return this.http.post(`http://localhost:4000/user/nadjiPoMejlu`,data);
  }


  promeniLoz(username, password){
    const data={
      username:username,
       password:password
    }

    return this.http.post(`http://localhost:4000/user/promeniLozinku`, data);
  }

  azurirajPodatke(username,novoUsername, ime, prezime, mail, slika, drzava, grad){
    const data={
      username:username,
      novoUsername:novoUsername,
      ime:ime,
      prezime:prezime,
      mail:mail,
      slika:slika,
      drzava:drzava,
      grad:grad
    }

    return this.http.post(`http://localhost:4000/user/azurirajPodatke`, data);
  }

  nadjiSveUsers(){
    return this.http.get(`http://localhost:4000/user/nadjiSveUsere`);
  }

  brisiKorisnika(username){
    const data={
      username:username
    }

  return this.http.post(`http://localhost:4000/user/brisi`, data);
  }

  azurirajPodatkeAdmin(username,novoUsername,password, ime, prezime, mail, slika, drzava, grad, tip){
    const data={
      username:username,
      novoUsername:novoUsername,
      password:password,
      ime:ime,
      prezime:prezime,
      mail:mail,
      slika:slika,
      drzava:drzava,
      grad:grad,
      tip:tip
    }

    return this.http.post(`http://localhost:4000/user/azurirajPodatkeAdmin`, data);
  }

  dodajKorisnika( username, password, ime, prezime, mail, slika,drzava, grad, tip){
    const data={
      username:username,
      password:password,
      ime:ime,
      prezime:prezime,
      slika:slika,
      mail:mail,
      drzava:drzava,
      grad:grad,
      tip:tip
    }

    return this.http.post(`http://localhost:4000/user/dodajKorisnika`, data);
  }
}
