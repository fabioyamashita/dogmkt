import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  login = (email: string, password: string): Observable<any> =>
    this.http.post(this.UrlServiceV1 + 'login', { email, password });
}
