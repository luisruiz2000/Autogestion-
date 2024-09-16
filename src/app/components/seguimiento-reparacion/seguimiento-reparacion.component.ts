import {AfterViewInit, Component, HostListener, OnInit,  ViewChild, TemplateRef} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {
  ICO_VOLVER,
  ICO_ALERTA_VERDE,
  ICO_LLAMAR_345,
  ICONO_CALENDARIO,
  ICONO_NUMERO_RADICADO,
  ICO_AVANCE_INICIO_GRIS,
  ICO_AVANCE_REPUESTOS_GRIS,
  ICO_AVANCE_LATONERIA_GRIS,
  ICO_AVANCE_PINTURA_GRIS,
  ICO_AVANCE_FINALIZADO_GRIS,
  ICO_AVANCE_ENTREGADO_GRIS,
  ICO_AVANCE_INICIO_VERDE,
  ICO_AVANCE_REPUESTOS_VERDE,
  ICO_AVANCE_LATONERIA_VERDE,
  ICO_AVANCE_PINTURA_VERDE,
  ICO_AVANCE_FINALIZADO_VERDE,
  ICO_AVANCE_ENTREGADO_VERDE,
  URL_SEGUIMIENTO,
  REPARACION_ETAPA_INICIO,
  REPARACION_ETAPA_REPUESTOS,
  REPARACION_ETAPA_LATONERIA,
  REPARACION_ETAPA_PINTURA,
  REPARACION_ETAPA_ENTREGADO,
  REPARACION_ETAPA_FINALIZADO,
  ICO_AVANCE_VEHICULO,
  ICO_FASE_INICIO_GRIS,
  ICO_FASE_REPUESTOS_GRIS,
  ICO_FASE_LATONERIA_GRIS,
  ICO_FASE_PINTURA_GRIS,
  ICO_FASE_FINALIZADO_GRIS,
  ICO_FASE_ENTREGADO_GRIS,
  ICO_FASE_INICIO_VERDE,
  ICO_FASE_REPUESTOS_VERDE,
  ICO_FASE_LATONERIA_VERDE,
  ICO_FASE_PINTURA_VERDE,
  ICO_FASE_FINALIZADO_VERDE,
  ICO_FASE_ENTREGADO_VERDE,
  ICO_CALENDARIO_ENTREGADO,
  ICO_HERRAMIENTA_TALLER, IMG_LOADING_GIF, PRIVATE_KEY, ICO_LLAMAR_345_PNG, ICON_FLECHA_RETORNO,
  OBJ_NUM_FASES_IMG_CLASS
} from '../../shared/constantes';
import {SeguimientoReparacionDTO} from "../../models/seguimientoReparacionDTO";
import { ModalService } from '../../services/modal.service';
import {SeguimientoReparacionService} from "../../services/seguimiento-reparacion.service";
import {Usuario} from "../../models/usuario";
import {UtilService} from "../../services/util.service";
import {Router, ActivatedRoute, RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';

import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-seguimiento-reparacion',
  templateUrl: './seguimiento-reparacion.component.html',
  styleUrls: ['./seguimiento-reparacion.component.css'],
  standalone: true,
  imports: [ RouterModule, CommonModule, MatStepperModule, PlantillaGeneralComponent, FooterComponent,]
})
export class SeguimientoReparacionComponent implements OnInit, AfterViewInit {
  seguimientoReparacion!:SeguimientoReparacionDTO;
  urlSeguimiento = URL_SEGUIMIENTO;
  etapaActual?: string;
  imagenLocalStorage!: string;
  imagenesMostrar: string[] = [];
  iconoVolver = ICO_VOLVER;
  iconoAlertaVerde = ICO_ALERTA_VERDE;
  icoLlamar = ICO_LLAMAR_345;
  iconoCalendario = ICONO_CALENDARIO;
  iconoNumeroRadicado = ICONO_NUMERO_RADICADO;
  iconoLlamar345 = ICO_LLAMAR_345_PNG;
  iconoFlechaRetorno = ICON_FLECHA_RETORNO;
  placa?: string;
  placaVehiculo?: string;
  fechaRadicado?: string;
  numeroRadicado?: string;
  siniestroID?: string;
  fechaIngreso?: string;
  marca?: string;
  iconoAvanceInicio = ICO_AVANCE_INICIO_GRIS;
  iconoAvanceRepuestos = ICO_AVANCE_REPUESTOS_GRIS;
  iconoAvanceLatoneria = ICO_AVANCE_LATONERIA_GRIS;
  iconoAvancePintura = ICO_AVANCE_PINTURA_GRIS;
  iconoAvanceFinalizado = ICO_AVANCE_FINALIZADO_GRIS;
  iconoAvanceEntregado = ICO_AVANCE_ENTREGADO_GRIS;
  iconoAvanceInicioVerde = ICO_AVANCE_INICIO_VERDE;
  iconoAvanceRepuestosVerde = ICO_AVANCE_REPUESTOS_VERDE;
  iconoAvanceLatoneriaVerde = ICO_AVANCE_LATONERIA_VERDE;
  iconoAvancePinturaVerde = ICO_AVANCE_PINTURA_VERDE;
  iconoAvanceFinalizadoVerde = ICO_AVANCE_FINALIZADO_VERDE;
  iconoAvanceEntregadoVerde = ICO_AVANCE_ENTREGADO_VERDE;
  iconoAvanceVehiculo = ICO_AVANCE_VEHICULO;
  avanceReparacion!: string;
  avanceReparacionEtapaInicio = '16';
  avanceReparacionEtapaRepuestos = '33';
  avanceReparacionEtapaLatoneria = '50';
  avanceReparacionEtapaPintura = '66';
  avanceReparacionEtapaFinalizado = '83';
  avanceReparacionEtapaEntregado = '100';
  reparacionEtapaInicio = REPARACION_ETAPA_INICIO;
  reparacionEtapaRepuestos = REPARACION_ETAPA_REPUESTOS;
  reparacionEtapaLatoneria = REPARACION_ETAPA_LATONERIA;
  reparacionEtapaPintura = REPARACION_ETAPA_PINTURA;
  reparacionEtapaFinalizado = REPARACION_ETAPA_FINALIZADO;
  reparacionEtapaEntregado = REPARACION_ETAPA_ENTREGADO;
  iconoFaseInicio = ICO_FASE_INICIO_GRIS;
  iconoFaseRepuestos = ICO_FASE_REPUESTOS_GRIS;
  iconoFaseLatoneria = ICO_FASE_LATONERIA_GRIS;
  iconoFasePintura = ICO_FASE_PINTURA_GRIS;
  iconoFaseFinalizado = ICO_FASE_FINALIZADO_GRIS;
  iconoFaseEntregado = ICO_FASE_ENTREGADO_GRIS;
  iconoFaseInicioVerde = ICO_FASE_INICIO_VERDE;
  iconoFaseRepuestosVerde = ICO_FASE_REPUESTOS_VERDE;
  iconoFaseLatoneriaVerde = ICO_FASE_LATONERIA_VERDE;
  iconoFasePinturaVerde = ICO_FASE_PINTURA_VERDE;
  iconoFaseFinalizadoVerde = ICO_FASE_FINALIZADO_VERDE;
  iconoFaseEntregadoVerde = ICO_FASE_ENTREGADO_VERDE;
  imagenEtapaRepuestos1?: any;
  imagenEtapaRepuestos2?: any;
  imagenEtapaLatoneria1?: any;
  imagenEtapaLatoneria2?: any;
  imagenEtapaPintura1?: any;
  imagenEtapaPintura2?: any;
  imagenEtapaFinalizado1?: any;
  imagenEtapaFinalizado2?: any;
  cargandoimagenEtapaRepuestos1: boolean = true;
  cargandoimagenEtapaRepuestos2: boolean = true;
  cargandoimagenEtapaLatoneria1: boolean = true;
  cargandoimagenEtapaLatoneria2: boolean = true;
  cargandoimagenEtapaPintura1: boolean = true;
  cargandoimagenEtapaPintura2: boolean = true;
  cargandoimagenEtapaFinalizado1: boolean = true;
  cargandoimagenEtapaFinalizado2: boolean = true;
  imagenLoading = IMG_LOADING_GIF;
  imagenMostrarGaleria1 = this.imagenEtapaRepuestos1;
  imagenMostrarGaleria2 = this.imagenEtapaRepuestos2;
  iconoCalendarioEntregado = ICO_CALENDARIO_ENTREGADO;
  nombreTaller?: string;
  direccionTaller?: string;
  telefonosTaller?: string;
  fechaEntrega?: string;
  horariosAtencion?: string;
  mensajeReparacion?: string;
  mensajeLatoneria?: string;
  mensajePintura?: string;
  mensajeFinalizado?: string;
  mensajeEntregado?: string;
  iconoHerramienta = ICO_HERRAMIENTA_TALLER;
  mostrarEtapaInicio: boolean = false;
  mostrarEtapaRepuestos: boolean = false;
  mostrarEtapaLatoneria: boolean = false;
  mostrarEtapaPintura: boolean = false;
  mostrarEtapaFinalizado: boolean = false;
  mostrarEtapaEntregado: boolean = false;
  usuario?: Usuario;
  firstSlide: boolean = true;
  secondSlide: boolean = true;
  screenSmall: boolean = false;
  sizeScreen?: number;
  objNumFasesImgClass = OBJ_NUM_FASES_IMG_CLASS;
  numFaseCurrent = 0;
  @ViewChild('callDialogImage') callDialogImage = {} as TemplateRef<any>;
  imageCurrent?: any;
  constructor(
    private router: Router,
    private modalService: ModalService,
    private seguimientoReparacionService: SeguimientoReparacionService,
    private utilService: UtilService,
    public dialog: MatDialog)  { }

