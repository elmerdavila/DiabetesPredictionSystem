import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Exam } from 'src/app/models/Exam.interface';
import { ExamService } from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {

  public formularioExamen:FormGroup=this.fb.group({
    polyura: new FormControl('Activo'),
    polydipsia: new FormControl('Activo'),
    weigtht_loss: new FormControl('Activo'),
    weakness:new FormControl('Activo'),
    polyfagia: new FormControl('Activo'),
    genital_thrush: new FormControl('Activo'),
    visual_blurring: new FormControl('Activo'),
    itchinf: new FormControl('Activo'),
    irritabilty: new FormControl('Activo'),
    delayed_healing: new FormControl('Activo'),
    partial_paresis: new FormControl('Activo'),
    muscle_stiffness: new FormControl('Activo'),
    Alopecia:new FormControl('Activo'),
    Obesity: new FormControl('Activo'),
    results: new FormControl(''),
    coments: new FormControl(''),
    notification:new FormControl(''),
    date: new FormControl(''),
  });

  constructor(private fb:FormBuilder, private examService:ExamService) { }

  ngOnInit(): void {
  }

  public guardarExamen(){
    this.examService.createExam(this.formularioExamen.value)
  }

}
