import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Exam } from 'src/app/models/Exam.interface';
import { ExamService } from 'src/app/service/exam.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/Patient.interface';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {

  public formularioExamen:FormGroup=this.fb.group({
    polyura: new FormControl('false'),
    polydipsia: new FormControl('false'),
    weigtht_loss: new FormControl('false'),
    weakness:new FormControl('false'),
    polyfagia: new FormControl('false'),
    genital_thrush: new FormControl('false'),
    visual_blurring: new FormControl('false'),
    itchinf: new FormControl('false'),
    irritabilty: new FormControl('false'),
    delayed_healing: new FormControl('false'),
    partial_paresis: new FormControl('false'),
    muscle_stiffness: new FormControl('false'),
    Alopecia:new FormControl('false'),
    Obesity: new FormControl('false'),
    results: new FormControl(''),
    coments: new FormControl(''),
    notification:new FormControl('Sin Notificacion'),
    date: new FormControl(''),
  });

  public email="";

  private paciente:Patient;

  constructor(private fb:FormBuilder, private examService:ExamService,
              public authservice:AuthService, private router:Router,
              private activateRoute:ActivatedRoute) {
    this.authservice.devolverUsuario()
    .then(data =>{
      if (data != null ){
        this.email = data.email;
        
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

  }

  public guardarExamen(){
    this.examService.createExam(this.formularioExamen.value,this.paciente.id)
    this.router.navigate(['/administracion/listaExamenes',this.paciente])
  }
  public generarResultados(){
    this.examService.generarResultados(this.formularioExamen.value).subscribe(data=>{
      this.formularioExamen.get('results').setValue(data.resultado);
    });
    
  }

}
