import {
  Component,
  OnInit,
  ElementRef,
  Inject,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { FooterService } from '../../../shared/footer/footer.service';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { sha256 } from 'js-sha256';
//import { ToastrService, ToastrModule} from 'ngx-toastr';
import { Autenticacion } from '../../../models/autenticacion';
import { ModalGenerico } from '../../../models/modalGenerico';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import {
  COD_APP,
  CORREO_PATTERN,
  URL_RECUPERAR,
  URL_REGISTRO,
  VERSION_AUTOGESTION_FRONT,
} from '../../../shared/constantes';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { routesAuth } from '../auth.routing';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldModule,
  FloatLabelType,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { SpinnerComponent } from '../../../shared/interceptors/spinner/spinner.component';
import { HttpInterceptorProviders } from '../../../shared/interceptors/interceptor.provider';
import { ModalGenericoComponent } from '../../../shared/modales/modal-generico/modal-generico.component';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Boton } from '../../../models/boton';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    SpinnerComponent,
    ModalGenericoComponent,
    FooterComponent,
  ],
  providers: [HttpInterceptorProviders, HttpClientModule],
})
export class LoginComponent implements OnInit {
  hide = true;
  always: FloatLabelType = 'always';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  contrasenaFormControl = new FormControl('', [Validators.required]);
  formularioLogin!: FormGroup;
  verPassword!: boolean;
  submit!: boolean;
  contrasenaInvalida = false;
  autenticacion = new Autenticacion('', '', '', '');
  ocultarMostrarPassword = 'password';
  logoHeader = 'assets/images/logo-previsora-header.png';
  //urlRegistro = URL_REGISTRO;
  //urlRecuperar = URL_RECUPERAR;
  showEnableBtnPwd!: boolean;
  dialogRef!: MatDialogRef<ModalGenerico>;
  readonly = 'true';
  primerRegistro: boolean = false;
  version: string = VERSION_AUTOGESTION_FRONT;
  emailInput: any;
  // Assuming you have a property named urlRecuperar
  urlRecuperar: string = '/recuperarPassword'; // Replace with your actual path
  urlRegistro: string = '/registroUsuario';
  localStorage: any;
  backgroundImage = 'assets/images/Frame 1620.png';

  mail = 'assets/images/mail.png';
  mail_red = 'assets/images/mail_red.svg';
  key = 'assets/images/key.svg';
  tooltipContrasena?: string;
  //urlRegistro = URL_REGISTRO;
  //urlRecuperar = URL_RECUPERAR;

  b2 = new Boton('Ok', 'ok');
  botones: Boton[] = [this.b2];

  classButtonVariaciones = 'cp-boton-principal-variaciones2';
  constructor(
    private el: ElementRef,
    private footerService: FooterService,
    private fb: FormBuilder,
    private authService: AuthService = inject(AuthService),
    public dialog: MatDialog,
    private router: Router = inject(Router),
    //private toast: ToastrService = inject(ToastrService),
    private _snackBar: MatSnackBar,
    private modalService: ModalService,
    private activedRoute: ActivatedRoute,
    private responsive: BreakpointObserver
  ) {
    this.localStorage = document.defaultView?.localStorage;
    this.builForm();
    this.borrarStorage();
  }

