import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // ✅ Get role from localStorage (or session)
  const role = localStorage.getItem('role');

  // ✅ Expected role from route data
  const expectedRole = route.data['role'] as string;

  if (role === expectedRole) {
    return true;
  } else {
    alert(`Access denied. Only ${expectedRole} can access this route.`);
    router.navigate(['/']);
    return false;
  }
};
