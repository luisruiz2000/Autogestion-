import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../shared/modales/modal-generico/modal-generico.component';
import { ICO_ALERTA_NARANJA_PNG, ICONO_ERROR, ICONO_EXITO } from '../shared/constantes';
import { Boton } from '../models/boton';
import { NavegadoresPermitidosComponent } from '../shared/navegadores-permitidos/navegadores-permitidos.component';
import { RedireccionAppComponent } from '../shared/redireccion-app/redireccion-app.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public dialog: MatDialog
  ) { }

  modalErrror(msj: string, ancho: string, alto: string): MatDialogRef<any> {
    let botones: Boton[] = [];
    return this.dialog.open(ModalGenericoComponent, {
      width: ancho,
      height: alto,
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: 'Error',
        claseTitulo: 'mat-dialog-title-error',
        icono: ICONO_ERROR,
        subtitulo: '',
        html: '',
        claseSubtitulo: 'mat-dialog-subtitle-error',
        contenido: msj,
        botones: botones
      },
      autoFocus: false
    });
  }

  modalExito(tit: string, msj: string, ancho: string, alto: string): MatDialogRef<any> {
    let botones: Boton[] = [];
    return this.dialog.open(ModalGenericoComponent, {
      width: ancho,
      height: alto,
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: tit,
        claseTitulo: '',
        icono: ICONO_EXITO,
        subtitulo: '',
        html: '',
        claseSubtitulo: 'mat-dialog-subtitle',
        contenido: msj,
        botones: botones
      },
      autoFocus: false
    });
  }
  modalHtml(titulo: string, htmlCuerpo: string, claseTitulo: string, ancho: string, alto: string, botones: Boton[], claseBotones: string): MatDialogRef<any> {
    let botonesAux: Boton[] = [];
    if (botones && botones.length > 0) {
      botonesAux = botones;
    }
    return this.dialog.open(ModalGenericoComponent, {
      width: ancho,
      height: alto,
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: titulo,
        claseTitulo: claseTitulo,
        icono: '',
        subtitulo: '',
        html: htmlCuerpo,
        claseSubtitulo: '',
        contenido: '',
        botones: botonesAux,
        claseBotones: claseBotones,
        // botonCancelar: 'Cancelar',
        // botonAceptar: 'Aceptar'
      },
      autoFocus: false
    });
  }

  modalConfirm(tit: string, msj: string, ancho: string, alto: string, botones: Boton[]): MatDialogRef<any> {
    return this.dialog.open(ModalGenericoComponent, {
      width: ancho,
      height: alto,
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: tit,
        claseTitulo: '',
        subtitulo: '',
        icono: '',
        html: '',
        claseSubtitulo: 'mat-dialog-subtitle',
        contenido: msj,
        botones: botones
      },
      autoFocus: false
    });
  }

  modalConfirmDelete(tit: string, msj: string, claseTit: string, ico: string, ancho: string, alto: string, botones: Boton[]): MatDialogRef<any> {
    return this.dialog.open(ModalGenericoComponent, {
      width: ancho,
      height: alto,
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: tit,
        claseTitulo: claseTit,
        subtitulo: '',
        icono: ico,
        html: msj,
        claseSubtitulo: 'mat-dialog-subtitle',
        contenido: '',
        botones: botones
      },
      autoFocus: false
    });
  }

  modalWarning(tit: string, msj: string, html: string, ancho: string, alto: string): MatDialogRef<any> {
    let botones: Boton[] = [];
    return this.dialog.open(ModalGenericoComponent, {
      width: ancho,
      height: alto,
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: tit,
        claseTitulo: 'mat-dialog-title-warning',
        icono: ICO_ALERTA_NARANJA_PNG,
        subtitulo: '',
        html: html,
        claseSubtitulo: 'mat-dialog-subtitle',
        contenido: msj,
        botones: botones
      },
      autoFocus: false
    });
  }

  modalNavegadores(): MatDialogRef<any> {
    return this.dialog.open(NavegadoresPermitidosComponent, {      
        panelClass: 'mat-dialog-general-navegadores',
        autoFocus: false
      });
  }

  modalRedireccionApp(): MatDialogRef<any> {
    return this.dialog.open(RedireccionAppComponent, {      
        panelClass: 'mat-dialog-general-redirect',
        autoFocus: false
      });
  }

}