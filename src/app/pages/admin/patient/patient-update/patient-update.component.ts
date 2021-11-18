import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { FormBuilder,  Validators } from '@angular/forms';
import { Patient } from 'src/app/models/Patient.interface';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit {

  public patient:Patient={
    id:'',
    nombre: '',
    edad: 0,
    correo: '',
    genero: '',
    celular: '',
    direccion: ''

  };
  public  formPatient!:FormGroup;
  construirFormulario(){
    this.formPatient= new FormGroup({  
    id : new FormControl(''),
    nombre: new FormControl(''),
    correo: new FormControl(''),
    celular: new FormControl(''),
    direccion: new FormControl(''),
    edad: new FormControl(''),
    genero:new FormControl(''),
  })
  }

  constructor(
    public dialogRef: MatDialogRef<PatientUpdateComponent>,
    private fb:FormBuilder,
    private servicePatient:PatientService, 
    private router:Router, 
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
  }

  ngOnInit(): void {
    console.log(this.data.data)
    this.construirFormulario();
    this.formPatient.setValue(this.data.data)
    console.log(this.formPatient)
     return this.patient=this.data.data;
    //return this.datosCurso=response;
  }

  Editar(formulario:Patient){
    console.log(this.data.data)
    console.log(formulario)
    const newPatient=this.formPatient.value;
    this.servicePatient.UpdatePatient(newPatient,this.data.data.id);
    this.dialogRef.close();
    this.router.navigate(['/administracion/pacientes'])
  }

}
