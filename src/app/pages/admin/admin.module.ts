import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PatientCreateComponent } from './patient/patient-create/patient-create.component';
import { PatientUpdateComponent } from './patient/patient-update/patient-update.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { ExamCreateComponent } from './exam/exam-create/exam-create.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';

//Material para la division layout de Administracion
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar'


@NgModule({
  declarations: [
    AdminComponent,
    PatientCreateComponent,
    PatientUpdateComponent,
    PatientListComponent,
    ExamCreateComponent,
    ExamListComponent,
    ExamViewComponent,
    SidebarComponent,
    ToolbarComponent,
    
 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
  
  ]
})
export class AdminModule { }