  ngOnInit() {
    this.getScreenSize();
    this.mensajeReparacion="Estamos gestionando la instalación de los repuestos para tu vehículo";
    this.mensajeLatoneria="La carrocería de tu vehículo está siendo reparada.";
    this.mensajePintura="Estamos terminando los detalles finales de tu vehículo.";
    this.mensajeFinalizado="Tu vehículo está listo. Recuerda llamar al taller para acordar la fecha y hora de entrega.";
    this.mensajeEntregado="Nos alegra que tu vehículo ya esté en casa.";
    this.obtenerInfo();
  }

  ngAfterViewInit() {
    if(this.screenSmall){
      this.recalcularItems();
      this.ubicarCursor();
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.recalcularItems();
  }
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event:any) {
    this.getScreenSize();
  }
  private obtenerInfo() {
    this.seguimientoReparacion = window.history.state.seguimientoReparacion;
    this.placa = window.history.state.placa;
    this.numeroRadicado = window.history.state.radicado;
    this.siniestroID = window.history.state.siniestroID;
    this.marca = window.history.state.seguimientoReparacion.marca;
    console.log("window.history.state=>", window.history.state);
    if (window.history.state.fechaRadicado !== undefined && window.history.state.fechaRadicado !== null) {
      this.fechaRadicado = window.history.state.fechaRadicado.substr(0,10);
    }
    if (this.seguimientoReparacion && this.placa){
      this.placaVehiculo = `${this.seguimientoReparacion.marca!.toUpperCase()} - ${this.placa}`;
      this.fechaIngreso = this.seguimientoReparacion.fechaIngreso;
      this.etapaActual = this.seguimientoReparacion.estado;
      this.llenarInfoComplementaria();
      this.validarEtapaReparacion();
    }else{
      this.router.navigate([this.urlSeguimiento]);
    }

  }

