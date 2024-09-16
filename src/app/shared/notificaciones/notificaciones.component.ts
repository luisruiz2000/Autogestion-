import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { UtilService } from "../../services/util.service";
import { NotificacionesService } from "../../services/notificaciones.service";
import { CommonModule } from '@angular/common';

import {
  ESTADO_NOTIFICACION_LEIDA, ESTADO_NOTIFICACION_SIN_LEER,
  ICO_NOTIFICACION_ASISTENCIA,
  ICO_NOTIFICACION_CUENTA,
  ICO_NOTIFICACION_HOGAR,
  ICO_NOTIFICACION_PQRS,
  ICO_NOTIFICACION_SINIESTRO, ICO_NOTIFICACION_VEHICULOS, TIEMPO_ACTUALIZACION_NOTIFICACIONES,
  TIPO_NOTIFICACION_ASISTENCIA,
  TIPO_NOTIFICACION_CUENTA,
  TIPO_NOTIFICACION_HOGAR,
  TIPO_NOTIFICACION_PQRS,
  TIPO_NOTIFICACION_SINIESTRO,
  TIPO_NOTIFICACION_VEHICULOS,
  ICO_TRASH, ESTADO_NOTIFICACION_ELIMINADA,
  URL_NOTIFICACIONES
} from "../constantes";
import { ModalService } from "../../services/modal.service";

import { Router } from '@angular/router';
//import { NotificacionesMainComponent } from 'src/app/components/notificaciones-main/notificaciones-main.component';
import { NotificacionDTO } from '../../models/notificacionDTO';
import { Boton } from '../../models/boton';
import { NotificacionesMainComponent } from '../../components/notificaciones-main/notificaciones-main.component';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
  imports:[CommonModule]
})
export class NotificacionesComponent implements OnInit {
  solicitudNotificaciones: any;
  mostrar: boolean = false;
  mostrarBotonBasura: boolean = false;
  mostrarLink: boolean = true;
  sinNotificaciones: boolean = false;
  notificationsList: NotificacionDTO[] = [];
  imgNotificacion!: string;
  tituloTipo!: string;
  timeLeft: number = TIEMPO_ACTUALIZACION_NOTIFICACIONES;
  interval: string | number | NodeJS.Timeout | undefined;
  icoTrash = ICO_TRASH;
  b1 = new Boton('Cancelar', 'cancelar');
  b2 = new Boton('Ok', 'ok');
  botones: Boton[] = [this.b1, this.b2];
  notificacionSeleccionada!: number;
  @ViewChild('containerNotificaciones') containerNotificaciones!: ElementRef;
  notificacionesPrincipal!: NotificacionesMainComponent;
  calcularComponente!: boolean;

  constructor(
    private notificacionesService: NotificacionesService,
    private utilService: UtilService,
    private modalService: ModalService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.notificacionesService.getShowObservable().subscribe(
      respuesta => {
        this.mostrar = respuesta;
      }
    );
  }


  @HostListener('click')
  clickInside() {
    this.notificacionesService.showNotificacionSource.next(true);
  }

  showNotifications(user: any) {
    if(this.mostrar) this.mostrar=false;
    else this.mostrar=true;
    //this.mostrar = true;
    this.solicitudNotificaciones = user;
    this.consultarNotificaciones(user);
    this.startTimer();
  }
  closeNotifications() {
    console.log("Mostrar=>",this.mostrar)
    this.mostrar = false;
    console.log("Mostrar=>",this.mostrar)
    
  }

  startTimer() {
    if (this.mostrar) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.interval);
          this.timeLeft = TIEMPO_ACTUALIZACION_NOTIFICACIONES;
          let solicitudActualizacion: any = {};
          solicitudActualizacion.tipoDocumento = this.solicitudNotificaciones.tipoDocumento;
          solicitudActualizacion.numeroDocumento = this.solicitudNotificaciones.numeroDocumento;
          solicitudActualizacion.ids = '';
          solicitudActualizacion.estado = ESTADO_NOTIFICACION_LEIDA;

