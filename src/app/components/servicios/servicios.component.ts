import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';
import { RouterModule, Routes, Router } from "@angular/router";
@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    FooterComponent,
    PlantillaGeneralComponent,
    RouterModule
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  constructor(private router: Router,){}
  radicar(): void {
    console.log("Radicar");
    this.router.navigate(['/radicarSiniestro'])
  }
  seguimiento(): void {
    console.log("Radicar");
    this.router.navigate(['/autogestion/seguimiento-siniestro'])
  }
}