  private validarEtapaReparacion() {
      switch (this.etapaActual) {
        case REPARACION_ETAPA_INICIO:
          this.numFaseCurrent = 1;
          this.avanceReparacion = this.avanceReparacionEtapaInicio;
          this.gestionEtapaInicio();
         
          break;
        case REPARACION_ETAPA_REPUESTOS:
          this.numFaseCurrent = 2;
          this.avanceReparacion = this.avanceReparacionEtapaRepuestos;
          this.gestionEtapaRepuestos();
          break;
        case REPARACION_ETAPA_LATONERIA:
          this.numFaseCurrent = 3;
          this.avanceReparacion = this.avanceReparacionEtapaLatoneria;
          this.gestionEtapaLatoneria();
          break;
        case REPARACION_ETAPA_PINTURA:
          this.numFaseCurrent = 4;
          this.avanceReparacion = this.avanceReparacionEtapaPintura;
          this.gestionEtapaPintura();
          break;
        case REPARACION_ETAPA_FINALIZADO:
          this.numFaseCurrent = 5;
          this.avanceReparacion = this.avanceReparacionEtapaFinalizado;
          this.gestionEtapaFinalizado();
          break;
        case REPARACION_ETAPA_ENTREGADO:
          this.numFaseCurrent = 6;
          this.avanceReparacion = this.avanceReparacionEtapaEntregado;
          this.gestionEtapaEntregado();
          break;

      }
  }

