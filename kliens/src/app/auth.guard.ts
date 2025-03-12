import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const hitelesitettE = authService.hitelesitettE();

  if (hitelesitettE && (state.url === '/regisztracio' || state.url === '/bejelentkezes')) {
    router.navigate(['/']);
    return false;
  }

  const vedettUtvonalak = ['/beallitasok', '/forum', '/forum-poszt-letrehozas'];
  if (!hitelesitettE && (vedettUtvonalak.includes(state.url) || state.url.startsWith('/forum/'))) {
    router.navigate(['/bejelentkezes']);
    alert("Kérem jelentkezzen be a használatához!");
    return false;
  }

  return true;
};