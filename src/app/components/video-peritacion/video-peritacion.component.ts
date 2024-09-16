import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ICON_FLECHA_RETORNO,
  ICO_VOLVER,
  ICO_ALERTA_NARANJA,
  ICO_ALERTA_VERDE,
  LOCALSTORAGE_USUARIO,
  ICO_LLAMAR_345_PNG,
  TIPO_VEH_PESADO,
  TIPO_RESPUESTA_SI,
  ICO_FASE_CONFIRMACION_VERDE,
  ICO_FASE_DATOS_CORREO_VERDE,
  ICO_FASE_INGRESAR_LINK_VERDE,
  ICO_FASE_VIDEO_PERITACION_VERDE,
  ICO_FASE_AGENDAR_CITA_VERDE,
  ICO_FASE_FINALIZACION_VERDE,
  ICO_AGREGAR,
  TIPO_VEH_MOTOS,
} from '../../shared/constantes';
import { Usuario } from '../../models/usuario';
import { RadicarSiniestroService } from '../../services/radicar-siniestro.service';
import { VideoPeritacionService } from '../../services/video-peritacion.service';
import { PolizaAutoDTO } from '../../models/polizaAutoDTO';
import { Boton } from '../../models/boton';
import { UtilService } from '../../services/util.service';
import { PolizaService } from '../../services/poliza.service';
//import { ToastrService } from "ngx-toastr";
import { ModalService } from '../../services/modal.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SpinnerComponent } from '../../shared/interceptors/spinner/spinner.component';
import { HttpInterceptorProviders } from '../../shared/interceptors/interceptor.provider';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-video-peritacion',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './video-peritacion.component.html',
  styleUrls: ['./video-peritacion.component.css'],
  imports: [
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    FormsModule,
    MatSelectModule,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent,
    NgbAccordionModule,
  ],
  providers: [HttpInterceptorProviders],
})
export class VideoPeritacionComponent implements OnInit {
  @ViewChild('agregarVehiculo') agregarVehiculo!: ElementRef;

  constructor(
    private router: Router,
    private radicarSiniestroServices: RadicarSiniestroService,
    private videoPeritacionService: VideoPeritacionService,
    private polizaService: PolizaService,
    private modalService: ModalService,
    //private toast: ToastrService,
    private _snackBar: MatSnackBar,
    private utilService: UtilService
  ) {}

  // Icono o imagenes utilizados
  iconoFlechaRetorno = ICON_FLECHA_RETORNO;
  icoVolver = ICO_VOLVER;
  iconoAlertaNaranja = ICO_ALERTA_NARANJA;
  iconoAlertaVerde = ICO_ALERTA_VERDE;
  icoLlamar = ICO_LLAMAR_345_PNG;
  icoAgregar = ICO_AGREGAR;

  // Variables usadas
  pantallaGrande: boolean = false;
  vehiculo: any[] = [];
  autoSeleccionado: any = {};
  vehiculoInicial = '';
  usuario: Usuario = new Usuario();
  datosUsuarioRegistrado: any;
  opcionesRespuesta: any[] = [];
  esVehiculoPesado: boolean = false;
  estaInmovilizado: boolean = false;
  noData: boolean = true;
  screenSmall: boolean = false;
  mostrarPasos: boolean = false;
  iconoFaseAgendar = ICO_FASE_AGENDAR_CITA_VERDE;
  iconoFaseConfirmacion = ICO_FASE_CONFIRMACION_VERDE;
  iconoFaseCorreo = ICO_FASE_DATOS_CORREO_VERDE;
  iconoFaseLink = ICO_FASE_INGRESAR_LINK_VERDE;
  iconoFasePeritacion = ICO_FASE_VIDEO_PERITACION_VERDE;
  iconoFaseFinalizacion = ICO_FASE_FINALIZACION_VERDE;
  mensaje?: string;
  mensajeAgendarCita?: string;
  mensajeConfirmacion?: string;
  mensajeCorreo?: string;
  mensajeLink?: string;
  mensajeVideoPeritacion?: string;
  mensajeFinalizar?: string;
  urlVideoPeritacion: string = '';
  noVehiculo: boolean = true;
  numeroAutos?: number;
  sinVehiculos?: boolean;
  polizaAutoDTO?: PolizaAutoDTO;
  placa?: string;
  mensajeTipoVehiculo: string = '';