  private gestionEtapaInicio() {
      this.iconoAvanceInicio = this.iconoAvanceInicioVerde;
      this.iconoFaseInicio = this.iconoFaseInicioVerde;
      this.mostrarEtapaInicio = true;
  }

  private gestionEtapaRepuestos() {
    let imagenesEtapaRepuestos: any[];
    this.iconoAvanceRepuestos = this.iconoAvanceRepuestosVerde;
    this.iconoFaseRepuestos = this.iconoFaseRepuestosVerde;
    this.mostrarEtapaRepuestos = true;
    imagenesEtapaRepuestos = this.gestionarImagenes(REPARACION_ETAPA_REPUESTOS);
    this.imagenEtapaRepuestos1 = imagenesEtapaRepuestos[0];
    this.imagenEtapaRepuestos2 = imagenesEtapaRepuestos[1];
    if(this.imagenEtapaRepuestos1?.length > 0){
      this.cargandoimagenEtapaRepuestos1 = false;
    }
    if(this.imagenEtapaRepuestos2?.length > 0){
      this.cargandoimagenEtapaRepuestos2 = false;
    }
    this.gestionEtapaInicio();
  }

  private gestionEtapaLatoneria() {
    let imagenesEtapaLatoneria: any[];
    this.iconoAvanceLatoneria = this.iconoAvanceLatoneriaVerde;
    this.iconoFaseLatoneria = this.iconoFaseLatoneriaVerde;
    this.mostrarEtapaLatoneria= true;
    imagenesEtapaLatoneria = this.gestionarImagenes(REPARACION_ETAPA_LATONERIA);
    this.imagenEtapaLatoneria1 = imagenesEtapaLatoneria[0];
    this.imagenEtapaLatoneria2 = imagenesEtapaLatoneria[1];
    if(this.imagenEtapaLatoneria1?.length > 0){
      this.cargandoimagenEtapaLatoneria1 = false;
    }
    if(this.imagenEtapaLatoneria2?.length > 0){
      this.cargandoimagenEtapaLatoneria2 = false;
    }
    this.gestionEtapaRepuestos();
  }

  private gestionEtapaPintura() {
    let imagenesEtapaPintura: any[];
    this.iconoAvancePintura = this.iconoAvancePinturaVerde;
    this.iconoFasePintura = this.iconoFasePinturaVerde;
    this.mostrarEtapaPintura = true;
    imagenesEtapaPintura = this.gestionarImagenes(REPARACION_ETAPA_PINTURA);
    this.imagenEtapaPintura1 = imagenesEtapaPintura[0];
    this.imagenEtapaPintura2 = imagenesEtapaPintura[1];
    if(this.imagenEtapaPintura1?.length > 0){
      this.cargandoimagenEtapaPintura1 = false;
    }
    if(this.imagenEtapaPintura2?.length > 0){
      this.cargandoimagenEtapaPintura2 = false;
    }
    this.gestionEtapaLatoneria();
  }

