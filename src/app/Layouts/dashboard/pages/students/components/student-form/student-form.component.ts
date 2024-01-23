import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StudentsService } from '../../../../../../Core/services/students.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})

export class StudentFormComponent {

  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter();
  userFormGroup: FormGroup;
  selectedStudent: any;
  isEditarVisible: boolean = false;
  isAgregarVisible: boolean = true;
  isCancelarVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private studentService : StudentsService) {
    this.userFormGroup = this.formBuilder.group({
      apellido: this.formBuilder.control('', Validators.required),
      nombre: this.formBuilder.control('', Validators.required),
      correo: this.formBuilder.control('', [Validators.required, Validators.email]),
      usuario: this.formBuilder.control('', Validators.required),
      clave: this.formBuilder.control('', Validators.required),
      rol: this.formBuilder.control('', Validators.required),
    })
  }

  ngOnInit() {
    this.studentService.selectedStudent$.subscribe(student => {
      this.selectedStudent = student;
      this.populateForm();
    });
  }

  private populateForm(): void {
    if (this.selectedStudent) {
      this.isEditarVisible = true;
      this.isCancelarVisible = true;
      this.isAgregarVisible = false;
      this.userFormGroup.patchValue({
        apellido: this.selectedStudent.Apellido || '',
        nombre: this.selectedStudent.Nombre || '',
        correo: this.selectedStudent.Correo || '',
        usuario: this.selectedStudent.Usuario || '',
        clave: this.selectedStudent.Clave || '',
        rol: this.selectedStudent.Rol || ''
      });
    }
  }
  

  onSubmit(event: Event, actionType: string): void {
    event.preventDefault();
    if (this.userFormGroup.invalid) {

      if (this.userFormGroup.get('correo')?.hasError('email')) {
        Swal.fire({
          icon: 'error',
          title: 'Error detectado...',
          text: 'El formato del correo electrónico no es válido'
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error detectado...',
          text: 'Completar datos obligatorios'
        });
      }
    } else {
      const formValues = this.userFormGroup.value;
      this.formularioEnviado.emit({ formValues, actionType });
      if(actionType === 'Agregar')
      {
        Swal.fire({
          icon: 'success',
          title: 'Alumno agregado con exito!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.formularioEnviado.emit(this.userFormGroup.value);
          this.userFormGroup.reset();
          this.userFormGroup.markAsPristine();
          this.userFormGroup.markAsUntouched();
        });
      }else if(actionType === 'Modificar'){
        Swal.fire({
          icon: 'success',
          title: 'Alumno modificado con exito!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.formularioEnviado.emit(this.userFormGroup.value);
          this.userFormGroup.reset();
          this.userFormGroup.markAsPristine();
          this.userFormGroup.markAsUntouched();
          this.isEditarVisible = false;
          this.isCancelarVisible = false;
          this.isAgregarVisible = true;
        });
      }else if(actionType === 'Cancelar'){
        this.formularioEnviado.emit();
        this.isEditarVisible = false;
        this.isCancelarVisible = false;
        this.isAgregarVisible = true;
        this.userFormGroup.reset();
        this.userFormGroup.markAsPristine();
        this.userFormGroup.markAsUntouched();
      }
    }
  }
}
