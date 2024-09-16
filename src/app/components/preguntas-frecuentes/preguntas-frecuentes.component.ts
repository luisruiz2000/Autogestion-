import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  ICO_BUSCAR,
  ICO_HAPPY,
  ICO_ME_VARE,
  ICO_NO_FAQ,
  ICO_PQRS_HOME,
  ICO_PQRS_WEB,
  ICO_SAD,
} from '../../shared/constantes';
import { PreguntaFrecuenteDTO } from '../../models/preguntaFrecuenteDTO';
import { PreguntasFrecuentesService } from '../../services/preguntas-frecuentes.service';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SafeHtmlPipe } from '../../shared/pipe/safeHtml.pipe';
import { FilterPipe } from '../../shared/pipe/filter.pipe';
import { CommonModule } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../shared/interceptors/spinner/spinner.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SpinnerComponent } from '../../shared/interceptors/spinner/spinner.component';
import { HttpInterceptorProviders } from '../../shared/interceptors/interceptor.provider';
import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';

import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css'],
  standalone: true,
  imports: [
    // ... other modules
    FormsModule, // Make sure FormsModule is included here
    MatExpansionModule,
    MatIconModule,
    MatExpansionModule,
    SafeHtmlPipe,
    FilterPipe,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent,
    PlantillaGeneralComponent,
    HttpClientModule,
  ],
  providers: [SafeHtmlPipe, FilterPipe, HttpInterceptorProviders],
})
export class PreguntasFrecuentesComponent implements OnInit, AfterViewInit {
  loading = true;
  subscription!: Subscription;

  selectedTab: string = 'vehiculos';
  Autos: any;

  selectTab(tab: string) {
    this.selectedTab = tab;
    console.log('====>', this.selectedTab);
  }

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  solicitudPreguntas: any;
  usuario: any;

  iconoCarro = ICO_ME_VARE;
  iconoPqrsHome = ICO_PQRS_HOME;
  iconoPqrsWeb = ICO_PQRS_WEB;
  iconoHappy = ICO_HAPPY;
  iconoSad = ICO_SAD;
  iconoBuscar = ICO_BUSCAR;
  icoNoFAQ = ICO_NO_FAQ;

  listaPreguntasFrecuentes: PreguntaFrecuenteDTO[] = [];
  listaPreguntasVehiculo: PreguntaFrecuenteDTO[] = [];
  listaPreguntasCanalWeb: PreguntaFrecuenteDTO[] = [];

  terminoDeBusqueda: string = '';
  abierto: boolean = false;
  mostrarSeccionVehiculo: boolean = true;
  mostrarSeccionCanalWeb: boolean = true;

  constructor(private preguntasFrecuentesService: PreguntasFrecuentesService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.consultarPreguntasFrecuentes();
    }, 0);
  }

  consultarPreguntasFrecuentes(): void {
    this.preguntasFrecuentesService
      .listFAQ()
      .pipe(delay(2000))
      .subscribe((respuesta) => {
        if (respuesta.success == true) {
          this.listaPreguntasFrecuentes = respuesta.data.preguntasFrecuentes;
          this.cargarPreguntasPorCategoria();
        }
      });
  }

  cargarPreguntasPorCategoria(): void {
    console.log('======>', this.listaPreguntasFrecuentes);
    for (let i = 0; i < this.listaPreguntasFrecuentes.length; i++) {
      if (this.listaPreguntasFrecuentes[i].categoria == 'VEHICULOS') {
        this.listaPreguntasFrecuentes[i].abierto = false;
        this.listaPreguntasVehiculo.push(this.listaPreguntasFrecuentes[i]);
      }
      if (this.listaPreguntasFrecuentes[i].categoria == 'VEHICULOS') {
        this.listaPreguntasFrecuentes[i].abierto = false;
        this.listaPreguntasVehiculo.push(this.listaPreguntasFrecuentes[i]);
      }
      if (this.listaPreguntasFrecuentes[i].categoria == 'GENERAL') {
        this.listaPreguntasFrecuentes[i].abierto = false;
        this.listaPreguntasCanalWeb.push(this.listaPreguntasFrecuentes[i]);
      }
      console.log(
        'Lista Preguntas vehiculo-> ' + this.listaPreguntasVehiculo.length
      );
    }
  }

  abrir(pregunta: any) {
    if (!pregunta.abierto) {
      this.listaPreguntasCanalWeb.forEach((item) => (item.abierto = false));
      this.listaPreguntasFrecuentes.forEach((item) => (item.abierto = false));
      pregunta.abierto = true;
    } else {
      this.listaPreguntasCanalWeb.forEach((item) => (item.abierto = false));
      this.listaPreguntasFrecuentes.forEach((item) => (item.abierto = false));
    }
  }

  regresar(): void {
    this.router.navigate(['/home/false'], { state: { vehiculos: this.Autos } });
  }
}
