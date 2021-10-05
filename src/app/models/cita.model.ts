export class Cita {
    id: number;
    motivoCita: string;
    fechaHora: string;
    medico: number;
    paciente: number;
    
    constructor() {
        this.id = 0;
        this.motivoCita = "";
        this.fechaHora = "";
        this.medico = 0;
        this.paciente = 0;
      }
  }