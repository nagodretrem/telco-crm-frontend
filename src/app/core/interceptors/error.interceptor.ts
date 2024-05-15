import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req).pipe(
    catchError((error) => {
      if(error instanceof HttpErrorResponse){
        if (error.status === 401) {
          console.log('401 error')
        }
        else if (error.status === 403) {
          console.log('403 error')
        }
        else if (error.status === 404) {
          console.log('404 error')
        }
        else if (error.status === 500) {
          console.log('500 error')
        }
        else {
          console.error('An error occurred:', error);
        }

      }
      return throwError(error);
    })
  );
};
