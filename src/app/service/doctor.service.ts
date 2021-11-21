import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient.interface';
import { map } from 'rxjs/operators'
import { Doctor } from '../models/Doctor.interface';


@Injectable({
    providedIn: 'root'
  })
  export class DoctorService {
  
    private doctorsCollection: AngularFirestoreCollection<Doctor>
    private doctor: Observable<Patient[]>;
  
    constructor(private angularfirestore: AngularFirestore) {
      this.doctorsCollection = angularfirestore.collection('Doctores');
    }
    public createDoctor(doctorEmail:string):Promise<void>{
        return new Promise( async (resolve,reject) => {
          try{
             const data = {};
             const result= await this.doctorsCollection.doc(doctorEmail).set(data);
             resolve(result);
          }
          catch(error){
            reject(error.mesaje)
          }
        });
      }

}