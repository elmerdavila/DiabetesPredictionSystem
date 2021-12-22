import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Exam } from 'src/app/models/Exam.interface';
import { ExamService } from 'src/app/service/exam.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/Patient.interface';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {

  public formularioExamen:FormGroup=this.fb.group({
    polyura: new FormControl(0),
    polydipsia: new FormControl(0),
    weigtht_loss: new FormControl(0),
    weakness:new FormControl(0),
    polyfagia: new FormControl(0),
    genital_thrush: new FormControl(0),
    visual_blurring: new FormControl(0),
    itchinf: new FormControl(0),
    irritabilty: new FormControl(0),
    delayed_healing: new FormControl(0),
    partial_paresis: new FormControl(0),
    muscle_stiffness: new FormControl(0),
    Alopecia:new FormControl(0),
    Obesity: new FormControl(0),
    results: new FormControl(''),
    coments: new FormControl(''),
    notification:new FormControl('Sin Notificacion'),
    date: new FormControl(''),
    age: new FormControl(0),
    gender: new FormControl(0)
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
       this.formularioExamen.get('age').setValue(Number(this.paciente.edad));
       let genero=this.paciente.genero=='Masculino'?1:0;
       this.formularioExamen.get('gender').setValue(genero);
      });

  }

  public guardarExamen(){
    this.examService.createExam(this.formularioExamen.value,this.paciente.id)
    this.router.navigate(['/administracion/listaExamenes',this.paciente])
  }
  public generarResultados(){
    console.log("Esto son los valores enviados",this.formularioExamen.value);
    this.examService.generarResultados(this.formularioExamen.value).subscribe(data=>{
      this.formularioExamen.get('results').setValue(data.prediccion);
    });
    
  }

}
