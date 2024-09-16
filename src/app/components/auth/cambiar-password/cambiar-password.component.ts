import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms'
import {
  LOGO_PREVISORA_BLANCO,
  CONTRASENA_PATTERN,
  ICONO_ERROR, LOGO_PREVISORA_HEADER
} from '../../../shared/constantes';
import { AuthService } from '../../../services/auth.service';
import { Autenticacion } from '../../../models/autenticacion';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { URL_LOGIN, ICO_VOLVER, ICO_INTERROGACION_GRIS } from '../../../shared/constantes';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalGenerico } from '../../../models/modalGenerico';
import { ModalService } from '../../../services/modal.service';
import { cambioContrasena } from '../../../models/cambioContrasena';
import { forkJoin } from 'rxjs';
import { sha256 } from 'js-sha256';
import { UtilService } from '../../../services/util.service';
import { Tooltip } from '../../../models/tooltip';

import { Boton } from "../../../models/boton";
import { ModalGenericoComponent } from "../../../shared/modales/modal-generico/modal-generico.component";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
 
} from '@angular/material/snack-bar';
import { HttpClientModule} from '@angular/common/http';
import { SpinnerComponent } from '../../../shared/interceptors/spinner/spinner.component';
import { HttpInterceptorProviders } from '../../../shared/interceptors/interceptor.provider';
@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css'],
  standalone:true,
  imports: [
    // other modules...
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    FormsModule,
    HttpClientModule,
    SpinnerComponent
  ],
  providers:[HttpInterceptorProviders,
    HttpClientModule],
})
export class CambiarPasswordComponent implements OnInit {
[x: string]: any;
formularioRecuperar!: FormGroup;
submit: boolean = false;
//logoHeader?: any;
//ocultarMostrarPassword?: any;

//iconoPregunta?: any;

//ocultarMostrarConfPassword?: any;
autenticacion!: Autenticacion;
logoHeader? = LOGO_PREVISORA_HEADER;
urlLogin = URL_LOGIN;
ico_volver = ICO_VOLVER;
iconoPregunta?:any = ICO_INTERROGACION_GRIS;
dialogRef!: MatDialogRef<ModalGenerico>;
urlLogo: string = LOGO_PREVISORA_BLANCO;
icoVolver: string = ICO_VOLVER;
ocultarMostrarPassword? = 'password';
ocultarMostrarConfPassword? = 'password';
contrasenaInvalida = false;
showEnableBtnPwd: boolean = false;
showEnableBtnPwdConf: boolean = false;
cambioContrasena?: cambioContrasena;
tooltips?: Tooltip[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private _snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    //setTimeout(() => {
    this.submit = false;
    this.cambioContrasena = new cambioContrasena;
    this.cambioContrasena.cadena = this.route.snapshot.paramMap.get("cadena");
    this.cambioContrasena.codigo = this.route.snapshot.paramMap.get("cadena");
    forkJoin([this.utilService.getTooltipSinAutenticacion(),
    this.authService.compararCadena(this.cambioContrasena)]).subscribe(respuesta => {
      this.tooltips = respuesta[0]?.data;
      console.log("tooltips->" + this.tooltips![0]['valor'])
      if (respuesta[1].success === false || respuesta[1].status != 'OK') {
        let dialogRef = this.modalErrorTitulo();
        var subscription = dialogRef.afterClosed().subscribe(result => {
          subscription.unsubscribe();
          this.router.navigate(['/recuperarPassword']);
        });
      }
    }, err => {
      this.router.navigate(['/']);
    });
 // });
  this.buildForm();
  }

  // Validaciones para el formulario
  buildForm() {
    this.formularioRecuperar = this.fb.group({
      contrasena: ['', [Validators.required, Validators.pattern(CONTRASENA_PATTERN)]],
      confirmarContrasena: ['', [Validators.required, Validators.pattern(CONTRASENA_PATTERN)]], // se cambio la implementacion de validacion de contraseña, revisarlo en registro usuario
    });
  }

  // Funcion que envia los datos para ingresar a la aplicación
  submitPassword() {
    if (this.submit === false) {
      this.submit = true;
      this.cambioContrasena!.password = sha256(this.formularioRecuperar.get('contrasena')!.value);
      this.authService.recuperarContrasena(this.cambioContrasena!).subscribe(respuesta => {
        if (respuesta.success === true && respuesta.status === 'OK') {
        /*  this.toast.success('Se ha registrado una nueva contraseña exitosamente', '¡Nueva contraseña!', {
            closeButton: true,
            titleClass: 'toast-tittle-success'
          });*/
          this._snackBar.open('Se ha registrado una nueva contraseña exitosamente ¡Nueva contraseña!', 'X',  { duration: 2000, panelClass: 'app-notification-success', horizontalPosition: 'right', verticalPosition: 'top',})
          this.router.navigate(['']);
        } else if (respuesta.message === "Cadena inválida.") {
            let dialogRef = this.modalService.modalErrror('Este enlace no es válido o ha expirado \n Solicite el cambio nuevamente', '', '');
            dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/recuperarPassword']);
          });

        } else {
          this.submit = false;
          this.modalService.modalErrror(respuesta.message, '', '');
        }
      },
        err => {
          this.submit = false;
        })
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

  // Funciones para usar las validaciones del formulario
  get contrasena() { return this.formularioRecuperar.get('contrasena') }
  get confirmarContrasena() { return this.formularioRecuperar.get('confirmarContrasena') }
  //private modalErrorTitulo(){}
  private modalErrorTitulo(): MatDialogRef<any> {
    let botones: Boton[] = [];
    return this.dialog.open(ModalGenericoComponent, {
      width: '30em',
      height: '',
      panelClass: 'mat-dialog-general',
      data: {
        botonCerrar: true,
        titulo: 'El link ha expirado',
        claseTitulo: 'mat-dialog-title-error',
        icono: ICONO_ERROR,
        subtitulo: '',
        html: `El tiempo para recuperar tu contraseña ha terminado. <br/>Ingresa nuevamente a la opción
          <a href="/recuperarPassword" class="missPassLink">"Olvide mi contraseña"</a> para</br> obtener un nuevo link.`,
        claseSubtitulo: 'mat-dialog-subtitle-error',
        contenido: '',
        botones: botones
      },
      autoFocus: false
    });
  
}

}
