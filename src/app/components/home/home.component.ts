import { Component, OnInit, ViewChild, ElementRef, Input, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

//import { ToastrService } from "ngx-toastr";
import { UtilService } from "../../services/util.service";
import { SeguimientoReparacionService } from "../../services/seguimiento-reparacion.service";
import { ICO_ADELANTE, ICO_AGREGAR, ICO_ALERTA_VERDE, ICO_CARRO, ICO_GENERALES, ICO_HOGARES, ICO_LLAMAR_345, ICO_SOAT, IMAGEN_HOME } from '../../shared/constantes';
import { Usuario } from '../../models/usuario';
import { PolizaAutoDTO } from '../../models/polizaAutoDTO';
import { PolizaService } from '../../services/poliza.service';
import { ModalService } from '../../services/modal.service';
import { RadicarSiniestroService } from '../../services/radicar-siniestro.service';
import { Boton } from '../../models/boton';
import {  FormControl, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
 

} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ModalGenericoComponent } from '../../shared/modales/modal-generico/modal-generico.component';
import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalRef, NzModalService, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import {
  ICO_NAVEGADOR_CHROME,
  ICO_NAVEGADOR_FIREFOX,
  ICO_NAVEGADOR_EDGE,
  ICO_NAVEGADOR_OPERA,
  ICO_NAVEGADOR_SAFARI
} from '../../shared/constantes';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  
 //encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatIconModule,
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    PlantillaGeneralComponent, 
    FooterComponent,
    NzModalModule,
    ModalGenericoComponent,
    NzCarouselModule,
    CarouselModule,
  ],
  providers:[
    HttpClientModule],
  
})

export class HomeComponent implements OnInit {
  icoNavegadorChrome = ICO_NAVEGADOR_CHROME;
  icoNavegadorFirefox = ICO_NAVEGADOR_FIREFOX;
  icoNavegadorEdge = ICO_NAVEGADOR_EDGE;
  icoNavegadorOpera = ICO_NAVEGADOR_OPERA;
  icoNavegadorSafari = ICO_NAVEGADOR_SAFARI;
  effect = 'scrollx';

