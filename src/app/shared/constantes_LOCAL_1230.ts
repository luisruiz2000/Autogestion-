import { environment } from '../environments/environment';

// Constante con la Dirección IP del Servidor
export const PATH_SERVER_BACK = environment.urlBack;

// Constante con la ruta del servicio que se encarga de autenticar al usuario


export const PATH_SERVICIO_AUTENTICACION = 'api/authentication';

export const PATH_SERVICIO_DOMINIOS = 'api/dominios';
export const PATH_SERVICIO_DOMINIOS_MUNICIPIOS = 'api/v1/valorDominio/get/flag/';


export const PATH_TOOLTIPS = 'api/tooltips';

export const PATH_VEHICULOS = 'api/poliza/vehiculo';
export const PATH_POLIZAS = '/api/poliza/';

export const PATH_USUARIO_CONTROLLER= 'api/user';

export const PATH_ACTUALIZAR_USUARIO = PATH_SERVER_BACK + PATH_USUARIO_CONTROLLER + '/actualizar';

export const PATH_PARAMETROS = 'api/parametros';
export const PATH_CONSULTAR_CHAT = PATH_SERVER_BACK + PATH_PARAMETROS + '/URL_CHAT';
export const PATH_OFICINAS_ADMIN = PATH_SERVER_BACK + PATH_PARAMETROS + '/OFICINAS_ADMIN_TALLER';

export const PATH_LOGIN = PATH_SERVER_BACK + PATH_SERVICIO_AUTENTICACION + '/login';

export const PATH_REFRESH_TOKEN = PATH_SERVER_BACK + PATH_SERVICIO_AUTENTICACION + '/refreshtoken';

export const PATH_LOGOUT = PATH_SERVER_BACK + PATH_SERVICIO_AUTENTICACION + '/logout';

export const PATH_REGISTRO_USUARIO = PATH_SERVER_BACK + PATH_SERVICIO_AUTENTICACION + '/registrarUsuario';
export const PATH_RIESGOS_ASOCIADOS = PATH_SERVER_BACK + PATH_POLIZAS + '/asociarRiesgos';

// Constante para la url de dominios
export const PATH_DOMINIOS = PATH_SERVER_BACK + PATH_SERVICIO_DOMINIOS;
export const PATH_DOMINIOS_MUNICIPIOS = PATH_SERVER_BACK + PATH_SERVICIO_DOMINIOS_MUNICIPIOS;

export const PATH_TYC = PATH_SERVER_BACK + PATH_TOOLTIPS + '/tyc';

export const PATH_SOLICITAR_CAMBIO = PATH_SERVER_BACK + PATH_SERVICIO_AUTENTICACION + '/solicitarCambioContrasena';

export const PATH_COMPARAR_CADENA = PATH_SERVER_BACK + PATH_SERVICIO_AUTENTICACION + '/compararCadenaWeb';

export const PATH_RECUPERAR_CONTRASENA = PATH_SERVER_BACK + PATH_SERVICIO_AUTENTICACION + '/recuperarContrasena';

export const PATH_VALIDAR_REGISTRO = PATH_SERVER_BACK + PATH_SERVICIO_AUTENTICACION + '/validarRegistro';

export const PATH_GET_VEHICULOS = environment.urlGetVehiculos + "api/poliza/vehiculo/getvehiculos"; //PATH_SERVER_BACK + PATH_VEHICULOS + '/getvehiculos';

export const PATH_REGISTRAR_PLACA = PATH_SERVER_BACK + PATH_VEHICULOS + '/registrarPlaca';

export const PATH_ELIMINAR_VEHICULO = PATH_SERVER_BACK + PATH_VEHICULOS + '/eliminarVehiculo';

export const PATH_CIUDADES = PATH_SERVER_BACK + 'api/taller/ciudades';
export const PATH_MARCAS = PATH_SERVER_BACK + 'api/taller/marcas';
export const PATH_CIUDADES_SEGMENTO = PATH_SERVER_BACK + 'api/taller/ciudadesSegmento';
export const PATH_TIPO_VEHICULO = PATH_SERVER_BACK + 'api/taller/getTiposVeh/pesados';
export const PATH_TALLERES_SEGMENTO = PATH_SERVER_BACK + 'api/taller/talleresSegmento';

