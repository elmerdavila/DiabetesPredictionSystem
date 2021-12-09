import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Exam } from '../models/Exam.interface';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
  })
  export class ExamService {  
    constructor(
      private angularfirestore: AngularFirestore) {     
     }
    public getExams(doctorId:string,pacienteId:string):Observable<any>{
      var examCollection_ =  this.angularfirestore.collection('Doctores').doc(doctorId).collection('Pacientes').doc(pacienteId).collection('Examenes');
      return examCollection_.snapshotChanges().pipe(
        map(actions => actions.map(a => a.payload.doc.data() as Exam))
      )  
    }
    
}