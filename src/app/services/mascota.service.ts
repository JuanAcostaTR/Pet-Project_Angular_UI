import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Mascota } from '../models/mascota';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  baseURL = environment.webapiURL;
  constructor(private http:HttpClient) { }

  //url:string = "https://localhost:44380/api/Mascota";//enviroment 

  getMascota(){
    var List = this.http.get(this.baseURL);
    console.log(List);
    return List;
  }

  addMascota(mascota:Mascota):Observable<Mascota>{
    return this.http.post<Mascota>(this.baseURL, mascota);
  }

  updateMascota(id:number, mascota:Mascota):Observable<Mascota>{
    return this.http.put<Mascota>(this.baseURL + `/${id}`, mascota);
  }

  deleteMascota(id:number){
    return this.http.delete(this.baseURL + `/${id}`);
  }
}
