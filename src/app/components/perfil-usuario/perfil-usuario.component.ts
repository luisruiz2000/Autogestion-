import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injectable,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { Departamento } from '../../models/departamento';
import { Municipio } from '../../models/municipio';
import { DominiosService } from '../../services/dominios.service';
import { sha256 } from 'js-sha256';
import { Dominio } from '../../models/dominio';
import { UtilService } from '../../services/util.service';

import {
  CELULAR_PATTERN,
  CONTRASENA_PATTERN,
  CORREO_PATTERN,
  ICONO_PERFILx3,
  ICON_FLECHA_RETORNO,
  ICO_INTERROGACION_GRIS,
  ICO_INTERROGACION_VERDE,
  ICO_VOLVER,
  LOCALSTORAGE_TOKEN,
  LOCALSTORAGE_USUARIO,
  MAX_CELULAR,
  MIN_CELULAR,
  SIN_ESPACIO_AL_INICIO,
  TIPO_DOMINIO_MUNICIPIOS,
  URL_BASE_HOME,
  URL_LOGIN,
} from '../../shared/constantes';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ModalService } from '../../services/modal.service';
import {
  PassIgualValidator,
  changePassValidator,
} from '../../shared/validators/pass-igual.validators';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActualizarUsuarioDto } from '../../models/actualizarUsuarioDTO';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PlantillaGeneralComponent } from '../../shared/plantilla-general/plantilla-general.component';
import { LOGO_PREVISORA_BLANCO } from '../../shared/constantes';

import { MatIconModule } from '@angular/material/icon';
import { includes } from 'lodash';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalGenerico } from '../../models/modalGenerico';
import { Boton } from '../../models/boton';

