import { Component, OnInit } from '@angular/core';
import { Mascota } from '../models/mascota';
import { MascotaService } from '../services/mascota.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maincomponent',
  templateUrl: './maincomponent.component.html',
  styleUrls: ['./maincomponent.component.css']
})
export class MaincomponentComponent implements OnInit {

  FechaNacimientoModel: NgbDateStruct ;
  mascota:Mascota = new Mascota();
  datatable:any = [];
  tipoMascota:{ [key: string]: string } = {1: "Perro", 2: "Gato"};
 
  constructor(private mascotaService:MascotaService){
    var today = new Date();
    this.FechaNacimientoModel = { 
      day: today.getDate(), 
      month: today.getUTCMonth() + 1, 
      year: today.getUTCFullYear()};
  }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.mascotaService.getMascota().subscribe(res => {
      this.datatable = res;
      console.log(res);
    });
  }

  onAddMascota(mascota:Mascota):void{
    if(!mascota.Nombre || !mascota.IDTipo){
      alert('Por favor complete los datos basicos');
      return;
    }
    this.mascotaService.addMascota(mascota).subscribe(res => {
      if(res){
        alert(`La mascota ${mascota.Nombre} se ha registrado con exito!`);
        this.clear();
        this.onDataTable();
      } else {
        alert('Error! :(')
      }
    });
  }

  onUpdateMascota(mascota:Mascota):void{
    this.mascotaService.updateMascota(mascota.ID, mascota).subscribe(res => {
      if(res){
        alert(`La mascota número ${mascota.ID} se ha modificado con exito!`);
        this.clear();
        this.onDataTable();
      } else {
        alert('Error! :(')
      }
    });
  }

  onDeleteMascota(id:number):void{
    this.mascotaService.deleteMascota(id).subscribe(res => {
      if(res){
        alert(`La mascota número ${id} se ha eliminado con exito!`);
        this.clear();
        this.onDataTable();
      } else {
        alert('Error! :(')
      }
    });
  }

  onSetData(select:any){
    this.mascota.ID = select.ID;
    this.mascota.Nombre = select.Nombre;
    this.mascota.FechaNacimiento = select.FechaNacimiento;
    this.mascota.Observaciones = select.Observaciones;
    this.mascota.IDTipo = select.IDTipo;
    this.mascota.SoporteEmocional = select.SoporteEmocional;
    this.mascota.Lazarillo = select.Lazarillo;
  }

  clear(){
    this.mascota.ID = 0;
    this.mascota.Nombre = "";
    this.mascota.FechaNacimiento = new Date();
    this.mascota.Observaciones = "";
    this.mascota.Lazarillo = false;
    this.mascota.SoporteEmocional = false;
    this.mascota.IDTipo = 0;
  }

  onFechaNacimientoChange(){
    this.mascota.FechaNacimiento = 
      new Date(this.FechaNacimientoModel.year, this.FechaNacimientoModel.month, this.FechaNacimientoModel.day);
  }

  onDropdownTipoMascotaChange(value:string){
    this.mascota.IDTipo = parseInt(value);
  }

  onLazarilloChanged(){
    if(this.mascota.Lazarillo){
      this.mascota.SoporteEmocional = false;
    }
  }

  onSoporteEmocionalChanged(){
    if(this.mascota.SoporteEmocional){
      this.mascota.Lazarillo = false;
    }
  }
}
