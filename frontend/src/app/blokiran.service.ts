import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlokiranService {

  constructor(private http:HttpClient) { }

  dohvSve(){
    return this.http.get(`http://localhost:4000/blokiran/dohvSve`);
  }

  blokiraj(idB, koB, kogaB){
    const data={
      idB:idB,
      koB:koB,
      kogaB:kogaB
    }

    return this.http.post(`http://localhost:4000/blokiran/blokiraj`, data);
  }

  odblokiraj(idB){
    const data={
      idB:idB
    }

    return this.http.post(`http://localhost:4000/blokiran/odblokiraj`, data);
  }
}
