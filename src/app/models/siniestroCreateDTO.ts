export class SiniestroCreateDTO{
  siniestroID?: number;
  usuarioID?: number;
  fecha?: string;
  desEvento?: string;
  descripcionDano?: string;
  departamento?: string;
  municipio?: string;
  direccion?: string;
  // = si es asegurado, los que llena si no
  nombreConductor?: string;
  tipoDocumento?: string;
  numDocumento?: string;
  edadConductor?: number;
  generoConductor?: string;
  siniestroAsegurado?: boolean;
  placa?: string;
  marca?: string;
  // Persona Registrada
  nombreContacto?: string;
  apellidosContacto?: string;
  tipoDocContacto?: string;
  docContacto?: string;
  emailContacto?: string;
  numCelular?: string;
  dirContacto?: string;
  seleccionTaller?: string;
  tallerID?: number;
  nombreTomador?: string;
  codigoTomador?: string;
}
