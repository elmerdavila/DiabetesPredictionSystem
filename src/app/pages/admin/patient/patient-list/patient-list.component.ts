import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Patient } from 'src/app/models/Patient.interface';
import { PatientService } from 'src/app/service/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientUpdateComponent } from '../patient-update/patient-update.component';
import { PatientDeleteComponent } from '../patient-delete/patient-delete.component';
import { AuthService } from 'src/app/service/auth.service';
import { PatientCreateComponent } from '../patient-create/patient-create.component';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public headers:string[] = ["nombre", "correo","direccion", "edad","genero","celular","acciones"];
  public pacientes:Patient[]=[];
  public dataSource= new MatTableDataSource();

  email:string = 'Administrador'

  constructor(
    private router:Router, 
    private patientServie:PatientService,
    public dialog: MatDialog,
    public authservice:AuthService
    ) { 
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
    this.listarPacientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public listarPacientes(){
    this.patientServie.getPatients2(this.email) //modificado
    //this.patientServie.getPatients() //modificado
      .subscribe
      (
        (response) =>{
          //console.log(response)
          this.pacientes= (response as any);
          //console.log(this.pacientes)
          this.dataSource = new MatTableDataSource(this.pacientes);
          this.ngAfterViewInit();
        },
        (error) =>{
          console.log("error"+ error);
        }
      )
  }

  public goNewPatient(){
    const dialogRef = this.dialog.open(PatientCreateComponent, {
      width: '45%', 
      
    });
    dialogRef.afterClosed().subscribe(result => {
  
    });
  }
  
  public goUpdatePatient(patient:Patient){
    const dialogRef = this.dialog.open(PatientUpdateComponent, {
      //width: '61%', 
      data: {data: patient},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPacientes();
    });
  }
  
  public goToPatientDelete(patient:Patient){
    const dialogRef = this.dialog.open(PatientDeleteComponent, {
      //width: '61%', 
      data: {data: patient},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPacientes();
    });
  }

  public goToViewPatient(patient:Patient){
    this.router.navigate(['/administracion/listaExamenes',patient]);
  }
}
