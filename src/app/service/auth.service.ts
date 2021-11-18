import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase  from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : AngularFireAuth,
    private router:Router) {
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
  googleAuth(){
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());    
  }
  devolverUsuario(){
    return this.auth.currentUser;
  }

}