  imgAngleAcordeonCurrent: string = '';
  imgAngleacordeonDown: string = 'assets/images/radicacion/angle-down.svg';
  imgAngleacordeonUp: string = 'assets/images/radicacion/angle-up.svg';

  imgAngleacordeonSelectDown: string =
    'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectUp: string =
    'assets/images/radicacion/angle-up-select.svg';
  imgAngleAcordeonSelectCurrent: string = '';

  labelVehiculoSeleccionado: string = 'Seleccione Vehiculo';
  labelVehiculoInmoviSeleccionado: string = 'Si/No';
  imgAngleAcordeonSelectVehiculocCurrent: string = '';
  imgAngleacordeonSelectVehiculoDown: string =
    'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectVehiculoUp: string =
    'assets/images/radicacion/angle-up-select.svg';

  imgAngleAcordeonSelectVehiculoInmoviCurrent: string = '';
  imgAngleacordeonSelectVehiculoInmoviDown: string =
    'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectVehiculoInmoviUp: string =
    'assets/images/radicacion/angle-up-select.svg';

  ngOnInit() {
    this.imgAngleAcordeonCurrent = this.imgAngleacordeonDown;
    this.imgAngleAcordeonSelectCurrent = this.imgAngleacordeonSelectDown;
    this.imgAngleAcordeonSelectVehiculoInmoviCurrent =
      this.imgAngleacordeonSelectDown;

    this.imgAngleAcordeonSelectVehiculocCurrent =
      this.imgAngleacordeonSelectDown;

    this.polizaAutoDTO = new PolizaAutoDTO();
    this.sinVehiculos = true;
    this.placa = '';
    this.obtenerResolucionPantalla();
    this.obtenerStorage();
    setTimeout(() => {
      this.setUsuario();
      this.setPolizaDTO();
      this.obtenerPolizas();
    });
    this.mensaje =
      'Sigue este paso a paso para disfrutar el servicio de video peritación asistida el cual ha sido desarrollado pensando en ti';
    this.mensajeAgendarCita =
      'Agenda tu video peritación a través del #345. Cuando cuentes con esta cita ve al siguiente paso.';
    this.mensajeConfirmacion = 'Espera nuestra llamada para confirmar tu cita.';
    this.mensajeCorreo =
      'Con la confirmación de tu cita recibirás un correo; en el cual podrás encontrar las indicaciones para iniciar la valoración de daños de tu vehículo.';
    this.mensajeLink =
      'A través de este link podrás ingresar a la plataforma de video peritación asistida.';
    this.mensajeVideoPeritacion =
      'En tu consulta te conectarás con uno de nuestros expertos de forma virtual para obtener la valoración de los daños de tu vehículo, de forma inmediata, sin tener que llevarlo al taller.';
    this.mensajeFinalizar =
      'Con estos pasos queremos hacerte la vida más fácil.';
    this.mensajeTipoVehiculo =
      'La video peritación asistida está disponible únicamente para automóviles livianos.';
  }

