import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { sha256 } from 'js-sha256';
import { Router, RouterModule } from '@angular/router';
import { Boton } from '../../../models/boton';
//import {ToastrService} from "ngx-toastr";
import {
  CELULAR_PATTERN,
  CONTRASENA_PATTERN,
  CORREO_PATTERN,
  ICO_INTERROGACION_GRIS,
  ICO_INTERROGACION_VERDE,
  ICO_VOLVER,
  LOGO_PREVISORA_BLANCO,
  MAX_CELULAR,
  MIN_CELULAR,
  NOMBRES_PATTERN,
  SOLO_NUMEROS_PATTERN,
  URL_LOGIN,
} from '../../../shared/constantes';
import { TipoDocumento } from '../../../models/tipo-documento';
import { UtilService } from '../../../services/util.service';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { PassIgualValidator } from '../../../shared/validators/pass-igual.validators';
import { Usuario } from '../../../models/usuario';
import { RespuestaDto } from '../../../models/respuesta';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SpinnerComponent } from '../../../shared/interceptors/spinner/spinner.component';
import { HttpInterceptorProviders } from '../../../shared/interceptors/interceptor.provider';

import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatOptionModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FooterComponent,
    SpinnerComponent,
  ],
  providers: [HttpInterceptorProviders, HttpClientModule],
})
export class RegistroUsuariosComponent implements OnInit {
  hide = true;
  urlLogo: string = LOGO_PREVISORA_BLANCO;
  icoVolver: string = ICO_VOLVER;
  iconoPregunta: string = ICO_INTERROGACION_GRIS;
  icoInterrogacionVerde = ICO_INTERROGACION_VERDE;
  ocultarMostrarPassword = 'password';
  ocultarMostrarConfPassword = 'password';
  contrasenaInvalida = false;
  submit?: boolean;
  profileForm?: FormGroup;
  myRecaptcha = new FormControl(false);
  urlLogin? = URL_LOGIN;
  maxCelular = MAX_CELULAR;
  siteKey?: string;
  showEnableBtnPwd?: boolean;
  showEnableBtnPwdConf?: boolean;
  dialogRef?: MatDialogRef<any>;

