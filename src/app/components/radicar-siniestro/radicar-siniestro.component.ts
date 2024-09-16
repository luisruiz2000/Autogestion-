import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Injectable,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  TemplateRef,
  SimpleChanges,
  OnChanges,
  Input,
} from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Ciudad } from '../../models/ciudad';
import { Departamento } from '../../models/departamento';
import { Municipio } from '../../models/municipio';
import { Usuario } from '../../models/usuario';
import { DominiosService } from '../../services/dominios.service';
import { RadicarSiniestroService } from '../../services/radicar-siniestro.service';
import { TalleresService } from '../../services/talleres.service';
import { UtilService } from '../../services/util.service';
import { cloneDeep } from 'lodash';
import {
  CELULAR_PATTERN,
  LOCALSTORAGE_USUARIO,
  SOLO_NUMEROS_PATTERN,
  TIPO_DOMINIO_TIPOS_DOC,
  CONTENT_TYPE_PDF,
  CONTENT_TYPE_JPG,
  TIPO_VEH_PESADO,
  BASE_URL_MAPS,
  NOMBRES_PATTERN,
  CONTENT_TYPE_DOC,
  CONTENT_TYPE_DOCX,
  CANTIDAD_MIN_LETRAS_BUSCAR,
  SIN_ESPACIO_AL_INICIO,
  ICO_ALERTA_NARANJA_PNG,
  TIPO_DOMINIO_DEPARTAMENTOS,
} from '../../shared/constantes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Dominio } from '../../models/dominio';
import { SiniestroCreateDTO } from '../../models/siniestroCreateDTO';
//import { ToastrService } from "ngx-toastr";
import { EvidenciaSiniestroDTO } from '../../models/evidenciaSiniestroDTO';
import { TipoVehiculoPesado } from '../../models/tipoVehiculoPesado';
import { TallerSegmentoRequestDTO } from '../../models/tallerSegmentoRequestDTO';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepicker,
  NgbDate,
  NgbModule,
  NgbTimepickerModule,
  NgbTimepicker,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalGenericoComponent } from '../../shared/modales/modal-generico/modal-generico.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../services/modal.service';
import { TipoDocumento } from '../../models/tipo-documento';
import { Taller } from '../../models/taller';
import { Boton } from '../../models/boton';
import { MatSelectModule } from '@angular/material/select';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterPipe } from '../../filter.pipe';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';
import { AcordeonWebComponent } from '../../shared/acordeon-web/acordeon-web.component';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | ''): NgbDateStruct | null {
    //console.log("Valie ->" +  value);
    if (value) {
      let date = String(value).split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? (date.day < 10 ? `0${date.day}` : date.day) +
          this.DELIMITER +
          (date.month < 10 ? `0${date.month}` : date.month) +
          this.DELIMITER +
          date.year
      : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? (date.day < 10 ? `0${date.day}` : date.day) +
          this.DELIMITER +
          (date.month < 10 ? `0${date.month}` : date.month) +
          this.DELIMITER +
          date.year
      : '';
  }
}

@Component({
  selector: 'app-radicar-siniestro',
  templateUrl: './radicar-siniestro.component.html',

  //template: '<div></div>',
  styleUrls: ['./radicar-siniestro.component.css'],
  providers: [
    DatePipe,
    MatDatepickerModule,
    FilterPipe,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RadicarSiniestroComponent,
    },
  ],

  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    NgbDatepicker,
    NgbModule,
    MatCheckboxModule,
    FilterPipe,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatFormFieldModule,
    MatInputModule,
    FooterComponent,
    NgxMatSelectSearchModule,
    PlantillaGeneralComponent,
    AcordeonWebComponent,
    NgbTimepickerModule,
    JsonPipe,
    NgbTimepicker,
  ],
})
export class RadicarSiniestroComponent implements OnInit, OnChanges {
  estadoOnInit: boolean = false;

  @ViewChild(NgbDatepicker) d!: NgbDatepicker;
  //@ViewChild(MatAccordion) accordion!: MatAccordion;
  step: boolean = true;

  formularioIsDisable: boolean = false;
  public cantidadMinBuscar = CANTIDAD_MIN_LETRAS_BUSCAR;

  constructor(
    private dominiosService: DominiosService,
    private radicarSiniestroServices: RadicarSiniestroService,
    private utilService: UtilService,
    private tallerService: TalleresService,
    private modalService: ModalService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    //private toast: ToastrService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,

    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.polizaRecibida = this.activedRoute.snapshot.paramMap.get('id');
    this.fechaSistema != this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.minYear = (new Date().getFullYear() - 2).toString();
  }

  // Variables usadas
  formularioRadicacion!: FormGroup;
  departamentos!: Departamento[];
  municipios!: Municipio[];
  tipoDocumento!: TipoDocumento[];
  ciudades!: Ciudad[];
  tiposVehiculo!: TipoVehiculoPesado[];
  usuario: Usuario = new Usuario();
  taller: Taller = new Taller();
  talleres!: Taller[];
  vehiculo: any[] = [];
  datosAuto: any[] = [];
  datosUsuarioRegistrado: any;
  existeTaller!: boolean;
  fotoCroquis!: string;
  fotoLadoIzquierdo!: string;
  fotoDeFrente!: string;
  fotoLadoDerecho!: string;
  fotoParteTrasera!: string;
  fotoAlDetalle!: string;
  nombreArchivo!: string;
  docAsegurado!: string;
  doclicenciaConductor!: string;
  tipoDocConductor = true;
  tipoDocUsuario = true;
  polizaRecibida: any;
  vehiculoInicial = '';
  date = new Date();
  fechaSistema = '';
  minYear: string;
  fechaMinima!: string;

  placa = '';
  marca = '';
  modelo = '';
  autoSeleccionado: any = {};
  private siniestroAsegurado!: boolean;
  private idSiniestro!: number;
  private documentosUpload: Object[] = [];
  private seleccionTaller!: boolean;
  private tallerSeleccionado!: Taller;
  private fechaInicialPoliza!: number;
  private fechaFinalPoliza!: number;
  buscarTaller: boolean = false;
  formEnviado: boolean = false;

  terminoDeBusqueda: string = '';
  pantallaGrande: boolean = false;
  acordeonDatos: boolean = false;
  acordeonDocumentos: boolean = false;
  acordeonEvidencias: boolean = false;
  acordeonTaller: boolean = false;

  //Formatos para las fechas
  public minDate: Date = new Date('05/07/2017 2:00 AM');
  public maxDate: Date = new Date('05/27/2017 11:00 AM');
  public dateValue: Date = new Date('05/16/2017 5:00 AM');

  urlMapsBase: string = BASE_URL_MAPS;

  // Configuración del calendario
  modelCalendar?: NgbDateStruct;
  public positionCalendar = 'bottom-end';
  meridian: boolean = true;
  spinners: boolean = false;
  fechaMaximaCalendar: any = {};
  fechaMinimaCalendar: any = {};

  //polizas
  labelAutoSeleccionado: string = 'Selecciona el Vehículo';
  imgAngleacordeonDown: string = 'assets/images/radicacion/angle-down.svg';
  imgAngleacordeonUp: string = 'assets/images/radicacion/angle-up.svg';
  imgAngleAcordeonCurrent: string = '';

  //departamentos
  labelDptoSeleccionado: string = 'Seleccionar departamento';
  imgAngleacordeonSelectDown: string =
    'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectUp: string =
    'assets/images/radicacion/angle-up-select.svg';
  imgAngleAcordeonSelectCurrent: string = '';

