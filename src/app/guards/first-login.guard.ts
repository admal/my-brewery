import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirstLoginGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    public router: Router) { }
    
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean> {
    let profileExists = this.auth.isAuthenticated && await this.auth.profileExists();
    
    if (profileExists) {
      return true;
    }

    this.router.navigate(["profile/new"])
  }  
}
