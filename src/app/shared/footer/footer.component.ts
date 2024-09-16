import { Component, OnInit } from '@angular/core';
import { ICO_GOOGLEPLAY, ICO_APPSTORE, ICO_OFICINAS, ICO_PQR, ICO_CHAT_EN_LINEA, ICO_SUPER_INTENDENCIA, LOGO_PREVISORA } from '../constantes';
import { LOCALSTORAGE_USUARIO, URL_SEDES, URL_PQR, URL_GOOGLEPLAY, URL_APPSTORE, URL_EMAIL_PREVISORA } from '../constantes';
import { FooterService } from './footer.service';
import {NotificacionesService} from "../../services/notificaciones.service";
import {NotificacionRequestDTO} from "../../models/notificacionRequestDTO";
import {UtilService} from "../../services/util.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule]
})
export class FooterComponent implements OnInit {

   icoGooglePlay = ICO_GOOGLEPLAY;
   icoAppStore = ICO_APPSTORE;
   listadoOficinas = ICO_OFICINAS;
   icoPqrs = ICO_PQR;
   icoChatEnLinea = ICO_CHAT_EN_LINEA;
   icoSuperintendencia = ICO_SUPER_INTENDENCIA;
   logoPrevisora = LOGO_PREVISORA;
   sedes = URL_SEDES;
   pqrs = URL_PQR;
   googlePlay = URL_GOOGLEPLAY;
   appStore = URL_APPSTORE;
   emailPrevisora = URL_EMAIL_PREVISORA;
  usuario: any;
  isLogin: boolean = false;
  notificacionRequest: NotificacionRequestDTO = new NotificacionRequestDTO();
  linkChat!: string;

  
  constructor(
    private footerService: FooterService,
    private notificacionesService: NotificacionesService,
    private utilService: UtilService
    ) {
  }

  ngOnInit() {
    
    this.footerService.usuario.subscribe((respuesta: any) => {
      if (respuesta || JSON.parse(localStorage.getItem(LOCALSTORAGE_USUARIO) || '{}')) {
        this.usuario = JSON.parse(localStorage.getItem(LOCALSTORAGE_USUARIO) || '{}');
      }else{
        this.usuario = null;
      }
    });
    
    this.consultarLinkChat();
  }

  generarAlerta() {
    const url = `${this.linkChat}?username=${this.usuario.nombres}&tipoIdentificacion=CC&identificacion=${this.usuario.numDoc}&email=${this.usuario.email}&question=APP`;
    if (this.usuario) {
       this.notificacionRequest.tipoDocumento = this.usuario.tipoDoc;
       this.notificacionRequest.numeroDocumento = this.usuario.numDoc;
       this.notificacionRequest.descripcion = 'Te contactaste con la previsora a través del chat';
       this.notificacionRequest.codigoNotificacion = 'AS';
       this.notificacionRequest.estadoNotificacion = 1;
       this.notificacionRequest.tituloNotificacion = 'Chat en línea';
       this.notificacionRequest.usuarioNombre = this.usuario.email;

       this.notificacionesService.createNotification(this.notificacionRequest).subscribe(
         respuesta => {
           if (respuesta.success == true) {
             let solicitudNotificaciones: any= {};
             solicitudNotificaciones.tipoDocumento = this.usuario.tipoDoc;
             solicitudNotificaciones.numeroDocumento = this.usuario.numDoc;
             solicitudNotificaciones.username = this.usuario.email;
             this.utilService.getCountNotifications(solicitudNotificaciones);
           } else {
             throw new Error('Error creando la notificación');
           }
         }
       );
     }
     if (window.open(url, '_blank')){
      window.open(url, '_blank')?.focus();
     
     }
    
  }

  private consultarLinkChat() {
    
    this.utilService.getLinkChat().subscribe(response=>{
      if(response){
        this.linkChat = response.data.parameters['URL_CHAT'];
      }
    });
    
  }
}