export const PATH_TALLERES = PATH_SERVER_BACK + 'api/taller';
export const PATH_GESTION_MARCA = PATH_SERVER_BACK + 'api/gestionmarcas';

export const PATH_RADICAR_SINIESTRO = PATH_SERVER_BACK + 'api/siniestro/registrarContacta';
export const PATH_OBTENER_SINIESTROS = PATH_SERVER_BACK + 'api/siniestro/getSiniestros';
export const PATH_SINIESTRO_DATOS_BASICOS = PATH_SERVER_BACK + 'api/siniestro/datosBasicos';
export const PATH_SINIESTRO_CARGAR_EVIDENCIA = PATH_SERVER_BACK + 'api/siniestro/evidenciaWeb';
export const PATH_METODO_VALIDAR_ESTADOS = 'validarEstados';
export const PATH_METODO_OBTENER_IMAGENES = 'getImage';
export const PATH_REPARACION_VALIDAR_ESTADOS = `${PATH_SERVER_BACK}api/reparacion/${PATH_METODO_VALIDAR_ESTADOS}`;
export const PATH_REPARACION_OBTENER_IMAGENES = `${PATH_SERVER_BACK}api/reparacion/${PATH_METODO_OBTENER_IMAGENES}`;

//Constantes de video peritacion
export const PATH_GET_LINK_VIDEO_PERITACION = PATH_SERVER_BACK + 'api/videoPeritacion';

//Constantes de notificaciones
export const PATH_ENDPOINT_NOTIFICACIONES = 'api/notificaciones';
export const PATH_NOTIFICACIONES_CANTIDAD = `${PATH_SERVER_BACK}${PATH_ENDPOINT_NOTIFICACIONES}/cantidad`;
export const PATH_NOTIFICACIONES_LISTA = `${PATH_SERVER_BACK}${PATH_ENDPOINT_NOTIFICACIONES}/get`;
export const PATH_NOTIFICACIONES_ACTUALIZAR = `${PATH_SERVER_BACK}${PATH_ENDPOINT_NOTIFICACIONES}/cambiarEstado`;
export const PATH_NOTIFICACIONES_CREAR = `${PATH_SERVER_BACK}${PATH_ENDPOINT_NOTIFICACIONES}`;

//Constantes de preuntas frecuentes
export const PATH_ENDPOINT_PREGUNTAS_FRECUENTES = 'api/preguntas';
export const PATH_PREGUNTAS_FRECUENTES_LISTA = `${PATH_SERVER_BACK}${PATH_ENDPOINT_PREGUNTAS_FRECUENTES}/web`;

//Constantes de Gestión y Administración de talleres
export const PATH_ENDPOINT_TALLER = 'api/taller'
export const PATH_TALLERES_ADMIN = `${PATH_SERVER_BACK}${PATH_ENDPOINT_TALLER}/talleresAdmin`;
export const PATH_ESTADO_TALLER = `${PATH_SERVER_BACK}${PATH_ENDPOINT_TALLER}/estadoTaller`;
export const PATH_SEGMENTO_VEHICULO_TALLER = `${PATH_SERVER_BACK}${PATH_ENDPOINT_TALLER}/segmentoAdminVehiculo`;
export const PATH_SUBTIPO_VEH_TALLER = `${PATH_SERVER_BACK}${PATH_ENDPOINT_TALLER}/subtipoVehiculo`;

// Constante ruta tooltips registro usuario
export const PATH_TOOLTIPS_NOAUTH = PATH_SERVER_BACK + PATH_TOOLTIPS + '/getTooltipNoAutenticado';

