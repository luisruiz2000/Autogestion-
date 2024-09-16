import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import {ToastrService} from "ngx-toastr";
import { ValidarRegistroDTO } from '../../../models/validarRegistro';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/auth.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
 
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-validar-registro',
  templateUrl: './validar-registro.component.html',
  styleUrls: ['./validar-registro.component.css'],
  standalone: true,
  imports:[
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    CommonModule
    
  ]
})
export class ValidarRegistroComponent implements OnInit {

  validarRegistroDTO!: ValidarRegistroDTO;
  logoHeader = 'assets/images/logo-previsora-header.png';

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: ModalService,
    private _snackBar: MatSnackBar,
    //private toast: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.validarRegistroDTO = new ValidarRegistroDTO();
    this.validarRegistro();
  }

  validarRegistro() {
    
    // Option 1: Check if cadena is defined before assignment
    if (this.validarRegistroDTO !== null) {
      this.validarRegistroDTO.cadena = this.route.snapshot.paramMap.get("cadena");
    }
    this.authService.validarRegistro(this.validarRegistroDTO).subscribe(
      respuesta => {

        if (respuesta.success === false || respuesta.status !== 'OK') {
        /*  this.toast.error('El enlance es inválido o ha expirado.', '¡Error!',{
            closeButton: true,
            titleClass: 'toast-tittle-error',
          });*/
          this._snackBar.open('El enlance es inválido o ha expirado. ¡Error!', 'X',  { duration: 5000, panelClass: 'app-notification-error', horizontalPosition: 'right', verticalPosition: 'top',})

          this.router.navigate(['/']);
        }
       /* this.toast.success('Ingresa tus datos registrados para iniciar sesión.', '¡Usuario verificado!',{
          closeButton: true,
          titleClass: 'toast-tittle-success'
        });*/
        this._snackBar.open('Ingresa tus datos registrados para iniciar sesión. ¡Usuario verificado!', 'X',  { duration: 5000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})

        this.router.navigate(['/login', true]);
      }, err => {
        this.modalService.modalErrror('El sistema no está disponible. \n Por favor, intente mas tarde.','540px', '320px');
        this.router.navigate(['/']);
      }
    )
  }
}
