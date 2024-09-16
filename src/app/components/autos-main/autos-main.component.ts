import { Component, ElementRef, HostListener, OnInit, ViewChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
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
@Component({
  selector: 'app-autos-main',
  templateUrl: './autos-main.component.html',
  styleUrls: ['./autos-main.component.css'],
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
    CarouselModule
    
    
  ],
  
  
})
export class AutosMainComponent implements OnInit {
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
  @ViewChild('callDialogAddCar') callDialogAddCar = {} as TemplateRef<any>;
  @ViewChild('callDialogStepSinister') callDialogStepSinister = {} as TemplateRef<any>;
  @ViewChild('callDialogHistoricos') callDialogHistoricos = {} as TemplateRef<any>;
  @ViewChild('agregarVehiculo') agregarVehiculo: ElementRef | undefined;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;
  @ViewChild('callDialogDeleteCar') callDialogDeleteCar = {} as TemplateRef<any>;
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
  Autos?: Array<any>;
  usuario!: Usuario;
  placa: string ='';
  polizaAutoDTO!: PolizaAutoDTO;
  public fechaActual = new Date();
  pantallaGrande: boolean = false;
  public historicoPlaca: any;
  public polizasAuto: any;
  @Input()
  ngStyle!: { [klass: string]: any; }
  constructor(
    private radicarSiniestroService: RadicarSiniestroService,
    private polizaService: PolizaService,
    private modalService: ModalService,
    public dialog: MatDialog,
    //private toast: ToastrService,
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
    this.obtenerResolucionPantalla();
    this.usuario = new Usuario();
    this.polizaAutoDTO = new PolizaAutoDTO();
    this.setUsuario();
    this.setPolizaDTO();
    if (window.history.state.vehiculos !== undefined) {
      console.log("window.history.state.vehiculos=>", window.history.state.vehiculos)
      this.Autos = window.history.state.vehiculos;
      this.setAvance(this.Autos);
    }else{
      //console.log("window.history.state.vehiculos=>", window.history.state.vehiculos)
      setTimeout(() => {
        this.getVehiculos();
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


  getVehiculos() {
    this.radicarSiniestroService.getVehiculos(this.usuario).subscribe(respuesta => {
      // tslint:disable-next-line: no-string-literal
      let dataAgrupada =[];
      dataAgrupada = this.radicarSiniestroService.getVehiculosAgrupados(respuesta);
      this.Autos = dataAgrupada['data']['polizasAutos'];
      this.Autos!.sort((a,b)=> {return b.fechaVigenciaHasta - a.fechaVigenciaHasta});
      this.Autos!.forEach(item=> item.acordeonAbierto = false);
      this.setAvance(this.Autos);
      this.usuario.updateRedis = false;
      this.closeDialog2();
    });
  }

  registrarPlaca() {
    this.closeDialog2()
    this.polizaAutoDTO.placa = this.placa;
    this.polizaService.registrarPlaca(this.polizaAutoDTO).subscribe(
      respuesta => {
        let msj
        if (respuesta.success === true && respuesta.message.includes('exitosamente')) {
          msj = 'Has agregado el vehículo con placas ' + this.placa
          this._snackBar.open(msj + ', ¡Vehículo agregado!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})
          this.Autos = [];
          this.usuario.updateRedis = true;  
          this.getVehiculos();
          this.placa = '';
          this.utilService.getCountNotifications(this.setSolicitudConteoNotificaciones());

        } else if (respuesta.success === false && respuesta.message.includes('no cuenta con')) {
          this._snackBar.open("La placa diligenciada no fue encontrada. Verifica la información. ¡Placa inválida!", 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})
          this.placa = '';
        } else if (respuesta.success === false && respuesta.message.includes('vinculado a este usuario')) {
          msj = 'El vehículo de placas ' + this.placa + ' ya esta registrado en tu lista.'
          this._snackBar.open(msj + ' ¡Esta placa ya existe!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})

       
          this.placa = '';
        } else {
          this._snackBar.open('No fue posible registrar la placa, vuelve a intentarlo ¡Error de registro!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})

          
          this.placa = '';
          throw Error(respuesta.message)
        }

      }, err => {
        this.modalService.modalErrror(err.message, '', '');
        this.placa = '';
      }
    );
  }

  eliminarVehiculo() {
    this.closeDialog2();
    this.polizaAutoDTO.placa = this.placa;
    this.polizaService.eliminarVehiculo(this.polizaAutoDTO).subscribe(
      respuesta => {
        if (respuesta.success === true) {
          this.utilService.borrarDatosPorPlaca(this.placa!);
          this.Autos = [];
          this.usuario.updateRedis = true;
          this.getVehiculos();
          let msj = ("Haz eliminado exitosamente el vehículo con placas " + this.placa);
          this._snackBar.open(msj + ' ¡Vehículo eliminado!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})

        } else {
          this._snackBar.open(respuesta.message + ' ¡Vehículo eliminado!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})
         
        }
        this.utilService.getCountNotifications(this.setSolicitudConteoNotificaciones());
        this.placa = '';
      }, err => {
        this.modalService.modalErrror(err.message, '', '');
      }
    );
  }

  guardarPlaca(placaAGuardar: string) {
    this.placa = placaAGuardar;
    let b1 = new Boton('Cancelar', 'cancelar');
    let b2 = new Boton('Ok', 'ok');
    let botones: Boton[] = [b1, b2];
    let tit = 'Eliminar vehículo';
    let msj = 'El vehículo se eliminará de tu lista.<br>¿Deseas eliminarlo?';
    let claseTit = 'confirmar-delete';
    let ico = '';
    let ancho = '460px';
    let alto = '';
    const confirm = this.modalService.modalConfirmDelete(tit, msj, claseTit, ico, ancho, alto, botones);
    confirm.afterClosed().subscribe(respuesta => {
      if (respuesta === 'ok') {
        this.eliminarVehiculo();
      } else {
        return;
      }
    });
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

  setAvance(autos:any){
    let fechaActualDate = new Date();
    let fechaActual = this.datePipe.transform(fechaActualDate, 'yyyy-MM-dd');
    let f1 = new Date(fechaActual!);
    autos.forEach((element:any) => {
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

  verHistorico(auto : any){
    this.historicoPlaca = auto.placa;
    this.polizasAuto = [];
    this.polizasAuto = cloneDeep(auto.polizasAnteriores);
    this.polizasAuto.push(auto);
    this.polizasAuto.sort((a: { fechaVigenciaHasta: any; },b: { fechaVigenciaHasta: any; })=> {return new Date(b.fechaVigenciaHasta).getTime() - new Date(a.fechaVigenciaHasta).getTime()});
    console.log("First Elent->"+ JSON.stringify(this.polizasAuto.at(0)));
    this.openDialogHistoricos();
  }

  verTalleres(): void {
    this.route.navigate([this.urlTalleres],{ state: {'vehiculos': this.Autos}})

  }
  openDialogAddCar() {
    this.dialog.open(this.callDialogAddCar);
  }
  openDialogStepSinister() {
    this.dialog.open(this.callDialogStepSinister);
  }
  openDialogHistoricos() {
    this.dialog.open(this.callDialogHistoricos);
  }
  openDialogDeleteCar(placaAGuardar: string) {
    this.placa = placaAGuardar;
    this.dialog.open(this.callDialogDeleteCar);
  }
  closeDialog2() {
    this.dialog.closeAll();
    
  }
}
