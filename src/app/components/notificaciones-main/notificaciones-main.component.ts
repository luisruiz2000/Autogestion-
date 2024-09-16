import { Component, OnInit } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Boton } from '../../models/boton';
import {
  ESTADO_NOTIFICACION_ELIMINADA,
  ICONO_ERROR,
  ICON_FLECHA_RETORNO,
  ICO_FILTRAR,
  ICO_NOTIFICACION_ASISTENCIA,
  ICO_NOTIFICACION_CUENTA,
  ICO_NOTIFICACION_HOGAR,
  ICO_NOTIFICACION_PQRS,
  ICO_NOTIFICACION_SINIESTRO,
  ICO_NOTIFICACION_VEHICULOS,
  ICO_TRASH,
  ICO_VOLVER,
  LOCALSTORAGE_USUARIO,
  TIPO_NOTIFICACION_ASISTENCIA,
  TIPO_NOTIFICACION_CUENTA,
  TIPO_NOTIFICACION_HOGAR,
  TIPO_NOTIFICACION_PQRS,
  TIPO_NOTIFICACION_SINIESTRO,
  TIPO_NOTIFICACION_VEHICULOS,
} from '../../shared/constantes';
import { UtilService } from '../../services/util.service';
import { NotificacionDTO } from '../../models/notificacionDTO';
import { NotificacionesService } from '../../services/notificaciones.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-notificaciones-main',
  templateUrl: './notificaciones-main.component.html',
  styleUrls: ['./notificaciones-main.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    NgxPaginationModule,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
})
export class NotificacionesMainComponent implements OnInit {
  solicitudNotificaciones: any;
  notificationsList: NotificacionDTO[] = [];
  sinNotificaciones: boolean = false;
  mostrarPaginado: boolean = false;
  usuario = new Usuario();
  public cantidadNotificaciones: number = 0;
  iconoVolver = ICO_VOLVER;
  btnFiltrar = ICO_FILTRAR;
  icoTrash = ICO_TRASH;
  icoError = ICONO_ERROR;
  iconoFlechaRetorno = ICON_FLECHA_RETORNO;
  imgNotificacion?: string;
  tituloTipo?: string;
  page: number = 1;
  seleccionar: boolean = false;
  mostrarRecientes: boolean = true;
  mostrarBtnEliminar: boolean = true;
  checked: boolean = false;
  b1 = new Boton('Cancelar', 'cancelar');
  b2 = new Boton('Ok', 'ok');
  botones: Boton[] = [this.b1, this.b2];
  etiquetaSeleccionar = 'Seleccionar';
  habilitarBtnEliminar: boolean = false;

  opcionesFiltrado = new FormControl();
  listaOpcionesFitrado: any = [
    { tipo: 'Siniestros', codigo: 'SN', chequeado: false },
    { tipo: 'Cuenta', codigo: 'CN', chequeado: false },
    { tipo: "PQR'S", codigo: 'PQ', chequeado: false },
    { tipo: 'Asistencia', codigo: 'AS', chequeado: false },
    { tipo: 'Vehículos', codigo: 'VH', chequeado: false },
  ];

