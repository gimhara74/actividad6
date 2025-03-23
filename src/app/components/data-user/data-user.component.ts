import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUsuario } from '../../interfaces/iusuario.type-interfaces';

@Component({
  selector: 'app-data-user',
  imports: [RouterLink],
  templateUrl: './data-user.component.html',
  styleUrl: './data-user.component.css',
})
export class DataUserComponent {
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  arrUser: IUsuario[] = [];
  router = inject(Router);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      let url: string = params.id;
      this.loadUser(url);
    });
  }

  async loadUser(url: string = ''): Promise<IUsuario | undefined> {
    try {
      let response: IUsuario = await this.userService.getById(url);
      this.arrUser.push(response);
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

    } catch (error) {
      console.log(error, 'error');
      return undefined;
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

 


}
