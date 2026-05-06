import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        alert('Unauthorized. Please log in again.');
        // Optionally clear token and redirect
        localStorage.removeItem('token');
      } else if (error.status === 403) {
        alert('Forbidden. You do not have permission to access this resource.');
      } else if (error.status === 0) {
        alert('Network error. Please check your connection.');
      } else {
        alert(`Error ${error.status}: ${error.message}`);
      }

      return throwError(() => error);
    })
  );
};
