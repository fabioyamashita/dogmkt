import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/localStorage';

export abstract class BaseService {
  protected UrlServiceV1: string = environment.apiUrlv1;
  public LocalStorage = new LocalStorageUtils();

  protected getHttpHeaders(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected getAuthHttpHeaders(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.LocalStorage.getToken()}`,
      }),
    };
  }
}
