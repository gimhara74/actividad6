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
  userService = inject(UserService); 
  arrUser: IUsuario[] = [];  
  numPage: number = 1;
  total_pages: number = 0;  

  ngOnInit() {
    this.loadUser();
  }

  async loadUser(page: number = 1): Promise<IResponse | undefined> {
    try {

      let response: IResponse = await this.userService.getAll(page);
      this.arrUser = response.results || [];
      this.total_pages = response.total_pages || 0;  
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
      
      this.applyFilter(id);

    } catch (error) {
      console.log(error, 'error');
      return;
    }
  }

  applyFilter(id: string) {
    this.arrUser = this.arrUser.filter((user) => user._id !== id);
  }

  async actualizar(id: string) {
    let user: any = '';
    try {
      let response: IUsuario | any = await this.userService.update(id, user);
      user = response;
    } catch (error) {
      console.log(error, 'error');
    }
    
    
  }
}
