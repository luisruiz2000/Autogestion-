import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
//import { ModalGenerico } from 'src/app/models/modalGenerico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ICO_NAVEGADOR_CHROME,
  ICO_NAVEGADOR_FIREFOX,
  ICO_NAVEGADOR_EDGE,
  ICO_NAVEGADOR_OPERA,
  ICO_NAVEGADOR_SAFARI
} from '../../shared/constantes';
import { ModalGenerico } from '../../models/modalGenerico';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { bootstrapApplication } from '@angular/platform-browser';
@Component({
  selector: 'app-navegadores-permitidos',
  templateUrl: './navegadores-permitidos.component.html',
  styleUrls: ['./navegadores-permitidos.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone:true,
  imports: [
    CarouselModule,
    
  ],

})
export class NavegadoresPermitidosComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(
    public dialogRef: MatDialogRef<NavegadoresPermitidosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalGenerico
  ) {
    dialogRef.disableClose = true;
  }

  // Icono o imagenes utilizados
  icoNavegadorChrome = ICO_NAVEGADOR_CHROME;
  icoNavegadorFirefox = ICO_NAVEGADOR_FIREFOX;
  icoNavegadorEdge = ICO_NAVEGADOR_EDGE;
  icoNavegadorOpera = ICO_NAVEGADOR_OPERA;
  icoNavegadorSafari = ICO_NAVEGADOR_SAFARI;

  subtitle = 'mat-dialog-subtitle';

  ngOnInit() {
    setTimeout(()=>{
      this.dialogRef.updateSize('200px','200px');
    },2000);
  }

  funcionGenerica(retorno: any): void {
    this.dialogRef.close(retorno);
  }

  cerrar(): void {
    this.dialogRef.close('CLOSE');
  }

  aceptar(): void {
    this.dialogRef.close(1);
  }

  cancelar(): void {
    this.dialogRef.close(0);
  }

}