  //Ciudades
  labelCiudadSeleccionado: string = 'Seleccionar ciudad';
  imgAngleacordeonSelectCiudadDown: string =
    'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectCiudadUp: string =
    'assets/images/radicacion/angle-up-select.svg';
  imgAngleAcordeonSelectCiudadCurrent: string = '';
  //ciudade Taller
  labelCiudadTallerSeleccionado: string = 'Seleccionar ciudad';
  imgAngleacordeonSelectCiudadTallerDown: string =
    'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectCiudadTallerUp: string =
    'assets/images/radicacion/angle-up-select.svg';
  imgAngleAcordeonSelectCiudadTallerCurrent: string = '';
  //tipo doc
  labelTipoDocSeleccionado: string = 'Seleccione tipo de documento';
  labelTipoDocConductorSeleccionado: string = 'Seleccione tipo de documento';
  imgAngleacordeonSelectTipoDocDown: string =
    'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectTipoDocUp: string =
    'assets/images/radicacion/angle-up-select.svg';
  imgAngleAcordeonSelectTipoDocCurrent: string = '';

  //genero
  labelGeneroSeleccionado: string = 'Seleccionar';
  imgAngleacordeonSelectGeneroDown: string =
    'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectGeneroUp: string =
    'assets/images/radicacion/angle-up-select.svg';
  imgAngleAcordeonSelectGeneroCurrent: string = '';

  //inmutables listas
  departamentosInmutable: Departamento[] = [];
  ciudadesInmutable: Municipio[] = [];

  //Datos de los select personalizados
  codigoDepartamento: string = '0';

  codigoCiudad: string = '0';
  esConductorDiferente: boolean = false;
  tipoDocOtroConductor: string = '';
  genero: string = '';

  //Form Control datos usuario que realiza el radicado
  fCnombreContacto = new FormControl('', Validators.required);
  fCtipoDocContacto = new FormControl('', Validators.required);
  fCdocContacto = new FormControl('', Validators.required);
  fCnumCelular = new FormControl('');
  fCdirContacto = new FormControl('', Validators.required);

  //Form Control datos siniestro
  fCfecha = new FormControl('', Validators.required);
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  fCTime = new FormControl(this.time, Validators.required);
  fCDpto = new FormControl(new Departamento(), Validators.required);
  fcCiudad = new FormControl(new Municipio(), Validators.required);
  fCdireccion = new FormControl('', Validators.required);
  @Input()
  fCdesEvento = new FormControl('', Validators.required);
  fCdesAveria = new FormControl('', Validators.required);

  //FormControl datos conductor
  fCconductorNombre = new FormControl('', Validators.required);
  fCconductorDocumento = new FormControl('', Validators.required);
  fCconductorTipoDocumento = new FormControl('', Validators.required);
  fCconductorEdad = new FormControl('', Validators.required);
  fCgenero = new FormControl('', Validators.required);

  //Datos Paso Taller
  fCmodelo = new FormControl('', Validators.required);
  fCplaca = new FormControl('', Validators.required);
  fCmarca = new FormControl('', Validators.required);
  fCseEncuentraTaller = new FormControl('yes', Validators.required);
  fCseleccionarTaller = new FormControl('no', Validators.required);
  fCciudadTaller = new FormControl(new Ciudad());
  fCtaller = new FormControl(new Taller(), Validators.required);
  opcSelectFindtaller: string = '';
  visibleButtonContinuar: boolean = false;
  habilitarContinuarTaller: boolean = false;
  habilitarContinuarGeneral: boolean = false;

  //Indica en que paso esta 1. Datos 2. Documentos 3. Talleres 4. Resumen
  numStepRadicar: number = 1;

  fCcelular = new FormControl('');

  //FormControl para Archivos
  fCfileTargeta = new FormControl(null);
  fCfileCedula = new FormControl(null);
  fCfileLicencia = new FormControl(null);
  fCfileTargetaRespaldo = new FormControl(null);
  fCfileCedulaRespaldo = new FormControl(null);
  fCfileLicenciaRespaldo = new FormControl(null);
  fCfileFrontal = new FormControl(null);
  fCfileLateralDerecho = new FormControl(null);
  fCfileLateralIzquierdo = new FormControl(null);
  fCfileTrasero = new FormControl(null);
  fCfileCroquis = new FormControl(null);

  //FormControl Input Archivos
  fCtargeta = new FormControl('');
  fCcedula = new FormControl('');
  fClicencia = new FormControl('');
  fCtargetaRespaldo = new FormControl('');
  fCcedulaRespaldo = new FormControl('');
  fClicenciaRespaldo = new FormControl('');

  //PAth de imagenes
  imgDatos = 'assets/images/radicacion/datos.svg';
  imgDocumentos = 'assets/images/radicacion/documentos.svg';
  imgDocumentosWhite = 'assets/images/radicacion/documentos_white.svg';
  imgTaller = 'assets/images/radicacion/taller.svg';
  imgTallerWhite = 'assets/images/radicacion/taller_white.svg';
  imgResumen = 'assets/images/radicacion/resumen.svg';
  imgResumenWhite = 'assets/images/radicacion/resumen_white.svg';
  imgCurrentDatos = this.imgDatos;
  imgCurrentDocumentos = this.imgDocumentos;
  imgCurrentTaller = this.imgTaller;
  imgCurrentResumen = this.imgResumen;

  //clases del pasos radicar
  classCurrent = 'frame-child';
  classPrevious = 'frame-child-previous';
  classNext = 'frame-item';
  classDatos = this.classCurrent;
  classDocumentos = this.classNext;
  classTaller = this.classNext;
  classResumen = this.classNext;

  //Path images Archivos evidencias
  imgFotoLateralDerecho = 'assets/images/radicacion/lateral_derecho.svg';
  imgFotoFrontal = 'assets/images/radicacion/carro_frente.svg';
  imgFotoLateralIzquierdo = 'assets/images/radicacion/lateral_izquierdo.svg';
  imgFotoTrasero = 'assets/images/radicacion/carro_trasero.svg';
  imgFotoCroquis = 'assets/images/croquis.svg';
  imgFotoWhite = 'assets/images/radicacion/add_a_photo_white.svg';
  imgDeleteEvidencia = 'assets/images/radicacion/delete_evidencia.svg';
  imgFotoCurrent = 'assets/images/radicacion/add_a_photo_white.svg';
  //variable opc archivos
  opc: number = 0;
  estadoValid = false;

  //Paso resumen
  labelButtonContinue: string = 'Continuar';

