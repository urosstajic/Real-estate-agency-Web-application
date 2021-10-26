import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencijaService {

  constructor(private http:HttpClient) { }

  dohvSve(){
    return this.http.get(`http://localhost:4000/agencija/dohvSve`);
  }

  defProcente(idA, procenatIzdavanje, procenatProdaja){
    const data={
      idA:idA,
      procenatIzdavanje:procenatIzdavanje,
      procenatProdaja:procenatProdaja
    }

    return this.http.post(`http://localhost:4000/agencija/defProcente`, data);
    
  }
}