@Component({
  selector: 'app-perfil-usuario',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PerfilUsuarioComponent,
    },
  ],
  standalone: true,
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  imports: [
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    FooterComponent,
    PlantillaGeneralComponent,
    MatIconModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
@Injectable()
export class PerfilUsuarioComponent implements OnInit {
  formulario!: FormGroup;
  iconoPerfil = ICONO_PERFILx3;
  icoVolver = ICO_VOLVER;
  icoInterrogacionGris = ICO_INTERROGACION_GRIS;
  icoInterrogacionVerde = ICO_INTERROGACION_VERDE;
  iconoFlechaRetorno = ICON_FLECHA_RETORNO;
  dialogRef!: MatDialogRef<ModalGenerico>;
  b1 = new Boton('Aceptar', 'ok');
  botones: Boton[] = [this.b1];
  //--------------------------
  ocultarMostrarOldPassword = 'password';
  ocultarMostrarNewPassword = 'password';
  ocultarMostrarConfPassword = 'password';
  newPasswordInvalida = true;
  currentPasswordInvalida = true;
  confPasswordInvalida = true;
  newPassword: any;
  showEnableBtnOldPwd?: boolean;
  showEnableBtnPwd?: boolean;
  showEnableBtnPwdConf?: boolean;

  departamentos?: Departamento[];
  nameDepartamento: string[] = [];
  municipios?: Municipio[];
  usuario: Usuario = new Usuario();
  urlLogo: string = LOGO_PREVISORA_BLANCO;
  btnGuardar: boolean = false;
  dpto: any;
  nameDpto: any;

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  private tipoDocs = [
    {
      codigo: 'CC',
      nombre: 'Cédula de Ciudadanía',
    },
    {
      codigo: 'CE',
      nombre: 'Cédula de extranjería',
    },
    {
      codigo: 'PA',
      nombre: 'Pasaporte',
    },
    {
      codigo: 'TI',
      nombre: 'Tarjeta de identidad',
    },
  ];

  private tipoDocUsuer: any;

  constructor(
    private fb: FormBuilder,
    private dominiosService: DominiosService,
    private router: Router,
    private usuarioService: UsuarioService,
    private modal: ModalService,
    private utilService: UtilService,
    private _snackBar: MatSnackBar,
    private modalService: ModalService
  ) {
    this.builForm();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.validarTokenYusuario();
      this.obtenerDominios();
      this.cargarDataAlFormulario();
    });
  }
  metodoQuitarReadOnly() {
    document!.getElementById('direccion')!.removeAttribute('readonly');
    document!.getElementById('oldContrasena')!.removeAttribute('readonly');
    document!.getElementById('newContrasena')!.removeAttribute('readonly');
    document!.getElementById('confiPassword')!.removeAttribute('readonly');
  }
  validarTokenYusuario() {
    const toke = localStorage.getItem(LOCALSTORAGE_TOKEN);
    if (toke == null || !this.getUsuario()) {
      this.router.navigate([URL_LOGIN]);
    }
  }

  getUsuario() {
    const usuarioString = localStorage.getItem(LOCALSTORAGE_USUARIO);

    if (usuarioString !== null) {
      const userData = JSON.parse(usuarioString);
      // Now you can use the 'usuario' variable
      if (userData != null) {
        this.usuario = new Usuario();
        this.usuario.usuarioID = userData['usuarioID'];
        this.usuario.nombres = userData['nombres'];
        this.usuario.apellidos = userData['apellidos'];
        this.usuario.celular = userData['celular'];
        this.usuario.tipoDoc = userData['tipoDoc'];
        const found = this.tipoDocs.find(
          (element) => element.codigo == this.usuario.tipoDoc
        );
        if (found) {
          this.tipoDocUsuer = found;
        } else {
          this.tipoDocUsuer = userData['tipoDoc'];
        }
        this.usuario.numDoc = userData['numDoc'];
        this.usuario.email = userData['email'];
        this.usuario.departamento = userData['departamento'];
        this.usuario.ciudad = userData['ciudad'];
        this.usuario.direccion = userData['direccion'];
        return true;
      } else {
        return false;
      }
    } else {
      // Handle the case when 'usuario' is null\
      console.error('Usuario data is null in localStorage');
      return false;
    }
  }

  // Validaciones para el formulario de perfil
  builForm() {
    this.formulario = this.fb.group(
      {
        tipoDocumento: [{ value: '', disabled: true }],
        numeroDocumento: [{ value: '', disabled: true }],
        correo: [
          { value: '', disabled: true },
          [Validators.pattern(CORREO_PATTERN)],
        ],
        celular: [
          '',
          [
            Validators.required,
            Validators.pattern(CELULAR_PATTERN),
            Validators.max(MAX_CELULAR),
            Validators.min(MIN_CELULAR),
          ],
        ],
        departamento: ['', Validators.required],
        ciudadMunicipio: [{ value: '', disabled: true }, Validators.required],
        direccion: [{ value: '' }, Validators.pattern(SIN_ESPACIO_AL_INICIO)],
        oldContrasena: [{ value: '' }, Validators.pattern(CONTRASENA_PATTERN)],
        newContrasena: ['', [Validators.pattern(CONTRASENA_PATTERN)]],
        confNewContrasena: ['', [Validators.pattern(CONTRASENA_PATTERN)]], // se cambio la implementacion de validacion de contraseña, revisarlo en registro usuario
      },
      {
        validators: [
          PassIgualValidator('newContrasena', 'confNewContrasena'),
          changePassValidator(
            'oldContrasena',
            'newContrasena',
            'confNewContrasena'
          ),
        ],
      }
    );
  }

  guardar() {
    if (this.formulario?.valid) {
      let data = new ActualizarUsuarioDto();
      data.username = this.usuario.email;
      if (this.isCelularChanged) {
        data.numeroCelular = this.formulario!.get('celular')!.value;
      }
      data.anteriorPassword =
        this.formulario!.get('oldContrasena')!.value == ''
          ? ''
          : sha256(this.formulario!.get('oldContrasena')!.value).toUpperCase();
      data.nuevoPassword =
        this.formulario!.get('newContrasena')!.value == ''
          ? ''
          : sha256(this.formulario!.get('newContrasena')!.value).toUpperCase();

      if (this.isCiudadChanged) {
        data.departamento = this.formulario!.get('departamento')!.value;
        data.ciudad = this.formulario.get('ciudadMunicipio')!.value;
      }

      if (this.isDireccionChanged) {
        data.direccion = this.formulario!.get('direccion')!.value;
      }

      this.usuarioService.actualizarUsuario(data).subscribe((respuesta) => {
        if (respuesta.success === true && respuesta.status === 'OK') {
          let solicitudNotificaciones: any = {};
          solicitudNotificaciones.tipoDocumento = this.usuario.tipoDoc;
          solicitudNotificaciones.numeroDocumento = this.usuario.numDoc;
          solicitudNotificaciones.username = this.usuario.email;
          this.utilService.getCountNotifications(solicitudNotificaciones);
          this.usuario.celular = respuesta.data.user.celular;
          this.usuario.departamento = respuesta.data.user.departamento;
          this.usuario.ciudad = respuesta.data.user.ciudad;
          this.usuario.direccion = respuesta.data.user.direccion;
          this.guardarStorage();
          this.resetForm();
          if (respuesta.data.cambioCelular || respuesta.data.cambioDireccion) {
            let msj = 'Sus datos se han actualizado de manera exitosa.';

            this._snackBar.open(
              'Sus datos se han actualizado de manera exitosa. ¡Actualización exitosa!',
              'X',
              {
                duration: 2000,
                panelClass: 'app-notification-success',
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          }
          if (respuesta.data.cambioPassword) {
            let msj = 'Se ha registrado una nueva contraseña exitosamente.';

            this.dialogRef = this.modalService.modalConfirm(
              '¡Correo enviado!',
              'Hemos enviado instrucciones correo ingresado para restablecer tu contraseña',
              '500px',
              '400px',
              'bi bi-check-circle-fill icono-confirm',
              this.botones
            );

            this._snackBar.open(
              'Se ha registrado una nueva contraseña exitosamente. ¡Nueva Contraseña!',
              'X',
              {
                duration: 2000,
                panelClass: 'app-notification-success',
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          }
        } else {
          if (respuesta.message != null) {
            this._snackBar.open(respuesta.message + ' Error', 'X', {
              duration: 2000,
              panelClass: 'app-notification-error',
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          } else {
            this.modal.modalErrror(
              '!Ups ha ocurrido un error de conexión \n Intenta de nuevo',
              '',
              ''
            );
          }
        }
      });
    }
  }

  get habilitarBtnGuardado() {
    if (
      this.formulario!.valid &&
      (this.isCelularChanged ||
        this.isDireccionChanged ||
        this.isCiudadChanged ||
        this.oldContrasena!.value.length > 0)
    ) {
      return false;
    } else {
      return true;
    }
  }

  cargarDataAlFormulario() {
    this.formulario?.setValue({
      tipoDocumento: this.tipoDocUsuer.nombre,
      numeroDocumento: this.usuario.numDoc,
      correo: this.usuario.email,
      celular: this.usuario.celular,
      departamento: this.usuario.departamento,
      ciudadMunicipio: this.usuario.ciudad,
      direccion: this.usuario.direccion,
      oldContrasena: '',
      newContrasena: '',
      confNewContrasena: '',
    });
  }

  // Guardar los datos en el local storage
  guardarStorage() {
    const usuario = {
      usuarioID: this.usuario.usuarioID,
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      email: this.usuario.email,
      celular: this.usuario.celular,
      tipoDoc: this.usuario.tipoDoc,
      numDoc: this.usuario.numDoc,
      departamento: this.usuario.departamento,
      ciudad: this.usuario.ciudad,
      direccion: this.usuario.direccion,
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  resetForm() {
    this.formulario?.reset({
      tipoDocumento: this.tipoDocUsuer.nombre,
      numeroDocumento: this.usuario.numDoc,
      correo: this.usuario.email,
      celular: this.usuario.celular,
      departamento: this.usuario.departamento,
      ciudadMunicipio: this.usuario.ciudad,
      direccion: this.usuario.direccion,
      oldContrasena: '',
      newContrasena: '',
      confNewContrasena: '',
    });
  }

  goToHome() {
    this.router.navigate([URL_BASE_HOME]);
  }

  obtenerDominios() {
    let dominio = new Dominio();
    dominio.tipoDominio = TIPO_DOMINIO_MUNICIPIOS;
    this.dominiosService
      .getDominiosAutogestion(dominio)
      .subscribe((data: any) => {
        this.departamentos = data.departamento;
        this.departamentos?.forEach((dpto) => {
          if (dpto.nombre) {
            this.nameDepartamento?.push(dpto.nombre);
          }
        });

        console.log('Dptos=>', JSON.stringify(this.departamentos));
        if (
          this.usuario.departamento &&
          this.usuario.ciudad &&
          this.departamentos
        ) {
          this.obtenerMunicipios(this.usuario.departamento);
        }
      });
  }

  showPassword(param: string) {
    if (param === 'oldContrasena') {
      if (this.ocultarMostrarOldPassword === 'password') {
        this.ocultarMostrarOldPassword = 'text';
        this.showEnableBtnOldPwd = true;
      } else {
        this.ocultarMostrarOldPassword = 'password';
        this.showEnableBtnOldPwd = false;
      }
    } else if (param === 'newContrasena') {
      if (this.ocultarMostrarNewPassword === 'password') {
        this.ocultarMostrarNewPassword = 'text';
        this.showEnableBtnPwd = true;
      } else {
        this.ocultarMostrarNewPassword = 'password';
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

  /* metodo para validar Contraseña actual */
  // currentPassword(event: any) {
  //   const password = (event.target as HTMLInputElement).value;
  //   console.log(password);

  //   this.passwordRegex.test(password)
  //     ? (this.currentPasswordInvalida = true)
  //     : (this.currentPasswordInvalida = false);
  //   console.log(this.currentPasswordInvalida);
  // }

  /* Metodo para validar la nueva password*/
  nuevaPassword(event: any): void {
    const password = (event.target as HTMLInputElement).value;

    this.newPassword = password;

    this.passwordRegex.test(password)
      ? (this.newPasswordInvalida = true)
      : (this.newPasswordInvalida = false);
    console.log(this.newPasswordInvalida);
  }

  /* Metodo para validar la confirmacion de la password */

  confiPassword(event: any) {
    const password = (event.target as HTMLInputElement).value;
    console.log(password);

    if (this.newPassword == password) {
      this.confPasswordInvalida = true;
    } else {
      this.confPasswordInvalida = false;
    }

    console.log(this.confPasswordInvalida);
  }

  // Metodo para obtener los departamento y municipios
  obtenerMunicipios(codigo: any) {
    console.log(this.nameDepartamento);
    this.dpto = this.departamentos?.map((dpto) => {
      if (
        dpto.nombre?.toLocaleLowerCase()?.includes(codigo.toLocaleLowerCase())
      ) {
        this.municipios = dpto.municipio;
      }
    });
    this.ciudadMunicipio?.enable();
  }

  buscarDpto(event: KeyboardEvent) {
    const buscarDpto = (event.target as HTMLInputElement).value;
    this.nameDpto = this.nameDepartamento.filter((name) => {
      return name.toLowerCase().includes(buscarDpto.toLowerCase());
    });
  }
  get isCelularChanged() {
    if (this.formulario!.get('celular')!.dirty) {
      if (this.formulario!.get('celular')!.value !== this.usuario.celular) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get isDireccionChanged() {
    if (this.formulario!.get('direccion')!.dirty) {
      if (this.formulario!.get('direccion')!.value !== this.usuario.direccion) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get isDepartamentoChanged() {
    if (this.formulario!.get('departamento')!.dirty) {
      if (
        this.formulario!.get('departamento')!.value !==
        this.usuario.departamento
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get isCiudadChanged() {
    if (this.formulario!.get('ciudadMunicipio')!.dirty) {
      if (
        this.formulario!.get('ciudadMunicipio')!.value !== this.usuario.ciudad
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  // Funciones para usar las validaciones del formulario
  get oldContrasena() {
    return this.formulario!.get('oldContrasena');
  }
  get newContrasena() {
    return this.formulario!.get('newContrasena');
  }
  get confNewContrasena() {
    return this.formulario!.get('confNewContrasena');
  }
  get validNewPassword() {
    return (
      (this.formulario!.get('confNewContrasena')!.touched ||
        this.formulario!.get('newContrasena')!.touched) &&
      this.formulario!.get('confNewContrasena')!.invalid &&
      this.formulario!.get('confNewContrasena')!.invalid &&
      (this.formulario!.get('confNewContrasena')!.dirty ||
        this.formulario!.get('confNewContrasena')!.dirty)
    );
  }
  get validarCelular() {
    return (
      this.formulario!.get('celular')!.valid &&
      this.formulario!.get('celular')!.touched
    );
  }
  get departamento() {
    return this.formulario!.get('departamento');
  }
  get ciudadMunicipio() {
    return this.formulario!.get('ciudadMunicipio');
  }
}