  @ViewChild('dateSiniestro') dateSiniestro!: ElementRef;
  @ViewChild('callDialogDeleteFile') callDialogDeleteFile =
    {} as TemplateRef<any>;
  @ViewChild('callDialogSendRadicar') callDialogSendRadicar =
    {} as TemplateRef<any>;
  ngOnInit() {
    // console.log("init")
    this.imgAngleAcordeonCurrent = this.imgAngleacordeonDown;
    this.imgAngleAcordeonSelectCurrent = this.imgAngleacordeonSelectDown;
    this.imgAngleAcordeonSelectCiudadCurrent = this.imgAngleacordeonSelectDown;
    this.imgAngleAcordeonSelectTipoDocCurrent = this.imgAngleacordeonSelectDown;
    this.configurarFechasCalendar();
    this.obtenerResolucionPantalla();
    setTimeout(() => {
      this.obtenerDominios();
      this.obtenerPolizas();
    });
    this.obtenerStorage();
    this.obtenerTiposVehiculo();
    this.builderForm();
    this.fCdesEvento.valueChanges.subscribe((data) => {
      let estado = this.validarCampos();
      console.log('Estado de valid=>', estado);
    });
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
    } else {
      this.pantallaGrande = true;
    }
  }

  // Función que valida el formulario
  builderForm() {
    console.log('Celular77->' + this.datosUsuarioRegistrado.celular);
    this.formularioRadicacion = this.fb.group({
      usuarioID: [''],

      horaSiniestro: ['', Validators.required],
      amPm: ['AM'],
      departamento: ['', Validators.required],
      municipio: [{ value: '', disabled: true }, Validators.required],
      direccion: [
        '',
        [Validators.required, Validators.pattern(SIN_ESPACIO_AL_INICIO)],
      ],
      desEvento: [
        '',
        [Validators.required, Validators.pattern(SIN_ESPACIO_AL_INICIO)],
      ],
      descripcionDano: [
        '',
        [Validators.required, Validators.pattern(SIN_ESPACIO_AL_INICIO)],
      ],
      // Datos otro conductor
      nombreConductor: [
        { value: '', disabled: true },
        Validators.pattern(NOMBRES_PATTERN),
      ],
      tipoDocumentoConductor: [{ value: '', disabled: true }],
      numDocumento: [{ value: '', disabled: true }],
      edadconductor: [{ value: '', disabled: true }],
      generoConductor: [{ value: '', disabled: true }],
      // Datos usuario registrado
      nombreContacto: [
        {
          value: `${this.datosUsuarioRegistrado.nombres} ${this.datosUsuarioRegistrado.apellidos}`,
          disabled: true,
        },
        Validators.pattern(NOMBRES_PATTERN),
      ],
      tipoDocContacto: [
        { value: this.datosUsuarioRegistrado.tipoDoc, disabled: true },
      ],
      docContacto: [
        { value: this.datosUsuarioRegistrado.numDoc, disabled: true },
      ],
      numCelular: [
        this.datosUsuarioRegistrado.celular,
        [Validators.required, Validators.pattern(CELULAR_PATTERN)],
      ],
      placa: [''],
      marca: [''],
      modelo: [''],
      ciudad: [''],
      tipoVeh: [''],
      dirContacto: [
        { value: this.datosUsuarioRegistrado.direccion, disabled: true },
        Validators.pattern(SIN_ESPACIO_AL_INICIO),
      ],
    });
    this.fCdirContacto.setValue(this.datosUsuarioRegistrado.direccion);
    this.fCdocContacto.setValue(this.datosUsuarioRegistrado.numDoc);
    this.fCtipoDocContacto.setValue(this.datosUsuarioRegistrado.tipoDoc);
    this.labelTipoDocSeleccionado = this.datosUsuarioRegistrado.tipoDoc;
    this.fCnombreContacto.setValue(
      `${this.datosUsuarioRegistrado.nombres} ${this.datosUsuarioRegistrado.apellidos}`
    );
    this.fCnumCelular.setValue(this.datosUsuarioRegistrado.celular);
    console.log('fCnombreContacto=>', this.fCnombreContacto.value);
  }

  // Función para obtener los datos del localStorage
  obtenerStorage() {
    //this.datosUsuarioRegistrado = JSON.parse(localStorage.getItem(LOCALSTORAGE_USUARIO));
    const usuarioString = localStorage.getItem(LOCALSTORAGE_USUARIO);

    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      this.datosUsuarioRegistrado = usuario;
      console.log('Celular7->' + this.datosUsuarioRegistrado.celular);
      // Now you can use the 'usuario' variable
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
    }
  }

  // Fución para obtener los departamentos
  obtenerDominios() {
    let dominio = new Dominio();
    dominio.tipoDominio = TIPO_DOMINIO_DEPARTAMENTOS;
    this.dominiosService
      .getDominiosAutogestion(dominio)
      .subscribe((data: any) => {
        this.departamentos = data.departamento;
        this.departamentosInmutable = data.departamento;
      });
    dominio.tipoDominio = TIPO_DOMINIO_TIPOS_DOC;
    this.dominiosService
      .getDominiosAutogestion(dominio)
      .subscribe((data: any) => {
        this.tipoDocumento = data.data;
      });
  }

  // Fucición para obtener los municipios
  obtenerMunicipios(departamento: any) {
    this.switchImgAngleSelectAcordeon();

    this.fCDpto.setValue(departamento);
    this.labelDptoSeleccionado = departamento.nombre;
    const dpto = this.departamentos.find(
      (departamento) => departamento.codigo === this.fCDpto!.value!.codigo
    );
    if (dpto !== null && dpto!.codigo!.length > 0) {
      this.ciudadesInmutable = dpto?.municipio ? dpto?.municipio : [];
      this.municipios = dpto?.municipio ? dpto?.municipio : [];
    }
  }
  obtenerCodigoMunicipio(municipio: any) {
    this.switchImgAngleSelectCiudadAcordeon();
    this.fcCiudad.setValue(municipio);
    this.labelCiudadSeleccionado = municipio.nombre;
  }

  // Función para obtener las polizas del usuario registrado
  obtenerPolizas() {
    const datosUsuario = this.datosUsuarioRegistrado;
    this.usuario.tipoDocumento = datosUsuario.tipoDoc;
    this.usuario.numeroDocumento = datosUsuario.numDoc;
    if (window.history.state.vehiculos !== undefined) {
      console.log('Obtener Polizas history', window.history.state.vehiculos);
      this.vehiculo = window.history.state.vehiculos;
      this.obtenerDatosVehiculoInicial();
      // this.obtenerCiudades();
    } else {
      this.radicarSiniestroServices.getVehiculos(this.usuario).subscribe(
        (data: any) => {
          let dataAgrupada = [];
          dataAgrupada =
            this.radicarSiniestroServices.getVehiculosAgrupados(data);
          console.log(
            'Obtener Polizas Data Agrupada',
            dataAgrupada['data']['polizasAutos']
          );
          this.vehiculo = dataAgrupada['data']['polizasAutos'];
          this.obtenerDatosVehiculoInicial();
          //this.obtenerCiudades();
        },
        (error) => {
          console.log(error.status, 'Ocurrio un error');
        }
      );
    }
    this.estadoOnInit = true;
  }

  // Función Para obtener los datos del vehiculo asociado a la poliza
  obtenerDatosVehiculo(event: any) {
    this.switchImgAngleAcordeon();
    this.autoSeleccionado = event;
    this.labelAutoSeleccionado =
      this.autoSeleccionado.marca + ' ' + this.autoSeleccionado.placa;
    this.fCplaca.setValue(this.autoSeleccionado.placa);
    this.fCmarca.setValue(this.autoSeleccionado.marca);
    this.fCmodelo.setValue(this.autoSeleccionado.modelo);
    this.talleres = [];
    this.buscarTaller = false;

    if (this.autoSeleccionado !== null) {
      this.datosAuto = this.autoSeleccionado;
      console.log('Obtener Datos Vehiculos-> ' + this.datosAuto);
      this.placa = this.autoSeleccionado.placa;
      this.marca = this.autoSeleccionado.marca;
      this.modelo = this.autoSeleccionado.modelo;
      this.fechaInicialPoliza = this.autoSeleccionado.fechaVigenciaDesde;
      this.fechaFinalPoliza = this.autoSeleccionado.fechaVigenciaHasta;
      this.fechaMin();
      this.obtenerCiudades();
    }
  }

  obtenerDatosVehiculoInicial() {
    const datosVehiculo = this.vehiculo.filter(
      (data) =>
        data.placa === this.polizaRecibida?.substring(0, 6) ||
        ('' && data.polizaID == this.polizaRecibida.substring(6))
    );
    console.log(
      'obtenerDatosVehiculoInicial ->' + JSON.stringify(datosVehiculo[0])
    );

    if (datosVehiculo[0] !== null) {
      this.datosAuto = datosVehiculo;
      this.autoSeleccionado = datosVehiculo[0];
      console.log('Datos Auto seleccionado  ->' + datosVehiculo);
      this.vehiculoInicial =
        datosVehiculo[0]?.marca + '-' + datosVehiculo[0]?.placa;
      this.placa = datosVehiculo[0]?.placa;
      this.marca = datosVehiculo[0]?.marca;
      this.modelo = datosVehiculo[0]?.modelo;
      this.fechaInicialPoliza = datosVehiculo[0]?.fechaVigenciaDesde;
      this.fechaFinalPoliza = datosVehiculo[0]?.fechaVigenciaHasta;

      this.fechaMin();
    }
  }

  // Función para obtener las ciudades donde existan talleres asignados
  obtenerCiudades() {
    if (this.autoSeleccionado !== null) {
      let tallerSegmentoRequestDTO: TallerSegmentoRequestDTO =
        new TallerSegmentoRequestDTO();
      tallerSegmentoRequestDTO.ciudadID = String(
        this.fCciudadTaller.value?.ciudadID
      );
      tallerSegmentoRequestDTO.tipoVehiculoID =
        this.autoSeleccionado?.tipoVehiculoID;
      tallerSegmentoRequestDTO.marcaID = this.autoSeleccionado?.marcaID;
      tallerSegmentoRequestDTO.placa = this.autoSeleccionado?.placa;
      tallerSegmentoRequestDTO.segmento =
        this.autoSeleccionado?.segmentoVehiculo;
      tallerSegmentoRequestDTO.modelo = this.autoSeleccionado?.modelo;
      tallerSegmentoRequestDTO.codigoTomador =
        this.autoSeleccionado?.codigoTomador;

      this.tallerService
        .getCiudadesSegmento(tallerSegmentoRequestDTO)
        .subscribe(
          (respuestaCiudades: any) => {
            this.ciudades = respuestaCiudades.data.ciudades;
            console.log('Obtener Ciudades ->' + this.ciudades.length);
          },
          (error) => {
            console.log('Ocurrio un error', error);
          }
        );
    }
  }

  // Función para obtener los talleres de la ciudad seleccionada
  buscarTalleres() {
    this.terminoDeBusqueda = '';
    let tallerSegmentoRequestDTO: TallerSegmentoRequestDTO =
      new TallerSegmentoRequestDTO();
    tallerSegmentoRequestDTO.ciudadID = String(
      this.fCciudadTaller.value?.ciudadID
    );
    tallerSegmentoRequestDTO.tipoVehiculoID =
      this.autoSeleccionado.tipoVehiculoID;
    tallerSegmentoRequestDTO.marcaID = this.autoSeleccionado.marcaID;
    tallerSegmentoRequestDTO.placa = this.autoSeleccionado.placa;
    tallerSegmentoRequestDTO.segmento = this.autoSeleccionado.segmentoVehiculo;

    tallerSegmentoRequestDTO.modelo = this.autoSeleccionado.modelo;
    tallerSegmentoRequestDTO.codigoTomador =
      this.autoSeleccionado.codigoTomador;

    this.tallerService.getTalleresSegmento(tallerSegmentoRequestDTO).subscribe(
      (respuestaTalleres: any) => {
        if (respuestaTalleres.data != null) {
          console.log(
            'Data talleres ciudad',
            respuestaTalleres.data.talleres.length
          );
          this.existeTaller = true;
          this.talleres = respuestaTalleres.data.talleres;
          this._snackBar.open(respuestaTalleres.message, 'X', {
            duration: 2000,
            panelClass: 'app-notification-success',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        } else {
          this.existeTaller = false;
          this._snackBar.open(respuestaTalleres.message + ' Respuesta', 'X', {
            duration: 2000,
            panelClass: 'app-notification-error',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getContentType(ext: string): any | null {
    if (ext.toUpperCase() == 'PDF') {
      return CONTENT_TYPE_PDF;
    } else if (
      ext.toUpperCase() == 'PNG' ||
      ext.toUpperCase() == 'JPG' ||
      ext.toUpperCase() == 'JPEG'
    ) {
      return CONTENT_TYPE_JPG;
    } else if (ext.toUpperCase() == 'DOC') {
      return CONTENT_TYPE_DOC;
    } else if (ext.toUpperCase() == 'DOCX') {
      return CONTENT_TYPE_DOCX;
    }
  }

  private cleanStage(label: string): void {
    let found = this.documentosUpload.find(
      (documento: any) => documento.nombre == label
    );
    if (found) {
      this.documentosUpload = this.documentosUpload.filter(function (
        documento
      ) {
        return documento !== found;
      });
    }
  }

  private getExtension(event: any): string {
    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');
    const ext = name.substring(lastDot + 1);
    return ext;
  }

  private extensionArchivoValida(extension: string): boolean {
    if (
      extension.toUpperCase() != 'PDF' &&
      extension.toUpperCase() != 'PNG' &&
      extension.toUpperCase() != 'JPG' &&
      extension.toUpperCase() != 'JPEG' &&
      extension.toUpperCase() != 'DOC' &&
      extension.toUpperCase() != 'DOCX'
    ) {
      let msj = 'El archivo que intentas cargar no tiene el formato permitido.';

      this._snackBar.open(msj + ' ¡Carga de archivos!', 'X', {
        duration: 2000,
        panelClass: 'app-notification-error',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      return false;
    }
    return true;
  }
  private extensionImagenValida(extension: string): boolean {
    if (
      extension.toUpperCase() != 'PNG' &&
      extension.toUpperCase() != 'JPG' &&
      extension.toUpperCase() != 'JPEG'
    ) {
      let msj = 'El archivo que intentas cargar no tiene el formato permitido.';
      this._snackBar.open(msj + ' ¡Carga de archivos!', 'X', {
        duration: 2000,
        panelClass: 'app-notification-error',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      return false;
    }
    return true;
  }

  private sizeArchivoValido(size: number): boolean {
    let sizeToMg = size / 1024 / 1024;
    if (sizeToMg > 5) {
      let msj =
        'El archivo que intentas cargar supera el tamaño máximo permitido.';

      this._snackBar.open(msj + ' ¡Carga de archivos!', 'X', {
        duration: 2000,
        panelClass: 'app-notification-error',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      return false;
    }
    return true;
  }

  private documentStage(
    file: Blob,
    nameLabel: string | '',
    contentType: string | ''
  ): void {
    let reader = new FileReader();
    //let obj = [];
    reader.readAsDataURL(file);
    let documento = new EvidenciaSiniestroDTO();
    reader.onload = function () {
      let obj = reader.result?.toString().split(',');
      documento.nombre = nameLabel;
      documento.file = obj![1];
      documento.contentType = contentType;
    };
    this.documentosUpload.push(documento);
  }

  checkTaller(e: { checked: boolean }, taller: Taller) {
    if (e.checked === true) {
      this.seleccionTaller = true;
      this.tallerSeleccionado = taller;
    } else {
      this.seleccionTaller = false;
      this.tallerSeleccionado = new Taller();
    }
  }

  // Función que valida el formato del documento
  validarFormatoDocumento($event: KeyboardEvent) {
    const stringKey: string = $event.key;
    let match = null;
    if (!this.tipoDocumento) {
      $event.preventDefault();
    } else {
      match = stringKey.match(SOLO_NUMEROS_PATTERN);
    }
    if (!match) {
      $event.preventDefault();
    }
  }

  soloNumeros($event: KeyboardEvent) {
    const stringKey: string = $event.key;
    const match = stringKey.match(SOLO_NUMEROS_PATTERN);
    if (!match) {
      $event.preventDefault();
    }
  }

  // Función para radicar siniestro
  radicarSiniestro() {
    this.formEnviado = true;
    if (this.validarCampos()) {
      this.sendDatosBasicos();
    } else {
      let msj =
        'Para procesar la radicación del siniestro, debe diligenciar los campos obligatorios.';
      this._snackBar.open(msj + ' ¡Radicación de siniestro!', 'X', {
        duration: 2000,
        panelClass: 'app-notification-error',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  private sendDatosBasicos(): void {
    this.formularioRadicacion.value.usuarioID =
      this.datosUsuarioRegistrado.usuarioID;
    let fechaSeleccionada = null;

    const retorno = this.extraerFecha();
    fechaSeleccionada = retorno.fechaSeleccionada;

    let fechaAux = (<string>fechaSeleccionada!).split(' ');
    let fecha = `${this.fCfecha!.value} ${fechaAux[1]} ${fechaAux[2]}`;
    let siniestroDatosBasicos = new SiniestroCreateDTO();
    siniestroDatosBasicos.usuarioID = this.datosUsuarioRegistrado.usuarioID;
    siniestroDatosBasicos.departamento = this.fCDpto.value!.codigo;
    siniestroDatosBasicos.municipio = this.fcCiudad.value!.codigo;
    siniestroDatosBasicos.direccion = String(this.fCdireccion.value);
    siniestroDatosBasicos.placa = String(this.fCplaca.value);
    siniestroDatosBasicos.marca = String(this.fCmarca.value);
    siniestroDatosBasicos.fecha = fecha;
    siniestroDatosBasicos.desEvento = String(this.fCdesEvento.value);
    siniestroDatosBasicos.descripcionDano = String(this.fCdesAveria.value);
    siniestroDatosBasicos.nombreContacto = this.datosUsuarioRegistrado.nombres;
    siniestroDatosBasicos.apellidosContacto =
      this.datosUsuarioRegistrado.apellidos;
    siniestroDatosBasicos.tipoDocContacto = String(
      this.fCtipoDocContacto.value
    );
    siniestroDatosBasicos.docContacto = String(this.fCdocContacto.value);
    siniestroDatosBasicos.emailContacto = this.datosUsuarioRegistrado.email;
    siniestroDatosBasicos.numCelular = String(this.fCnumCelular.value);
    siniestroDatosBasicos.dirContacto = String(this.fCdirContacto.value);
    this.siniestroAsegurado = !this.esConductorDiferente
      ? false
      : this.esConductorDiferente;
    siniestroDatosBasicos.siniestroAsegurado = this.siniestroAsegurado;
    siniestroDatosBasicos.codigoTomador = this.autoSeleccionado.codigoTomador;
    siniestroDatosBasicos.nombreTomador = this.autoSeleccionado.nombreTomador;
    if (this.esConductorDiferente) {
      siniestroDatosBasicos.nombreConductor = String(
        this.fCconductorNombre.value
      );
      siniestroDatosBasicos.tipoDocumento = String(
        this.fCconductorTipoDocumento.value
      );
      siniestroDatosBasicos.numDocumento = String(
        this.fCconductorDocumento.value
      );
      siniestroDatosBasicos.edadConductor = parseInt(
        String(this.fCconductorEdad.value)
      );
      siniestroDatosBasicos.generoConductor = String(this.fCgenero.value);
    } else {
      siniestroDatosBasicos.nombreConductor = String(
        this.fCnombreContacto.value
      );
      siniestroDatosBasicos.tipoDocumento = String(
        this.fCtipoDocContacto.value
      );
      siniestroDatosBasicos.numDocumento = String(this.fCdocContacto.value);
    }
    if (this.fCtaller.valid) {
      console.log('Taller=>', this.fCtaller.value);
      siniestroDatosBasicos.seleccionTaller = 'S';
      siniestroDatosBasicos.tallerID = this.fCtaller.value!.id;
    } else {
      siniestroDatosBasicos.seleccionTaller = 'N';
    }
    //console.log("siniestroDatosBasicos->" + JSON.stringify(siniestroDatosBasicos));
    this.radicarSiniestroServices
      .registroDatosBasicos(siniestroDatosBasicos)
      .subscribe((respuestaSiniestroRadicado) => {
        if (
          respuestaSiniestroRadicado &&
          respuestaSiniestroRadicado.success == true
        ) {
          this.idSiniestro = respuestaSiniestroRadicado.data.siniestroID;
          this.sendDocumentos();
          siniestroDatosBasicos.siniestroID = this.idSiniestro;
          this.radicarSiniestroServices
            .radicarSiniestro(siniestroDatosBasicos)
            .subscribe((respuestaContacta) => {
              if (respuestaContacta && respuestaContacta.success == true) {
                let solicitudNotificaciones: any = {};
                solicitudNotificaciones.tipoDocumento = this.usuario.tipoDoc;
                solicitudNotificaciones.numeroDocumento = this.usuario.numDoc;
                solicitudNotificaciones.username = this.usuario.email;
                this.utilService.getCountNotifications(solicitudNotificaciones);
                const fecha_actual = new Date();
                /*this.router.navigate(['/confirmacion'], {
              state: {
                placa: this.placa,
                fecha_actual
              }
            });*/
                this.openDialogSendRadicar();
              } else {
                let msj = 'Ocurrió un error registrando el siniestro';

                /* this.toast.error(msj, '¡Error!', {
              closeButton: true,
              titleClass: 'toast-tittle-error'
            });*/
                this._snackBar.open(msj + ' ¡Error!', 'X', {
                  duration: 2000,
                  panelClass: 'app-notification-error',
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                });
              }
            });
        } else {
          let msj = 'Ocurrió un error registrando el siniestro';

          /* this.toast.error(msj, '¡Error!', {
          closeButton: true,
          titleClass: 'toast-tittle-error'
        });*/
          this._snackBar.open(msj + ' ¡Error!', 'X', {
            duration: 2000,
            panelClass: 'app-notification-error',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      });
  }
  private sendDocumentos(): void {
    console.log('Almacenando evidnecia');
    if (this.documentosUpload && this.documentosUpload.length > 0) {
      this.documentosUpload.forEach((element: EvidenciaSiniestroDTO) => {
        element.siniestroID = this.idSiniestro;
        this.radicarSiniestroServices
          .cargarEvidencia(element)
          .subscribe((respuestaJson) => {
            console.log(respuestaJson);
          });
      });
    }
  }

  // Función camcio tipo documento otro conductor
  cambiarDocumentoOtroCunductor(evento: any) {
    this.switchImgAngleSelectTipoDocAcordeon();
    this.fCconductorTipoDocumento.setValue(evento.codigo);
    console.log(
      'fCconductorTipoDocumento',
      this.fCconductorTipoDocumento.value
    );
    this.labelTipoDocConductorSeleccionado = evento.nombre;
  }

  // Función camcio tipo documento Usuario
  cambiarDocumentoContacto(evento: any) {
    this.fCdocContacto!.reset();
    this.fCdocContacto!.enable();
    this.tipoDocConductor = true;
  }

  fechaMin() {
    if (this.fechaInicialPoliza) {
      let fechaAux = this.datePipe
        .transform(this.fechaInicialPoliza, 'yyyy-MM-dd')!
        .split('-');
      if (fechaAux) {
        this.fechaMinima = fechaAux[0] + '-' + fechaAux[1] + '-' + fechaAux[2];
      }
    }
  }

  public getTipoVehPesados(): boolean | any {
    if (
      this.datosAuto![0] &&
      this.datosAuto![0]['segmentoVehiculo'] &&
      (<string>this.datosAuto![0]['segmentoVehiculo']).toUpperCase() ==
        TIPO_VEH_PESADO
    ) {
      return true;
    }
  }

  private obtenerTiposVehiculo() {
    this.tallerService.getTipoVehiculo().subscribe(
      (respuesta: any) => {
        this.tiposVehiculo = respuesta.data;
      },
      (error) => {
        // console.log('Ocurrio un error', error);
      }
    );
  }

  ubicarTaller(taller: Taller): string {
    return `${this.urlMapsBase}${taller.latitud},${taller.longitud}`;
  }

  private configurarFechasCalendar() {
    let fechaActual = new Date();
    this.fechaMinimaCalendar.year = fechaActual.getFullYear() - 2;
    this.fechaMinimaCalendar.month = 1;
    this.fechaMinimaCalendar.day = 1;

    this.fechaMaximaCalendar.year = fechaActual.getFullYear();
    this.fechaMaximaCalendar.month = fechaActual.getMonth() + 1;
    this.fechaMaximaCalendar.day = fechaActual.getDate();
  }

  private validacionesAdicionales() {
    let fechaSeleccionada = null;
    let fechaActual = null;
    try {
      const retorno = this.extraerFecha();
      fechaSeleccionada = retorno.fechaSeleccionada;
      fechaActual = retorno.fechaActual;

      let f1 = new Date(fechaActual);
      let f2 = new Date(fechaSeleccionada);
      if (f1 < f2) {
        this.fCTime.setErrors({ incorrect: null });
        let msj =
          'La hora del siniestro no puede ser superior a la hora actual.';
        /*this.toast.error(msj, '¡Radicación de siniestro', {
             closeButton: true,
             titleClass: 'toast-tittle-error'
           });*/
        this._snackBar.open(msj + ' ¡Radicación de siniestro!', 'X', {
          duration: 2000,
          panelClass: 'app-notification-error',
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        return false;
      }
      return true;
    } catch (e) {
      this.fCTime.setErrors({ incorrect: true });
      return false;
    }
  }

  /**
   * Validación de fecha
   */
  public validarFechaSiniestro(arg: any) {
    //console.log("fecha->" + this.fCfecha?.value);
    // if(this.estadoOnInit){
    let fechaForm = null;
    let placaActual: any[];
    let listaPolizas: any[] = [];
    placaActual = this.vehiculo.filter(
      (data) =>
        data.placa === this.autoSeleccionado.placa &&
        data.polizaID === this.autoSeleccionado.polizaID
    );
    //console.log("Pilizas Anteriores ->" + placaActual[0]['polizasAnteriores']);
    listaPolizas = cloneDeep(placaActual[0]['polizasAnteriores']);
    listaPolizas.push(placaActual[0]);
    listaPolizas.sort(
      (
        a: { fechaVigenciaHasta: number },
        b: { fechaVigenciaHasta: number }
      ) => {
        return b.fechaVigenciaHasta - a.fechaVigenciaHasta;
      }
    );
    let esValida = false;
    //console.log("fecha->" + this.fCfecha?.value);
    let fecha = this.fCfecha.value!.split('/');
    let fechaIso = `${fecha[2]}-${fecha[1]}-${fecha[0]}`;

    let f1 = new Date(fechaIso);
    listaPolizas.forEach(
      (vehicle: {
        fechaVigenciaDesde: string | number | Date;
        fechaVigenciaHasta: string | number | Date;
      }) => {
        let fechaInicio = new Date(vehicle.fechaVigenciaDesde);
        let fechaFin = new Date(vehicle.fechaVigenciaHasta);

        if (f1 >= fechaInicio && f1 <= fechaFin) {
          esValida = true;
        }
      }
    );

    //}
  }

  validarData(data: any) {
    return (
      data !== null &&
      data !== '' &&
      data.trim() !== '' &&
      data.toString() !== ' '
    );
  }

  private modalPolizaVencida(placa: string): MatDialogRef<any> {
    let botones: Boton[] = [];
    return this.dialog.open(ModalGenericoComponent, {
      width: '30em',
      height: '',
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: '¡Lo Sentimos!',
        claseTitulo: 'mat-dialog-title-warning',
        icono: ICO_ALERTA_NARANJA_PNG,
        subtitulo: '',
        html: `Para la fecha seleccionada no cuentas <br> con una póliza de automóviles vigente. <br> Por favor intenta nuevamente o <br> comunícate al <span class="font-weight-bold">#345.</span>`,
        claseSubtitulo: 'mat-dialog-subtitle-error',
        contenido: '',
        botones: botones,
      },
      autoFocus: false,
    });
  }

  private extraerFecha() {
    let fechaSeleccionada = null;
    let fechaActual = null;
    let fechaActualDate = new Date();
    let horaComponente =
      this.fCTime!.value!.hour < 10
        ? `0${this.fCTime!.value!.hour}`
        : this.fCTime!.value!.hour;
    let minutosComponente =
      this.fCTime!.value!.minute < 10
        ? `0${this.fCTime!.value!.minute}`
        : this.fCTime!.value!.minute;
    let hora = `${horaComponente}:${minutosComponente}`;
    let fecha = this.fCfecha.value!.split('/');
    try {
      let fechaIso = `${fecha[2]}-${fecha[1]}-${fecha[0]} ${this.formatHora(
        hora
      )}`;
      let horaActual = `${fechaActualDate.getHours()}:${fechaActualDate.getMinutes()}`;
      let fechaIso2 = `${fechaActualDate.getFullYear()}-${
        fechaActualDate.getMonth() + 1
      }-${fechaActualDate.getDate()} ${this.formatHora(horaActual)}`;

      fechaSeleccionada = fechaIso;
      fechaActual = fechaIso2;
    } catch (e) {
      fechaSeleccionada = new Date(`${this.fCfecha} ${hora}`);
      fechaActual = new Date();
    }

    return { fechaSeleccionada, fechaActual };
  }

  private formatHora(hora: string) {
    let horaAux = hora.split(':');
    let hh: any = Number(horaAux[0]);
    let minutesFormat: any = horaAux[1];
    let dd = 'AM';
    let horaFormat: any = hh;
    if (horaFormat > 12) {
      horaFormat = hh - 12;
      dd = 'PM';
    }
    if (horaFormat == 0) {
      horaFormat = 12;
    }
    return `${
      horaFormat < 10 ? '0' + horaFormat : horaFormat
    }:${minutesFormat} ${dd}`;
  }

  fechangmodelchange(value: any) {
    //console.log(value);
  }
  redireccionar(path: string): void {
    //console.log("Home");
    this.router.navigate([path]);
  }

  switchImgAngleAcordeon() {
    if (this.imgAngleAcordeonCurrent === this.imgAngleacordeonDown)
      this.imgAngleAcordeonCurrent = this.imgAngleacordeonUp;
    else this.imgAngleAcordeonCurrent = this.imgAngleacordeonDown;
  }
  switchImgAngleSelectAcordeon() {
    if (this.imgAngleAcordeonSelectCurrent === this.imgAngleacordeonSelectDown)
      this.imgAngleAcordeonSelectCurrent = this.imgAngleacordeonSelectUp;
    else this.imgAngleAcordeonSelectCurrent = this.imgAngleacordeonSelectDown;
  }
  switchImgAngleSelectCiudadAcordeon() {
    if (
      this.imgAngleAcordeonSelectCiudadCurrent ===
      this.imgAngleacordeonSelectCiudadDown
    )
      this.imgAngleAcordeonSelectCiudadCurrent =
        this.imgAngleacordeonSelectCiudadUp;
    else
      this.imgAngleAcordeonSelectCiudadCurrent =
        this.imgAngleacordeonSelectCiudadDown;
  }
  switchImgAngleSelectCiudadTallerAcordeon() {
    if (
      this.imgAngleAcordeonSelectCiudadTallerCurrent ===
      this.imgAngleacordeonSelectCiudadTallerDown
    )
      this.imgAngleAcordeonSelectCiudadTallerCurrent =
        this.imgAngleacordeonSelectCiudadTallerUp;
    else
      this.imgAngleAcordeonSelectCiudadTallerCurrent =
        this.imgAngleacordeonSelectCiudadTallerDown;
  }
  switchImgAngleSelectTipoDocAcordeon() {
    if (
      this.imgAngleAcordeonSelectTipoDocCurrent ===
      this.imgAngleacordeonSelectTipoDocDown
    )
      this.imgAngleAcordeonSelectTipoDocCurrent =
        this.imgAngleacordeonSelectTipoDocUp;
    else
      this.imgAngleAcordeonSelectTipoDocCurrent =
        this.imgAngleacordeonSelectTipoDocDown;
  }
  switchImgAngleSelectGeneroAcordeon() {
    if (
      this.imgAngleAcordeonSelectGeneroCurrent ===
      this.imgAngleacordeonSelectGeneroDown
    )
      this.imgAngleAcordeonSelectGeneroCurrent =
        this.imgAngleacordeonSelectGeneroUp;
    else
      this.imgAngleAcordeonSelectGeneroCurrent =
        this.imgAngleacordeonSelectGeneroDown;
  }
  filtrarByPatternMatching(opc: number, search: any) {
    if (opc === 1) {
      this.departamentos = this.departamentos.filter((dpto) =>
        dpto.nombre?.includes(search)
      );
    }
  }

  onKeyUp(opc: number, search: any) {
    // appending the updated value to the variable
    if (opc === 1) {
      if (search.target.value.length === 0)
        this.departamentos = this.departamentosInmutable;
      this.departamentos = this.departamentosInmutable.filter((dpto) =>
        dpto.nombre?.includes(search.target.value)
      );
    } else if (opc === 2) {
      if (search.target.value.length === 0)
        this.municipios = this.ciudadesInmutable;
      this.municipios = this.ciudadesInmutable.filter((ciudad) =>
        ciudad.nombre?.includes(search.target.value)
      );
    }
  }
  buscarTallerList(opc: number, search: any) {
    // appending the updated value to the variable
    if (opc === 1) {
      if (search.target.value.length === 0)
        this.departamentos = this.departamentosInmutable;
      this.departamentos = this.departamentosInmutable.filter((dpto) =>
        dpto.nombre?.includes(search.target.value)
      );
    } else if (opc === 2) {
      if (search.target.value.length === 0)
        this.municipios = this.ciudadesInmutable;
      this.municipios = this.ciudadesInmutable.filter((ciudad) =>
        ciudad.nombre?.includes(search.target.value)
      );
    }
  }
  conductorDiferente(isDiferente: any) {
    // console.log(isDiferente.target.checked)
    this.esConductorDiferente = isDiferente.target.checked;
  }
  escogerGenero(genero: string) {
    this.fCgenero.setValue(genero);
    this.labelGeneroSeleccionado = genero === 'M' ? 'Masculino' : 'Femenino';
    this.switchImgAngleSelectGeneroAcordeon();
  }
  stepsRadicar() {
    this.numStepRadicar = this.numStepRadicar + 1;

    if (this.numStepRadicar <= 4) {
      if (this.numStepRadicar === 2) {
        this.classDatos = this.classPrevious;
        this.classDocumentos = this.classCurrent;
        this.imgCurrentDocumentos = this.imgDocumentosWhite;
        this.classTaller = this.classNext;
        this.classResumen = this.classNext;
      } else if (this.numStepRadicar === 3) {
        this.classDatos = this.classPrevious;
        this.classDocumentos = this.classPrevious;
        this.classTaller = this.classCurrent;
        this.imgCurrentTaller = this.imgTallerWhite;
        this.classResumen = this.classNext;
      } else if (this.numStepRadicar === 4) {
        this.classDatos = this.classPrevious;
        this.classDocumentos = this.classPrevious;
        this.classTaller = this.classPrevious;
        this.classResumen = this.classCurrent;
        this.imgCurrentResumen = this.imgResumenWhite;
      }
    }
  }
  testtime(event: any) {
    //console.log("celular=>", this.fCcelular.value)
    //  console.log("Time=>", this.fCTime.value)
  }
  selectFileUpload(opc: number) {
    let fileUpload = null;
    let imgPreview = null;
    switch (opc) {
      case 1:
        fileUpload = document.getElementById(
          'uploadFileTargeta'
        ) as HTMLInputElement;
        break;
      case 2:
        fileUpload = document.getElementById(
          'uploadFileTargetaRespaldo'
        ) as HTMLInputElement;
        break;
      case 3:
        fileUpload = document.getElementById(
          'uploadFileCedula'
        ) as HTMLInputElement;
        break;
      case 4:
        fileUpload = document.getElementById(
          'uploadFileCedulaRespaldo'
        ) as HTMLInputElement;
        break;
      case 5:
        fileUpload = document.getElementById(
          'uploadFileLicencia'
        ) as HTMLInputElement;
        break;
      case 6:
        fileUpload = document.getElementById(
          'uploadFileLicenciaRespaldo'
        ) as HTMLInputElement;
        break;
      case 7:
        fileUpload = document.getElementById(
          'uploadFotoLateralDerecho'
        ) as HTMLInputElement;
        imgPreview = document.getElementById('imgFrameFotoLateralDerecho');
        imgPreview?.setAttribute('src', this.imgDeleteEvidencia);
        break;
      case 8:
        fileUpload = document.getElementById(
          'uploadFotoFrontal'
        ) as HTMLInputElement;
        imgPreview = document.getElementById('imgFrameFotoFrontal');
        imgPreview?.setAttribute('src', this.imgDeleteEvidencia);
        break;
      case 9:
        fileUpload = document.getElementById(
          'uploadFotoLateralIzquierdo'
        ) as HTMLInputElement;
        imgPreview = document.getElementById('imgFrameFotoLateralIzquierdo');
        imgPreview?.setAttribute('src', this.imgDeleteEvidencia);
        break;
      case 10:
        fileUpload = document.getElementById(
          'uploadFotoTrasero'
        ) as HTMLInputElement;

        break;
      case 11:
        fileUpload = document.getElementById(
          'uploadFotoCroquis'
        ) as HTMLInputElement;

        break;
    }

    fileUpload!.click();
  }
  selectFile(event: any, opc: number): void {
    let img = null;
    let imgPreview = null;
    // console.log("File ->" + event.target.files[0].name);
    switch (opc) {
      case 1:
        this.fCtargeta.setValue(event.target.files[0].name);
        break;
      case 2:
        this.fCtargetaRespaldo.setValue(event.target.files[0].name);
        break;
      case 3:
        this.fCcedula.setValue(event.target.files[0].name);
        break;
      case 4:
        this.fCcedulaRespaldo.setValue(event.target.files[0].name);
        break;
      case 5:
        this.fClicencia.setValue(event.target.files[0].name);
        break;
      case 6:
        this.fClicenciaRespaldo.setValue(event.target.files[0].name);
        break;
      case 7:
        img = URL.createObjectURL(event.target.files[0]);
        imgPreview = document.getElementById('imgFotoLateralDerecho');
        imgPreview?.setAttribute('src', img);
        imgPreview?.setAttribute('width', '173.8px;');
        imgPreview?.setAttribute('height', '105.39px;');
        imgPreview = document.getElementById('imgFrameFotoLateralDerecho');
        imgPreview?.setAttribute('src', this.imgDeleteEvidencia);
        break;
      case 8:
        this.fCfileFrontal.setValue(event.target.files[0].name);
        img = URL.createObjectURL(event.target.files[0]);
        imgPreview = document.getElementById('imgFotoFrontal');
        imgPreview?.setAttribute('src', img);
        imgPreview?.setAttribute('width', '173.8px;');
        imgPreview?.setAttribute('height', '105.39px;');
        imgPreview = document.getElementById('imgFrameFotoFrontal');
        imgPreview?.setAttribute('src', this.imgDeleteEvidencia);
        break;
      case 9:
        img = URL.createObjectURL(event.target.files[0]);
        imgPreview = document.getElementById('imgFotoLateralIzquierdo');
        imgPreview?.setAttribute('src', img);
        imgPreview?.setAttribute('width', '173.8px;');
        imgPreview?.setAttribute('height', '105.39px;');
        imgPreview = document.getElementById('imgFrameFotoLateralIzquierdo');
        imgPreview?.setAttribute('src', this.imgDeleteEvidencia);
        break;
      case 10:
        img = URL.createObjectURL(event.target.files[0]);
        imgPreview = document.getElementById('imgFotoTrasero');
        imgPreview?.setAttribute('src', img);
        imgPreview?.setAttribute('width', '173.8px;');
        imgPreview?.setAttribute('height', '105.39px;');
        imgPreview = document.getElementById('imgFrameFotoTrasero');
        imgPreview?.setAttribute('src', this.imgDeleteEvidencia);
        break;
      case 11:
        img = URL.createObjectURL(event.target.files[0]);
        imgPreview = document.getElementById('imgFotoCroquis');
        imgPreview?.setAttribute('src', img);
        imgPreview?.setAttribute('width', '173.8px;');
        imgPreview?.setAttribute('height', '105.39px;');
        imgPreview = document.getElementById('imgFrameFotoCroquis');
        imgPreview?.setAttribute('src', this.imgDeleteEvidencia);
        break;
    }
    this.documentStage(
      event.target.files[0],
      event.target.files[0].name,
      event.target.files[0].type
    );
  }
  deleteFile(opc: number): void {
    let imgPreview = null;
    switch (opc) {
      case 1:
        this.cleanStage(String(this.fCtargeta.value));
        this.fCtargeta.setValue('');
        this.fCfileTargeta.setValue(null);
        break;
      case 2:
        this.cleanStage(String(this.fCtargetaRespaldo.value));
        this.fCtargetaRespaldo.setValue('');
        this.fCfileTargetaRespaldo.setValue(null);
        break;
      case 3:
        this.cleanStage(String(this.fCcedula.value));
        this.fCcedula.setValue('');
        this.fCfileCedula.setValue(null);
        break;
      case 4:
        this.fCcedulaRespaldo.setValue('');
        this.cleanStage(String(this.fCcedulaRespaldo.value));
        this.fCfileCedulaRespaldo.setValue(null);
        break;
      case 5:
        this.cleanStage(String(this.fClicencia.value));
        this.fClicencia.setValue('');
        this.fCfileLicencia.setValue(null);
        break;
      case 6:
        this.cleanStage(String(this.fClicenciaRespaldo.value));
        this.fClicenciaRespaldo.setValue('');
        this.fCfileLicenciaRespaldo.setValue(null);
        break;
      case 7:
        this.cleanStage(String(this.fCfileLateralDerecho.value));
        this.fCfileLateralDerecho.setValue(null);
        imgPreview = document.getElementById('imgFotoLateralDerecho');
        imgPreview?.setAttribute('src', this.imgFotoLateralDerecho);
        imgPreview?.setAttribute('width', '95px;');
        imgPreview?.setAttribute('height', '65px;');
        imgPreview = document.getElementById('imgFrameFotoLateralDerecho');
        imgPreview?.setAttribute('src', this.imgFotoWhite);
        break;
      case 8:
        this.cleanStage(String(this.fCfileLateralDerecho.value));
        this.fCfileFrontal.setValue(null);
        imgPreview = document.getElementById('imgFotoFrontal');
        imgPreview?.setAttribute('src', this.imgFotoFrontal);
        imgPreview?.setAttribute('width', '95px;');
        imgPreview?.setAttribute('height', '65px;');
        imgPreview = document.getElementById('imgFrameFotoFrontal');
        imgPreview?.setAttribute('src', this.imgFotoWhite);
        break;
      case 9:
        this.cleanStage(String(this.fCfileLateralIzquierdo.value));
        this.fCfileLateralIzquierdo.setValue(null);
        imgPreview = document.getElementById('imgFotoLateralIzquierdo');
        imgPreview?.setAttribute('src', this.imgFotoLateralIzquierdo);
        imgPreview?.setAttribute('width', '95px;');
        imgPreview?.setAttribute('height', '65px;');
        imgPreview = document.getElementById('imgFrameFotoLateralIzquierdo');
        imgPreview?.setAttribute('src', this.imgFotoWhite);
        break;
      case 10:
        this.cleanStage(String(this.fCfileTrasero.value));
        this.fCfileTrasero.setValue(null);
        imgPreview = document.getElementById('imgFotoTrasero');
        imgPreview?.setAttribute('src', this.imgFotoTrasero);
        imgPreview?.setAttribute('width', '95px;');
        imgPreview?.setAttribute('height', '65px;');
        imgPreview = document.getElementById('imgFrameFotoTrasero');
        imgPreview?.setAttribute('src', this.imgFotoWhite);
        break;
      case 11:
        this.cleanStage(String(this.fCfileCroquis.value));
        this.fCfileCroquis.setValue(null);
        imgPreview = document.getElementById('imgFotoCroquis');
        imgPreview?.setAttribute('src', this.imgFotoCroquis);
        imgPreview?.setAttribute('width', '95px;');
        imgPreview?.setAttribute('height', '65px;');
        imgPreview = document.getElementById('imgFrameFotoCroquis');
        imgPreview?.setAttribute('src', this.imgFotoWhite);
        break;
    }
    this.closeDialog();
  }
  openDialogDeleteFile(opc: number) {
    this.opc = opc;
    this.dialog.open(this.callDialogDeleteFile);
  }
  openDialogSendRadicar() {
    this.dialog.open(this.callDialogSendRadicar);
  }
  closeDialog() {
    this.dialog.closeAll();
  }

  validarCampos() {
    /*console.log("numStepRadicar=>", this.numStepRadicar);
    console.log("fCTime=>", this.fCTime.valid);
    console.log("fCdesEvento=>", this.fCdesEvento.valid);
    console.log("fCdireccion=>", this.fCdireccion.valid);
    console.log("fCnombreContacto=>", this.fCnombreContacto.valid);
    console.log("fCtipoDocContacto=>", this.fCtipoDocContacto.valid);
    console.log("fCdesAveria=>", this.fCdesAveria.valid);
    console.log("fCdirContacto=>", this.fCdirContacto.valid);
    console.log("fCdocContacto=>", this.fCdocContacto.valid);
    console.log("fCmarca=>", this.fCmarca.valid);
    console.log("fCmodelo=>", this.fCmodelo.valid);
    console.log("fCfecha=>", this.fCfecha.valid);
    console.log("fCDpto=>", this.fCDpto.value);*/

    if (this.numStepRadicar === 1) {
      if (
        this.fCTime.valid &&
        this.fCdesAveria.valid &&
        this.fCplaca.valid &&
        this.fCdesEvento.valid &&
        this.fCdirContacto.valid &&
        this.fCmodelo.valid &&
        this.fCdireccion.valid &&
        this.fCdocContacto.valid &&
        this.fCfecha.valid &&
        this.fCnombreContacto.valid &&
        this.fCmarca.valid &&
        this.fCDpto!.value!.codigo &&
        this.fCtipoDocContacto.valid &&
        this.fcCiudad!.value!.codigo
      ) {
        /* console.log('fCconductorDocumento', this.fCconductorDocumento.value)
            console.log('fCconductorNombre', this.fCconductorNombre.value)
            console.log('fCconductorEdad', this.fCconductorEdad.value)
            console.log('fCconductorTipoDocumento', this.fCconductorTipoDocumento.value)
            console.log('fCgenero', this.fCgenero.value)*/
        console.log('esconductor', this.esConductorDiferente);
        console.log(
          'fCconductorTipoDocumento',
          this.fCconductorTipoDocumento.value
        );

        if (this.esConductorDiferente === false) return true;
        if (
          this.fCconductorDocumento.value &&
          this.fCconductorTipoDocumento.value &&
          this.fCconductorNombre.value &&
          this.fCgenero.value &&
          this.fCconductorEdad.value
        ) {
          return true;
        }
      }
    } else if (this.numStepRadicar === 2) return true;
    else if (this.numStepRadicar === 3) {
      return this.habilitarContinuarGeneral;
    } else if (this.numStepRadicar === 4) {
      this.labelButtonContinue = 'Radicar siniestro';
      return true;
    }
    return false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("changes=>", changes);
  }

  pathToTalleresoResumen() {
    this.habilitarContinuarTaller = false;
    // console.log("opc find taller=>", this.opcSelectFindtaller)
    if (this.opcSelectFindtaller === 'yes') this.numStepRadicar = 4;
    else this.visibleButtonContinuar = true;
  }
  public habilitarBusquedaTalleres(opc: any): void {
    // console.log("habilitarBusquedaTalleres=>", opc)
    this.habilitarContinuarTaller = true;
    this.opcSelectFindtaller = opc;
  }
  public selectCiudad(ciudad: any) {
    this.switchImgAngleSelectCiudadTallerAcordeon();
    this.labelCiudadTallerSeleccionado = ciudad.nombre;
    this.fCciudadTaller.setValue(ciudad);
    console.log('Ciudad ID=>', this.fCciudadTaller.value?.ciudadID);
  }
  public selectTaller(taller: Taller) {
    this.fCtaller.setValue(taller);
    this.habilitarContinuarGeneral = true;
  }
}
