import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  
  public  formPatient:FormGroup=this.fb.group({
    nombre: ['',[Validators.required]],
    correo: ['',[Validators.required]],
    celular: ['',[Validators.required]],
    direccion: ['1',[Validators.required]],
    edad: ['',[Validators.required]],
    genero: ['',[Validators.required]],
  });

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  public guardarPaciente(){

  }

}
