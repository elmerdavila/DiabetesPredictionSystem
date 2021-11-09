import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public goNewExam(){
    this.router.navigate(['/administracion/nuevoExamen'])
  }

}
