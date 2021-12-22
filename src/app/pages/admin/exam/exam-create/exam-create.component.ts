import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Exam } from 'src/app/models/Exam.interface';
import { ExamService } from 'src/app/service/exam.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/Patient.interface';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Email } from 'src/app/models/Email';
import { EmailService } from 'src/app/service/email.service';

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
              private activateRoute:ActivatedRoute,private service:EmailService) {
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
    var examen= this.formularioExamen.value
    
    var correo=this.paciente.correo
    if(!!correo){
      var mensaje=
      /*'<div style="background-color:#BBD5FC; border-radius: 40px 40px; border: #638FD1 3px solid;">'+
      '<div style="padding:10px;padding-left:30px;padding-right:30px;">'+
        '<p><strong>Gracias por registrarse en el Curso: “'+examen.nombre_curso+'” – Grupo '+examen.nombre_grupo+'</strong></p>'+
      '<p><strong>Fecha: </strong>De '+examen.hora_inicio+' a '+examen.hora_final+' horas</p>'+
      '<p><strong>Horario: </strong>'+examen.horario_grupo+'</p>'+
      '<p><strong>Enlace: </strong>Se le hará llegar un día entes del evento a su correo institucional.</p>'+
      '<p style="font-size:12px;"><strong>Recuerde que para obtener certificación debe tener como mínimo 80% de asistencia. </strong></p>'+
      '</div>'+
        '</div>'*/
      
      
      "Tu examen tiene los siguientes resultados: \n"+
      "\n polyura: "+(examen.polyura?"Presente":"No presente")+
      "\n polydipsia: "+(examen.polydipsia?"Presente":"No presente")+
      "\n weigtht loss: "+(examen.weigtht_loss?"Presente":"No presente")+
      "\n weakness: "+(examen.weakness?"Presente":"No presente")+
      "\n polyfagia: "+(examen.polyfagia?"Presente":"No presente")+
      "\n genital thrush: "+(examen.genital_thrush?"Presente":"No presente")+
      "\n visual blurring: "+(examen.visual_blurring?"Presente":"No presente")+
      "\n irritabilty: "+(examen.irritabilty?"Presente":"No presente")+
      "\n delayed healing: "+(examen.delayed_healing?"Presente":"No presente")+
      "\n partial paresis: "+(examen.partial_paresis?"Presente":"No presente")+
      "\n muscle stiffness: "+(examen.muscle_stiffness?"Presente":"No presente")+
      "\n Alopecia: "+(examen.Alopecia?"Presente":"No presente")+
      "\n Obesity: "+(examen.Obesity?"Presente":"No presente")+
      "\n results: "+examen.results+
      "\n coments: "+examen.coments+
      "\n notification: "+examen.notification+
      "\n Fecha: "+examen.date
      
      let curso=new Email(correo==null?"dcruzch22i@gmail.com":correo,"RESULTADOS DE EXAMEN",mensaje);
      this.service.enviarEmail(curso)
        .subscribe(data=>{
      })
    }
    this.router.navigate(['/administracion/listaExamenes',this.paciente])
  }
  public generarResultados(){
    console.log("Esto son los valores enviados",this.formularioExamen.value);
    this.examService.generarResultados(this.formularioExamen.value).subscribe(data=>{
      this.formularioExamen.get('results').setValue(data.prediccion);
    });
    
  }

}
