import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { DashboardModule } from './Layouts/dashboard/dashboard.module';
import { StudentsService } from './Core/services/students.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    DashboardModule
  ],
  providers: [StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
