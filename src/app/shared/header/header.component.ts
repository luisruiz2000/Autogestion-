import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {
  ICONO_SALIDA,
  LINEA_VERTICAL,
  LOGO_PREVISORA_COLOR,
  ICONO_NOTIFICACION,
  URL_PERFIL,
  COD_APP,
  LOCALSTORAGE_TOKEN,
  URL_LOGIN,
  ICO_PERFIL,
  ICO_LOGOUT,
  ICONO_PERFILx3
} from '../../shared/constantes';
import { HeaderService } from './header.service';
import { LOCALSTORAGE_USUARIO } from '../constantes';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { Boton } from '../../models/boton';
import { AuthService } from '../../services/auth.service';
import { Autenticacion } from '../../models/autenticacion';
import { MatDialogRef } from "@angular/material/dialog";
import { NotificacionesService } from "../../services/notificaciones.service";
import { UtilService } from "../../services/util.service";
import { NotificacionesComponent } from '../notificaciones/notificaciones.component';
import {FooterService} from "../footer/footer.service";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Usuario } from '../../models/usuario';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[NotificacionesComponent, CommonModule, NzButtonModule,NzDropDownModule, NzIconModule]
  
})
export class HeaderComponent implements OnInit {
  @ViewChild('contadorNot')
  contadorNot!: ElementRef;
  @ViewChild(NotificacionesComponent)
  notificacionesComponent!: NotificacionesComponent;

  constructor(
    public headerService: HeaderService,
    private router: Router,
    private modal: ModalService,
    private authService: AuthService,
    private notificacionService: NotificacionesService,
    private utilService: UtilService,
    private modalService: ModalService,
    private footerService: FooterService,
  ) { }

  public static titulo: string;
  public static mostrar: boolean;
  iconoCampana = "";
  logoPrevisora = LOGO_PREVISORA_COLOR;
  iconoPerfil = ICONO_PERFILx3;
  iconoPerfilMenu = ICO_PERFIL;
  iconoExitMenu = ICO_LOGOUT;
  iconoNotificacion = ICONO_NOTIFICACION;
  lineaVertical = LINEA_VERTICAL;
  iconoSalida = ICONO_SALIDA;
  public solicitudNotificaciones: any;

  public cantidadNotificaciones: number = 0;
  usuario= new Usuario();
  screenSmall: boolean = false;

  ngOnInit() {
    this.getScreenSize();
    //this.usuario = JSON.parse(localStorage.getItem(LOCALSTORAGE_USUARIO));
  this.getAutenticacion();
    if (!this.usuario) {
      this.router.navigate([URL_LOGIN])
    }
    this.getCountNotifications();
    this.notificacionService.getObservable().subscribe(data => {
      if (data) {
        this.cantidadNotificaciones = data
        if (this.cantidadNotificaciones < 10) {
          this.contadorNot.nativeElement.setAttribute("data-bubble", this.cantidadNotificaciones);
        }
        else {
          this.contadorNot.nativeElement.setAttribute("data-bubble", "9+");
        }
      } else {
        this.contadorNot.nativeElement.setAttribute("data-bubble", 0);
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any){
    this.getScreenSize();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event : any) {
   this.getScreenSize();
  }

  private getScreenSize() {
    if (window.screen.width <= 768) {
      this.screenSmall = true;
    }else{
      this.screenSmall = false;
    }
  }

  getCountNotifications(): void {
   
    let solicitudNotificaciones: any = {};
    solicitudNotificaciones.tipoDocumento = this.usuario.tipoDocumento;
    solicitudNotificaciones.numeroDocumento = this.usuario.numeroDocumento;
    solicitudNotificaciones.username = this.usuario.email;
    this.solicitudNotificaciones = solicitudNotificaciones;
    this.utilService.getCountNotifications(solicitudNotificaciones);
  }

  goToPerfil() {
    this.router.navigate([URL_PERFIL]);
  }

  logout() {
    let b1 = new Boton('Si', 'si');
    b1.clase = 'btn-cerrar-sesión-ok';
    let b2 = new Boton('No', 'no');
    b2.clase = 'btn-cerrar-sesión-cancel';
    let botones: Boton[] = [b1, b2];

    let alert = this.modalCerrarSesion(botones);
    alert.afterClosed()
      .subscribe(result => { this.exit(result) });

  }

  exit(result: string) {
    if (result === "si") {
      try {
        this.authService.logout(this.getAutenticacion())
          .subscribe(respuesta => {
            if (respuesta.success === true && respuesta.status === 'OK') {
              this.borrarStorage();
              this.router.navigate([URL_LOGIN]);
            } else {
              this.modal.modalErrror('!Ups ha ocurrido un error de conexion \n Intenta de nuevo', '', '');
            }
          })
      } catch (error) {
        this.modal.modalErrror('!Ups ha ocurrido un error, Intente de nuevo', '', '');
        this.router.navigate([URL_LOGIN]);
      }
    }
  }

  borrarStorage() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('refreshtoken');
    this.footerService.usuario.next(false);
  }

  getAutenticacion(): Autenticacion {
    let user: Autenticacion = new Autenticacion('', '','','') ;
    user.codSistema = COD_APP;
    //const userData = JSON.parse(localStorage.getItem(LOCALSTORAGE_USUARIO));
    const userData = localStorage.getItem(LOCALSTORAGE_USUARIO) || null;
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN)  ;
    if (userData !== null || token !== null) {
      const usuario = JSON.parse(userData || '{}')  ;
      console.log("Const Usuario ->" + usuario.nombres);
      user!.username = usuario!.email;
      user.basicToken = token || '';
      console.log("Const Nombres ->" + usuario.nombres);
      this.usuario!.nombres = usuario!.nombres?.toUpperCase()
      this.usuario!.apellidos = usuario!.apellidos?.toUpperCase()
      this.usuario!.numeroDocumento = usuario!.numDoc;
      this.usuario.email = usuario.email;
      this.usuario.tipoDocumento= usuario.tipoDoc;
      this.usuario.usuarioID = usuario.usuarioID;
      
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
      throw new Error(
        'Error en localStorage'
      )
    }

   
   console.log("Usuario=>",this.usuario)
    return user;
  }

  private modalCerrarSesion(botones: Boton[]): MatDialogRef<any> {
    let htmlCuerpo = `Estas a punto de cerrar el portal<br/> web. ¿Deseas salir?`
    return this.modalService.modalHtml('Cerrar sesión', htmlCuerpo, 'modal-generico-titulo', 'auto', 'auto', botones, 'cerrar-sesion-botones');
  }

  showNotifications(): void {
    this.notificacionesComponent.showNotifications(this.solicitudNotificaciones);
  }

  cerrarListaNotificaciones() {
    this.notificacionService.showNotificacionSource.next(false);
  }
}
