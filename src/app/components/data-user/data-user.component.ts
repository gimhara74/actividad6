import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUsuario } from '../../interfaces/iusuario.type-interfaces';

@Component({
  selector: 'app-data-user',
  imports: [],
  templateUrl: './data-user.component.html',
  styleUrl: './data-user.component.css'
})
export class DataUserComponent {
  
  activatedRoute = inject(ActivatedRoute); 
  userService = inject(UserService); 
  arrUser: IUsuario[] = []; 
  router = inject(Router); 
 
  ngOnInit() {
    //Le preguntamos al ActivateRoute mis paraemtros dinamicos de ruta
    this.activatedRoute.params.subscribe((params:any) => {
      let url: string = params.id;
      this.loadUser(url);
      //Con esta url llamar al servicio y preguntar si el array de la BBDD tenemos algo con esa ruta
      console.log(url, "url");

    });
    
  }

  async loadUser(url: string = ""): Promise<IUsuario | undefined> {
      try {
        let response: IUsuario = await this.userService.getById(url);
        this.arrUser.push(response);  
         

        console.log(this.arrUser, "116");
        console.log(url, "url");
        
        return response;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }

    async deleteUser(id: string) {
      try {      
        let response: IUsuario | any = await this.userService.deleteUser(id);
        if (response.error) {
          console.log(response.error, 'error');
          return;
        }
        
        this.goToHome();

        //this.arrUser = this.arrUser.filter(user => user._id !== id);
  
        console.log('Eliminado correctamente');
        console.log(response, 'response');
        
      } catch (error) {
        console.log(error, 'error');
        return undefined;
      }
    }

   
    goToHome() {
      this.router.navigate(['/home']);
    }

}