  tiposDocumento?: TipoDocumento[];
  tooltipContrasena?: string;
  tooltipValidarContrasena?: string;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private authService: AuthService = inject(AuthService),
    private modalService: ModalService,
    private router: Router,
    //private toast: ToastrService
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.utilService.getRecaptchaSiteKey(),
      this.utilService.getTiposDocumentos(),
      this.utilService.getTooltipSinAutenticacion(),
    ]).subscribe((respuesta) => {
      console.log('Key capcha->' + respuesta[0]);
      this.siteKey = respuesta[0];
      this.tiposDocumento = respuesta[1].data;
      this.tooltipContrasena = respuesta[2].data[0].valor;
      this.tooltipValidarContrasena = respuesta[2].data[1].valor;
    });
    this.crearForm();
  }

  crearForm() {
    this.profileForm = this.formBuilder.group(
      {
        nombre: [
          '',
          [Validators.required, Validators.pattern(NOMBRES_PATTERN)],
        ],
        apellido: [
          '',
          [Validators.required, Validators.pattern(NOMBRES_PATTERN)],
        ],
        tipodoc: [null, Validators.required],
        numeroId: ['', Validators.required],
        celular: [
          '',
          [
            Validators.required,
            Validators.pattern(CELULAR_PATTERN),
            Validators.min(MIN_CELULAR),
            Validators.max(MAX_CELULAR),
          ],
        ],
        correo: ['', [Validators.required, Validators.pattern(CORREO_PATTERN)]],
        contrasena: [
          '',
          [Validators.required, Validators.pattern(CONTRASENA_PATTERN)],
        ],
        confContrasena: [
          '',
          [Validators.required, Validators.pattern(CONTRASENA_PATTERN)],
        ],
        terminos: ['', Validators.required],
        captcha: ['', Validators.required],
      },
      {
        validator: PassIgualValidator('contrasena', 'confContrasena'),
      }
    );
  }

  onSubmit() {
    this.resolved();
    this.submit = true;
    if (this.profileForm && this.profileForm.valid) {
      this.confirmarCorreo();
    } else {
      let msj =
        'Para procesar el registro de usuario, debe diligenciar los campos obligatorios.';
      this._snackBar.open(msj, 'X', {
        duration: 5000,
        panelClass: 'app-notification-error',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  // Función para mostrar la contraseña
  cambiarTipo(param: string) {
    if (param === 'contrasena') {
      if (this.ocultarMostrarPassword === 'password') {
        this.ocultarMostrarPassword = 'text';
        this.showEnableBtnPwd = true;
      } else {
        this.ocultarMostrarPassword = 'password';
        this.showEnableBtnPwd = false;
      }
    } else {
      if (this.ocultarMostrarConfPassword === 'password') {
        this.ocultarMostrarConfPassword = 'text';
        this.showEnableBtnPwdConf = true;
      } else {
        this.ocultarMostrarConfPassword = 'password';
        this.showEnableBtnPwdConf = false;
      }
    }
  }

  validarFormatoDoc($event: KeyboardEvent) {
    const stringKey: string = $event.key;
    let match = null;
    if (!this.tipodoc?.value) {
      $event.preventDefault();
    } else {
      match = stringKey.match(SOLO_NUMEROS_PATTERN);
    }
    if (!match) {
      $event.preventDefault();
    }
  }

  soloNumeros($event: KeyboardEvent) {
    const stringKey: string = $event.key;
    const match = stringKey.match(SOLO_NUMEROS_PATTERN);
    if (!match) {
      $event.preventDefault();
    }
  }

  tyc() {
    this.authService.tyc().subscribe((respuesta: any) => {
      console.log('terminos y Condiciones' + respuesta.data.TyC);
      this.modalService.modalHtml(
        'Términos y condiciones',
        `<p class='terminosCondiciones'>` + respuesta.data.TyC + `</p>`,
        'modal-tyc',
        '671px',
        '',
        [],
        ''
      );
    });
  }

  get nombre() {
    return this.profileForm?.get('nombre');
  }
  get apellido() {
    return this.profileForm?.get('apellido');
  }
  get tipodoc() {
    return this.profileForm?.get('tipodoc');
  }
  get numeroId() {
    return this.profileForm?.get('numeroId');
  }
  get celular() {
    return this.profileForm?.get('celular');
  }
  get correo() {
    return this.profileForm?.get('correo');
  }
  get contrasena() {
    return this.profileForm?.get('contrasena');
  }
  get confContrasena() {
    return this.profileForm?.get('confContrasena');
  }
  get terminos() {
    return this.profileForm?.get('terminos');
  }
  get captcha() {
    return this.profileForm?.get('captcha');
  }

  private confirmarCorreo() {
    let titulo = 'Completar registro';
    let html = `<p class="mt-2 mb-2">Te estas registrando con el correo:</p>
                <p class="text-big mb-2 color-turtle-green">${
                  this.profileForm?.get('correo')?.value
                }</p>
                <p>¿Deseas continuar?</p>`;
    let b1 = new Boton('Cancelar', 'no');
    let b2 = new Boton('Ok', 'ok');
    let botones: Boton[] = [b1, b2];

    let modal = this.modalService.modalHtml(
      titulo,
      html,
      'modal-generico-titulo',
      '30em',
      '',
      botones,
      ''
    );
    modal.afterClosed().subscribe((respuesta) => {
      if (respuesta == 'ok') {
        this.enviarDatos();
      } else {
        return;
      }
    });
  }

  private enviarDatos() {
    const usuario: Usuario = new Usuario();
    usuario.screen = 'movil';
    usuario.nombres = this.profileForm?.get('nombre')?.value;
    usuario.apellidos = this.profileForm?.get('apellido')?.value;
    usuario.tipoDoc = this.profileForm?.get('tipodoc')?.value;
    usuario.numDoc = this.profileForm?.get('numeroId')?.value;
    usuario.celular = this.profileForm?.get('celular')?.value;
    usuario.email = this.profileForm?.get('correo')?.value;
    usuario.password = sha256(
      this.profileForm?.get('contrasena')?.value
    ).toUpperCase();
    usuario.captcha = {
      captchaResponse: this.profileForm?.get('captcha')?.value,
    };
    console.log('usuario capcha->' + this.profileForm?.get('captcha')?.value);
    this.authService.registrarUsuario(usuario).subscribe(
      (respuesta: RespuestaDto) => {
        if (respuesta.success === true) {
          this.modalService.modalExito(
            '¡Correo enviado!',
            'Por favor revisa el correo que te enviamos \n para finalizar el registro de tu cuenta.',
            '',
            '',
            ''
          );
          this.profileForm?.reset();
          this.router.navigate(['/']);
        }
        if (
          respuesta.success === false &&
          respuesta.message === 'Este usuario ya está registrado.'
        ) {
          this.modalService.modalErrror(
            '¡Este usuario ya está registrado! \n Por favor, intente nuevamente.',
            '',
            ''
          );
          this.profileForm?.get('captcha')?.reset();
        } else if (
          respuesta.success === false &&
          respuesta.message?.includes('dominio')
        ) {
          let contentHtml =
            'El dominio de correo que estás intentando registrar no es válido para la aplicación';
          this.modalService.modalWarning(
            '¡Correo invalido!',
            '',
            contentHtml,
            '30em',
            ''
          );
          this.profileForm?.get('captcha')?.reset();
          this.profileForm?.get('correo')?.setValue('');
        } else if (respuesta.success === false && respuesta.message) {
          this.modalService.modalErrror(respuesta.message, '', '');
          this.profileForm?.get('captcha')?.reset();
        }
      },
      (err) => {
        //this.modalService.modalErrror('El sistema no está disponible. \n Por favor, intente mas tarde.');
      }
    );
  }

  cambiarDocumento(event: any) {
    this.numeroId?.reset();
  }

  resolved() {
    console.log(
      'Resolved captcha with response:' +
        this.profileForm?.get('captcha')?.value
    );
  }
}
