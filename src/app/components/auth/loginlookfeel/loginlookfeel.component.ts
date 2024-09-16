import { Component, inject } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import {  FormControl, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { Autenticacion } from '../../../models/autenticacion';
import { CELULAR_PATTERN, CONTRASENA_PATTERN, CORREO_PATTERN, ICO_INTERROGACION_GRIS, ICO_INTERROGACION_VERDE, ICO_VOLVER, LOGO_PREVISORA_BLANCO, MAX_CELULAR, MIN_CELULAR, NOMBRES_PATTERN, SOLO_NUMEROS_PATTERN, URL_LOGIN } from '../../../shared/constantes';

@Component({
  selector: 'app-loginlookfeel',
  standalone: true,
  imports: [
    NzLayoutModule, 
    FooterComponent,  
    RouterModule, 
    RouterOutlet, 
    FormsModule,  
    ReactiveFormsModule, 
    CommonModule,
    MatGridListModule  ],
  templateUrl: './loginlookfeel.component.html',
  styleUrl: './loginlookfeel.component.css'
})
export class LoginlookfeelComponent {
  constructor(private router: Router= inject(Router),  private fb: FormBuilder,){
}
  backgroundImage = 'assets/images/frame_bg_previsora.png';
  urlRecuperar: string = '/recuperarPassword'; // Replace with your actual path
  urlRegistro: string = '/registroUsuario';
  hide = true;
  
  emailFormControl= new FormControl('', [Validators.required, Validators.email]);
  contrasenaFormControl= new FormControl('', [Validators.required]);
  formularioLogin!: FormGroup;
  verPassword!: boolean;
  submit!: boolean;
  contrasenaInvalida = false;
  version = "";
  ocultarMostrarPassword = 'password';
  logoHeader = 'assets/images/logo-previsora-header.png';
  mail = 'assets/images/mail.png';
  mail_red = 'assets/images/mail_red.svg';
  key = 'assets/images/key.svg';
  tooltipContrasena?: string;
  //urlRegistro = URL_REGISTRO;
  //urlRecuperar = URL_RECUPERAR;
  showEnableBtnPwd!: boolean;
  autenticacion!: Autenticacion;
  readonly = "true";
  primerRegistro: boolean = false;
  iconoPregunta: string = ICO_INTERROGACION_GRIS;
  emailInput: any;
  classButtonVariaciones = 'cp-boton-principal-variaciones2';
  
  // Assuming you have a property named urlRecuperar
 
  
   localStorage: any;
   ngOnInit() {
    /* if (window.screen.width <= 768) {
       this.modalService.modalRedireccionApp()
     }*/
   this.autenticacion = new Autenticacion("","","","");
     
     this.autenticacion.username= "";
     this.autenticacion.password= "";
    this.builForm();
     this.formularioLogin.reset;
   }
   builForm() {
    this.formularioLogin = this.fb.group({
      email: ['',[Validators.required, Validators.pattern(CORREO_PATTERN)]],
      contrasena: ['', [Validators.required, Validators.pattern(CONTRASENA_PATTERN)]]
    });
    this.formularioLogin.get('email')!.valueChanges.subscribe(data => {
      if((this.email?.invalid && this.email?.dirty) || (this.email?.invalid && this.email?.touched) || (this.email?.invalid)){
        this.mail = "assets/images/mail_red.svg";
      } 
      else {
        this.mail = "assets/images/mail.png";
      }
  });
       
  this.formularioLogin.get('contrasena')!.valueChanges.subscribe(data => {
    if((this.contrasena?.invalid && this.contrasena?.dirty) || (this.contrasena?.invalid && this.contrasena?.touched) || (this.contrasena?.invalid)){
      this.key = "assets/images/key_red.svg";
    }  
    else {
      this.key = "assets/images/key.svg";
    } 
})
  }
  ingresar(){

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
    } 
  }

  get email() { return this.formularioLogin.get('email'); };
  get contrasena() { return this.formularioLogin.get('contrasena'); };
}
