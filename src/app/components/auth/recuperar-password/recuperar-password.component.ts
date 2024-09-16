import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CORREO_PATTERN } from '../../../shared/constantes';
import { AuthService } from '../../../services/auth.service';
import { Autenticacion } from '../../../models/autenticacion';
import { Router } from '@angular/router';
import { URL_LOGIN, ICO_VOLVER } from '../../../shared/constantes';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalGenerico } from '../../../models/modalGenerico';
import { ModalService } from '../../../services/modal.service';
import { cambioContrasena } from '../../../models/cambioContrasena';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { HttpInterceptorProviders } from '../../../shared/interceptors/interceptor.provider';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SpinnerComponent } from '../../../shared/interceptors/spinner/spinner.component';
import { Boton } from '../../../models/boton';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FooterComponent,
    SpinnerComponent,
  ],
  providers: [HttpInterceptorProviders, HttpClientModule],
})
export class RecuperarPasswordComponent implements OnInit {
  [x: string]: any;
  formularioRecuperar!: FormGroup;
  submit!: boolean;
  autenticacion!: Autenticacion;
  logoHeader: string = '/assets/images/logo-previsora-header.png';
  urlLogin: string = URL_LOGIN;
  ico_volver = ICO_VOLVER;
  dialogRef!: MatDialogRef<ModalGenerico>;
  UserEmail!: cambioContrasena;
  b1 = new Boton('Aceptar', 'ok');
  botones: Boton[] = [this.b1];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService = inject(AuthService),
    public dialog: MatDialog,
    private router: Router,
    private modalService: ModalService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.submit = false;
    this.buildForm();
  }

  login() {}

  // Validaciones para el formulario del login
  buildForm() {
    this.formularioRecuperar = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Funcion que envia los datos para ingresar a la aplicación
  ingresar() {
    if (this.formularioRecuperar.valid && !this.submit) {
      this.submit = true;
      this.UserEmail = new cambioContrasena();
      this.UserEmail.email = this.formularioRecuperar.controls['email'].value;
      this.authService.solicitarCambioContrasena(this.UserEmail).subscribe(
        (respuesta) => {
          if (respuesta.success === true && respuesta.status === 'OK') {
            this.dialogRef = this.modalService.modalConfirm(
              '¡Correo enviado!',
              'Hemos enviado instrucciones correo ingresado para restablecer tu contraseña',
              '500px',
              '400px',
              'bi bi-check-circle-fill icono-confirm',
              this.botones
            );

            /*  this.toast.success('Te hemos enviado instrucciones para reestablecer tu contraseña.', '¡Correo enviado!', {
            closeButton: true,
            titleClass: 'toast-tittle-success'
          });*/
            // this._snackBar.open(
            //   'Te hemos enviado instrucciones para reestablecer tu contraseña. ¡Correo enviado!',
            //   'X',
            //   {
            //     duration: 2000,
            //     panelClass: 'app-notification-success',
            //     horizontalPosition: 'right',
            //     verticalPosition: 'top',
            //   }
            // );
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2000);
          } else {
            /* Usuario no existe */
            this.submit = false;
            this.dialogRef = this.modalService.modalConfirm(
              respuesta.message,
              '',
              '500px',
              '300px',
              'bi bi-x-circle-fill mb-3',
              this.botones
            );
          }
        },
        (err) => {
          this.submit = false;
        }
      );
    }
  }

  // Guardar los datos en el local storage

  guardarStorage(respuesta: any) {
    localStorage.setItem('nombres', respuesta.data.usuario.nombres);
    localStorage.setItem('apellidos', respuesta.data.usuario.apellidos);
    localStorage.setItem('email', respuesta.data.usuario.email);
    localStorage.setItem('celular', respuesta.data.usuario.celular);
    localStorage.setItem('tipoDoc', respuesta.data.usuario.tipoDoc);
    localStorage.setItem('numDoc', respuesta.data.usuario.numDoc);
    localStorage.setItem('refreshtoken', respuesta.data.refreshtoken);
  }

  // Funciones para usar las validaciones del formulario
  get email() {
    return this.formularioRecuperar.get('email');
  }
}
