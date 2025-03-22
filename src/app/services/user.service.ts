import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.type-interfaces';
import { IUsuario } from '../interfaces/iusuario.type-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
// En el app.config.ts se importa el HttpClient y se provee en el array de providers, para poder trabajar con APIS
  private httpClient = inject(HttpClient);
  private apiUrl: string = 'https://peticiones.online/api/users';
  private apiAction: string = 'https://peticiones.online/api/users/';
  
  getAll(page: number = 1): Promise<IResponse> {    
    return lastValueFrom(this.httpClient.get<IResponse>(`${this.apiUrl}?page=${page}`));
  }

  getById(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.get<IUsuario>(this.apiUrl + '/' + id));
  }

  deleteUser(id: string): Promise<IUsuario> {    
    return lastValueFrom(this.httpClient.delete<IUsuario>(this.apiAction + id));    
  }

  update(id: string, user: IUsuario): Promise<IUsuario> {    
    return lastValueFrom(this.httpClient.put<IUsuario>(this.apiAction + id, user));    
  }
  

  

}
