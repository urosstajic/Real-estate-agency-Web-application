import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class OdobriNGuard implements CanActivate {

  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user==null){
        localStorage.clear();
        this.router.navigate([""]);
        return false;
      }
      if(this.user.tip=="radnik" || this.user.tip=="admin"){
        return true;
      }else{
        localStorage.clear();
        this.router.navigate([""]);
        return false;
      }
  }

  user:User;
  
}