  collection = { count: 0, data: [] };
  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.collection.count,
  };

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Paginación',
    screenReaderPageLabel: 'pagina',
    screenReaderCurrentLabel: `estas en la pagina`,
  };

  notificacionesFiltradas?: NotificacionDTO[] = [];
  esconderFiltro?: boolean;

  constructor(
    private notificacionesService: NotificacionesService,
    private utilService: UtilService,
    private modalService: ModalService,
    //private toast: ToastrService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.esconderFiltro = false;
    const usuarioString = localStorage.getItem(LOCALSTORAGE_USUARIO);
    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      console.log('Usuario Notificaciones Main ->', usuario);
      this.usuario.tipoDocumento = usuario.tipoDoc;
      this.usuario.numeroDocumento = usuario.numDoc;
      this.usuario.email = usuario.email;
      console.log('This Usuario Notificaciones Main ->', this.usuario);
      // Now you can use the 'usuario' variable
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
    }

    this.getCountNotifications();
    this.consultarNotificaciones(this.solicitudNotificaciones);
    this.collection.count = this.notificationsList.length;
  }

  getCountNotifications(): void {
    let solicitudNotificaciones: any = {};
    solicitudNotificaciones.tipoDocumento = this.usuario.tipoDocumento;
    solicitudNotificaciones.numeroDocumento = this.usuario.numeroDocumento;
    solicitudNotificaciones.email = this.usuario.email;
    this.solicitudNotificaciones = solicitudNotificaciones;
    this.utilService.getCountNotifications(solicitudNotificaciones);
  }

  consultarNotificaciones(user: any): void {
    this.notificacionesService
      .listNotifications(user)
      .subscribe((respuesta) => {
        if (respuesta.success == true) {
          this.notificationsList = respuesta.data.notificaciones;
          this.notificacionesFiltradas = this.notificationsList;
          for (let i = 0; i < this.notificationsList.length; i++) {
            this.notificationsList[i].checked = false;
            this.notificationsList[i].mostrar = true;
          }
          this.sinNotificaciones =
            this.notificationsList.length > 0 ? false : true;
          this.mostrarPaginado =
            this.notificationsList.length > 10 ? true : false;
        }
      });
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
        return 'not-hogar';
      }
      case TIPO_NOTIFICACION_SINIESTRO: {
        if (
          notificacion.tituloNotificacion?.toUpperCase().includes('SINIESTRO')
        ) {
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
        this.tituloTipo = "PQR'S";
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

  onPageChange(event: any) {
    this.config.currentPage = event;
    if (this.config.currentPage > 1) {
      this.mostrarRecientes = false;
    }
    if (this.config.currentPage == 1) {
      this.mostrarRecientes = true;
    }
  }

  mostrarSeleccionar(): void {
    if (this.seleccionar == true) {
      if (this.etiquetaSeleccionar == 'Seleccionar todo') {
        for (let i = 0; i < this.notificationsList.length; i++) {
          this.notificationsList[i].checked = true;
        }
        this.etiquetaSeleccionar = 'Cancelar selección';
      } else {
        for (let i = 0; i < this.notificationsList.length; i++) {
          this.notificationsList[i].checked = false;
          this.seleccionar = false;
        }
        this.etiquetaSeleccionar = 'Seleccionar';
        this.mostrarBtnEliminar = true;
      }
    } else {
      this.etiquetaSeleccionar = 'Seleccionar todo';
      this.seleccionar = true;
      this.mostrarBtnEliminar = true;
    }
  }

  updateCheckedOption(notificacionID: any, event: any) {
    if (notificacionID !== null) {
      this.habilitarBtnEliminar = true;

      const something = notificacionID;
      this.notificacionesFiltradas!.find(
        (item: NotificacionDTO) => item!.notificacionID == something
      )!.checked = event.checked;
    }
  }

  validarEliminar() {
    if (
      this.notificacionesFiltradas!.find(
        (elemento: any) => elemento.checked == true
      )
    ) {
      this.eliminarNotificaciones();
    } else {
      /*this.toast.error('No puedes completar esta acción porque no has seleccionado ninguna notificación.', 'Eliminar notificaciones', {
        closeButton: true,
        titleClass: 'toast-tittle-error'
      });*/
      this._snackBar.open(
        'No puedes completar esta acción porque no has seleccionado ninguna notificación. Eliminar notificaciones',
        'X',
        {
          duration: 2000,
          panelClass: 'app-notification-success',
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
    }
  }

  eliminarNotificaciones() {
    let titulo = 'Eliminar notificaciones';
    let claseTitulo = 'confirmar-delete';
    let cuerpoMsj = `La notificación eliminada no se podrá<br/>recuperar. ¿Deseas eliminarla?`;
    let modal = this.modalService.modalConfirmDelete(
      titulo,
      cuerpoMsj,
      claseTitulo,
      'bi bi-x-circle-fill mb-3',
      '500px',
      '400px',
      this.botones
    );
    modal.afterClosed().subscribe((respuesta) => {
      if (respuesta == 'ok') {
        for (let i = 0; i < this.notificacionesFiltradas!.length; i++) {
          if (this.notificacionesFiltradas![i].checked === true) {
            this.eliminarNotificacion(this.notificacionesFiltradas![i]);
          }
        }
      } else {
        return;
      }
    });
  }

  eliminarNotificacion(notificacion: NotificacionDTO) {
    let solicitudActualizacion: any = {};
    solicitudActualizacion.tipoDocumento =
      this.solicitudNotificaciones.tipoDocumento;
    solicitudActualizacion.numeroDocumento =
      this.solicitudNotificaciones.numeroDocumento;
    solicitudActualizacion.ids = notificacion.notificacionID;
    solicitudActualizacion.estado = ESTADO_NOTIFICACION_ELIMINADA;
    this.actualizarEstadoNotificaciones(solicitudActualizacion);
  }

  actualizarEstadoNotificaciones(solicitud: any) {
    if (solicitud.ids && !solicitud.ids.empty) {
      this.notificacionesService
        .updateNotificaciones(solicitud)
        .subscribe((respuesta) => {
          if (respuesta && respuesta.success == true) {
            this.consultarNotificaciones(this.solicitudNotificaciones);
            this.utilService.getCountNotifications(
              this.solicitudNotificaciones
            );
          }
        });
    }
  }

  seleccionarFiltro(index: any, evento: any) {
    this.listaOpcionesFitrado[index].chequeado = evento.checked;
  }

  filtrar() {
    let contador = 0;
    for (let i = 0; i < this.notificationsList.length; i++) {
      this.notificationsList[i].mostrar = false;
    }

    for (let i = 0; i < this.listaOpcionesFitrado.length; i++) {
      if (this.listaOpcionesFitrado[i].chequeado) {
        for (let j = 0; j < this.notificationsList.length; j++) {
          if (
            this.listaOpcionesFitrado[i].codigo == 'SN' &&
            this.notificationsList[j].codigoNotificacion == 'SN'
          ) {
            this.notificationsList[j].mostrar = true;
          }
          if (
            this.listaOpcionesFitrado[i].codigo == 'CN' &&
            this.notificationsList[j].codigoNotificacion == 'CN'
          ) {
            this.notificationsList[j].mostrar = true;
          }
          if (
            this.listaOpcionesFitrado[i].codigo == 'PQ' &&
            this.notificationsList[j].codigoNotificacion == 'PQ'
          ) {
            this.notificationsList[j].mostrar = true;
          }
          if (
            this.listaOpcionesFitrado[i].codigo == 'AS' &&
            this.notificationsList[j].codigoNotificacion == 'AS'
          ) {
            this.notificationsList[j].mostrar = true;
          }
          if (
            this.listaOpcionesFitrado[i].codigo == 'VH' &&
            this.notificationsList[j].codigoNotificacion == 'VH'
          ) {
            this.notificationsList[j].mostrar = true;
          }
        }
      }
    }

    for (let i = 0; i < this.listaOpcionesFitrado.length; i++) {
      if (!this.listaOpcionesFitrado[i].chequeado) {
        contador++;
      }
    }

    if (contador == 5) {
      for (let i = 0; i < this.notificationsList.length; i++) {
        this.notificationsList[i].mostrar = true;
      }
    }
    this.notificacionesFiltradas = this.notificationsList.filter((s) => {
      return s.mostrar;
    });
    this.mostrarFiltros(true);
  }

  private resaltarTexto(notificacion: NotificacionDTO, wordIndex: string) {
    let descripcion = notificacion.descripcion;

    if (descripcion !== undefined) {
      // Your code here
      let aux = descripcion.split(' ');
      let indexAux = aux.indexOf(wordIndex);
      let inicioSpan = '<span class="resaltado">';
      let cierreSpan = '</span>';
      let newDescripcion = '';
      if (indexAux && !notificacion.corregido) {
        indexAux += 1;
        aux[indexAux] = `${inicioSpan}${aux[indexAux]}${cierreSpan}`;
        aux.forEach((word) => {
          newDescripcion += `${word} `;
        });
        notificacion.corregido = true;
        notificacion.descripcion = newDescripcion;
      }
    } else {
      // Handle the case where descripcion is undefined
    }
  }

  mostrarFiltros(mostrar: any) {
    this.esconderFiltro = mostrar;
  }
}
