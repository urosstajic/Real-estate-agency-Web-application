import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class YourGuardGuard implements CanActivate {

  constructor(private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user==null){
        localStorage.clear();
        this.router.navigate([""]);
        return false;
      }
      if(this.user.tip=="admin"){
        return true;
      }else{
        localStorage.clear();
        this.router.navigate([""]);
        return false;
      }
   
  }

  user:User;
  
}
