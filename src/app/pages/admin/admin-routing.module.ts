import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ExamCreateComponent } from './exam/exam-create/exam-create.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamUpdateComponent } from './exam/exam-update/exam-update.component';
import { PatientCreateComponent } from './patient/patient-create/patient-create.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { PatientUpdateComponent } from './patient/patient-update/patient-update.component';
import { PatientDeleteComponent } from './patient/patient-delete/patient-delete.component';


const routes: Routes = [
  {
    path:'',
      component: AdminComponent,
      children:[
        {path: 'eliminarPaciente', component: PatientDeleteComponent},
        {path: 'nuevoPaciente', component: PatientCreateComponent},
        {path: 'editarPaciente', component: PatientUpdateComponent},
        {path: 'pacientes', component: PatientListComponent},
        {path: 'nuevoExamen', component: ExamCreateComponent},
        {path: 'verExamen', component:ExamViewComponent},
        {path: 'actualizarExamen', component:ExamUpdateComponent},
        {path: 'listaExamenes', component: ExamListComponent},
        {path: '', component: PatientListComponent},      
    
      ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