  isVisible = false;
  @ViewChild('callDialogAddCar') callDialogAddCar = {} as TemplateRef<any>;
  @ViewChild('agregarVehiculo') agregarVehiculo?: ElementRef;
  @ViewChild('callDialogStepNavigator') callDialogStepNavigator = {} as TemplateRef<any>;
  icoAgregar = ICO_AGREGAR;
  iconoCarro = ICO_CARRO;
  iconoSoat = ICO_SOAT;
  iconoGenerales = ICO_GENERALES;
  iconoAlertaVerde = ICO_ALERTA_VERDE;
  icoLlamar = ICO_LLAMAR_345;
  imgHome = IMAGEN_HOME;
  icoHogar = ICO_HOGARES;
  iconoAdelante = ICO_ADELANTE;
  Autos?: Array<any>;
  hogares?:any[];
  numeroAutos?: number;
  numeroHogares?:number;
  usuario= new Usuario;
  sinVehiculos?: boolean;
  isHogares?: boolean;
  sinHogar?: boolean;
  sinSOAT?: boolean;
  sinGenerales?: boolean;
  placa= "";
  polizaAutoDTO?: PolizaAutoDTO;
  nombre?: string;
  copiaAutos?: Array<any>;
  currentSizeScreen = "Large";
  @Input() botones!: Boton[];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 300,
    navText: ['', ''],
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },
      300: {
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
  
  constructor(
    private radicarSiniestroService: RadicarSiniestroService,
    private polizaService: PolizaService,
    private modalService: ModalService,
    private router: Router,
    //private toast: ToastrService,
    private utilService: UtilService,
    private activedRoute: ActivatedRoute,
    private seguimientoReparacionService: SeguimientoReparacionService,
    public dialog: MatDialog ,
    private _snackBar: MatSnackBar, 
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private responsive: BreakpointObserver
    

  ) { }
  openDialog() {
    this.dialog.open(this.callDialogAddCar);
  }
  ngOnInit() {
    this.sinVehiculos = true;
    this.sinGenerales = true;
    this.sinHogar = true;
    this.sinSOAT = true;
    this.usuario = new Usuario();
    this.polizaAutoDTO = new PolizaAutoDTO();
    this.placa = '';

    // Service call
    setTimeout(() => {
      this.setUsuario();
      this.setPolizaDTO();
      this.getVehiculos();
      this.getHogares();
      this.riesgosAsegurados();
      this.validarEstadoReparacion();
    });
    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.XSmall,
      Breakpoints.Large,

    ])
      .subscribe(result => {
    
        const breakpoints = result.breakpoints;
    
        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.currentSizeScreen = "TabletPortrait";
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.currentSizeScreen = "HandsetLandscape";
          
        }
        else if (breakpoints[Breakpoints.Small]) {
          this.currentSizeScreen = "Small";
        }
        else if (breakpoints[Breakpoints.Medium]) {
          this.currentSizeScreen = "Medium";
        }
        else if (breakpoints[Breakpoints.XSmall]) {
          this.currentSizeScreen = "XSmall";
          
        }
        else if (breakpoints[Breakpoints.Large]) {
          this.currentSizeScreen = "Large";
          
        }
        console.log("screens matches=>", this.currentSizeScreen);
       
      });
  }

  registrarPlaca() {
    this.polizaAutoDTO!.placa = this.placa;
    this.polizaService.registrarPlaca(this.polizaAutoDTO!).subscribe(
      (respuesta: any) => {
        if (respuesta.success === true && respuesta.message.includes('exitosamente')) {
          let msj = 'Has agregado el vehículo con placas ' + this.placa;
          this._snackBar.open(msj + '¡Vehículo agregado!', 'X',  { duration: 2000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})
          this.usuario.updateRedis = true;
          this.getVehiculos();
          let solicitudNotificaciones: any = {};
          solicitudNotificaciones.tipoDocumento = this.usuario?.tipoDoc;
          solicitudNotificaciones.numeroDocumento = this.usuario?.numDoc;
          solicitudNotificaciones.username = this.usuario?.email;
          this.utilService.getCountNotifications(solicitudNotificaciones);
          this.placa = '';
          this.router.navigateByUrl('/autos');
        } else if (respuesta.success === false && respuesta.message.includes('no cuenta con')) {
          this._snackBar.open("La placa diligenciada no fue encontrada. Verifica la información. ¡Placa inválida!", 'X',  { duration: 2000, panelClass: 'app-notification-error', horizontalPosition: 'right', verticalPosition: 'top',})
         
          this.placa = '';
        } else if (respuesta.success === false && respuesta.message.includes('vinculado a este usuario')) {
          let msj = 'El vehículo de placas ' + this.placa + ' ya esta registrado en tu lista.';
          this._snackBar.open(msj + '¡Esta placa ya existe!', 'X',  { duration: 2000, panelClass: 'app-notification-warning', horizontalPosition: 'right', verticalPosition: 'top',})
          
          this.placa = '';
        } else {
          this._snackBar.open("No fue posible registrar la placa, vuelve a intentarlo', '¡Error de registro!", 'X',  { duration: 2000, panelClass: 'app-notification-error', horizontalPosition: 'right', verticalPosition: 'top',})
          /*this.toast.error('La placa diligenciada no fue encontrada. Verifica la información. ', '¡Placa inválida!', {
          /*this.toast.error('No fue posible registrar la placa, vuelve a intentarlo', '¡Error de registro!', {
            closeButton: true,
            titleClass: 'toast-tittle-error'
          });*/
          this.placa = '';
          throw Error(respuesta.message)
        }
      }, err => {
        this.modalService.modalErrror(err.message, '', '');
        this.placa = '';
      }
    );
  }

  getVehiculos() {
    this.radicarSiniestroService.getVehiculos(this.usuario).subscribe((respuesta: { success: boolean; }) => {
      if (respuesta.success == true) {
        let dataAgrupada =[];
        dataAgrupada = this.radicarSiniestroService.getVehiculosAgrupados(respuesta);
        this.Autos = dataAgrupada['data']['polizasAutos'];
        this.copiaAutos = this.Autos;
        this.numeroAutos = this.Autos?.length;
        if (this.numeroAutos !== 0) {
          this.sinVehiculos = false;
        }
        this.usuario.updateRedis = false;
      }
    });
  }
  getHogares() {
    this.polizaService.hogarVinculadas(this.usuario.email).subscribe((respuesta: { success: boolean; }) => {
      if (respuesta.success == true) {
       
        this.hogares = this.polizaService.orderbyDateMajorHogar(respuesta);
        this.numeroHogares = this.hogares?.length;
        if (this.numeroHogares !== 0) {
          this.sinHogar = false;
        }
        console.log("Hogares=>", this.hogares)
      }
    });
  }

  setPolizaDTO() {
    this.polizaAutoDTO!.email = this.usuario?.email;
    this.polizaAutoDTO!.numeroDocumento = this.usuario?.numeroDocumento;
    this.polizaAutoDTO!.tipoDocumento = this.usuario?.tipoDocumento;
    this.polizaAutoDTO!.usuarioID = this.usuario?.usuarioID;
  }

  setUsuario() {
  
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      
      this.usuario!.nombres = usuario!.nombres?.toUpperCase()
      this.usuario!.apellidos = usuario!.apellidos?.toUpperCase()
      this.usuario!.numeroDocumento = usuario!.numDoc;
      this.usuario.email = usuario.email;
      this.usuario.tipoDocumento= usuario.tipoDoc;
      this.usuario.usuarioID = usuario.usuarioID;
      this.usuario.updateRedis = false;
      // Now you can use the 'usuario' variable
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
    }
    
    
  }

  redirigir() {
    this.router.navigateByUrl('/autogestion/autos');
  }

  
  modalNavegadores(){
    this.modalService.modalNavegadores();
  }

  private riesgosAsegurados() {
    let primerRegistro = this.activedRoute.snapshot.paramMap.get('primerRegistro');
    if (primerRegistro && primerRegistro == 'true') {
      let solicitud: any = this.usuario;
      solicitud.username = this.usuario?.email;
      this.polizaService.asociarRiesgos(solicitud).subscribe(
        respuesta => {
          if (respuesta && respuesta.data) {
            let numRiesgosAutos = 0;
            numRiesgosAutos = respuesta.data.numPolizasAutos;
            if (numRiesgosAutos && numRiesgosAutos > 0) {
              let html = `Encontramos <span class="font-weight-bold">${numRiesgosAutos} riesgos</span> asegurados con<br/> nosotros <span class="font-weight-bold">(Vehículos).</span>
                            <br/><br/> Utiliza nuestros servicios cuando <br/>lo requieras.`
                                        //modalHtml(titulo: string, htmlCuerpo: string, claseTitulo: string, ancho: string, alto: string, botones: Boton[], claseBotones: string): MatDialogRef<any> {
              let modal = this.modalService.modalHtml('¡Bienvenido!', html, 'modal-generico-titulo', '30em', '', this.botones, '');
              //modalHtml(titulo: string, htmlCuerpo: string, claseTitulo: string, ancho: string, alto: string, botones: Boton[], claseBotones: string): MatDialogRef<any> {
 
              modal.afterClosed().subscribe(() =>{
                  this.getVehiculos();
              });

            } else {
              let contentHtml = 'No cuentas con riesgos asociados, para<br/> registrarlos ingresa <a class="missPassLink" href="/autos">aquí</a>';
              this.modalService.modalWarning('¡No tienes riesgos asociados!', '', contentHtml, '30em', '');
            }
          }
        }
      );
    }
  }

  private async validarEstadoReparacion() {
    let solicitud: any = {};
    solicitud.username = this.usuario?.email;
    this.seguimientoReparacionService.validarEstados(solicitud).toPromise();
  }

  verDetalle(): void {
    localStorage.setItem('opc', String(0));
    this.router.navigate(['/autos'], { state: {'vehiculos': this.copiaAutos}});

  }
  verServicios(): void {
    localStorage.setItem('opc', String(0));
    this.router.navigate(['/servicios']);

  }
  verHogares():void{
    localStorage.setItem('opc', String(0));
    this.router.navigate(['/hogares'], { state: {'hogares': this.hogares}})
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    
    this.isVisible = false;
  }

  handleCancel(): void {
    
    this.isVisible = false;
  }
  openDialogStepNavigator() {
    this.dialog.open(this.callDialogStepNavigator);
  }
  
}

