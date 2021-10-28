import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ExamComponent } from './exam/exam.component';
import { PatientCreateComponent } from './patient/patient-create/patient-create.component';


@NgModule({
  declarations: [
    AdminComponent,
    ExamComponent,
    PatientCreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
