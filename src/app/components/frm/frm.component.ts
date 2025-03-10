import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-frm',
  imports: [ReactiveFormsModule],
  templateUrl: './frm.component.html',
  styleUrl: './frm.component.css'
})

export class FrmComponent {
    
  employeeForm: FormGroup;

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
      ])
      
    }, [])
  }

  getDataForm() {
    console.log(this.employeeForm.value)
    this.employeeForm.reset()
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.employeeForm.get(controlName)?.hasError(errorName) && this.employeeForm.get(controlName)?.touched
  }

}
