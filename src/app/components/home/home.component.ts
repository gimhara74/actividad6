import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.type-interfaces';
import { IUsuario } from '../../interfaces/iusuario.type-interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userService = inject(UserService); // Inyecta el servicio usando inject
  arrUser: IUsuario[] = []; // Crea un array de empleados de tipo IUsuario    
  filteredUsers: IUsuario[] = [];
  numPage: number = 1;
  total_pages: number = 0;

  //constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUser();
  }

  async loadUser(page: number = 1): Promise<IResponse | undefined> {
    try {
      let response: IResponse = await this.userService.getAll(page);
      this.arrUser = response.results || [];
      this.filteredUsers = this.arrUser; // Inicialmente, los usuarios filtrados son todos los usuarios
      this.total_pages = response.total_pages || 0;
      //console.log(response, "loadUser");
      //console.log(url, "url");
      return response;
    } catch (error) {
      console.log(error, 'error');
      return undefined;
    }
  }

  async navigateToNextPage() {
    if (this.numPage === this.total_pages) {
      return;
    }
    this.numPage++;
    this.loadUser(this.numPage);
    
  }

  async navigateToPrevPage() {
    if (this.numPage === 1) {
      return;
    }
    this.numPage--;
    this.loadUser(this.numPage);
   
  }

  async deleteUser(id: string) {
    try {      
      let response: IUsuario | any = await this.userService.deleteUser(id);
      if (response.error) {
        console.log(response.error, 'error');
        return;
      }
      
      this.arrUser = this.arrUser.filter(user => user._id !== id);
      this.filteredUsers = this.filteredUsers.filter(user => user._id !== id);

      console.log('Eliminado correctamente');
      console.log(response, 'response');
      
    } catch (error) {
      console.log(error, 'error');
      return undefined;
    }
  }

  onDelete(criteria: string) {
    this.filteredUsers = this.arrUser.filter(user => user.first_name.includes(criteria) || user.last_name.includes(criteria));
  }
  async actualizar(id: string) {
    let user: any = "";
    let response: IUsuario | any = await this.userService.update(id,user);
    console.log(response, "response ACTUALIZAR");
    }
}
