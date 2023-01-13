import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class BaseService {
  protected UrlServiceV1: string = environment.apiUrlv1;

  protected getHttpHeaders(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
