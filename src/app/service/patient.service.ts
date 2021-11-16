import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsCollection: AngularFirestoreCollection<Patient>
  private patients: Observable<Patient[]>;

  constructor(private readonly angularfirestore: AngularFirestore) {
    this.patientsCollection = angularfirestore.collection('Doctores').doc('ngz85tizFRqLtfXyKfc9').collection('Pacientes');
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

   public getPatients():Observable<any>{
     return this.patientsCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => a.payload.doc.data() as Patient))
     )

  
   }


}
