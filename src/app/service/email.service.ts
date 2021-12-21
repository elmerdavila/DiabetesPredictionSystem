import { Injectable,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Email } from '../models/Email';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService implements OnInit {

  constructor(private http:HttpClient) { }
  ngOnInit() {
  }
  url:string="https://saludsoft.herokuapp.com/correo/";

  enviarEmail(email:Email):Observable<any>{
    let rutacrear=this.url+"send/";
    return this.http.post<Email>(rutacrear,email);
  }

}


