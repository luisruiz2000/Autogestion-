import { Directive, HostListener } from '@angular/core';
import { NotificacionesService } from "../../services/notificaciones.service";

@Directive({
  selector: '[campanaNotificacionDirective]'
})
export class CampanaNotificacionDirective {
  private wasInside!: boolean;
  private usuario: any;

  constructor(private notificacionesService: NotificacionesService) {
    this.notificacionesService.getShowObservable().subscribe(
      respuesta => {
          this.wasInside = respuesta;
      }
    );
  }


  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.notificacionesService.showNotificacionSource.next(false);
    }
    this.wasInside = false;
  }

}
