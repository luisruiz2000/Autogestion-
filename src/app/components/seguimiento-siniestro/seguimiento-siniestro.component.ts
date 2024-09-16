import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  ESTADO_DOCS_PENDIENTES, ESTADO_INF_POR_COMPLETAR, ESTADO_REPARACION_AUTORIZADA,
  ESTADO_SOLICITUD_DECLINADA,
  ESTADO_SOLICITUD_RADICADA,
  ESTADO_SOLICITUD_RECIBIDA, ESTADO_VEHICULO_ENTREGADO,
  ICON_FLECHA_RETORNO,
  ICO_ADELANTE, ICO_NO_INFO, ICO_SEG_ALERTA, ICO_SEG_CHECK, ICO_SEG_CHECK_GRAY, ICO_SEG_ERROR, ICO_SEG_UBICACION,
  ICO_VOLVER,
  LOCALSTORAGE_USUARIO, URL_CONFIRMACION_SINIESTRO, URL_SEGUIMIENTO_REPARACION
} from "../../shared/constantes";
import {EstadoSiniestro} from "../../models/estadoSiniestro";
import {RadicarSiniestroService} from "../../services/radicar-siniestro.service";
import {Router, ActivatedRoute, RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import { Usuario } from '../../models/usuario';
import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
 
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
 

} from '@angular/material/dialog';
@Component({
  selector: 'app-seguimiento-siniestro',
  standalone: true,
  templateUrl: './seguimiento-siniestro.component.html',
  styleUrls: ['./seguimiento-siniestro.component.css'],
  imports: [ 
    RouterModule, 
    CommonModule, 
    MatStepperModule, 
    PlantillaGeneralComponent, 
    FooterComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ]
})
export class SeguimientoSiniestroComponent implements OnInit {
  @ViewChild('callDialogHistoric') callDialogHistoric = {} as TemplateRef<any>;
  @ViewChild('callDialogDetalle') callDialogDetalle = {} as TemplateRef<any>;
  iconoVolver = ICO_VOLVER;
  iconoAdelante = ICO_ADELANTE;
  icoSegAlerta = ICO_SEG_ALERTA;
  icoSegCheck =  ICO_SEG_CHECK;
  icoSegCheckGray = ICO_SEG_CHECK_GRAY;
  icoSegError =  ICO_SEG_ERROR;
  icoSegUbicacion =  ICO_SEG_UBICACION;
  icoNoInfo =  ICO_NO_INFO;
  iconoFlechaRetorno = ICON_FLECHA_RETORNO;
  imagenEstadoSiniestro = '';
  pathConfirmacion = URL_CONFIRMACION_SINIESTRO;
  pathReparacion = URL_SEGUIMIENTO_REPARACION;
  classInfoRecibida ='estado-parent-info-recibida'
  classAutorizada = 'estado-parent-autorizada-radicada';
  classCurrent = 'estado-parent-info-recibida';
  isSeguimientoReparacion = false;
  messagesEstado = "";
  messagesEstadoRadicado ="¡La información se ha radicado!";
  messagesEstadoInfoRecibida ="¡La información se ha recibido!";
  messagesEstadoInfoPorCompletar ="¡La información no se ha completado!";
  messagesEstadoDeclinada = "¡La información  se ha declinado!";
  messagesEstadoDocsPendientes = "¡La información con documentos pendientes!";
  messageHistoricosRadicada ="Solicitud radicada";
  messageHistoricosRecibida ="Solicitud recibida";
  messageHistoricosDeclinada ="Solicitud declinada";
  messageHistoricosDocPendiente ="Solicitud documentación pendiente";
  messageHistoricosInfoCompletar ="Solicitud información por completar";
  messageHistoricosAutorizada ="Solicitud autorizada";
  messageHistoricosVehiculoEntegado ="Solicitud vehiculo entregado";
  messageHistoricoCurrent: string='';
  siniestroCurrent :any;
  public itemsss:any;
  public estadoSiniestros!: EstadoSiniestro[];
  datosUsuarioRegistrado: Usuario = new Usuario();
  mostrarEstado!: boolean;
  public historicoSiniestroModal: any;
  public historicoPlaca: any;
  public fechaActual = new Date();
  constructor(
    private radicarSiniestroService: RadicarSiniestroService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarEstados();
  }

  private consultarEstados() {
    let solicitudSiniestros: any = {};
    //this.datosUsuarioRegistrado = JSON.parse(localStorage.getItem(LOCALSTORAGE_USUARIO));
    const usuarioString = localStorage.getItem(LOCALSTORAGE_USUARIO);

    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
     this.datosUsuarioRegistrado.numDoc = usuario.numDoc;
     this.datosUsuarioRegistrado.tipoDocumento = usuario.tipoDoc;
     this.datosUsuarioRegistrado.email = usuario.email;
     this.datosUsuarioRegistrado.usuarioID = usuario.usuarioID;
     
      // Now you can use the 'usuario' variable
    } else {
      // Handle the case when 'usuario' is null
      console.error('Usuario data is null in localStorage');
    }
    solicitudSiniestros.tipoDocumento = this.datosUsuarioRegistrado.tipoDocumento;
    solicitudSiniestros.numeroDocumento = this.datosUsuarioRegistrado.numeroDocumento;
    solicitudSiniestros.username = this.datosUsuarioRegistrado.email;

