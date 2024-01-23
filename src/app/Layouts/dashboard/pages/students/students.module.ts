import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';

import { StudentsComponent } from './students.component';
import { StudentFormComponent } from './components/student-form/student-form.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