          if (this.notificationsList && this.notificationsList.length > 0 && this.notificationsList.length > 10) {
            let listAuxNotificacionDTO: Array<NotificacionDTO> = this.notificationsList.slice(0, 10);
            solicitudActualizacion.ids = this.extraerIds(listAuxNotificacionDTO);
            this.actualizarEstadoNotificaciones(solicitudActualizacion);
          } else if (this.notificationsList && this.notificationsList.length > 0) {
            solicitudActualizacion.ids = this.extraerIds(this.notificationsList);
            this.actualizarEstadoNotificaciones(solicitudActualizacion);
          }
        }
      }, 1000)
    }
  }

  extraerIds(listaNotificaciones: Array<NotificacionDTO>): string {
    let ids = '';
    listaNotificaciones.forEach((notificacion: NotificacionDTO) => {
      if (notificacion.estadoNotificacion == ESTADO_NOTIFICACION_SIN_LEER) {
        ids += `${notificacion.notificacionID},`;
      }
    });
    ids = ids.substring(0, ids.length - 1);
    return ids;

  }

  consultarNotificaciones(user: any): void {
    console.log("consultarNotificaciones->" + user);
    this.notificacionesService.listNotifications(user).subscribe(
      respuesta => {
        if (respuesta.success == true) {
          this.notificationsList = respuesta.data.notificaciones;
          this.sinNotificaciones = this.notificationsList.length > 0 ? false : true;
        }
        this.calcularUbicacionNotificaciones();
      }
    );

  }

  validarClase(notificacion: NotificacionDTO): string {
    switch (notificacion.codigoNotificacion) {
      case TIPO_NOTIFICACION_ASISTENCIA: {
        this.imgNotificacion = ICO_NOTIFICACION_ASISTENCIA;
        this.tituloTipo = 'Asistencia';
        return 'not-asistencia';
      }
      case TIPO_NOTIFICACION_CUENTA: {
        this.imgNotificacion = ICO_NOTIFICACION_CUENTA;
        this.tituloTipo = 'Cuenta';
        return 'not-cuenta';
      }
      case TIPO_NOTIFICACION_HOGAR: {
        this.imgNotificacion = ICO_NOTIFICACION_HOGAR;
        this.tituloTipo = 'Hogar';
        return 'not-hogar'
      }
      case TIPO_NOTIFICACION_SINIESTRO: {
        if (notificacion!.tituloNotificacion!.toUpperCase().includes('SINIESTRO')) {
          this.resaltarTexto(notificacion, 'vehículo');
        } else {
          this.resaltarTexto(notificacion, 'placa');
        }

        this.imgNotificacion = ICO_NOTIFICACION_SINIESTRO;
        this.tituloTipo = 'Siniestros';
        return 'not-siniestro';
      }
      case TIPO_NOTIFICACION_PQRS: {
        this.imgNotificacion = ICO_NOTIFICACION_PQRS;
        this.tituloTipo = 'PQR\'S';
        return 'not-pqrs';
      }
      case TIPO_NOTIFICACION_VEHICULOS: {
        this.resaltarTexto(notificacion, 'placas');
        this.imgNotificacion = ICO_NOTIFICACION_VEHICULOS;
        this.tituloTipo = 'Vehículos';
        return 'not-vehiculos';
      }
    }
    return '';
  }

  actualizarEstadoNotificaciones(solicitud: any) {
    if (solicitud.ids && !solicitud.ids.empty) {
      this.notificacionesService.updateNotificaciones(solicitud).subscribe(respuesta => {
        if (respuesta && respuesta.success == true) {
          this.consultarNotificaciones(this.solicitudNotificaciones);
          this.utilService.getCountNotifications(this.solicitudNotificaciones);
        }
      });
    }
  }

  eliminarNotificacion(notificacion: NotificacionDTO) {


    let solicitudActualizacion: any = {};
    solicitudActualizacion.tipoDocumento = this.solicitudNotificaciones.tipoDocumento;
    solicitudActualizacion.numeroDocumento = this.solicitudNotificaciones.numeroDocumento;
    solicitudActualizacion.ids = notificacion.notificacionID;
    solicitudActualizacion.estado = ESTADO_NOTIFICACION_ELIMINADA;
    let cuerpoMsj = `La notificación eliminada no se podrá<br/>recuperar. ¿Deseas eliminarla?`;
    let modal = this.modalService.modalConfirmDelete('Eliminar notificación', cuerpoMsj, 'confirmar-delete', '', '30em', '', this.botones);
    modal.afterClosed().subscribe(
      respuesta => {
        if (respuesta == 'ok') {
          this.actualizarEstadoNotificaciones(solicitudActualizacion);
          this.notificacionSeleccionada = 0;
        } else {
          return;
        }
      }
    );

  }

  activarEliminar(notificacion: NotificacionDTO): any {
    this.mostrarBotonBasura = true;
    this.notificacionSeleccionada = notificacion!.notificacionID || 0;
  }

  private resaltarTexto(notificacion: NotificacionDTO, wordIndex: string) {
    let descripcion = notificacion.descripcion;
    let aux = descripcion!.split(' ');
    let indexAux = aux.indexOf(wordIndex);
    let inicioSpan = '<span class="resaltado">';
    let cierreSpan = '</span>';
    let newDescripcion = '';
    if (indexAux && !notificacion.corregido) {
      indexAux += 1;
      aux[indexAux] = `${inicioSpan}${aux[indexAux]}${cierreSpan}`;
      aux.forEach(
        word => {
          newDescripcion += `${word} `;
        }
      );
      notificacion.corregido = true;
      notificacion.descripcion = newDescripcion;
    }


  }

  goToNotificaciones() {
    this.router.navigate([URL_NOTIFICACIONES]);
  }

  private calcularUbicacionNotificaciones() {
    let positionNotificacionCalc = 0;
    let campanaElement = document.getElementById('campana');
    let contenedorNombrePerfil = document.getElementById('contenedorNombrePerfil');
    let containerNotificaciones = document.getElementById('containerNotificaciones');
    if (campanaElement && contenedorNombrePerfil) {
      positionNotificacionCalc = ((contenedorNombrePerfil.clientWidth) / 16) + 1;
    }
    if (containerNotificaciones) {
      containerNotificaciones.style.right = `${positionNotificacionCalc}em`;
    }
  }
}
