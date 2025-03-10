import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.type-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
// En el app.config.ts se importa el HttpClient y se provee en el array de providers, para poder trabajar con APIS
  private httpClient = inject(HttpClient);
  private apiUrl: string = 'https://peticiones.online/api/users';
  
  getAllPromise(url: string = this.apiUrl): Promise<IResponse> {
    url = (url === "") ? this.apiUrl : url;
    return lastValueFrom(this.httpClient.get<IResponse>(url));
  }

  getData(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.apiUrl);    
  }

}