  private gestionEtapaFinalizado() {
    let imagenesEtapaFinalizado: any[];
    this.iconoAvanceFinalizado = this.iconoAvanceFinalizadoVerde;
    this.iconoFaseFinalizado = this.iconoFaseFinalizadoVerde;
    this.mostrarEtapaFinalizado = true;
    imagenesEtapaFinalizado = this.gestionarImagenes(REPARACION_ETAPA_FINALIZADO);
    this.imagenEtapaFinalizado1 = imagenesEtapaFinalizado[0];
    this.imagenEtapaFinalizado2 = imagenesEtapaFinalizado[1];
    if(this.imagenEtapaFinalizado1?.length > 0){
      this.cargandoimagenEtapaFinalizado1 = false;
    }
    if(this.imagenEtapaFinalizado2?.length > 0){
      this.cargandoimagenEtapaFinalizado2 = false;
    }
    this.gestionEtapaPintura();
  }

  private gestionEtapaEntregado() {
    this.iconoAvanceEntregado = this.iconoAvanceEntregadoVerde;
    this.iconoFaseEntregado = this.iconoFaseEntregadoVerde;
    this.mostrarEtapaEntregado = true;
    this.gestionEtapaFinalizado();
  }

  private llenarInfoComplementaria() {
    this.nombreTaller = this.seguimientoReparacion.nombreTaller;
    this.direccionTaller = this.seguimientoReparacion.direccionTaller;
    this.telefonosTaller = this.seguimientoReparacion.telefonoTaller;
    this.fechaEntrega = this.seguimientoReparacion.fechaEntregado;
    this.horariosAtencion = this.seguimientoReparacion.horariosAtencion;
    console.log("horariosAtencion", this.horariosAtencion );
    console.log("nombreTaller", this.nombreTaller );
  }

  private gestionarImagenes(etapa: string):any[] {
    let imagenesEtapa: any[] = [];
    let img1 = this.gestionarDescargaImagenes(etapa, 1);
    let img2 = this.gestionarDescargaImagenes(etapa, 2);
    imagenesEtapa.push(img1);
    imagenesEtapa.push(img2);
    return imagenesEtapa;
  }

  private gestionarDescargaImagenes(etapa: string, numeroImagen: number): any{
    let imagen:any = {};
    try {
        let img = this.consultarImagenLocal(etapa, numeroImagen);
        if(!img){
          throw new Error('No se encontró la imagen en local');
        }else{
          imagen = img;
        }
    }catch (error) {
        this.consultarImagenServicio(etapa, numeroImagen);
    }
    return imagen;
  }

  private consultarImagenLocal(etapa:any, numeroImagen:any){
    let imagen: any;
    let etapas: any[] = [];
    try {
      let objetoLocal:any = localStorage.getItem(`${this.numeroRadicado}`);
      if(objetoLocal){
        objetoLocal = this.decryptObject(objetoLocal);
        objetoLocal = JSON.parse(objetoLocal);
        etapas = objetoLocal.etapas;
        let existe = etapas.filter(data => data.nombre === etapa && data.numero === numeroImagen);
        if(existe && existe.length>0){
          imagen = `data:image/png;base64,${existe[0].imagen}`;
        }
      }
      }catch (ex : any) {
        throw new Error(`Error consultando la imagen en local ${ex.message}`);
      }
    return imagen;
  }

