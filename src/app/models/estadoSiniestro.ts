import {SeguimientoReparacionDTO} from "./seguimientoReparacionDTO";

export class EstadoSiniestro {

  placa?: string;
  estado?: string;
  fecha?: string;
  siniestroID?: number;
  codigo?: string;
  numeroRadicado?: number;
  documentosFaltantes?: string[];
  seguimientoReparacionDTO?: SeguimientoReparacionDTO;
  linkRedireccion?: string;
}
