import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Patient } from 'src/app/models/Patient.interface';
import { PatientService } from 'src/app/service/patient.service';


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

  constructor(private router:Router, private patientServie:PatientService) { }

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
    this.patientServie.getPatients()
      .subscribe
      (
        (response) =>{
          console.log(response)
          this.pacientes= (response as any);
          console.log(this.pacientes)
          this.dataSource = new MatTableDataSource(this.pacientes);
          this.ngAfterViewInit();
        },
        (error) =>{
          console.log("error"+ error);
        }
      )
  }

  public goNewPatient(){
    this.router.navigate(['/administracion/nuevoPaciente'])
  }
}
