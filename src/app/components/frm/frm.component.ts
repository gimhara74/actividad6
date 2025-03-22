import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.type-interfaces';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-frm',
  imports: [ReactiveFormsModule],
  templateUrl: './frm.component.html',
  styleUrl: './frm.component.css'
})

export class FrmComponent {
    
  employeeForm: FormGroup;
  valido: boolean = false;
  
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

        this.employeeForm = new FormGroup({
          nombre: new FormControl(response.first_name),
          apellidos: new FormControl(response.last_name),
          email: new FormControl(response.email),
          photo: new FormControl(response.image)
        });
         

        console.log(this.arrUser, "Desde formulario");
        
        //console.log(url, "url desde FRM");
        
        return response;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }


  constructor() {
    this.employeeForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      apellidos: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
        photo: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ])
      
    }, [])
  }

  getDataForm() {
    console.log(this.employeeForm.value, "Datos del formulario")
    
    //this.employeeForm.reset()
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {

    return this.employeeForm.get(controlName)?.hasError(errorName) && this.employeeForm.get(controlName)?.touched
  }
    
  
}
