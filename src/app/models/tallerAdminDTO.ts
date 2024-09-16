import { ClaseVehiculoDTO } from './claseVehiculoDTO';
import { MarcaVehiculoDTO } from './marcaVehiculoDTO';
import { SubtipoVehiculoDTO } from './subtipoVehiculoDTO';

export class TallerAdminDTO {
    id?: number;
    oficina?: string;
    ciudad?: string;
    ciudadID?: number;
    estado?: string;
    nombre?: string;
    nit?: string;
    direccion?: string;
    telefono?: string;
    horariosAtencion?: string;
    latitud?: string;
    longitud?: string;
    codigoProveedor?: number;
    nombreContacto?: string;
    observacion?: string;
    user?: string;
    clasesVehiculos?: ClaseVehiculoDTO[];
    subtiposVehiculo?: SubtipoVehiculoDTO[];
    marcas?: MarcaVehiculoDTO[];
}