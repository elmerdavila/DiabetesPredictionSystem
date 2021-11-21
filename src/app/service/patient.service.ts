import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient.interface';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsCollection: AngularFirestoreCollection<Patient>
  private patients: Observable<Patient[]>;
  private doctorId:string;

  constructor(
    private angularfirestore: AngularFirestore,
    private auth : AngularFireAuth) {

    this.auth.currentUser.then(data =>{
      if (data != null ){
        this.doctorId = data.email;
      }else{
        this.doctorId = 'ngz85tizFRqLtfXyKfc9';
      }        
    });    
    this.patientsCollection = angularfirestore.collection('Doctores').doc(this.doctorId).collection('Pacientes');
    this.getPatients();
   }

   public deletePatient(patientId:string):Promise<void>{
     return new Promise (async (resolve, reject) => {
       try{
          const result = await this.patientsCollection.doc(patientId).delete();
       }
       catch(error){
          reject(error.message)
       }
     });
   }

   public createPatient(patient:Patient, patientId:string):Promise<void>{
     return new Promise( async (resolve,reject) => {
       try{
          const id = patientId || this.angularfirestore.createId();
          const data = {id, ... patient};
          const result= await this.patientsCollection.doc(id).set(data);
          resolve(result);
       }
       catch(error){
         reject(error.mesaje)
       }
     });
   }

   public UpdatePatient(patient:Patient, patientId:string):Promise<void>{
    return new Promise( async (resolve,reject) => {
      try{
         const id = patientId || this.angularfirestore.createId();
         const data = {id, ... patient};
         const result= await this.patientsCollection.doc(id).set(data);
         resolve(result);
      }
      catch(error){
        reject(error.mesaje)
      }
    });
  }
  public getPatients():Observable<any>{    
    return this.patientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Patient))
    )  
  }
  public getPatients2(doctorId:string):Observable<any>{
    var patientsCollection_ =  this.angularfirestore.collection('Doctores').doc(doctorId).collection('Pacientes');
    return patientsCollection_.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Patient))
    )  
  }
  public createPatient2(doctorId:string,patient:Patient, patientId:string):Promise<void>{
    var patientsCollection_ =  this.angularfirestore.collection('Doctores').doc(doctorId).collection('Pacientes');
    return new Promise( async (resolve,reject) => {
      try{
         const id = patientId || this.angularfirestore.createId();
         const data = {id, ... patient};
         const result= await patientsCollection_.doc(id).set(data);
         resolve(result);
      }
      catch(error){
        reject(error.mesaje)
      }
    });
  }
  public deletePatient2(doctorId:string, patientId:string):Promise<void>{
    var patientsCollection_ =  this.angularfirestore.collection('Doctores').doc(doctorId).collection('Pacientes');
    return new Promise (async (resolve, reject) => {
      try{
         const result = await patientsCollection_.doc(patientId).delete();
      }
      catch(error){
         reject(error.message)
      }
    });
  }
  public UpdatePatient2(doctorId:string, patient:Patient, patientId:string):Promise<void>{
    var patientsCollection_ =  this.angularfirestore.collection('Doctores').doc(doctorId).collection('Pacientes');
    return new Promise( async (resolve,reject) => {
      try{
         const id = patientId || this.angularfirestore.createId();
         const data = {id, ... patient};
         const result= await patientsCollection_.doc(id).set(data);
         resolve(result);
      }
      catch(error){
        reject(error.mesaje)
      }
    });
  }




}
