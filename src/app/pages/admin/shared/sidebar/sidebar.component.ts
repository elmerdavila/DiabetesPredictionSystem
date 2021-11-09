import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public goPatients(){
    this.router.navigate(['/administracion/pacientes'])
  }
  public goExams(){
    this.router.navigate(['/administracion/listaExamenes'])
  }

}
