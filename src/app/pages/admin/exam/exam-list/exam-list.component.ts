import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Patient } from 'src/app/models/Patient.interface';
import { PatientService } from 'src/app/service/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { Exam } from 'src/app/models/Exam.interface';
import { ExamService } from 'src/app/service/exam.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public headers:string[] = ["Fecha", "Comentarios","Resultados", "Notificacion","Acciones"];
  public examenes:Exam[]=[];
  public dataSource= new MatTableDataSource();
  
  doctor_email:string = 'Administrador'
  paciente:Patient
  
  constructor(private router:Router,
    private activateRoute:ActivatedRoute,
    private examService:ExamService,
    public dialog: MatDialog,
    public authservice:AuthService) { 
      this.authservice.devolverUsuario()
      .then(data =>{
        if (data != null ){
          this.doctor_email = data.email;
        }else{
          this.router.navigate(['/iniciarSesion'])
        }        
      });
    }

  ngOnInit(): void {    
    
    this.activateRoute.params
    .subscribe((params: Patient) =>{
       this.paciente = params
       console.log("Estos son los parametros del paciente",params)
      });
    this.listarExamenes();
  }
  public listarExamenes(){
    this.examService.getExams(this.doctor_email,this.paciente.id)
      .subscribe
      (
        (response) =>{
          this.examenes = (response as any);
          this.dataSource = new MatTableDataSource(this.examenes );
          this.ngAfterViewInit();
        },
        (error) =>{
          console.log("error"+ error);
        }
      )
  }
  public goNewExam(){
    this.router.navigate(['/administracion/nuevoExamen',this.paciente])
  }
  public goDeleteExam(exam:Exam){
    this.examService.deleteExam(exam,this.paciente.id)
    this.listarExamenes();
  }
  public goViewExam(exam:Exam){
    this.router.navigate(['/administracion/verExamen',exam])
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
