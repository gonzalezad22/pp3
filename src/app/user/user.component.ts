import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  url: string = "http://127.0.0.1:5000/users/"
  usuario: Usuario;

  constructor (public http: HttpClient, private aRoute: ActivatedRoute) {
    this.usuario = new Usuario();
    this.aRoute.queryParams.subscribe(params => {
      if (params['id'] != null){
        this.getUser(params['id']);
      }

    });

  }

  getUser(id: number){
    this.http.get<Usuario>(this.url + id).subscribe(
      response => { this.usuario = response; }
    )
  }

  getDatos(){
    if (this.usuario.id === null) {
      this.http.post(this.url,this.usuario).subscribe(
        response => {
          console.log('respuesta: ', response);
          }
        )
    } else {
      this.http.put(this.url,this.usuario).subscribe(
        response => {
          console.log('respuesta: ', response);
          }
        )
    }
    
  }
}