import {Component, HostListener, OnInit, inject} from '@angular/core';
import {
  ESTADO_DOCS_PENDIENTES,
  ESTADO_SOLICITUD_DECLINADA,
  ESTADO_SOLICITUD_RADICADA,
  ESTADO_SOLICITUD_RECIBIDA, ICO_ALERTA_NARANJA_PNG,
  ICO_APOBAR, ICO_LLAMAR_345_PNG,
  ICO_VOLVER, ICON_FLECHA_RETORNO, ICONO_ERROR,
  LOCALSTORAGE_USUARIO,
  URL_BASE_HOME,
  URL_SEGUIMIENTO
} from '../constantes';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util.service';
//import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule]
})
export class ConfirmationComponent implements OnInit {
  icoMostrar = ICO_APOBAR;
  icoVolver = ICO_VOLVER;
  icoSegError =  ICONO_ERROR;
  icoSegAlerta = ICO_ALERTA_NARANJA_PNG;
  iconoLlamar345 = ICO_LLAMAR_345_PNG;
  iconoFlechaRetorno = ICON_FLECHA_RETORNO;
  fecha!: any;
  placa!: string;
  estado!: string;
  radicado!: string;
  documentosFaltantes!: string[];
  urlHome = URL_BASE_HOME;
  urlSeguimiento = URL_SEGUIMIENTO;
  urlRetorno!: string;
  titulo!: string;
  subtitulo!: string;
  mainMsj!: string;
  solicitudSeguimiento!: boolean;
  footer!: string;
  infoInicial!: string;
  infoAdicional!: string;
  mostrarCardInfo!: boolean;
  screenSmall: boolean = false;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private utilService: UtilService = inject(UtilService)
  ) {
  }

  ngOnInit() {
    this.getScreenSize();
    this.contarNotificaciones();
    this.obtenerInfo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.getScreenSize();
  }

  regresar() {
    this.router.navigate([this.urlRetorno])
  }

  private contarNotificaciones() {
    
    let datosUsuarioRegistrado = localStorage.getItem(LOCALSTORAGE_USUARIO);
    let solicitudNotificaciones: any = {};
    if(datosUsuarioRegistrado !== null){
      const usuario = JSON.parse(datosUsuarioRegistrado);
      solicitudNotificaciones.tipoDocumento = usuario.tipoDoc;
      solicitudNotificaciones.numeroDocumento = usuario.numDoc;
      solicitudNotificaciones.username = usuario.email;
      this.utilService.getCountNotifications(solicitudNotificaciones);
    }  
    
  }

  private obtenerInfo() {
    this.placa = window.history.state.placa;
    this.radicado = window.history.state.radicado;
    if(window.history.state.estado){
      this.estado = window.history.state.estado;
    }
    this.documentosFaltantes = window.history.state.documentosFaltantes;

    if (window.history.state.fecha != null && window.history.state.fecha != null) {
      this.fecha = this.datePipe.transform(window.history.state.fecha, 'dd/MM/yyyy') 
    }

    this.validarEstado();

  }

  private validarEstado() {
      if(!this.placa){
          this.router.navigate([this.urlHome]);
      }else if(this.estado){
        this.urlRetorno = this.urlSeguimiento;
        this.titulo = 'DETALLE DEL SINIESTRO';
        this.solicitudSeguimiento = true;

        switch (this.estado) {
          case ESTADO_SOLICITUD_RADICADA:
              this.mostrarSolicitudRadicada();
            break;
          case ESTADO_SOLICITUD_RECIBIDA:
              this.mostrarSolicitudRecibida();
            break;
          case ESTADO_SOLICITUD_DECLINADA:
              this.mostrarSolicitudDeclinada();
            break;
          case ESTADO_DOCS_PENDIENTES:
              this.mostrarSolicitudDocsPendientes();
            break;
        }
      }else{
          this.urlRetorno = this.urlHome;
          this.mostrarRadicacionResultado();
      }
  }

  private mostrarRadicacionResultado() {
    this.mostrarCardInfo = false;
    this.titulo = 'RADICACIÓN DE SINIESTRO';
    this.subtitulo = '¡La información se ha enviado!';
    this.infoInicial = this.fecha;
    this.mainMsj = `Espera nuestra llamada para finalizar el proceso del vehiculo <span class="resaltado-gris">${this.placa}</span> y recibir tu <span class="resaltado-gris">número de radicado</span>`;
    this.footer = '¡Muy pronto te notificaremos!';
  }

  private mostrarSolicitudRecibida() {
    this.mostrarCardInfo = false;
    this.subtitulo = `¡La información se ha recibido!`;
    this.infoInicial = `Veh&iacute;culo: <span class="resaltado-gris">${this.placa}</span>`;
    this.mainMsj = `Tu solicitud est&aacute; en tr&aacute;mite, espera nuestra llamada para finalizar el<br/> proceso y recibir tu n&uacute;mero de radicado.`;
    this.footer = '¡Muy pronto te notificaremos!';
  }

  private mostrarSolicitudRadicada() {
    this.mostrarCardInfo = false;
    this.subtitulo = '¡Tu solicitud ha sido radicada!';
    this.infoInicial = `Vehículo: <span class="resaltado-gris">${this.placa}</span>`;
    this.mainMsj = `Se ha generado el número de radicado<br/><span class="resaltado">${this.radicado}</span>.`;
    this.infoAdicional = 'Recuerda que puedes utilizar este número para realizar seguimiento al siniestro a través de otros canales.';
    this.footer = '¡Te contactaremos para continuar con el proceso!';
  }

  private mostrarSolicitudDeclinada() {
    this.mostrarCardInfo = true;
    this.subtitulo = 'Tu solicitud ha sido declinada';
    this.infoInicial = `Vehículo: <span class="resaltado-gris">${this.placa}</span>`;
    this.mainMsj = `Tu solicitud ha sido declinada, si aún no has recibido nuestra llamada recuerda que te puedes<br/>
                     comunicar con nosotros a través del <span class="resaltado">#345</span>.`;
    this.footer = 'Si tienes algún comentario adicional comunícate<br/> a la línea de atención 01 8000 910 554';
  }

  private mostrarSolicitudDocsPendientes() {
    this.mostrarCardInfo = true;
    this.subtitulo = 'Documentos pendientes';
    this.infoInicial = `Vehículo: <span class="resaltado-gris">${this.placa}</span><br/>No. de radicado: <span class="resaltado-gris">${this.radicado}</span>`;
    this.mainMsj = `Para autorizar la reparación de tu vehículo es importante que nos hagas llegar los siguientes documentos:`;
    this.footer = 'Si tienes alguna inquietud comunícate al #345';
    this.infoAdicional = 'Recuerda que puedes entregarlos en el taller asignado o comunicarte con nosotros al #345 para más información';
  }

  validarClase() {
    switch (this.estado) {
      case ESTADO_SOLICITUD_DECLINADA:
        this.icoMostrar = this.icoSegError;
        return 'solicitud-declinada';
      case ESTADO_DOCS_PENDIENTES:
        this.icoMostrar = this.icoSegAlerta;
        return 'solicitud-docs-pendientes';
      default: return '';   
    } 
  }

  pasearDocumento(documento: string) {
    switch (documento) {
      case "TarjetaPropiedadFront":
        return "Tarjeta de propiedad del vehículo parte frontal";
      case "TarjetaPropiedadBack":
        return "Tarjeta de propiedad del vehículo parte trasera";
      case "DocumentoFront":
        return "Cédula del asegurado parte frontal";
      case "DocumentoBack":
        return "Cédula del asegurado parte trasera";
      case "LicenciaFront":
        return "Licencia del conductor quien manejaba parte frontal";
      case "LicenciaBack":
        return "Licencia del conductor quien manejaba parte trasera";
      case "Croquis":
        return "Croquis (si lo tienes)";
      default: return '';
        break
    }
  }

  private getScreenSize() {
    if (window.screen.width <= 768) {
      this.screenSmall = true;
    }else{
      this.screenSmall = false;
    }
  }
}
