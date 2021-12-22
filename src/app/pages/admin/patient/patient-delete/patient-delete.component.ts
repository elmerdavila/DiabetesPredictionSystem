import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
//import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/models/Patient.interface';
import { AuthService } from 'src/app/service/auth.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-delete',
  templateUrl: './patient-delete.component.html',
  styleUrls: ['./patient-delete.component.css']
})
export class PatientDeleteComponent implements OnInit {
  constructor(private modalService: NgbModal, public dialogRef: MatDialogRef<PatientDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private patientService:PatientService,public authservice:AuthService,private router:Router /*, private toastr:ToastrService*/) { 

  }

  

  ngOnInit(): void {
    console.log(this.data);// se puede agregar "," y otros parametros
    this.dialogRef.updatePosition({top:"50px"});
    
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
}

  btnEliminarPaciente(){
    this.patientService.deletePatient2(this.data.doctor, this.data.data.id);
    this.dialogRef.close();
    
    
  }
}