  ngOnInit() {
    /* if (window.screen.width <= 768) {
      this.modalService.modalRedireccionApp()
    }*/
    this.responsive
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.Small,
        Breakpoints.Medium,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.TabletPortrait]) {
          console.log('screens matches TabletPortrait');
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          console.log('screens matches HandsetLandscape');
        } else if (breakpoints[Breakpoints.Small]) {
          console.log('screens matches Small');
        } else if (breakpoints[Breakpoints.Medium]) {
          console.log('screens matches Medium');
        }
      });
    this.footerService.usuario.next(false);
    this.validarPrimerRegistro();
    this.builForm();
    this.autenticacion.username = '';
    this.autenticacion.password = '';
    this.formularioLogin.get('email')!.setValue('');
    this.formularioLogin.get('contrasena')!.setValue('');
    this.formularioLogin.reset;
  }

  metodoQuitarReadOnly() {
    if (this.emailInput) {
      this.emailInput.nativeElement.removeAttribute('readonly');
    }
  }

  // Validaciones para el formulario del login
  builForm() {
    this.formularioLogin = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(CORREO_PATTERN),
        ]),
      ],
      contrasena: ['', Validators.compose([Validators.required])],
    });
    this.formularioLogin.get('email')!.valueChanges.subscribe((data) => {
      if (
        (this.email?.invalid && this.email?.dirty) ||
        (this.email?.invalid && this.email?.touched) ||
        this.email?.invalid
      ) {
        this.mail = 'assets/images/mail_red.svg';
      } else {
        this.mail = 'assets/images/mail.png';
      }
    });

    this.formularioLogin.get('contrasena')!.valueChanges.subscribe((data) => {
      if (
        (this.contrasena?.invalid && this.contrasena?.dirty) ||
        (this.contrasena?.invalid && this.contrasena?.touched) ||
        this.contrasena?.invalid
      ) {
        this.key = 'assets/images/key_red.svg';
      } else {
        this.key = 'assets/images/key.svg';
      }
    });
  }

  // Funcion que envia los datos para ingresar a la aplicación
  ingresar() {
    this.submit = true;
    if (this.formularioLogin.valid) {
      console.log(
        'Password Sin sha256 -> ' +
          this.formularioLogin.get('contrasena')?.value
      );
      this.autenticacion.password = sha256(
        this.formularioLogin.get('contrasena')?.value
      ).toUpperCase();
      console.log('Password -> ' + this.autenticacion.password);
      this.autenticacion.codSistema = COD_APP;
      this.autenticacion.basicToken = 'string';
      this.authService.login(this.autenticacion).subscribe(
        (respuesta) => {
          if (respuesta.success === true && respuesta.status === 'OK') {
            console.log('Respuesta Login -> ' + respuesta);
            this.guardarStorage(respuesta);
            this._snackBar.open('Autenticación exitosa', 'X', {
              duration: 2000,
              panelClass: 'app-notification-success',
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.autenticacion.password = '*******';
            this.footerService.usuario.next(true);
            localStorage.setItem('opc', '1');
            if (this.primerRegistro) {
              this.router.navigate(['home', true]);
            } else {
              this.router.navigate(['home', false]);
            }
          } else if (respuesta.data == null) {
            this.modalService.modalConfirmDelete(
              '¡Credenciales incorrectas!',
              'Usuario y/o contraseña invalidos, revisa los datos ingresados',
              'text-danger',
              'bi bi-x-circle-fill mb-3',
              '',
              '',
              this.botones
            );
            this._snackBar.open('Credenciales invalidas', 'X', {
              duration: 2000,
              panelClass: 'app-notification-error',
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.autenticacion.password = '*******';
            /* this.toast.error('Has intentado ingresar muchas veces a esta cuenta. Verifica la información.', '¡Demasiados intentos!', {
            closeButton: true,
            titleClass: 'toast-tittle-success'
          });*/
          } else {
            this._snackBar.open(respuesta.message, 'X', {
              duration: 2000,
              panelClass: 'app-notification-error',
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.autenticacion.password = '1234567';
            this.contrasenaInvalida = true;
            if (this.contrasena !== null && this.contrasena !== undefined) {
              // Now TypeScript knows that myObject is not null or undefined
              this.contrasena.reset();
            }
          }
        },

        (err) => {
          this._snackBar.open(err + ' HTTP Error', 'X', {
            duration: 2000,
            panelClass: 'app-notification-error',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      {
        this._snackBar.open('Campos invalidos', 'X', {
          duration: 2000,
          panelClass: 'app-notification-warn',
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    }
  }

  // Guardar los datos en el local storage
  guardarStorage(respuesta: any) {
    console.log('Respuesta -> ' + JSON.stringify(respuesta));
    const usuario = {
      usuarioID: respuesta.data.usuario.usuarioID,
      nombres: respuesta.data.usuario.nombres,
      apellidos: respuesta.data.usuario.apellidos,
      email: respuesta.data.usuario.email,
      celular: respuesta.data.usuario.celular,
      tipoDoc: respuesta.data.usuario.tipoDoc,
      numDoc: respuesta.data.usuario.numDoc,
      departamento: respuesta.data.usuario.departamento,
      ciudad: respuesta.data.usuario.ciudad,
      direccion: respuesta.data.usuario.direccion,
      nombrePerfil: respuesta.data.usuario.nombrePerfil,
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    const usuarioString = localStorage.getItem('usuario');
    console.log('Login Usuario ->' + usuarioString);
    localStorage.setItem('refreshtoken', respuesta.data.refreshtoken);
    localStorage.setItem('token', respuesta.data.token);
  }

  borrarStorage() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('token');
  }

  // Función para mostrar la contraseña

  validarPrimerRegistro() {
    let param = this.activedRoute.snapshot.paramMap.get('primerRegistro');
    if (param && param == 'true') {
      this.primerRegistro = true;
    }
  }
  cambiarTipo(param: string) {
    if (param === 'contrasena') {
      if (this.ocultarMostrarPassword === 'password') {
        this.ocultarMostrarPassword = 'text';
        this.showEnableBtnPwd = true;
      } else {
        this.ocultarMostrarPassword = 'password';
        this.showEnableBtnPwd = false;
      }
    }
  }
  // Funciones para usar las validaciones del formulario
  get email() {
    return this.formularioLogin.get('email');
  }
  get contrasena() {
    return this.formularioLogin.get('contrasena');
  }
}
