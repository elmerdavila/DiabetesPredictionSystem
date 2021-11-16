import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/Patient.interface';
import { PatientService } from 'src/app/service/patient.service';
import { Router } from '@angular/router';

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
    direccion: ['',[Validators.required]],
    edad: ['',[Validators.required]],
    genero: ['',[Validators.required]],
  });

  constructor(private fb:FormBuilder,private servicePatient:PatientService, private router:Router) {
    const navigation= this.router.getCurrentNavigation();
   }

  ngOnInit(): void {
  }

  public guardarPaciente(){
    const newPatient=this.formPatient.value;
    this.servicePatient.createPatient(newPatient,null);
    this.router.navigate(['/administracion/pacientes'])
  }

}
