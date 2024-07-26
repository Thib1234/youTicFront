import {
  Injectable
} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import {
  AuthService
} from '../tools/auth.service';
import {
  Observable
} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    if (!req.url.includes('api/token/') && !req.url.includes('register/') && !req.url.includes('accounts/register/')) {
      console.log('ZOZO INTERCEPT');

      console.log(localStorage.getItem('token'));

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
    return next.handle(req);
  }
}
