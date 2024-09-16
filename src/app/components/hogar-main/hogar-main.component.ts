import { Component, ElementRef, HostListener, OnInit, ViewChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import {FormsModule,FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';

import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDatepicker, NgbDate, NgbModule, NgbTimepickerModule, NgbTimepicker, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import { TipoDocumento } from '../../models/tipo-documento';
import { DominiosService } from '../../services/dominios.service';
import { Dominio } from "../../models/dominio";
import { RouterModule, Routes, Router } from "@angular/router";
import { DatePipe, TitleCasePipe, NgStyle, CommonModule } from "@angular/common";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Boton } from "../../models/boton";
import { ModalGenericoComponent } from "../../shared/modales/modal-generico/modal-generico.component";
import { UtilService } from "../../services/util.service";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { cloneDeep } from "lodash";
import { ICON_FLECHA_ABAJO, ICON_FLECHA_ARRIBA, ICON_FLECHA_RETORNO, ICON_PASO_CINCO_DOS, ICON_PASO_CINCO_TRES, ICON_PASO_CINCO_UNO, ICON_PASO_CUATRO_DOS, ICON_PASO_CUATRO_TRES, ICON_PASO_CUATRO_UNO, ICON_PASO_DOS_DOS, ICON_PASO_DOS_TRES, ICON_PASO_DOS_UNO, ICON_PASO_TRES_DOS, ICON_PASO_TRES_TRES, ICON_PASO_TRES_UNO, ICON_PASO_UNO_DOS, ICON_PASO_UNO_TRES, ICON_PASO_UNO_UNO, ICO_AGREGAR, ICO_ALERTA_NARANJA_PNG, ICO_ALERTA_VERDE, ICO_ME_VARE, ICO_TRASH, ICO_VOLVER, IMG_PASO_CINCO, IMG_PASO_CUATRO, IMG_PASO_DOS, IMG_PASO_TRES, IMG_PASO_UNO, URL_BASE, URL_SEGUIMIENTO, URL_TALLERES } from '../../shared/constantes';
import { Usuario } from '../../models/usuario';
import { PolizaAutoDTO } from '../../models/polizaAutoDTO';
import { RadicarSiniestroService } from '../../services/radicar-siniestro.service';
import { PolizaService } from '../../services/poliza.service';
import { ModalService } from '../../services/modal.service';
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

import {
 
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
 

} from '@angular/material/dialog';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { FooterComponent } from '../../shared/footer/footer.component';

import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TIPO_DOMINIO_TIPOS_DOC, SOLO_NUMEROS_PATTERN } from '../../shared/constantes';
@Component({
  selector: 'app-autos-main',
  templateUrl: './hogar-main.component.html',
  styleUrls: ['./hogar-main.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    
    
    RouterModule,
    DatePipe,
    TitleCasePipe,
    NgStyle,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatStepperModule,
    FormsModule,
    MatSnackBarLabel, 
    MatSnackBarActions, 
    MatSnackBarAction,
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    FooterComponent,
    PlantillaGeneralComponent,
    NzCarouselModule,
    CarouselModule,
    NgbModule,
    ReactiveFormsModule
    
    
  ],
  
  
})
export class HogarMainComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  
  effect = 'scrollx';
  @ViewChild('callDialogAddHogar') callDialogAddHogar = {} as TemplateRef<any>;
  @ViewChild('callDialogStepSinister') callDialogStepSinister = {} as TemplateRef<any>;
  @ViewChild('callDialogHistoricos') callDialogHistoricos = {} as TemplateRef<any>;
  @ViewChild('agregarVehiculo') agregarVehiculo: ElementRef | undefined;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;
  @ViewChild('callDialogDeleteHogar') callDialogDeleteHogar = {} as TemplateRef<any>;
  @ViewChild('callDialogRespuesta') callDialogRespuesta = {} as TemplateRef<any>;
  iconoCarro = ICO_ME_VARE;
  iconoVolver = ICO_VOLVER;
  iconoTrash = ICO_TRASH;
  iconoAlertaVerde = ICO_ALERTA_VERDE;
  imagenPasoUno = IMG_PASO_UNO;
  imagenPasoDos = IMG_PASO_DOS;
  imagenPasoTres = IMG_PASO_TRES;
  imagenPasoCuatro = IMG_PASO_CUATRO;
  imagenPasoCinco = IMG_PASO_CINCO;
  iconoPasoUnoUno = ICON_PASO_UNO_UNO;
  iconoPasoUnoDos = ICON_PASO_UNO_DOS;
  iconoPasoUnoTres = ICON_PASO_UNO_TRES;
  iconoPasoDosUno = ICON_PASO_DOS_UNO;
  iconoPasoDosDos = ICON_PASO_DOS_DOS;
  iconoPasoDosTres = ICON_PASO_DOS_TRES;
  iconoPasoTresUno = ICON_PASO_TRES_UNO;
  iconoPasoTresDos = ICON_PASO_TRES_DOS;
  iconoPasoTresTres = ICON_PASO_TRES_TRES;
  iconoPasoCuatroUno = ICON_PASO_CUATRO_UNO;
  iconoPasoCuatroDos = ICON_PASO_CUATRO_DOS;
  iconoPasoCuatroTres = ICON_PASO_CUATRO_TRES;
  iconoPasoCincoUno = ICON_PASO_CINCO_UNO;
  iconoPasoCincoDos = ICON_PASO_CINCO_DOS;
  iconoPasoCincoTres = ICON_PASO_CINCO_TRES;
  icoAgregar = ICO_AGREGAR;
  iconoFlechaArriba = ICON_FLECHA_ARRIBA;
  iconoFlechaAbajo = ICON_FLECHA_ABAJO;
  iconoFlechaRetorno = ICON_FLECHA_RETORNO;
  urlTalleres = `${URL_BASE}${URL_TALLERES}`;
  hogares?: any[];
  polizaHogarDTO: any;
  Autos?: any[];
  usuario!: Usuario;
  placa: string ='';
  polizaAutoDTO!: PolizaAutoDTO;
  public fechaActual = new Date();
  pantallaGrande: boolean = false;
  public historicoPlaca: any;
  public historicoHogar: any;
  public polizasAuto: any;
  //tipo doc
  labelTipoDocSeleccionado: string ="Seleccione tipo de documento";
  labelTipoDocConductorSeleccionado: string ="Seleccione tipo de documento";
  imgAngleacordeonSelectTipoDocDown : string = 'assets/images/radicacion/angle-down-select.svg';
  imgAngleacordeonSelectTipoDocUp : string = 'assets/images/radicacion/angle-up-select.svg';
  imgAngleAcordeonSelectTipoDocCurrent : string ='';
  //FormControl datos conductor
  fCdocumento = new FormControl('', Validators.required);
  fCtipoDocumento = new FormControl('', Validators.required);
  tipoDocumento!: TipoDocumento[];
  etiqueta = 'etiqueta'
  estadoValidDoc = true;
  estadoValidTipoDoc = true;
  imageResponseError="assets/images/Group 24007.svg";
  imageResponseSucess="assets/images/group_success.svg";

  isSuccess= true;
  tituloError="¡Información erronea!";
  tituloSuccess ="¡Propiedad añadida! ";
  mensajeError="El número de documento no posee pólizas asociadas.";
  mensajeSuccess ="Haz agregado una propiedad a tu lista.";
  @Input()
  ngStyle!: { [klass: string]: any; }
  constructor(
    private radicarSiniestroService: RadicarSiniestroService,
    private polizaService: PolizaService,
    private modalService: ModalService,
    public dialog: MatDialog,
    private dominiosService: DominiosService,
    private _snackBar: MatSnackBar,
    private route: Router,
    private datePipe: DatePipe,
    private utilService: UtilService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('iconoFlechaArriba', sanitizer.bypassSecurityTrustResourceUrl(this.iconoFlechaArriba));
    iconRegistry.addSvgIcon('iconoFlechaAbajo', sanitizer.bypassSecurityTrustResourceUrl(this.iconoFlechaAbajo));
  }
  ngOnInit(): void {
    this.imgAngleAcordeonSelectTipoDocCurrent =  this.imgAngleacordeonSelectTipoDocDown;
    this.obtenerResolucionPantalla();
    this.usuario = new Usuario();
    this.polizaAutoDTO = new PolizaAutoDTO();
    this.setUsuario();
    this.setPolizaDTO();
    if (window.history.state.hogares !== undefined) {
      console.log("window.history.state.hogares=>", window.history.state.hogares)
      this.hogares = window.history.state.hogares;
      this.setAvance(this.hogares);
      this.obtenerDominios();
    }else{
      //console.log("window.history.state.vehiculos=>", window.history.state.vehiculos)
      setTimeout(() => {
        this.getHogares();
        this.obtenerDominios();
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.obtenerResolucionPantalla();
  }
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event : any) {
    this.obtenerResolucionPantalla();
  }

  private obtenerResolucionPantalla() {
    if (window.screen.width <= 768) {
      this.pantallaGrande = false;
    }else{
      this.pantallaGrande = true;
    }
  }


  getHogares() {
    this.polizaService.hogarVinculadas(this.usuario.email).subscribe((respuesta: { success: boolean; }) => {
      if (respuesta.success == true) {
      
        this.hogares = this.polizaService.orderbyDateMajorHogar(respuesta);
        console.log("hogarVinculadas after delete=>",this.hogares  )
        this.setAvance(this.hogares);
       
      }
    });
  }

  vincularHogar() {
    this.closeDialog2(); 
    const polizaHogarDTO = 
    { 
      "tipoDocumentoPropietario": this.fCtipoDocumento.value,
      "numeroDocumentoPropietario": this.fCdocumento.value,
      "username": this.usuario.email
    }
    this.polizaService.hogarVincular(polizaHogarDTO).subscribe(
      
      respuesta => {
        let msj
        if (respuesta.success === true) {
          msj = 'Has vinculado hogar ' + this.placa
          //this._snackBar.open(msj + ', Hogar agregado!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})
          this.isSuccess =true;
          this.openDialogRespuesta();
          this.getHogares();
          this.utilService.getCountNotifications(this.setSolicitudConteoNotificaciones());

        } else if (respuesta.success === false) {
         // this._snackBar.open("El documento no fuen encontrado. Verifica la información. ¡Documento inválido!", 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})
         this.isSuccess =false;
         this.openDialogRespuesta();
        } 
      }, err => {
        this.modalService.modalErrror(err.message, '', '');
      
      }
    );
  }

  eliminarHogar() {
    this.closeDialog2();
   console.log("Poliza Hogar to Delete",this.polizaHogarDTO);
    this.polizaService.hogarEliminar(this.polizaHogarDTO).subscribe(
      respuesta => {
        if (respuesta.success === true) {
          
          this.getHogares();
          let msj = ("Haz eliminado exitosamente la poliza de hogar  " + this.placa);
          this._snackBar.open(msj + ' Poliza eliminada!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})

        } else {
          this._snackBar.open(respuesta.message + ' ¡No se elimino!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})
         
        }
        this.utilService.getCountNotifications(this.setSolicitudConteoNotificaciones());
      
      }, err => {
        this.modalService.modalErrror(err.message, '', '');
      }
    );
  }

 
  setPolizaDTO() {
    this.polizaAutoDTO.email = this.usuario.email;
    this.polizaAutoDTO.numeroDocumento = this.usuario.numeroDocumento;
    this.polizaAutoDTO.tipoDocumento = this.usuario.tipoDocumento;
    this.polizaAutoDTO.usuarioID = this.usuario.usuarioID;
  }

  setUsuario() {
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

    
  }

  private setSolicitudConteoNotificaciones(): any {
    let solicitudNotificaciones: any = {};
    solicitudNotificaciones.tipoDocumento = this.usuario.tipoDoc;
    solicitudNotificaciones.numeroDocumento = this.usuario.numDoc;
    solicitudNotificaciones.username = this.usuario.email;
    return solicitudNotificaciones;
  }


  radicarSiniestro(auto: any): void {
    this.route.navigate(['/radicarSiniestro', `${auto.placa}${auto.polizaID}`],{ state: {'vehiculos': this.Autos}})

  }

  private modalPolizaVencida(placa: string): MatDialogRef<any> {
    let botones: Boton[] = [];
    return this.dialog.open(ModalGenericoComponent, {
      width: '30em',
      height: '',
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: '¡Póliza vencida!',
        claseTitulo: 'mat-dialog-title-warning',
        icono: ICO_ALERTA_NARANJA_PNG,
        subtitulo: '',
        html: `La póliza de tu vehículo <span class="font-weight-bold">${placa}</span> ha vencido, <br>para continuar con la radicación de tu<br> siniestro por favor comunícate al <span class="font-weight-bold">#345.</span>`,
        claseSubtitulo: 'mat-dialog-subtitle-error',
        contenido: '',
        botones: botones
      },
      autoFocus: false
    });
  }
 
  abrirSeguimiento() {
    this.route.navigate([URL_SEGUIMIENTO]);
  }

  validarVigenciaPoliza(fechaPoliza : any){
 
   
    return Number(new Date(fechaPoliza).getTime()) >= Number(this.fechaActual);
  }

 

  abrirDetalle(auto : any){
    if (!auto.acordeonAbierto) {
      this.Autos!.forEach(item=> item.acordeonAbierto = false);
      auto.acordeonAbierto = true;
    } else {
      this.Autos!.forEach(item=> item.acordeonAbierto = false);
    }
  }

  validarHistorico(polizasAnteriores : any){
    return polizasAnteriores.length > 0;
  }

  verHistorico(polizahogar : any){
    this.historicoHogar = polizahogar;
    console.log("historicoPlaca=>", this.historicoPlaca);
      this.openDialogHistoricos();
  }

  verTalleres(): void {
    this.route.navigate([this.urlTalleres],{ state: {'vehiculos': this.Autos}})

  }
  openDialogAddHogar() {
    this.dialog.open(this.callDialogAddHogar);
  }
  openDialogStepSinister() {
    this.dialog.open(this.callDialogStepSinister);
  }
  openDialogHistoricos() {
    this.dialog.open(this.callDialogHistoricos);
  }
  openDialogDeleteHogar(polizahogar: any) {
    console.log("Poliza Hogar to Delete Inicio",polizahogar);
    this.polizaHogarDTO = 
    { 
      "tipoDocumentoPropietario": polizahogar.tipoDocumento,
      "numeroDocumentoPropietario": polizahogar.numeroDocumento,
      "email": this.usuario.email,
      "numeroPoliza":polizahogar.numeroPoliza,
      "direccion":polizahogar.direccion,
      "sucursal": polizahogar.sucursal
    }
    this.dialog.open(this.callDialogDeleteHogar);
  }
  openDialogRespuesta(){
    this.dialog.open(this.callDialogRespuesta);
  }
  closeDialog2() {
    this.dialog.closeAll();
    
  }
  setAvance(hogares:any){
    let fechaActualDate = new Date();
    let fechaActual = this.datePipe.transform(fechaActualDate, 'yyyy-MM-dd');
    let f1 = new Date(fechaActual!);
    hogares.forEach((element:any) => {
    //Calcular avance de la Poliza
     let porcentajePol = 0;
     if(element.fechaVigenciaHasta !== null && element.fechaVigenciaDesde !== null){
       //Existen datos de la Poliza
      let fechaPoliza = element.fechaVigenciaHasta;
      fechaPoliza = this.datePipe.transform(fechaPoliza, 'yyyy-MM-dd');
      let f2 = new Date(fechaPoliza);
      let fechaInitPoliza = element.fechaVigenciaDesde;
      fechaInitPoliza = this.datePipe.transform(fechaInitPoliza, 'yyyy-MM-dd');
      let fInit = new Date(fechaInitPoliza);
      if (f1 <= f2) {//Poliza vigente
        //Total de dias faltantes para que se termine la Poliza
        let diffPoliza : number = (f1.getTime()-fInit.getTime())/(1000*60*60*24);
        //Total de dias que abarca la Poliza
        let diasPoliza : number = (f2.getTime()-fInit.getTime())/(1000*60*60*24);
          if(diffPoliza > 0){
            porcentajePol = Math.round((diffPoliza*100)/(diasPoliza) > 100 ? 100 : Math.round((diffPoliza*100)/(diasPoliza)));
          }
      } else {
        //Poliza vencida
        porcentajePol = 100;
      }
      let estilosPoliza ={};
      estilosPoliza = { 
                        background: `linear-gradient(to right, ${porcentajePol >= 100 ? '#d90b0b' : '#67bc47'} 0%, ${porcentajePol >= 100 ? '#d90b0b' : '#67bc47'} ${porcentajePol}%, #fff ${porcentajePol}%, #fff 100%)`,
                        border: `solid 1px ${porcentajePol >= 100 ? '#d90b0b' : '#67bc47'}`,
                       };     
      element.stylePoliza = estilosPoliza;
      element.porcentajePoliza = porcentajePol.toString();

     }
     //Calcular avance del SOAT
     let porcentajeSo = 0;
      if(element.vigenciaSoat !== null){
       //Existen datos del SOAT
       let fechaSoat = element.vigenciaSoat;
       fechaSoat = this.datePipe.transform(fechaSoat, 'yyyy-MM-dd');
       let f2 = new Date(fechaSoat).getTime();
       let diffSoat : number = (f2-f1.getTime())/(1000*60*60*24);
       porcentajeSo = 0;
         if(diffSoat > 0){
          porcentajeSo = Math.round((diffSoat*100)/365 > 100 ? 0: Math.round((diffSoat*100)/365));
         }
       let estilosSoat ={};
       estilosSoat = {height: '2',  background: `linear-gradient(to right, ${porcentajeSo >= 100 ? '#d90b0b' : '#67bc47'} 0%, ${porcentajeSo >= 100 ? '#d90b0b' : '#67bc47'} ${porcentajeSo}%, #fff ${porcentajeSo}%, #fff 100%)`,
                        border: `solid 1px ${porcentajeSo >= 100 ? '#d90b0b' : '#67bc47'}`};
       element.styleSoat = estilosSoat;
       element.porcentajeSoat = porcentajeSo.toString();
      }
    });
  }
  switchImgAngleSelectTipoDocAcordeon(){
    if(this.imgAngleAcordeonSelectTipoDocCurrent === this.imgAngleacordeonSelectTipoDocDown) this.imgAngleAcordeonSelectTipoDocCurrent = this.imgAngleacordeonSelectTipoDocUp;
    else this.imgAngleAcordeonSelectTipoDocCurrent = this.imgAngleacordeonSelectTipoDocDown;
  }
  // Función camcio tipo documento otro conductor
  cambiarTipoDocumento(evento : any) {
    this.switchImgAngleSelectTipoDocAcordeon();
    this.fCtipoDocumento.setValue(evento.codigo);
    this.labelTipoDocSeleccionado = evento.nombre;
    this.validar(1);
  }
   // Fución para obtener los departamentos
   obtenerDominios() {
    let dominio = new Dominio();
    console.log("Dominiios=>", this.tipoDocumento)
    dominio.tipoDominio = TIPO_DOMINIO_TIPOS_DOC;
    this.dominiosService.getDominiosAutogestion(dominio).subscribe((data: any) => {
      this.tipoDocumento = data.data;
      console.log("Dominiios=>", this.tipoDocumento)
    });
  }
  // Función que valida el formato del documento
  validarFormatoDocumento($event: KeyboardEvent) {
    const stringKey: string = $event.key;
    this.validar(2);
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
  validar(opc : number){
    if(opc === 1)
      if(this.fCtipoDocumento.valid) this.estadoValidTipoDoc = true; else this.estadoValidTipoDoc=false;
    if(opc === 2)
      if(this.fCdocumento.valid) this.estadoValidDoc = true; else this.estadoValidDoc=false;

  }
  
}
