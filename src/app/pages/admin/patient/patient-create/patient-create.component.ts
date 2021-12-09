import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/Patient.interface';
import { PatientService } from 'src/app/service/patient.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {

  email:string = 'Administrador'
  public  formPatient:FormGroup=this.fb.group({
    nombre: ['',[Validators.required]],
    correo: ['',[Validators.required]],
    celular: ['',[Validators.required]],
    direccion: ['',[Validators.required]],
    edad: ['',[Validators.required]],
    genero: ['',[Validators.required]],
  });

  constructor(
    private fb:FormBuilder,
    private servicePatient:PatientService, 
    private router:Router,  
    private patientServie:PatientService,
    public authservice:AuthService ) {
      this.authservice.devolverUsuario()
      .then(data =>{
        if (data != null ){
          this.email = data.email;
        }else{
          this.router.navigate(['/iniciarSesion'])
        }        
      });
    const navigation= this.router.getCurrentNavigation();
   }

  ngOnInit(): void {
  }

  public guardarPaciente(){
    const newPatient=this.formPatient.value;
    //this.servicePatient.createPatient(newPatient,null);
    this.servicePatient.createPatient2(this.email,newPatient,null);
    this.router.navigate(['/administracion/pacientes'])
  }

}
