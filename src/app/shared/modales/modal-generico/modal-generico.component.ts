import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalGenerico } from '../../../models/modalGenerico';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-generico',
  templateUrl: './modal-generico.component.html',
  styleUrls: ['./modal-generico.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class ModalGenericoComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalGenerico
  ) {
    dialogRef.disableClose = true;
  }
  subtitle = 'mat-dialog-subtitle';

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
