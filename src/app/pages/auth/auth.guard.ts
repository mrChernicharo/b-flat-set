import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router
	) { }


	canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
		return this.authService.user.pipe(
			take(1),
			map(user => {
				return !!user
			}), tap(user => {
				if (!user) {
					this.router.navigate(['/auth'])
				}
			}));
	}
}