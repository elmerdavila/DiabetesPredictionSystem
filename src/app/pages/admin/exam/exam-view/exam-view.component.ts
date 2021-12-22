//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent implements OnInit {
  public formularioExamen:FormGroup=this.fb.group({
    polyura: new FormControl('true'),
    polydipsia: new FormControl('true'),
    weigtht_loss: new FormControl('true'),
    weakness:new FormControl('true'),
    polyfagia: new FormControl('true'),
    genital_thrush: new FormControl('true'),
    visual_blurring: new FormControl('true'),
    itchinf: new FormControl('true'),
    irritabilty: new FormControl('true'),
    delayed_healing: new FormControl('true'),
    partial_paresis: new FormControl('true'),
    muscle_stiffness: new FormControl('true'),
    Alopecia:new FormControl('true'),
    Obesity: new FormControl('true'),
    results: new FormControl(''),
    coments: new FormControl(''),
    notification:new FormControl('Sin Notificacion'),
    date: new FormControl(''),
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  doctor_email:string = 'Administrador';
  paciente:Patient;
  examen:Exam;

  polyura:Boolean=false ;
  weigtht_loss:Boolean=false ;
  polyfagia:Boolean=false ;
  visual_blurring:Boolean=false ;
  irritabilty:Boolean=false ;
  partial_paresis:Boolean=false ;
  Alopecia:Boolean=false ;
  polydipsia:Boolean=false ;
  weakness:Boolean=false ;
  genital_thrush:Boolean=false ;
  itchinf:Boolean=false ;
  delayed_healing:Boolean=false ;
  muscle_stiffness:Boolean=false ;
  Obesity :Boolean=false ;

  constructor(private fb:FormBuilder,private router:Router,
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
    .subscribe((params: Exam) =>{
      this.examen = params
      if (this.examen.polyura == 1 ){ this.polyura=true }
      if (this.examen.weigtht_loss== 1 ){ this.weigtht_loss=true }
      if (this.examen.polyfagia== 1 ){ this.polyfagia=true }

      if (this.examen.visual_blurring == 1 ){ this.visual_blurring=true }
      if (this.examen.irritabilty== 1 ){ this.irritabilty=true }
      if (this.examen.partial_paresis== 1 ){ this.partial_paresis=true }

      if (this.examen.Alopecia== 1 ){ this.Alopecia=true }
      if (this.examen.polydipsia== 1 ){ this.polydipsia=true }
      if (this.examen.weakness== 1 ){ this.weakness=true }

      if (this.examen.genital_thrush == 1 ){ this.genital_thrush=true }
      if (this.examen.itchinf== 1 ){ this.itchinf=true }
      if (this.examen.delayed_healing== 1 ){ this.delayed_healing=true }

      if (this.examen.muscle_stiffness == 1 ){ this.muscle_stiffness =true }
      if (this.examen.Obesity== 1 ){ this.Obesity=true }

      console.log("Estos son los parametros del examen",params)
      });
  }

}
