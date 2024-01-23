import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { StudentsModule } from './pages/students/students.module';


@NgModule({
  declarations: [
    DashboardComponent,    
  ],
  imports: [
    SharedModule,
    StudentsModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