  private async consultarImagenServicio(etapa:any, numeroImagen:any){
      let imagen: any;
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      let solicitud:any = {};
      solicitud.fase = etapa;
      solicitud.siniestroID = this.siniestroID;
      solicitud.username = this.usuario!.email;
      solicitud.numero = numeroImagen;
      return this.seguimientoReparacionService.getImage(solicitud).subscribe(
        resultado =>{
          imagen = `data:image/png;base64,${resultado.data.image}`;
          switch (etapa) {
            case REPARACION_ETAPA_REPUESTOS:
              if(numeroImagen === 1){
                this.cargandoimagenEtapaRepuestos1 = false;
                this.imagenEtapaRepuestos1 = imagen;
              }else if(numeroImagen === 2){
                this.cargandoimagenEtapaRepuestos2 = false;
                this.imagenEtapaRepuestos2 = imagen;
              }
              break;
            case REPARACION_ETAPA_LATONERIA:
              if(numeroImagen === 1){
                this.cargandoimagenEtapaLatoneria1 = false;
                this.imagenEtapaLatoneria1 = imagen;
              }else if(numeroImagen === 2){
                this.cargandoimagenEtapaLatoneria2 = false;
                this.imagenEtapaLatoneria2 = imagen;
              }
              break;
            case REPARACION_ETAPA_PINTURA:
              if(numeroImagen === 1){
                this.cargandoimagenEtapaPintura1 = false;
                this.imagenEtapaPintura1 = imagen;
              }else if(numeroImagen === 2){
                this.cargandoimagenEtapaPintura2 = false;
                this.imagenEtapaPintura2 = imagen;
              }
              break;
            case REPARACION_ETAPA_FINALIZADO:
              if(numeroImagen === 1){
                this.cargandoimagenEtapaFinalizado1 = false;
                this.imagenEtapaFinalizado1 = imagen;
              }else if(numeroImagen === 2){
                this.cargandoimagenEtapaFinalizado2 = false;
                this.imagenEtapaFinalizado2 = imagen;
              }
              break;
          }
          this.guardarImagenLocal(etapa, numeroImagen, resultado.data.image);
        }
      );
  }

  private guardarImagenLocal(etapa:string, numeroImagen: number, imagen:string) {
    let solicitud:any = {};
    let etapas: any[] = [];
    let cuerpoEtapa:any ={};
    solicitud.username = this.usuario!.email;
    cuerpoEtapa.nombre = etapa;
    cuerpoEtapa.imagen = imagen;
    cuerpoEtapa.numero = numeroImagen;
    try {
      let objetoLocal:any = localStorage.getItem(`${this.numeroRadicado}`);
      if(objetoLocal){
            objetoLocal = this.decryptObject(objetoLocal);
            objetoLocal = JSON.parse(objetoLocal);
            etapas = objetoLocal.etapas;
            let existeRegistro = etapas.filter(data => data.nombre === etapa && data.numero === numeroImagen);
            if(!existeRegistro || existeRegistro.length === 0){
              etapas.push(cuerpoEtapa);
              solicitud.etapas = etapas;
              solicitud = this.encryptObject(JSON.stringify(solicitud));
              localStorage.setItem(`${this.numeroRadicado}`, solicitud);
            }
      }else{
        etapas.push(cuerpoEtapa);
        solicitud.etapas = etapas;
        solicitud = this.encryptObject(JSON.stringify(solicitud));
        localStorage.setItem(`${this.numeroRadicado}`, solicitud);
      }
      this.utilService.guardarDatosPorPlaca(this.placa!, this.numeroRadicado!);
    }catch(exc:any){
        console.log('Error al almacenar la imagen en local',exc.message);
    }

  }

  private encryptObject(toEncrypt:any):string{
    toEncrypt = CryptoJS.AES.encrypt(toEncrypt, PRIVATE_KEY);
    toEncrypt = toEncrypt.toString();
    return toEncrypt;
  }
  private decryptObject(toDecrypt: any):string{
    toDecrypt = CryptoJS.AES.decrypt(toDecrypt, PRIVATE_KEY);
    toDecrypt = toDecrypt.toString(CryptoJS.enc.Utf8);
    return toDecrypt;
  }

  mostrarImagenes(etapa: string, numero: number) {
    this.validarGaleria(numero);
      switch (etapa) {
        case this.reparacionEtapaRepuestos:
          this.imagenMostrarGaleria1 = this.imagenEtapaRepuestos1;
          this.imagenMostrarGaleria2 = this.imagenEtapaRepuestos2;
          break;
        case this.reparacionEtapaLatoneria:
          this.firstSlide = true;
          this.imagenMostrarGaleria1 = this.imagenEtapaLatoneria1;
          this.imagenMostrarGaleria2 = this.imagenEtapaLatoneria2;
          break;
        case this.reparacionEtapaPintura:
          this.firstSlide = true;
          this.imagenMostrarGaleria1 = this.imagenEtapaPintura1;
          this.imagenMostrarGaleria2 = this.imagenEtapaPintura2;
          break;
        case this.reparacionEtapaFinalizado:
          this.firstSlide = true;
          this.imagenMostrarGaleria1 = this.imagenEtapaFinalizado1;
          this.imagenMostrarGaleria2 = this.imagenEtapaFinalizado2;
          break;
      }
  }

