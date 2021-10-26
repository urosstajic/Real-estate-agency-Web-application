import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Nekretina } from './models/nekretnina';
import { Poruka } from './models/poruka';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class NekretninaGuard implements CanActivate {

constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      this.konverzacija=JSON.parse(localStorage.getItem('konverzacija'));
      this.nekretnina=JSON.parse(localStorage.getItem('nekretnina'));

      if(this.user==null){
        localStorage.clear();
        this.router.navigate([""]);
        return false;
      }

      if(this.nekretnina==null){
        localStorage.clear();
        this.router.navigate([""]);
        return false;
      }

      if(this.user.tip=='radnik' || this.user.tip=='reg_korisnik'){
        return true;
      }
  }

  user:User;
  konverzacija:Poruka;
  nekretnina:Nekretina;
  
}
