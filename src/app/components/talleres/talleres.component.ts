import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Input,
  ViewEncapsulation,
} from '@angular/core';
//import { ToastrService } from "ngx-toastr";
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { ModalService } from '../../services/modal.service';
import { TalleresService } from '../../services/talleres.service';
import {
  BASE_URL_MAPS,
  CANTIDAD_MIN_LETRAS_BUSCAR,
  ICO_AGREGAR,
  ICO_NO_FAQ,
  ICO_PIN,
  ICO_TALLERES,
  ICO_VOLVER,
  ICON_FLECHA_RETORNO,
  ICO_LLAMAR_345_PNG,
} from '../../shared/constantes';
import { Ciudad } from '../../models/ciudad';
import { Taller } from '../../models/taller';
import { ReplaySubject, Subject } from 'rxjs';
import {
  FormControl,
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
// import {MatSelect} from "@angular/material/select";
import { RadicarSiniestroService } from '../../services/radicar-siniestro.service';
import { Usuario } from '../../models/usuario';
import { TallerSegmentoRequestDTO } from '../../models/tallerSegmentoRequestDTO';
import { PolizaAutoDTO } from '../../models/polizaAutoDTO';
import { UtilService } from '../../services/util.service';
import { PolizaService } from '../../services/poliza.service';
import { Boton } from '../../models/boton';
import { Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepicker,
  NgbDate,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../filter.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    FormsModule,
    NgbModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FilterPipe,
    NgxMatSelectSearchModule,
    PlantillaGeneralComponent,
    FooterComponent,
  ],
  providers: [
    FilterPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TalleresComponent,
    },
  ],
})
export class TalleresComponent implements OnInit {
  cantidadMinBuscar = CANTIDAD_MIN_LETRAS_BUSCAR;
  icoVolver = ICO_VOLVER;
  icoAgregar = ICO_AGREGAR;
  icoTaller = ICO_TALLERES;
  icoPin = ICO_PIN;
  icoLlamar = ICO_LLAMAR_345_PNG;
  icoNoTaller = ICO_NO_FAQ;
  existeTaller: boolean = false;
  ciudades!: Ciudad[];
  talleres!: Taller[];
  marca: any = {};
  ciudad: any = {};
  marcas: any[] = [];
  formIsValid: boolean = false;
  enableMarcas: boolean = false;
  urlMapsBase: string = BASE_URL_MAPS;
  actualPage: number = 1;
  public filteredCities: ReplaySubject<Ciudad[]> = new ReplaySubject<Ciudad[]>(
    1
  );
  public autoCtrl: FormControl = new FormControl();

  public ciudadCtrl: FormControl = new FormControl();
  @Input()
  public ciudadFilterCtrl: FormControl = new FormControl();

  public placaCtrl: FormControl = new FormControl();

  public terminosDeBusquedaCtrl: FormControl = new FormControl();
  private _onDestroy = new Subject<void>();
  screenSmall: boolean = false;
  iconoFlechaRetorno = ICON_FLECHA_RETORNO;
  Autos!: Array<any>;
  usuario!: Usuario;
  polizaAutoDTO!: PolizaAutoDTO;
  @Input('ngModel')
  placa!: string;
  formularioTalleres!: FormGroup;
  @ViewChild('agregarVehiculo') agregarVehiculo!: ElementRef;

  @ViewChild('cmbCiudad') cmbCiudad!: ElementRef<HTMLSelectElement>;

  config = {
    id: 'custom',
    itemsPerPage: 9,
    currentPage: 1,
    totalItems: 15,
  };

  @Input('ngModel')
  terminoDeBusqueda: string = '';
  autoSeleccionado: any;

