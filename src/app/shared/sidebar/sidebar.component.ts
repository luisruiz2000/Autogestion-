import { Component, HostListener, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {
  ICO_MENU,
  ICO_HOME,
  ICO_INTERROGACION_BLANCO,
  ICO_INTERROGACION_VERDE_SIDE_BAR,
  ICO_HOME_SIDE_BAR,
  ICO_CONFIGURACION,
  PERFIL_ADMIN_NEGOCIO,
  ICO_CONFIGURACION_VERDE,
  DOMINIO_PREVISORA,
  ICO_MENU_VIDEO_PERITACION_VERDE,
  ICO_MENU_VIDEO_PERITACION_BLANCO,
} from '../constantes';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Usuario } from '../../models/usuario';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [MatMenuModule, CommonModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  icono_menu = ICO_MENU;
  icono_home = ICO_HOME;
  icono_home_verde = ICO_HOME_SIDE_BAR;
  icono_pregunta = ICO_INTERROGACION_BLANCO;
  icono_pregunta_verde = ICO_INTERROGACION_VERDE_SIDE_BAR;
  icono_video_peritacion_verde = ICO_MENU_VIDEO_PERITACION_VERDE;
  icono_video_peritacion_blanco = ICO_MENU_VIDEO_PERITACION_BLANCO;
  perfilAdminNegocio = PERFIL_ADMIN_NEGOCIO;
  shouldRun = true;
  screenSmall: boolean = false;
  icono_configuracion = ICO_CONFIGURACION;
  icono_configuracion_verde = ICO_CONFIGURACION_VERDE;
  accesoConfiguracion: boolean = false;
  usuario!: Usuario;
  dominioPrevisora = DOMINIO_PREVISORA;
  opc: number = 1;
  estOver1 = false;
  estOver2 = false;
  estOver3 = false;
  currentSizeScreen = 'Large';
  viewMenu = false;
  constructor(
    private notificacionService: NotificacionesService,
    private router: Router,
    private responsive: BreakpointObserver
  ) {}
  ngOnInit() {
    this.usuario = new Usuario();
    this.getScreenSize();
    this.validarAccesoConfiguracion();
    console.log('opc menu=>', this.opc);
    try {
      const opc = localStorage.getItem('opc');
      console.log('====================================');
      console.log(opc);
      console.log('====================================');
      if (opc) this.opc = parseInt(opc);
    } catch (e) {
      this.opc = 1;
      this.router.navigate(['/home/false']);
    }
    this.responsive
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.XSmall,
        Breakpoints.Large,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.currentSizeScreen = 'TabletPortrait';
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.currentSizeScreen = 'HandsetLandscape';
        } else if (breakpoints[Breakpoints.Small]) {
          this.currentSizeScreen = 'Small';
        } else if (breakpoints[Breakpoints.Medium]) {
          this.currentSizeScreen = 'Medium';
        } else if (breakpoints[Breakpoints.XSmall]) {
          this.currentSizeScreen = 'XSmall';
        } else if (breakpoints[Breakpoints.Large]) {
          this.currentSizeScreen = 'Large';
        }
        console.log('screens matches=>', this.currentSizeScreen);
        this.viewMenu = false;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getScreenSize();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) {
    this.getScreenSize();
  }

  private getScreenSize() {
    if (window.screen.width <= 768) {
      this.screenSmall = true;
    } else {
      this.screenSmall = false;
    }
  }

  private validarAccesoConfiguracion() {
    //this.usuario = JSON.parse(localStorage.getItem('usuario'));
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString || '{}');
      console.log('Const Usuario ->' + usuario.nombres);

      console.log('Const Nombres ->' + usuario.nombres);
      this.usuario!.nombres = usuario!.nombres?.toUpperCase();
      this.usuario!.apellidos = usuario!.apellidos?.toUpperCase();
      this.usuario!.numeroDocumento = usuario!.numDoc;
      this.usuario.email = usuario.email;
      this.usuario.tipoDocumento = usuario.tipoDoc;
      this.usuario.usuarioID = usuario.usuarioID;
      // Now you can use the 'usuario' variable
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
    }

    let dominio = this.usuario.email!.split('@');
    let esDominioPrevisora = dominio[1] == this.dominioPrevisora;
    if (
      this.usuario.nombrePerfil &&
      this.usuario.nombrePerfil.toString() === this.perfilAdminNegocio &&
      esDominioPrevisora
    ) {
      this.accesoConfiguracion = true;
    } else {
      this.accesoConfiguracion = false;
    }
  }

  cerrarListaNotificaciones() {
    this.notificacionService.showNotificacionSource.next(false);
  }
  overOpc(opc: number) {
    if (opc === 1) this.estOver1 = true;
    if (opc === 2) this.estOver2 = true;
    if (opc === 3) this.estOver3 = true;
  }
  outOpc(opc: number) {
    if (opc === 1) this.estOver1 = false;
    if (opc === 2) this.estOver2 = false;
    if (opc === 3) this.estOver3 = false;
  }
  clickOpc(opc: number) {
    this.opc = opc;
    localStorage.setItem('opc', String(this.opc));
  }
  onViewMenu() {
    console.log('Opc menu');
    if (this.viewMenu) this.viewMenu = false;
    else this.viewMenu = true;
    console.log('Opc menu=>', this.viewMenu);
  }
}
