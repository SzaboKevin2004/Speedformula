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

  if (!hitelesitettE && (state.url === '/beallitasok' || state.url === '/forum-poszt-letrehozas')) {
    router.navigate(['/bejelentkezes']);
    return false;
  }

  return true;
};