  validarNombreTaller():boolean {
    if(this.nombreTaller!.length>0){
      return false;
    }
    return true;
  }

  validarGaleria(numero: number) {

    let controlSlide1 = document.getElementById('controlSlide1');
    let controlSlide2 = document.getElementById('controlSlide2');
    let slide1 = document.getElementById('slide1');
    let slide2 = document.getElementById('slide2');
    if (numero === 1) {
      if (controlSlide2) {
        controlSlide2.classList.remove('active');
      }
      if (slide2) {
        slide2.classList.remove('active');
      }
      if (controlSlide1) {
        controlSlide1.classList.add('active');
      }
      if (slide1) {
        slide1.classList.add('active');
      }
    } else if (numero === 2) {
      if (controlSlide1) {
        controlSlide1.classList.remove('active');
      }
      if (slide1) {
        slide1.classList.remove('active');
      }
      if (controlSlide2) {
        controlSlide2.classList.add('active');
      }
      if (slide2) {
        slide2.classList.add('active');
      }
    }
    this.firstSlide = numero === 1 ? true : false;
    this.secondSlide = !this.firstSlide;
  }

  private getScreenSize() {
    if (window.screen.width <= 768) {
      this.screenSmall = true;
    }else{
      this.screenSmall = false;
    }
    return this.sizeScreen = window.screen.width;
  }

  private recalcularItems() {
      var contenedorProgreso = document.getElementById("contenedorProgreso");
      var contenedor_horizontal_etapas = document.getElementById("contenedor-horizontal-etapas");
      if(contenedorProgreso && contenedor_horizontal_etapas){
        contenedorProgreso.style.width = `${contenedor_horizontal_etapas.offsetWidth}px`;
      }
  }

  private ubicarCursor() {
    var elmnt;
    switch (this.etapaActual) {
      case REPARACION_ETAPA_INICIO:
        elmnt = document.getElementById('etapaInicio');
        break;
      case REPARACION_ETAPA_REPUESTOS:
        elmnt = document.getElementById('etapaRepuestos');
        break;
      case REPARACION_ETAPA_LATONERIA:
        elmnt = document.getElementById('etapaLatoneria');
        break;
      case REPARACION_ETAPA_PINTURA:
        elmnt = document.getElementById('etapaPintura');
        break;
      case REPARACION_ETAPA_FINALIZADO:
        elmnt = document.getElementById('etapaFinalizado');
        break;
      case REPARACION_ETAPA_ENTREGADO:
        elmnt = document.getElementById('etapaEntregado');
        break;

    }

    elmnt!.scrollIntoView(true);
  }
  redireccionar(path: string): void {
    //console.log("Home");
    this.router.navigate([path])
  }

  posLeftCar(){
    if(parseInt(this.avanceReparacion) === 16)  return 4.5 + parseInt(this.avanceReparacion);
    else if(parseInt(this.avanceReparacion) === 33)  return 3 + parseInt(this.avanceReparacion);
    else if(parseInt(this.avanceReparacion) === 50)  return 1.4 + parseInt(this.avanceReparacion);
    else if(parseInt(this.avanceReparacion) === 66)  return 1.1 + parseInt(this.avanceReparacion);
    else if(parseInt(this.avanceReparacion) === 83)  return parseInt(this.avanceReparacion) - 0.6;
    else return parseInt(this.avanceReparacion) - 2.3
  }
  openDialogImage(src : any) {
    this.imageCurrent = src;
    this.dialog.open(this.callDialogImage);
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
