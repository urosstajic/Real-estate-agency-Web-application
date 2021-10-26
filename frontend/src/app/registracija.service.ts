import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistracijaService {

  constructor(private http:HttpClient, private router:Router) { }

  registracija(username, password, ime, prezime, slika, mail, drzava, grad, tip){
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


    return this.http.post(`http://localhost:4000/register/registracija`, data);
  }

  nadjiSveRegistracije(){
    return this.http.get(`http://localhost:4000/register/nadjiSveReg`);
  }

  odbij(username){
    const data={
      username:username
    }

    return this.http.post(`http://localhost:4000/register/odbij`, data);
  }
}