// Constantes con los patrones de validación
// Patron de validación del correo electrónico
export const CORREO_PATTERN = /^[a-zA-Z0-9]+[_\w\.\-]*[a-zA-Z0-9]+@[a-zA-Z0-9][_\w\.\-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*$/;
export const SIN_ESPACIO_AL_INICIO = /^\S/;
export const NOMBRES_PATTERN = /^\S[a-zA-ZáéíóúÁÉÍÓÚüÜñÑàèìòùÀÈÌÒÙ ]*$/;
export const CONTACTO_PATTERN = /^\S[a-zA-ZáéíóúÁÉÍÓÚüÜñÑàèìòùÀÈÌÒÙ /]*$/;
export const SOLO_NUMEROS_PATTERN = /^[0-9]*$/;
export const NUMEROS_GARANTIA_PATTERN = /^-?[0-9]\d*(\.\d+)?$/;
export const NUMEROS_LETRAS_PATTERN = /^[a-zA-Z0-9]*$/;
export const CELULAR_PATTERN = /^3[0-9]{9}$/;
export const CONTRASENA_PATTERN = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])([!@#$%^*]?)^((?![<>'()/ &%+`´"¨”’\\]).){8,25}$/;
export const MAX_CELULAR = 9999999999;
export const MIN_CELULAR = 1000000000;
// Constante código de aplicación
export const COD_APP = 'AAPM';
export const ID_DOMINIO_TIPO_DOCUMENTO = '5'; 

// URL's de routings
export const URL_LOGIN = '/login/false';
export const URL_REGISTRO = '/registroUsuario';
export const URL_RECUPERAR = '/recuperarPassword';
export const URL_TALLERES = '/talleres';
export const URL_BASE = '/autogestion';
export const URL_BASE_HOME ='/home/false';
export const URL_SEGUIMIENTO = URL_BASE + '/seguimiento-siniestro';
export const URL_SEGUIMIENTO_REPARACION = URL_BASE + '/seguimiento-reparacion';
export const URL_CONFIRMACION_SINIESTRO = URL_BASE + '/confirmacion';
export const URL_PERFIL = URL_BASE + '/perfil';
export const URL_NOTIFICACIONES ='/notificaciones';


// URL's externas
export const URL_SEDES = 'https://www.previsora.gov.co/sedes/';
export const URL_PQR = 'https://web.millenium.com.co/millenuevoprevisora/pages/pqrwebpage.jsp?fuente=PPAL';
export const URL_GOOGLEPLAY = 'https://play.google.com/store/apps/details?id=com.asesoftware.previsora.autogestion';
export const URL_APPSTORE = 'https://apps.apple.com/co/app/la-previsora-seguros/id1515617326';
export const URL_EMAIL_PREVISORA = 'mailto:contactenos@previsora.gov.co';

// rutas de imagenes
export const LOGO_PREVISORA_BLANCO = 'assets/images/logo_previsora_blanco.png';
export const LOGO_PREVISORA_COLOR = 'assets/images/logo-previsora.svg';
export const LOGO_PREVISORA_HEADER = 'assets/images/logo-previsora-header.png';
export const ICO_VOLVER = 'assets/images/ico_volver.svg';
export const ICO_ADELANTE = 'assets/images/ico-adelante.png';
export const LINEA_VERTICAL = 'assets/images/icono-salida.png';
export const ICONO_SALIDA = 'assets/images/linea-vertical.png';
export const ICONO_ERROR = 'assets/images/error.png';
export const ICONO_EXITO = 'assets/images/confirmacion.png';
export const ICONO_PERFIL = 'assets/images/ico_usuario_perfil.png';
export const ICONO_PERFILx2 = 'assets/images/ico_usuario_perfil@2x.png';
export const ICONO_PERFILx3 = 'assets/images/ico_usuario_perfil@3x.png';
export const ICONO_NOTIFICACION = 'assets/images/btn_notificacion.svg';
export const ICO_GOOGLEPLAY = 'assets/images/btn-google.png';
export const ICO_APPSTORE = 'assets/images/btn-apple.png';
export const ICO_OFICINAS = 'assets/images/ico-listado-oficinas.svg';
export const ICO_PQR = 'assets/images/ico-PQRS.svg';
export const ICO_CHAT_EN_LINEA = 'assets/images/ico-chat-en-linea.svg';
export const ICO_SUPER_INTENDENCIA = 'assets/images/logo-superintendencia-financiera.svg';
export const ICO_ALERTA_NARANJA = 'assets/images/ico-alerta-naranja.svg';
export const ICO_ALERTA_NARANJA_PNG = 'assets/images/ico_alerta.png';
export const ICO_ALERTA_VERDE = 'assets/images/ico-alerta-verde.svg';
export const ICO_AGREGAR = 'assets/images/ico-agregar.svg';
export const ICO_ALERTA = 'assets/images/ico_alert.svg';
export const ICO_LLAMAR_345 = 'assets/images/ico-llamar-345.svg';
export const ICO_LLAMAR_345_PNG = 'assets/images/ico-llamar-345.png';
export const ICO_NUMERAL_1 = 'assets/images/ico-numeral-1.svg';
export const ICO_NUMERAL_2 = 'assets/images/ico-numeral-2.svg';
export const ICO_NUMERAL_3 = 'assets/images/ico-numeral-3.svg';
export const ICO_NUMERAL_1_PNG = 'assets/images/ico-numeral-1.png';
export const ICO_NUMERAL_2_PNG = 'assets/images/ico-numeral-2.png';
export const ICO_NUMERAL_3_PNG = 'assets/images/ico-numeral-3.png';
export const LOGO_PREVISORA = 'assets/images/logo-previ-blanco.svg';
export const ICO_CARRO = 'assets/images/ico_car_home.svg';
export const ICO_SOAT = 'assets/images/soat.svg';
export const ICO_GENERALES = 'assets/images/generales.svg';
export const ICO_INTERROGACION_GRIS = 'assets/images/icono-interrogacion-gris.png';
export const ICO_INTERROGACION_VERDE = 'assets/images/icono-interrogacion-verde.png';
export const ICO_INTERROGACION_VERDE_SIDE_BAR = 'assets/images/preguntas-side-bar.svg';
export const ICO_INTERROGACION_BLANCO = 'assets/images/ico-help.svg';
export const ICO_CALENDARIO = 'assets/images/ico_calendario.svg';
export const ICO_MENU = 'assets/images/menu_icon.svg';
export const ICO_HOME = 'assets/images/ico-home.svg';
export const ICO_HOME_SIDE_BAR = 'assets/images/ico-home-side-bar.svg';
export const ICO_LOGOUT = 'assets/images/ico-cerrar-sesion.svg';
export const ICO_PERFIL = 'assets/images/grupo.svg';
export const ICO_HOGARES = 'assets/images/ico_hogares.svg';
export const ICO_APOBAR= 'assets/images/ico_aprobado.svg';
export const ICO_NOTIFICACION_ASISTENCIA = 'assets/images/ico_asistencia.png';
export const ICO_NOTIFICACION_CUENTA = 'assets/images/ico_cuenta.png';
export const ICO_NOTIFICACION_HOGAR = 'assets/images/ico_hogar_noti.svg';
export const ICO_NOTIFICACION_PQRS = 'assets/images/ico-help.svg';
export const ICO_NOTIFICACION_SINIESTRO = 'assets/images/ico_siniestros.png';
export const ICO_NOTIFICACION_VEHICULOS = 'assets/images/ico_vehiculos.png';
export const ICO_TALLERES = 'assets/images/ico_talleres.png';
export const ICO_PIN = 'assets/images/ico_pin.png';
export const ICO_FILTRAR = 'assets/images/btn_filtrar.png';

export const IMAGEN_CARRO_IZQUIERDO = 'assets/images/img-carro-izquierda.svg';
export const IMAGEN_CARRO_DERECHA = 'assets/images/img-carro-derecha.svg';
export const IMAGEN_CARRO_FRENTE = 'assets/images/img-carro-frente.svg';
export const IMAGEN_CARRO_ATRAS = 'assets/images/img-carro-atras.svg';
export const IMAGEN_CROQUIS = 'assets/images/img-croquis.svg';
export const IMAGEN_HOME = 'assets/images/img_home2.png';
export const IMAGEN_DOCUMENTOS = 'assets/images/icono_documentos.svg';

export const ICO_ME_VARE = 'assets/images/ico-me-vare.svg';
export const ICO_TRASH = 'assets/images/ico-trash.svg';
export const ICO_PQRS_HOME = 'assets/images/pqrs-home.svg';
export const ICO_PQRS_WEB = 'assets/images/pqrs-web.svg';
export const ICO_HAPPY = 'assets/images/ico_happy.svg';
export const ICO_SAD = 'assets/images/ico_sad.svg';
export const ICO_BUSCAR = 'assets/images/ico_buscar.svg';
export const ICO_BUSCAR_BLANCO = 'assets/images/ico_buscar_blanco.svg';
export const HEADER_FAQ = 'assets/images/header_faq.svg';
export const ICO_NO_FAQ = 'assets/images/ico_no_info.svg'
export const ICO_DOC_CARGADO = 'assets/images/ico_doc_cargado.svg'

export const ICO_CARGA_DOC = 'assets/images/icono-carga-archivos.svg'
export const ICO_CARGA_IMG = 'assets/images/icono-carga-imagenes.svg'

export const ICONO_CALENDARIO = 'assets/images/icono-calendario.png';
export const ICONO_NUMERO_RADICADO = 'assets/images/icono-number.png';
export const ICO_AVANCE_INICIO_GRIS = 'assets/images/ico-avance-inicio-gris.png';
export const ICO_AVANCE_REPUESTOS_GRIS = 'assets/images/ico-avance-repuestos-gris.png';
export const ICO_AVANCE_LATONERIA_GRIS = 'assets/images/ico-avance-latoneria-gris.png';
export const ICO_AVANCE_PINTURA_GRIS = 'assets/images/ico-avance-pintura-gris.png';
export const ICO_AVANCE_FINALIZADO_GRIS = 'assets/images/ico-avance-finalizado-gris.png';
export const ICO_AVANCE_ENTREGADO_GRIS = 'assets/images/ico-avance-entregado-gris.png';
export const ICO_AVANCE_INICIO_VERDE = 'assets/images/ico-avance-inicio-verde.png';
export const ICO_AVANCE_REPUESTOS_VERDE = 'assets/images/ico-avance-repuestos-verde.png';
export const ICO_AVANCE_LATONERIA_VERDE = 'assets/images/ico-avance-latoneria-verde.png';
export const ICO_AVANCE_PINTURA_VERDE = 'assets/images/ico-avance-pintura-verde.png';
export const ICO_AVANCE_FINALIZADO_VERDE = 'assets/images/ico-avance-finalizado-verde.png';
export const ICO_AVANCE_ENTREGADO_VERDE = 'assets/images/ico-avance-entregado-verde.png';
export const ICO_AVANCE_VEHICULO = 'assets/images/ico_avance_vehiculo.png';
export const ICO_FASE_INICIO_GRIS = 'assets/images/ico-fase-inicio-gris.png';
export const ICO_FASE_REPUESTOS_GRIS = 'assets/images/ico-fase-repuestos-gris.png';
export const ICO_FASE_LATONERIA_GRIS = 'assets/images/ico-fase-latoneria-gris.png';
export const ICO_FASE_PINTURA_GRIS = 'assets/images/ico-fase-pintura-gris.png';
export const ICO_FASE_FINALIZADO_GRIS = 'assets/images/ico-fase-finalizado-gris.png';
export const ICO_FASE_ENTREGADO_GRIS = 'assets/images/ico-fase-entregado-gris.png';
export const ICO_FASE_INICIO_VERDE = 'assets/images/ico-fase-inicio-verde.png';
export const ICO_FASE_REPUESTOS_VERDE = 'assets/images/ico-fase-repuestos-verde.png';
export const ICO_FASE_LATONERIA_VERDE = 'assets/images/ico-fase-latoneria-verde.png';
export const ICO_FASE_PINTURA_VERDE = 'assets/images/ico-fase-pintura-verde.png';
export const ICO_FASE_FINALIZADO_VERDE = 'assets/images/ico-fase-finalizado-verde.png';
export const ICO_FASE_ENTREGADO_VERDE = 'assets/images/ico-fase-entregado-verde.png';
export const IMAGEN_FASE_A = 'assets/images/imagen_a.png';
export const IMAGEN_FASE_B = 'assets/images/imagen_fase_b.png';
export const ICO_CALENDARIO_ENTREGADO = 'assets/images/ico-calendario-entregado.png';
export const ICO_HERRAMIENTA_TALLER = 'assets/images/ico-herramienta-taller.svg';
export const IMG_PASO_UNO = 'assets/images/img-paso-1.svg';
export const IMG_PASO_DOS = 'assets/images/img-paso-2.svg';
export const IMG_PASO_TRES = 'assets/images/img-paso-3.svg';
export const IMG_PASO_CUATRO = 'assets/images/img-paso-4.svg';
export const IMG_PASO_CINCO = 'assets/images/img-paso-5.svg';
export const ICON_PASO_UNO_UNO = 'assets/images/icon-paso-1-1.svg';
export const ICON_PASO_UNO_DOS = 'assets/images/icon-paso-1-2.svg';
export const ICON_PASO_UNO_TRES = 'assets/images/icon-paso-1-3.svg';
export const ICON_PASO_DOS_UNO = 'assets/images/icon-paso-2-1.svg';
export const ICON_PASO_DOS_DOS = 'assets/images/icon-paso-2-2.svg';
export const ICON_PASO_DOS_TRES = 'assets/images/icon-paso-2-3.svg';
export const ICON_PASO_TRES_UNO = 'assets/images/icon-paso-3-1.svg';
export const ICON_PASO_TRES_DOS = 'assets/images/icon-paso-3-2.svg';
export const ICON_PASO_TRES_TRES = 'assets/images/icon-paso-3-3.svg';
export const ICON_PASO_CUATRO_UNO = 'assets/images/icon-paso-4-1.svg';
export const ICON_PASO_CUATRO_DOS = 'assets/images/icon-paso-4-2.svg';
export const ICON_PASO_CUATRO_TRES = 'assets/images/icon-paso-4-3.svg';
export const ICON_PASO_CINCO_UNO = 'assets/images/icon-paso-5-1.svg';
export const ICON_PASO_CINCO_DOS = 'assets/images/icon-paso-5-2.svg';
export const ICON_PASO_CINCO_TRES = 'assets/images/icon-paso-5-3.svg';
export const ICO_UPLOAD = 'assets/images/ico-upload.svg';
export const ICO_CONFIGURACION = 'assets/images/ico_configuracion.svg';
export const ICO_CONFIGURACION_VERDE = 'assets/images/ico_configuracion_verde.svg';

export const ICO_NAVEGADOR_CHROME = 'assets/images/ico-navegador-chrome.svg';
export const ICO_NAVEGADOR_FIREFOX = 'assets/images/ico-navegador-firefox.svg';
export const ICO_NAVEGADOR_EDGE = 'assets/images/ico-navegador-edge.svg';
export const ICO_NAVEGADOR_OPERA = 'assets/images/ico-navegador-opera.svg';
export const ICO_NAVEGADOR_SAFARI = 'assets/images/ico-navegador-safari.svg';

export const ICO_IPHONE_MOCKUP = 'assets/images/ico-iphone.png';

// Flechas verdes
export const ICON_FLECHA_ARRIBA = 'assets/images/ico-flecha-arriba.svg';
export const ICON_FLECHA_ABAJO = 'assets/images/ico-flecha-abajo.svg';

// Flecha de regresar
export const ICON_FLECHA_RETORNO = 'assets/images/ico-flecha-regresar.svg';


// Constantes para el localStorage
export const LOCALSTORAGE_USUARIO = 'usuario';
export const LOCALSTORAGE_TOKEN = 'refreshtoken';
export const LOCALSTORAGE_AUTHTOKEN='token';

// Constantes para el Re-Captcha
// export const CAPTCHA_SITE_KEY_PREVISORA = '6LepNuYUAAAAAPT9AfvgOF-4qs_Xh7B_DFZHt_BH';
// export const CAPTCHA_PRIVATE_KEY_PREVISORA = '6LepNuYUAAAAAEKGRzLUiIit0EcBAg1umWXLtir7';
//export const CAPTCHA_SITE_KEY_PREVISORA = '6LcQVOYUAAAAAGmUOFKFOS78id-1_63LngYtfA_u';
export const CAPTCHA_SITE_KEY_PREVISORA = '6Lc9ZDApAAAAAKIxtIYY44nB0kgr3nVsTF5Z2v_g';
//export const CAPTCHA_SITE_KEY_PREVISORA = '6LeMflwpAAAAAHS31x7iubMNxjXkaORFFfPviZ_c';

export const CAPTCHA_PRIVATE_KEY_PREVISORA = '6LeYAC0pAAAAAKz1yrYTL7kMCp3NSMC116ZckS1n';

// Constantes Re-Captcha Felipe García
export const CAPTCHA_SITE_KEY_DEVELOPER = '6LdSg9oUAAAAAH1A-qfYm2EE-aFrhM5zrbw2y0an';
export const CAPTCHA_PRIVATE_KEY_DEVELOPER = '6LdSg9oUAAAAANa9k_H7yDgbDSZwAEgUh1UBRlz8';
export const PRIVATE_KEY = 'Pr3v1s0r4';

export const VERSION_AUTOGESTION_FRONT = '0.24'; 
export const TIPO_DOMINIO_DEPARTAMENTOS = '1';
export const TIPO_DOMINIO_MUNICIPIOS = '1';
export const TIPO_DOMINIO_TIPOS_DOC = '5';
export const CONTENT_TYPE_PDF = 'application/pdf';
export const CONTENT_TYPE_JPG = 'image/jpg';
export const CONTENT_TYPE_DOC = 'application/msword';
export const CONTENT_TYPE_DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
export const TIPO_NOTIFICACION_ASISTENCIA = 'AS';
export const TIPO_NOTIFICACION_CUENTA = 'CN';
export const TIPO_NOTIFICACION_HOGAR = 'HG';
export const TIPO_NOTIFICACION_PQRS = 'PQ';
export const TIPO_NOTIFICACION_SINIESTRO = 'SN';
export const TIPO_NOTIFICACION_VEHICULOS = 'VH';
export const ESTADO_NOTIFICACION_SIN_LEER =  1;
export const ESTADO_NOTIFICACION_LEIDA =  2;
export const ESTADO_NOTIFICACION_ELIMINADA =  3;
export const TIEMPO_ACTUALIZACION_NOTIFICACIONES = 5;
export const ORIGEN_PETICION = 'autogestion_web';

export const ESTADO_SOLICITUD_RECIBIDA = 'SOL_RECIBIDA';
export const ESTADO_DOCS_PENDIENTES = 'DOC_PENDIENTES';
export const ESTADO_INF_POR_COMPLETAR = 'INF_POR_COMPL';
export const ESTADO_SOLICITUD_DECLINADA = 'SOL_DECLINADA';
export const ESTADO_REPARACION_AUTORIZADA = 'REP_AUTORIZADA';
export const ESTADO_SOLICITUD_RADICADA = 'SOL_RADICADA';
export const ESTADO_VEHICULO_ENTREGADO = 'VEH_ENTREGADO';
export const REPARACION_ETAPA_INICIO = 'INICIO';
export const REPARACION_ETAPA_REPUESTOS = 'REPUESTOS';
export const REPARACION_ETAPA_LATONERIA = 'LATONERIA';
export const REPARACION_ETAPA_PINTURA = 'PINTURA';
export const REPARACION_ETAPA_FINALIZADO = 'FINALIZADO';
export const REPARACION_ETAPA_ENTREGADO = 'ENTREGADO';
export const ICO_SEG_ALERTA = 'assets/images/ico_seg_alerta.svg';
export const ICO_SEG_CHECK = 'assets/images/ico_seg_check.svg';
export const ICO_SEG_CHECK_GRAY = 'assets/images/ico_seg_check_gray.svg';
export const ICO_SEG_ERROR = 'assets/images/ico_seg_error.svg';
export const ICO_SEG_UBICACION = 'assets/images/ico_seg_ubicacion.svg';
export const ICO_NO_INFO = 'assets/images/ico_no_info.svg';
export const IMG_LOADING_GIF = 'assets/images/img_loading.gif';

export const TIPO_VEH_PESADO = 'PESADOS';
export const TIPO_VEH_MOTOS  = 'MOTOS';
export const BASE_URL_MAPS = 'https://www.google.com/maps/search/?api=1&query=';
export const CANTIDAD_MIN_LETRAS_BUSCAR = 3;
export const PLACEHOLDER_FILTER_SEARCH = 'Buscar ...';

export const PERFIL_ADMIN_NEGOCIO = 'AAPM_ADM_NEG';
export const DOMINIO_PREVISORA = 'previsora.gov.co';
export const TIPO_RESPUESTA_SI = 'S';
export const ICO_FASE_AGENDAR_CITA_VERDE = 'assets/images/ico_agendar_cita_verde.png';
export const ICO_FASE_CONFIRMACION_VERDE = 'assets/images/ico_confirmacion_verde.png';
export const ICO_FASE_DATOS_CORREO_VERDE = 'assets/images/ico_datos_correo_verde.png';
export const ICO_FASE_INGRESAR_LINK_VERDE = 'assets/images/ico_ingresar_link_verde.png';
export const ICO_FASE_VIDEO_PERITACION_VERDE = 'assets/images/ico_video_peritacion_verde.png';
export const ICO_FASE_FINALIZACION_VERDE = 'assets/images/ico_finalizacion_verde.png';
export const ICO_MENU_VIDEO_PERITACION_VERDE = 'assets/images/ico_menu_video_peritacion_verde.png';
export const ICO_MENU_VIDEO_PERITACION_BLANCO = 'assets/images/ico_menu_video_peritacion_blanco.svg';
export const ICO_LLAMAR_345_VIDEO_PERITACION = 'assets/images/btn_llamar_sin_fondo.png';

export const OBJ_NUM_FASES_IMG_CLASS = {
    numFaseInicio: 1,
    numFaseRepuestos: 2,
    numFaseLatoneria: 3,
    numFasePintura: 4,
    numFaseFin: 5,
    numfaseEntregado: 6,
    imgRepuestosNoPass: "assets/images/seguimiento/repuestos.svg",
    imgRepuestosPass: "assets/images/seguimiento/repuestos_blanco.svg",
    imgCarRepairNoPass: "assets/images/seguimiento/car_repair.svg",
    imgCarRepairPass: "assets/images/seguimiento/car_repair_blanco.svg",
    imgFormatPaintNoPass: "assets/images/seguimiento/format_paint.svg",
    imgFormatPaintPass: "assets/images/seguimiento/format_paint_blanco.svg",
    imgFinNoPass: "assets/images/seguimiento/bandera_fin.svg",
    imgFinPass: "assets/images/seguimiento/bandera_fin_blanco.svg",
    imgEntregadoNoPass: "assets/images/seguimiento/check_fin.svg",
    imgEntregadoPass: "assets/images/seguimiento/check_fin_blanco.svg",
    classNoPass: "vector-container-repa",
    classNoPass2: "stepper-components-nopass",
    classPass: "vector-wrapper-repa",
    classPass2: "stepper-components-pass", 
    iconNoPass: "assets/images/seguimiento/nodes_white.svg",
    iconCurrent: "assets/images/seguimiento/Nodes.svg",
    iconPass: "assets/images/seguimiento/pass.svg",

}