  constructor(
    private _snackBar: MatSnackBar,
    private tallerService: TalleresService,
    private radicarSiniestroService: RadicarSiniestroService,
    private utilService: UtilService,
    private polizaService: PolizaService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    this.getScreenSize();
    setTimeout(() => {
      this.setUsuario();
      this.setPolizaDTO();
      if (
        window.history.state.vehiculos !== undefined ||
        window.history.state.vehiculos !== undefined
      ) {
        this.Autos = window.history.state.vehiculos;
        this.getVehiculosValidacion();
        console.log('====================================');
        console.log(this.Autos);
        console.log('====================================');
      } else {
        this.getVehiculos();
      }
    });
    // this.builderForm();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getScreenSize();
  }
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) {
    this.getScreenSize();
  }

  setUsuario() {
    this.usuario = new Usuario();
    //this.usuario = JSON.parse(localStorage.getItem('usuario'));
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      this.usuario.numeroDocumento = usuario.numDoc;
      this.usuario.tipoDocumento = usuario.tipoDoc;
      this.usuario.email = usuario.email;
      this.usuario.usuarioID = usuario.usuarioID;
      // Now you can use the 'usuario' variable
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
    }

    console.log('Usuario no Doc->' + this.usuario.numeroDocumento);
    console.log('Usuario tipo Doc->' + this.usuario.tipoDocumento);
    console.log('Usuario nEmail->' + this.usuario.email);
    console.log('Usuario UsuarioID->' + this.usuario.usuarioID);
  }

  setPolizaDTO() {
    this.polizaAutoDTO = new PolizaAutoDTO();
    this.polizaAutoDTO.email = this.usuario.email;
    this.polizaAutoDTO.numeroDocumento = this.usuario.numeroDocumento;
    this.polizaAutoDTO.tipoDocumento = this.usuario.tipoDocumento;
    this.polizaAutoDTO.usuarioID = this.usuario.usuarioID;
  }

  getVehiculos() {
    this.radicarSiniestroService
      .getVehiculos(this.usuario)
      .subscribe((respuesta) => {
        let dataAgrupada = [];
        dataAgrupada =
          this.radicarSiniestroService.getVehiculosAgrupados(respuesta);
        this.Autos = dataAgrupada['data']['polizasAutos'];
        console.log('====================================');
        console.log(this.Autos);
        console.log('====================================');
        this.getVehiculosValidacion();
      });
  }

  regresar(): void {
    this.route.navigate(['/autos'], { state: { vehiculos: this.Autos } });
  }

  obtenerCiudades(event?: Event) {
    this.formIsValid = false;
    this.existeTaller = false;
    this.talleres = [];

    if (event) {
      const selectElement = event.target as HTMLSelectElement;
      this.autoSeleccionado = JSON.parse(selectElement.value);
    }
    let tallerSegmentoRequestDTO: TallerSegmentoRequestDTO =
      new TallerSegmentoRequestDTO();
    tallerSegmentoRequestDTO.marcaID = this.autoSeleccionado.marcaID;
    tallerSegmentoRequestDTO.placa = this.autoSeleccionado.placa;
    tallerSegmentoRequestDTO.segmento = this.autoSeleccionado.segmentoVehiculo;
    tallerSegmentoRequestDTO.modelo = this.autoSeleccionado.modelo;
    tallerSegmentoRequestDTO.codigoTomador =
      this.autoSeleccionado.codigoTomador;

    this.tallerService.getCiudadesSegmento(tallerSegmentoRequestDTO).subscribe(
      (respuestaCiudades: any) => {
        this.ciudades = respuestaCiudades.data.ciudades;
        this.inicializarCtrlCiudades();
      },
      (error) => {
        console.log('Ocurrio un error', error);
      }
    );
  }

  inicializarCtrlCiudades(): void {
    this.ciudadCtrl.setValue(this.ciudades);
    this.filteredCities.next(this.ciudades.slice());
    this.ciudadFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCities();
      });
  }

  buscarTalleres() {
    this.terminoDeBusqueda = '';
    let tallerSegmentoRequestDTO: TallerSegmentoRequestDTO =
      new TallerSegmentoRequestDTO();
    tallerSegmentoRequestDTO.ciudadID = this.ciudad;
    tallerSegmentoRequestDTO.tipoVehiculoID = this.autoSeleccionado.tipoVeh;
    tallerSegmentoRequestDTO.marcaID = this.autoSeleccionado.marcaID;
    tallerSegmentoRequestDTO.placa = this.autoSeleccionado.placa;
    tallerSegmentoRequestDTO.segmento = this.autoSeleccionado.segmentoVehiculo;
    tallerSegmentoRequestDTO.modelo = this.autoSeleccionado.modelo;
    tallerSegmentoRequestDTO.codigoTomador =
      this.autoSeleccionado.codigoTomador;

    this.tallerService.getTalleresSegmento(tallerSegmentoRequestDTO).subscribe(
      (respuestaTalleres: any) => {
        if (respuestaTalleres.data != null) {
          this.existeTaller = true;
          this.talleres = respuestaTalleres.data.talleres;
          this.config.totalItems = this.talleres.length;
        } else {
          this.existeTaller = false;
          this._snackBar.open(respuestaTalleres.message + ' Respuesta', 'X', {
            duration: 2000,
            panelClass: 'app-notification-success',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          /*this.toast.success(respuestaTalleres.message, 'Respuesta', {
          closeButton: true,
          titleClass: 'toast-tittle-success'
        });*/
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public marcasByCiudad(ciudad: any): void {
    this.marca = {};
    this.formIsValid = false;
    this.existeTaller = false;
    this.talleres = [];
    this.tallerService.getMarcasCiudad(ciudad).subscribe((respuesta) => {
      if (respuesta) {
        this.marcas = respuesta.data.marcas;
        this.enableMarcas = true;
      }
    });
  }

  validarFormulario() {
    if (this.ciudad && this.autoSeleccionado) {
      this.formIsValid = true;
    }
  }

  ubicarTaller(taller: Taller): string {
    return `${this.urlMapsBase}${taller.latitud},${taller.longitud}`;
  }

  private filterCities() {
    if (!this.ciudades) {
      return;
    }
    // get the search keyword
    let search = this.ciudadFilterCtrl.value;
    if (!search) {
      this.filteredCities.next(this.ciudades.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    if (search.length >= this.cantidadMinBuscar) {
      this.filteredCities.next(
        this.ciudades.filter(
          (ciudad) => ciudad.nombre!.toLowerCase().indexOf(search) > -1
        )
      );
    }
  }

  configurarPaginacion(filter: any): boolean {
    this.config.totalItems = filter;
    return true;
  }
  private getScreenSize() {
    if (window.screen.width <= 768) {
      this.screenSmall = true;
    } else {
      this.screenSmall = false;
    }
  }

  private seleccionarPrimerAuto() {
    this.autoSeleccionado = this.Autos[0];
    this.obtenerCiudades();
  }

  registrarPlaca() {
    this.polizaAutoDTO.placa = this.placa;
    this.polizaService.registrarPlaca(this.polizaAutoDTO).subscribe(
      (respuesta) => {
        let msj;
        if (
          respuesta.success === true &&
          respuesta.message.includes('exitosamente')
        ) {
          msj = 'Has agregado el vehículo con placas ' + this.placa;
          this._snackBar.open(msj, 'X', {
            duration: 2000,
            panelClass: 'app-notification-success',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          /* this.toast.success(msj, '¡Vehículo agregado!', {
            closeButton: true,
            titleClass: 'toast-tittle-success',
            messageClass: 'toast-message-success',
          });*/
          this.Autos = [];
          this.getVehiculos();
          this.placa = '';
          this.utilService.getCountNotifications(
            this.setSolicitudConteoNotificaciones()
          );
        } else if (
          respuesta.success === false &&
          respuesta.message.includes('no cuenta con')
        ) {
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

          /* this.toast.error('La placa diligenciada no fue encontrada. Verifica la información.', '¡Placa inválida!', {
            closeButton: true,
            titleClass: 'toast-tittle-error'
          });*/
          this.placa = '';
        } else if (
          respuesta.success === false &&
          respuesta.message.includes('vinculado a este usuario')
        ) {
          msj =
            'El vehículo de placas ' +
            this.placa +
            ' ya esta registrado en tu lista.';
          this._snackBar.open(msj + ' ¡Esta placa ya existe!', 'X', {
            duration: 2000,
            panelClass: 'app-notification-warning',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          /*this.toast.warning(msj, '¡Esta placa ya existe!', {
            closeButton: true,
            titleClass: 'toast-tittle-warning'

          });*/
          this.placa = '';
        } else {
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

          /*this.toast.error('No fue posible registrar la placa, vuelve a intentarlo', '¡Error de registro!', {
            closeButton: true,
            titleClass: 'toast-tittle-error'
          });*/
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
  private setSolicitudConteoNotificaciones(): any {
    let solicitudNotificaciones: any = {};
    solicitudNotificaciones.tipoDocumento = this.usuario.tipoDoc;
    solicitudNotificaciones.numeroDocumento = this.usuario.numDoc;
    solicitudNotificaciones.username = this.usuario.email;
    return solicitudNotificaciones;
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
        if (result === 'no') {
          let e1: HTMLElement = this.agregarVehiculo.nativeElement;
          e1.click();
        } else {
          this.placa = '';
        }
      });
    }
  }

  getVehiculosValidacion() {
    if (this.Autos && this.Autos.length > 0) {
      var hash = typeof {};
      this.Autos = this.Autos.filter((auto: any) => {
        var exists = !hash[auto.placa];
        // hash[auto.placa] = true;
        return exists;
      });
      this.seleccionarPrimerAuto();
    } else {
      let e1: HTMLElement = this.agregarVehiculo.nativeElement;
      e1.click();
    }
  }
}
