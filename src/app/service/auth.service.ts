import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { logging } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : AngularFireAuth) {
    auth.authState.subscribe(user =>{
      console.log(user);
    })
   }
  login(user:string , pass:string){
    return this.auth.signInWithEmailAndPassword(user,pass);
  }
  logOut(){
    return this.auth.signOut();
  }
  registrar(user:string , pass:string){
    return this.auth.createUserWithEmailAndPassword(user,pass);
  }
  verificarCorreo(){
    this.auth.currentUser.then(
      user =>{
        if(user){
          user.sendEmailVerification();
        }
      }
    )
  }
}
