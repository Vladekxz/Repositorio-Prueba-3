import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return this.router.parseUrl('/error');
        }
        return true;
      })
    );
  }
  
  canLoad(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return this.router.parseUrl('/error');
        }
        return true;
      })
    );
  }
  
}