import { Boton } from './boton';

export class ModalGenerico {
    botonCerrar?: boolean;
    titulo?: string;
    claseTitulo?: string;
    icono?: string;
    subtitulo?: string;
    claseSubtitulo?: string;
    contenido?: string;
    botones?: Boton[];
    // botonCancelar: string;
    // botonAceptar: string;
    html?: string;
    claseBotones?: string;
  }
