import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretina } from '../models/nekretnina';
import { User } from '../models/user';
import { NekretninaService } from '../nekretnina.service';
import { UserService } from '../user.service';
import {MatCardModule} from '@angular/material/card';
import alertify from "alertify.js";
import { NumberValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.logIn=1;
    this.nekr=0;
    this.zaPrik=0;
  }
  username:string;
  password:string;
  poruka:string;



  login(){
    const reg=/(.)\1\1\1/;
    if(reg.test(this.password)){
      alertify.error("Lozinka nije u dobrom formatu.");
      return;
    }
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(user){
        localStorage.setItem("ulogovan", JSON.stringify(user));
        if(user.tip=="admin"){
          this.router.navigate(["admin"]);
        }else{
          if(user.tip=="reg_korisnik"){
            this.router.navigate(["user"]);
          }else{
            this.router.navigate(["radnik"]);
          }
        }
      }else{
        alertify.error("Neispravno uneti podaci");
        this.router.navigate([""]);
      }
    })
  }

  

  logIn:number;
  nekr:number;
  zaPrik:number;
  nesto:string;

  prikaziLogin(){
    this.logIn=1;
    this.nekr=0;
    this.zaPrik=0;
  }

  prikaziNekr(){
    this.router.navigate(["pocetna"]);
  }

  slikaVideo(z){
    if(z.randomSlika.includes('mp4')){
      return "video";
    }else{
      return "slika";
    }
  }

  reg(){
    this.router.navigate(["registracija"]);
  }


}


