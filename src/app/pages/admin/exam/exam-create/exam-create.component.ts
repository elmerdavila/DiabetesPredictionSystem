import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Exam } from 'src/app/models/Exam.interface';
import { ExamService } from 'src/app/service/exam.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/Patient.interface';
import { Email } from 'src/app/models/Email';
import { EmailService } from 'src/app/service/email.service';

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
       console.log("Estos son los parametros del paciente",params)
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
      
      
      "Tu examen tiene los siguientes resultados:"+
      "polyura:"+(examen.polyura?"Presente":"No presente")+
      "polydipsia:"+(examen.polydipsia?"Presente":"No presente")+
      "weigtht loss:"+(examen.weigtht_loss?"Presente":"No presente")+
      "weakness:"+(examen.weakness?"Presente":"No presente")+
      "polyfagia:"+(examen.polyfagia?"Presente":"No presente")+
      "genital thrush:"+(examen.genital_thrush?"Presente":"No presente")+
      "visual blurring:"+(examen.visual_blurring?"Presente":"No presente")+
      "irritabilty:"+(examen.irritabilty?"Presente":"No presente")+
      "delayed healing:"+(examen.delayed_healing?"Presente":"No presente")+
      "partial paresis:"+(examen.partial_paresis?"Presente":"No presente")+
      "muscle stiffness:"+(examen.muscle_stiffness?"Presente":"No presente")+
      "Alopecia:"+(examen.Alopecia?"Presente":"No presente")+
      "Obesity:"+(examen.Obesity?"Presente":"No presente")+
      "results:"+examen.results+
      "coments:"+examen.coments+
      "notification:"+examen.notification+
      "date:"+examen.date
      
      let curso=new Email(correo==null?"dcruzch22i@gmail.com":correo,"RESULTADOS DE EXAMEN",mensaje);
      this.service.enviarEmail(curso)
        .subscribe(data=>{
      })
    }
    this.router.navigate(['/administracion/listaExamenes',this.paciente])
  }
  public generarResultados(){
    this.examService.generarResultados(this.formularioExamen.value).subscribe(data=>{
      this.formularioExamen.get('results').setValue(data.resultado);
    });
    
  }

}