      this.radicarSiniestroService.obtenerSiniestros(solicitudSiniestros).subscribe(
        respuesta =>{
          if (respuesta.status == 'OK'){
            this.estadoSiniestros = respuesta.data.estadoSiniestros;
          }
        }
      );
  }

 
  validarClase(siniestro: EstadoSiniestro, opc: number): any | null{
    console.log("Codigo Estado rad=>", siniestro.codigo);
    switch (siniestro.codigo) {
      case ESTADO_SOLICITUD_RADICADA:
        this.imagenEstadoSiniestro = this.icoSegCheck;
        siniestro.linkRedireccion = this.pathConfirmacion;
        this.classCurrent = this.classAutorizada;
        this.messageHistoricoCurrent = this.messageHistoricosRadicada;
        break;
      case ESTADO_SOLICITUD_RECIBIDA:
        this.imagenEstadoSiniestro = this.icoSegCheckGray;
        siniestro.linkRedireccion = this.pathConfirmacion;
        this.classCurrent = this.classInfoRecibida;
        this.messagesEstado = this.messagesEstadoInfoRecibida;
        this.messageHistoricoCurrent = this.messageHistoricosRecibida;
        break;
      case ESTADO_SOLICITUD_DECLINADA:
        this.imagenEstadoSiniestro = this.icoSegError;
        siniestro.linkRedireccion = this.pathConfirmacion;
        this.messagesEstado = this.messagesEstadoDeclinada;
        this.messagesEstado = this.messagesEstadoDeclinada;
        this.messageHistoricoCurrent = this.messageHistoricosDeclinada;
        break;
      case ESTADO_DOCS_PENDIENTES:
        this.imagenEstadoSiniestro = this.icoSegAlerta;
        siniestro.linkRedireccion = this.pathConfirmacion;
        this.messagesEstado = this.messagesEstadoDocsPendientes;
        this.messagesEstado = this.messagesEstadoDocsPendientes;
        this.messageHistoricoCurrent = this.messageHistoricosDocPendiente;
        break;
      case ESTADO_REPARACION_AUTORIZADA:
        this.imagenEstadoSiniestro = this.icoSegCheck;
        siniestro.linkRedireccion = this.pathReparacion;
        this.classCurrent = this.classAutorizada;
        this.isSeguimientoReparacion = true;
        this.messageHistoricoCurrent = this.messageHistoricosAutorizada;
        break;
      case ESTADO_VEHICULO_ENTREGADO:
        this.imagenEstadoSiniestro = this.icoSegUbicacion;
        siniestro.linkRedireccion = this.pathReparacion;
        this.isSeguimientoReparacion = true;
        this.messageHistoricoCurrent = this.messageHistoricosVehiculoEntegado;
        break;

      
    }
    if(opc ===1) return this.messageHistoricoCurrent;
    else if(opc === 2) return this.classCurrent;
  }

  validarEstado(estadoSin: EstadoSiniestro): boolean {
    return estadoSin.codigo != ESTADO_INF_POR_COMPLETAR;
  }

  mostrarHistoricoRadicacion(estadoSiniestro : any){

    this.historicoPlaca = estadoSiniestro.placa;
    this.historicoSiniestroModal = estadoSiniestro.historico.sort();
    console.log("Historico Siniestro=>", estadoSiniestro.historico.sort());
    this.openDialogAddCar();
  }

  openDialogAddCar() {
    this.dialog.open(this.callDialogHistoric);
  }
  closeDialog() {
    this.dialog.closeAll();
    
  }
  redireccionar(path: string): void {
    //console.log("Home");
    this.router.navigate([path])
  }
  verDetalleEstado(siniestro: EstadoSiniestro) {
    this.validarClase(siniestro, 1);
    this.siniestroCurrent = siniestro;
      if(this.isSeguimientoReparacion){
        let pathToNavigate = siniestro.linkRedireccion;
        this.router.navigate([pathToNavigate],{
          state:{
            placa: siniestro.placa,
            estado: siniestro.codigo,
            radicado: siniestro.numeroRadicado,
            documentosFaltantes: siniestro.documentosFaltantes,
            seguimientoReparacion: siniestro.seguimientoReparacionDTO,
            fechaRadicado: siniestro.fecha,
            siniestroID: siniestro.siniestroID
          }
        });
      }else{
        this.openDialogDetalle();
      }  
  }

  openDialogDetalle() {

    this.dialog.open(this.callDialogDetalle);
  }

  validarVigenciaPoliza(fechaPoliza : any){
 
   
    return Number(new Date(fechaPoliza).getTime()) >= Number(this.fechaActual);
  }
 
}
