export class Paciente {
    id: number;
    nombre: string;
    apellidos: string;
    clave: string;
    nickUsuario: string;
    nss: string
    numTarjeta: string
    direccion: string
    telefono: string
    
    constructor() {
        this.id = 0;
        this.nombre = "";
        this.apellidos = "";
        this.clave = "";
        this.nickUsuario = "";
        this.nss = "";
        this.numTarjeta = "";
        this.direccion = "";
        this.telefono = "";
      }
  }