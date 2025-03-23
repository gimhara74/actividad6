import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.type-interfaces';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-frm',
  imports: [ReactiveFormsModule],
  templateUrl: './frm.component.html',
  styleUrl: './frm.component.css',
})
export class FrmComponent {
  employeeForm: FormGroup;
  valido: boolean = false;

  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  arrUser: IUsuario[] = [];
  router = inject(Router);
  user_Id: string = '';  
  insertFrm: boolean = false;
  titFrm: string = 'NUEVO USUARIO';
  tirButton: string = 'Guardar';
  

  ngOnInit() {
    //Le preguntamos al ActivateRoute mis paraemtros dinamicos de ruta
    this.activatedRoute.params.subscribe((params: any) => {
      let url: string = params.id;

      if (url === undefined) {
        this.insertFrm = true;
        return;
      }

      this.loadUser(url);
      this.titFrm = 'EDITAR USUARIO';
      this.tirButton = 'Actualizar';
    });
  }
  async loadUser(url: string = ''): Promise<IUsuario | undefined> {
    try {
      let response: IUsuario = await this.userService.getById(url);
      this.user_Id = response._id;
      this.arrUser.push(response);

      if (this.insertFrm === false) {
        this.employeeForm = new FormGroup({
          nombre: new FormControl(response.first_name),
          apellidos: new FormControl(response.last_name),
          email: new FormControl(response.email),
          photo: new FormControl(response.image),
        });
      }

      return response;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  constructor() {
    this.employeeForm = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\w+\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
        ]),
        apellidos: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        photo: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(\/[a-zA-Z0-9\-\/]*|https?:\/\/[^\s$.?#].[^\s]*)$/
          )
        ]),
      },
      []
    );
  }

  async getDataForm() {
    try {
      let user: IUsuario = this.employeeForm.value;
      let response: IUsuario | any;

      if (this.insertFrm === false) {
        response = await this.userService.update(this.user_Id, user);

        if (response.error) {
          console.log(response.error, 'error Se ha producido un error');
          return;
        }
      } else {
        response = await this.userService.insert(this.user_Id, user);       
        this.employeeForm.reset();
      }
      this.router.navigate(['/home']);
      

      //
    } catch (error) {
      console.log(error, 'error - Se ha producido un error');
    }
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return (
      this.employeeForm.get(controlName)?.hasError(errorName) &&
      this.employeeForm.get(controlName)?.touched
    );
  }
}
