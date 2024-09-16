import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { URL_GOOGLEPLAY, URL_APPSTORE, ICO_GOOGLEPLAY, ICO_APPSTORE, ICO_IPHONE_MOCKUP } from '../constantes';
import { ModalGenerico } from '../../models/modalGenerico';

@Component({
  selector: 'app-redireccion-app',
  templateUrl: './redireccion-app.component.html',
  styleUrls: ['./redireccion-app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RedireccionAppComponent {
  icoGooglePlay = ICO_GOOGLEPLAY;
  icoAppStore = ICO_APPSTORE;
  icoIphone = ICO_IPHONE_MOCKUP;
  googlePlay = URL_GOOGLEPLAY;
  appStore = URL_APPSTORE;

  constructor(
    public dialogRef: MatDialogRef<RedireccionAppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalGenerico
  ) {
    dialogRef.disableClose = true;
  }
  cerrar(): void {
    this.dialogRef.close('CLOSE');
  }

}
