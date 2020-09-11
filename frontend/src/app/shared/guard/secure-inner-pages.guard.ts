import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './../token.service';

@Injectable({
    providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
    constructor(
        public tokenService: TokenService,
        public router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.tokenService.isLoggedIn()) {
            window.alert("You are already signed in, access denied!");
            this.router.navigate(['profile'])
        }
        return true;
    }

}