  // Función para obtener los datos del localStorage
  obtenerStorage() {
    //this.datosUsuarioRegistrado = JSON.parse(localStorage.getItem(LOCALSTORAGE_USUARIO));
    const usuarioString = localStorage.getItem(LOCALSTORAGE_USUARIO);

    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      this.datosUsuarioRegistrado = usuario;
      // Now you can use the 'usuario' variable
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
    }
    let solicitudLink: any = {};
    solicitudLink.apellido = this.datosUsuarioRegistrado.apellidos;
    solicitudLink.nombre = this.datosUsuarioRegistrado.nombres;
    solicitudLink.placa = '';
    solicitudLink.username = this.datosUsuarioRegistrado.email;
    this.consultarLink(solicitudLink);
  }

  //Cambio de resolución
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.obtenerResolucionPantalla();
  }
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) {
    this.obtenerResolucionPantalla();
  }

  private obtenerResolucionPantalla() {
    if (window.screen.width <= 768) {
      this.pantallaGrande = false;
      this.screenSmall = true;
    } else {
      this.pantallaGrande = true;
      this.screenSmall = false;
    }
  }

  // Función para validar si el segmento del vehículo es PESADO
  obtenerDatosVehiculo(event: any) {
    this.switchImgAngleSelectVehiculoAcordeon();
    this.noVehiculo = false;
    if (
      event.segmentoVehiculo == TIPO_VEH_PESADO ||
      event.segmentoVehiculo == TIPO_VEH_MOTOS
    ) {
      this.esVehiculoPesado = true;
      this.mostrarPasos = false;
    } else {
      this.esVehiculoPesado = false;
    }
  }

  /* Metodo del Select */
  switchImgAngleSelectVehiculoAcordeon() {
     this.noVehiculo = false;

     this.esVehiculoPesado = false;


    if (
      this.imgAngleAcordeonSelectVehiculocCurrent ===
      this.imgAngleacordeonSelectVehiculoDown
    )
      this.imgAngleAcordeonSelectVehiculocCurrent =
        this.imgAngleacordeonSelectVehiculoUp;
    else
      this.imgAngleAcordeonSelectVehiculocCurrent =
        this.imgAngleacordeonSelectVehiculoDown;
  }

  switchImgAngleSelectVehiculoInmoviAcordeon() {
    if (
      this.imgAngleAcordeonSelectVehiculoInmoviCurrent ===
      this.imgAngleacordeonSelectVehiculoInmoviDown
    )
      this.imgAngleAcordeonSelectVehiculoInmoviCurrent =
        this.imgAngleacordeonSelectVehiculoInmoviUp;
    else
      this.imgAngleAcordeonSelectVehiculoInmoviCurrent =
        this.imgAngleacordeonSelectVehiculoInmoviDown;
  }

  switchImgAngleSelectAcordeon() {
    if (this.imgAngleAcordeonSelectCurrent === this.imgAngleacordeonSelectDown)
      this.imgAngleAcordeonSelectCurrent = this.imgAngleacordeonSelectUp;
    else this.imgAngleAcordeonSelectCurrent = this.imgAngleacordeonSelectDown;
  }

  seleccionarVehiculo(vehiculoPlaca: string) {
    this.labelVehiculoSeleccionado = vehiculoPlaca;
    console.log('====>', this.labelVehiculoSeleccionado);
  }

  seleccionarVehiculoInmovilizado(value: string) {
    this.noData = false;
    if (value == TIPO_RESPUESTA_SI) {
    this.labelVehiculoInmoviSeleccionado = 'Si';
      this.estaInmovilizado = true;
      this.mostrarPasos = false;
    } else {
      this.estaInmovilizado = false;
      this.labelVehiculoInmoviSeleccionado = 'No';
    }
    console.log('====>', this.labelVehiculoInmoviSeleccionado);
  }

  // Función Para validar si el vehículo se encuentra inmovilizado
  // obtenerInfoVehiculo(event: Event) {
  //   const target = event.target as HTMLSelectElement;
  //   const value = target.value;
  //   this.noData = false;
  //   if (value == TIPO_RESPUESTA_SI) {
  //     this.estaInmovilizado = true;
  //     this.mostrarPasos = false;
  //   } else {
  //     this.estaInmovilizado = false;
  //   }
  // }

  // Funcion para regresar a la pagina home
  regresar() {
    this.router.navigate(['/home/false']);
  }

  // Función para obtener las polizas del usuario regustrado
  obtenerPolizas() {
    const datosUsuario = this.datosUsuarioRegistrado;
    this.usuario.tipoDocumento = datosUsuario.tipoDoc;
    this.usuario.numeroDocumento = datosUsuario.numDoc;
    if (window.history.state.vehiculos !== undefined) {
      this.vehiculo = window.history.state.vehiculos;
    } else {
      this.radicarSiniestroServices.getVehiculos(this.usuario).subscribe(
        (data: any) => {
          let dataAgrupada = [];
          dataAgrupada =
            this.radicarSiniestroServices.getVehiculosAgrupados(data);
          this.vehiculo = dataAgrupada['data']['polizasAutos'];
          this.numeroAutos = this.vehiculo.length;
          if (this.numeroAutos !== 0) {
            this.sinVehiculos = false;
          }
        },
        (error) => {
          console.log(error.status, 'Ocurrio un error');
        }
      );
    }
  }

  // Funcion para continuar al paso a paso video peritacion
  continuar() {
    this.mostrarPasos = true;
  }

  consultarLink(solicitud: any) {
    this.videoPeritacionService
      .consultarLink(solicitud)
      .subscribe((respuesta) => {
        if (respuesta && respuesta.success == true) {
          this.urlVideoPeritacion = respuesta.data;
        }
      });
  }

  habilitarBotonContinuar() {
    return (
      this.esVehiculoPesado ||
      this.estaInmovilizado ||
      this.noData ||
      this.noVehiculo
    );
  }

  registrarPlaca() {
    this.polizaAutoDTO!.placa = this.placa;
    this.polizaService.registrarPlaca(this.polizaAutoDTO!).subscribe(
      (respuesta) => {
        if (
          respuesta.success === true &&
          respuesta.message.includes('exitosamente')
        ) {
          let msj = 'Has agregado el vehículo con placas ' + this.placa;
          /*this.toast.success(msj, '¡Vehículo agregado!', {
            closeButton: true,
            titleClass: 'toast-tittle-success',
            messageClass: 'toast-message-success',
          });*/
          this._snackBar.open(msj + ' ¡Vehículo agregado!', 'X', {
            duration: 2000,
            panelClass: 'app-notification-success',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          this.obtenerPolizas();
          let solicitudNotificaciones: any = {};
          solicitudNotificaciones.tipoDocumento = this.usuario.tipoDoc;
          solicitudNotificaciones.numeroDocumento = this.usuario.numDoc;
          solicitudNotificaciones.username = this.usuario.email;
          this.utilService.getCountNotifications(solicitudNotificaciones);
          this.placa = '';
          this.router.navigateByUrl('/autogestion/video-peritacion');
        } else if (
          respuesta.success === false &&
          respuesta.message.includes('no cuenta con')
        ) {
          /*this.toast.error('La placa diligenciada no fue encontrada. Verifica la información.', '¡Placa inválida!', {
            closeButton: true,
            titleClass: 'toast-tittle-error',
            timeOut: 10000
          });*/
          this._snackBar.open(
            'La placa diligenciada no fue encontrada. Verifica la información. ¡Placa inválida!',
            'X',
            {
              duration: 2000,
              panelClass: 'app-notification-error',
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          this.placa = '';
        } else if (
          respuesta.success === false &&
          respuesta.message.includes('vinculado a este usuario')
        ) {
          let msj =
            'El vehículo de placas ' +
            this.placa +
            ' ya esta registrado en tu lista.';
          /*this.toast.warning(msj, '¡Esta placa ya existe!', {
            closeButton: true,
            titleClass: 'toast-tittle-warning'
          });*/
          this._snackBar.open(msj + ' ¡Esta placa ya existe!', 'X', {
            duration: 2000,
            panelClass: 'app-notification-warning',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.placa = '';
        } else {
          /*this.toast.error('No fue posible registrar la placa, vuelve a intentarlo', '¡Error de registro!', {
            closeButton: true,
            titleClass: 'toast-tittle-error'
          });*/
          this._snackBar.open(
            'No fue posible registrar la placa, vuelve a intentarlo ¡Error de registro!',
            'X',
            {
              duration: 2000,
              panelClass: 'app-notification-error',
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          this.placa = '';
          throw Error(respuesta.message);
        }
      },
      (err) => {
        this.modalService.modalErrror(err.message, '', '');
        this.placa = '';
      }
    );
  }

  confirmarCancelar() {
    let b1 = new Boton('Si', 'si');
    let b2 = new Boton('No', 'no');
    let botones: Boton[] = [b1, b2];
    if (this.placa && this.placa.length > 0) {
      let alert = this.modalService.modalConfirm(
        'Cancelar Vehículo',
        'Estás a punto de cancelar la creación de un vehículo, ¿Deseas continuar?',
        '200',
        '200',
        '',
        botones
      );
      alert.afterClosed().subscribe((result) => {
        if (result == 'no') {
          let e1: HTMLElement = this.agregarVehiculo.nativeElement;
          e1.click();
        } else {
          this.placa = '';
        }
      });
    }
  }

  setPolizaDTO() {
    this.polizaAutoDTO!.email = this.usuario.email;
    this.polizaAutoDTO!.numeroDocumento = this.usuario.numeroDocumento;
    this.polizaAutoDTO!.tipoDocumento = this.usuario.tipoDocumento;
    this.polizaAutoDTO!.usuarioID = this.usuario.usuarioID;
  }

  setUsuario() {
    //this.usuario = JSON.parse(localStorage.getItem('usuario'));

    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      this.usuario.nombres = usuario.nombres!.toUpperCase();
      this.usuario.numeroDocumento = usuario.numDoc;
      this.usuario.tipoDocumento = usuario.tipoDoc;
      // Now you can use the 'usuario' variable
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
    }
  }
}
