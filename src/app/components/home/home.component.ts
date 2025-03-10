import { Component, inject, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.type-interfaces';
import { IUsuario } from '../../interfaces/iusuario.type-interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userService = inject(UserService); // Inyecta el servicio usando inject
  arrEmployee: IUsuario[] = []; // Crea un array de empleados de tipo IUsuario

  ngOnInit() {
    
    this.loadEmployee().then(resp => {
      this.arrEmployee = resp?.results || []      
    });

    
    
    
  }

  async loadEmployee(url: string = ""): Promise<IResponse | undefined> {
    /* Consumición Promises - generico javascript */
    try {
      return await this.userService.getAllPromise(url)
      //let response: IResponse = await this.userService.getAllPromise(url)
      
      //this.linkNext = response.links.next;
      //this.linkPrev = response.links.previous;
      //this.arrPersonajesPromises = response.items

      

    } catch (error) {
      console.log(error)
      
      return undefined;
    }
  }

}
