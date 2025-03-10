import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.type-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
