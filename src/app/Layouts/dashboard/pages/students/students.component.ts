import { NgForm } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';

import { Students } from '../../../../Core/models';
import { StudentsService } from '../../../../Core/services/students.service';


//Simula como si fuera una db, la lista de los alumnos.
const STUDENTS_DATA: Students[] = [
  { IDEstudiante: 1, Apellido: "Keaton", Nombre: 'Lucas', Correo: 'l.keaton@mail.com', Usuario: "lkeaton", Clave: "lkeaton", Rol: "Estudiante" },
  { IDEstudiante: 2, Apellido: 'Sagan', Nombre: 'Carl', Correo: 'c.sagan@mail.com', Usuario: 'csagan', Clave: 'csagan', Rol: 'Estudiante' },
  { IDEstudiante: 3, Apellido: 'Antonieta', Nombre: 'Maria', Correo: 'm.antomieta@mail.com', Usuario: 'mantomieta', Clave: 'mantomieta', Rol: 'Estudiante' },
  { IDEstudiante: 4, Apellido: 'Taylor', Nombre: 'Elizabeth', Correo: 'e.taylor@mail.com', Usuario: 'etaylor', Clave: 'etaylor', Rol: 'Estudiante' },
  { IDEstudiante: 5, Apellido: 'Witz', Nombre: 'Manuel', Correo: 'm.witz@mail.com', Usuario: 'mwitz', Clave: 'mwitz', Rol: 'Administrador' },
  { IDEstudiante: 6, Apellido: 'Pausini', Nombre: 'Laura', Correo: 'l.pausini@mail.com', Usuario: 'lpausini', Clave: 'lpausini', Rol: 'Administrador' },
]

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {
  displayedColumns: string[] = ['col-apellido-nombre', 'col-correo', 'col-acciones'];

  dataSource = STUDENTS_DATA;
  filteredDataSource = [...STUDENTS_DATA];

  selectedStudentForEdit: any;

  @ViewChild('filterInput') filterInput!: ElementRef;
  @ViewChild(MatSelect) yearSelect!: MatSelect;
  @ViewChild('addStudentForm') addStudentForm!: NgForm;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('modifyStudentForm') modifyStudentForm!: NgForm;
  
  applyFilter() {
    const filterValue = this.filterInput.nativeElement.value.toLowerCase().trim();

    this.filteredDataSource = this.dataSource.filter((element: any) =>
      Object.values(element).some((value: any) =>
        value.toString().toLowerCase().includes(filterValue)
      )
    );
  }


  //Agregar o modificar alumno

  handleFormSubmission(eventData: any): void {
    const formValues = eventData.formValues;
    const actionType = eventData.actionType;
    
    if (actionType === 'Agregar') {
      this.addStudent(formValues);
    } else if (actionType === 'Modificar') {
      this.modifyStudent(formValues);
    } else if (actionType === 'Cancelar') {
      this.selectedStudentForEdit = null;
      this.tabGroup.selectedIndex = 0;
    }
  }

  constructor(private studentService: StudentsService) { }

  //-------------------------------------------------------------------------
  
  editStudent(selectedStudent: any) {
    this.studentService.setSelectedStudent(selectedStudent);
    this.studentService.selectedStudent$.subscribe(student => {
      this.selectedStudentForEdit = student;
      this.tabGroup.selectedIndex = 1;
    });
  }

  //-------------------------------------------------------------------------

  deleteStudent(element: any): void {
    const index = this.filteredDataSource.findIndex(e => e === element);

    Swal.fire({
      title: "¿Confirma quitar a este alumno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (index !== -1) {
          this.filteredDataSource.splice(index, 1);

          this.dataSource = [...this.filteredDataSource];
          this.filteredDataSource = [...this.dataSource];
        }
        Swal.fire({
          icon: 'success',
          title: 'Alumno quitado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  //-------------------------------------------------------------------------

  modifyStudent(formValues: any): void {
    if (this.selectedStudentForEdit) {
      this.selectedStudentForEdit.Apellido = formValues.apellido;
      this.selectedStudentForEdit.Nombre = formValues.nombre;
      this.selectedStudentForEdit.Correo = formValues.correo;
      this.selectedStudentForEdit.Usuario = formValues.usuario;
      this.selectedStudentForEdit.Clave = formValues.clave;
      this.selectedStudentForEdit.Rol = formValues.rol;

      const indexInDataSource = this.dataSource.findIndex(student => student.IDEstudiante === this.selectedStudentForEdit.IDEstudiante);
      if (indexInDataSource !== -1) {
        this.dataSource[indexInDataSource] = { ...this.selectedStudentForEdit };

        this.filteredDataSource = [...this.dataSource];
      }

      this.selectedStudentForEdit = null;
      this.tabGroup.selectedIndex = 0;
    }
  }

  //-------------------------------------------------------------------------

  addStudent(formValues: any): void {
    const newStudent: Students = {
      IDEstudiante: STUDENTS_DATA.length + 1,
      Apellido: formValues.apellido,
      Nombre: formValues.nombre,
      Correo: formValues.correo,
      Usuario: formValues.usuario,
      Clave: formValues.clave,
      Rol: formValues.rol
    };

    this.filteredDataSource.push(newStudent);
    this.dataSource = [...this.filteredDataSource];

    this.filteredDataSource = [...this.dataSource];
  }

}