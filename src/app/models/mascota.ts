export class Mascota {
    ID:number = 0;
    Nombre:string = "";
    FechaNacimiento:Date| null = new Date();
    Observaciones:string = "";
    SoporteEmocional:boolean = false;
    Lazarillo:boolean = false;
    Activo:boolean = true;
    IDTipo:number = 0;
}