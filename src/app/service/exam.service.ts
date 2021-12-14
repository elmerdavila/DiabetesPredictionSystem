import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Exam } from '../models/Exam.interface';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/Patient.interface';


@Injectable({
    providedIn: 'root'
  })
  export class ExamService {  
    private urlGenerarResultados="https://saludsoft.herokuapp.com/predict/";
    private examsCollection: AngularFirestoreCollection<Patient>
    private doctorId:string;

    constructor(private angularfirestore: AngularFirestore, private httpClient:HttpClient, private auth : AngularFireAuth) {   
      this.auth.currentUser.then(data =>{
        this.doctorId = data.email;
        
      });    
      
    }
    
    public getExams(doctorId:string,pacienteId:string):Observable<any>{
      var examCollection_ =  this.angularfirestore.collection('Doctores').doc(doctorId).collection('Pacientes').doc(pacienteId).collection('Examenes');
      return examCollection_.snapshotChanges().pipe(
        map(actions => actions.map(a => a.payload.doc.data() as Exam))
      )  
    }

    public createExam(exam:Exam,id_paciente:string):Promise<void>{
      this.examsCollection = this.angularfirestore.collection('Doctores').doc(this.doctorId).collection('Pacientes');
      return new Promise( async (resolve,reject) => {
        try{
           const id = this.angularfirestore.createId();
           const data = {id, ... exam};
           const result= await this.examsCollection.doc(id_paciente).collection('Examenes').doc(id).set(data);
           resolve(result);
        }
        catch(error){
          reject(error.mesaje)
        }
      });
    }

    public generarResultados(exam:Exam):Observable<any>{
      return this.httpClient.post<Exam>(this.urlGenerarResultados,exam);
    }

    public deleteExam(exam:Exam,id_paciente:string){
    
      let collectionPatients = this.angularfirestore.collection('Doctores').doc(this.doctorId).collection('Pacientes').doc(id_paciente).collection('Examenes');
      
      return new Promise (async (resolve, reject) => {
      try{
         const result = await collectionPatients.doc(exam.id).delete();
      }
      catch(error){
         reject(error.message)
      }
    });
    }
    
}