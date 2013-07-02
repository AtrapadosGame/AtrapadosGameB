#pragma strict

private var dialogosActivos : boolean;
private var enOpcion: boolean = false;
//P1
private var conversacionActual : ArbolConversacion;
private var conversacionCelador : ArbolConversacion;
private var conversacionDineroCompleto : ArbolConversacion;
private var conversacionFamilia : ArbolConversacion;
private var monologoNegacionCartera : ArbolConversacion;
private var monologoNegacionCarteraMario : ArbolConversacion;//mario
private var monologoNegacionCarteraFrancisco : ArbolConversacion;
private var monologoNegacionCarteraFabio : ArbolConversacion;
private var monologoExitoCarteraFrancisco : ArbolConversacion;//francisco
private var monologoExitoCarteraFabio : ArbolConversacion;//fabio
private var monologoFusiblesIncorrecto : ArbolConversacion;
//P2

private var conversacionConvencerNegacion : ArbolConversacion;//Cualquiera lo dice
private var conversacionConvencerExitoMario : ArbolConversacion;//mario
private var conversacionConvencerExitoFabio : ArbolConversacion;//fabio
private var conversacionConvencerExitoFabio2 : ArbolConversacion;//fabio
private var conversacionNecesitaArmas : ArbolConversacion;//Cuando ya se rescató a pedro
//P3

private var monologoHabitacionNegacion : ArbolConversacion;
private var monologoHabitacionNegacionMario : ArbolConversacion; // Mario
private var monologoMarioFusibles: ArbolConversacion; // Mario
private var monologoFusibles: ArbolConversacion;
private var monologoCaja: ArbolConversacion;

//P4
private var conversacionCurarPersonaExito : ArbolConversacion; //diana
private var conversacionCurarPersonaNegacion : ArbolConversacion; //diana
private var conversacionRobarPersonaExito  : ArbolConversacion;//fabio
private var conversacionRobarPersonaNegacionMario : ArbolConversacion; // mario
private var conversacionRobarPersonaNegacion  : ArbolConversacion;


//FIN
private var conversacionFinalDinero : ArbolConversacion;
private var conversacionFinalRevuelta : ArbolConversacion; 

//P5 P5: Hay personas haciendo fila en el punto de pago.
// Para convencerlos de dejarla y hacer revuelta, es necesario encontrar a su amigo que se perdió buscando otra salida.

private var conversacionFila :ArbolConversacion;
private var conversacionConvencerFilaNegacion :ArbolConversacion;
private var conversacionConvencerFilaNegacionMario : ArbolConversacion;//Mario
private var conversacionConvencerFilaExito :ArbolConversacion;


private var conversacionDespertarNegacionMario : ArbolConversacion;//Mario
private var conversacionDespertarNegacion : ArbolConversacion;
private var conversacionDespertarExito :ArbolConversacion;
private var conversacionDespertarNegacionCarro :ArbolConversacion;
private var conversacionDespertarNegacionCarroMario :ArbolConversacion;
private var conversacionDespertarExitoCarro : ArbolConversacion;//francisco
private var conversacionDespertarBalde : ArbolConversacion;
private var conversacionDespertarBaldeMario : ArbolConversacion;
private var conversacionDespertarBaldeGrifoExito : ArbolConversacion;
private var conversacionDespertarBaldeGrifoNegacion : ArbolConversacion;
private var conversacionDespertarBaldeGrifoNegacionMario : ArbolConversacion;

private var conversacionDespertarBaldeExito : ArbolConversacion;


//P6

private var monologoCrucetaCarroNegacion: ArbolConversacion;
private var monologoCrucetaCarroNegacionMario : ArbolConversacion;//Mario
private var monologoCrucetaCarroExitoFrancisco : ArbolConversacion;//Francisco
private var monologoCrucetaCarroExito: ArbolConversacion; //Francisco


private var ventana : Rect = Rect(0,(Screen.height/2)+50, Screen.width,(Screen.height/3));
private var textoActivo: String;
private var textoOpcion1: String;
private var textoOpcion2: String;
private var textoOpcion3: String;

private var texturaActual1 : Texture2D;
private var texturaActual2 : Texture2D;


//Conexión con el LevelManager
var manager : GameObject;


var customSkin: GUISkin;

var texturaDiana : Texture2D;
var texturaMario: Texture2D;
var texturaFrancisco: Texture2D;
var texturaFabio: Texture2D;
var texturaCelador: Texture2D;
var texturaGrupo: Texture2D;
var texturaHerido: Texture2D;
var texturaFila: Texture2D;
var texturaDormido: Texture2D;

var texturaDianaSombreada : Texture2D;
var texturaMarioSombreada: Texture2D;
var texturaFranciscoSombreada: Texture2D;
var texturaFabioSombreada: Texture2D;
var texturaCeladorSombreada: Texture2D;
var texturaGrupoSombreada: Texture2D;
var texturaHeridoSombreada: Texture2D;
var texturaFilaSombreada: Texture2D;
var texturaDormidoSombreada: Texture2D;



//P1
public static final var MONOLOGO_NEGACION_CARTERA  :int= 0;//NO SE TIENE NADA
public static final var MONOLOGO_NEGACION_CARTERA_MARIO  :int= 1; // SE TIENE A !!MARIO!! ACTIVO
public static final var MONOLOGO_NEGACION_CARTERA_FRANCISCO  :int= 2; // SE TIENE A FRANCISCO PERO NO ACTIVO /////////////////////////////////////////////
public static final var MONOLOGO_NEGACION_CARTERA_FABIO  :int= 3;//SE TIENE LA PALA PERO FABIO NO ESTA ACTIVO ///////////////////////////////////
public static final var MONOLOGO_EXITO_CARTERA_FRANCISCO  :int= 4; // !!FRANCISCO!! ABRE EL CARRO
public static final var MONOLOGO_EXITO_CARTERA_FABIO  :int= 5; // !!FABIO!! ABRE EL CARRO
//P2
public static final var CONVERSACION_CONVENCER_NEGACION  :int= 6; // NO SE TIENE SELECCIONADO A NADIE CORRECTO
public static final var CONVERSACION_CONVENCER_EXITO_MARIO  :int= 7; // !!MARIO!! TRATA DE CONVENCERLOS Y LES DA DOS OPCIONES
public static final var CONVERSACION_CONVENCER_EXITO_FABIO  :int= 8; // !!FABIO!! TRATA DE CONVENCERLOS Y LES DA DOS OPCIONES !!!!SOLO SI TIENE EXTINTOR O LLAVE INGLESA
public static final var CONVERSACION_CONVENCER_EXITO_FABIO2  :int= 9; // !!FABIO!! TRATA DE CONVENCERLOS SOLO UNA OPCION

//P3
public static final var MONOLOGO_HABITACION_NEGACION  :int= 10; // EL CUARTO ESTA SIN LUZ
public static final var MONOLOGO_HABITACION_NEGACION_MARIO  :int= 11; // EL CUARTO ESTA SIN LUZ, PERO !!MARIO!! DA MAS INFORMACION
public static final var MONOLOGO_MARIO_FUSIBLES  :int= 12; // !!MARIO!! DA MAS INFORMACION DE LOS FUSIBLES
public static final var MONOLOGO_FUSIBLES  :int= 13; // CUANDO SE HABLA A LA CAJA DE FUSIBLES
public static final var MONOLOGO_CAJA  :int= 14; // CUANDO SE HABLA A LA CAJA DE FUSIBLES
//P4
public static final var CONVERSACION_CURAR_PERSONA_EXITO  :int= 15; //SE CURA Y SE LE COBRA A LA PERSONA, SE TIENE A !!!DIANA!! Y !!BOTIQUIN!!
public static final var CONVERSACION_CURAR_PERSONA_NEGACION  :int= 16; //NO SE CURA Y SE LE COBRA A LA PERSONA, SE TIENE A !!!DIANA!! PERO NO EL !!BOTIQUIN!!
public static final var CONVERSACION_ROBAR_PERSONA_EXITO  :int= 17; //SE ROBA A LA PERSONA SE TIENE A !!!!!FABIO!!!
public static final var CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO  :int= 18; //SE HABLA A LA PERSONA HERIDA CON !!!MARIO!!
public static final var CONVERSACION_ROBAR_PERSONA_NEGACION  :int= 19; //SE HABLA A LA PERSONA HERIDA CON CUALQUIERA
//P5
public static final var CONVERSACION_CONVENCER_FILA_NEGACION  :int= 20; // SE HABLA A LA FILA SIN RESULTADO
public static final var CONVERSACION_CONVENCER_FILA_NEGACION_MARIO  :int= 21; // SE HABLA A LA FILA CON !!!!MARIO@!!!
public static final var CONVERSACION_CONVENCER_FILA_EXITO  :int= 22; // SE HABLA A LA FILA DESPUES DE HABER AYUDADO AL AMIGO

public static final var CONVERSACION_DESPERTAR_NEGACION_MARIO  :int= 23; // SE HABLA AL MAN DORMIDO CON !!!MARIO!!!
public static final var CONVERSACION_DESPERTAR_NEGACION  :int= 24; // SE HABLA AL MAN DORMIDO SIN RESULTADO
public static final var CONVERSACION_DESPERTAR_EXITO  :int= 25; // SE HABLA AL MAN DORMIDO DESPUES DE DESPERTARLO
public static final var CONVERSACION_DESPERTAR_NEGACION_CARRO  :int= 26; // SE HABLA AL CARRO PARA DESPERTAR AL MAN, PERO NO SE TIENE A NADIE UTIL
public static final var CONVERSACION_DESPERTAR_NEGACION_CARRO_MARIO  :int= 27; // SE HABLA AL CARRO PARA DESPERTAR AL MAN, CON !!!MARIO!!!
public static final var CONVERSACION_DESPERTAR_EXITO_CARRO :int= 28; // SE HABLA AL CARRO PARA DESPERTAR AL MAN, !!FRANCISCO!!!
public static final var CONVERSACION_DESPERTAR_BALDE :int= 29; // SE HABLA AL BALDE 
public static final var CONVERSACION_DESPERTAR_BALDE_MARIO :int= 30; // SE HABLA AL BALDE CON !!!MARIO!!!
public static final var CONVERSACION_DESPERTAR_BALDE_GRIFO_EXITO :int= 31; // SE HABLA AL GRIFO TENIENDO EL BALDE
public static final var CONVERSACION_DESPERTAR_BALDE_GRIFO_NEGACION :int= 32; // SE HABLA AL GRIFO SIN TENER EL BALDE
public static final var CONVERSACION_DESPERTAR_BALDE_GRIFO_NEGACION_MARIO :int= 33; // SE HABLA AL GRIFO SIN TENER EL BALDE CON !!!MARIO!!!
public static final var CONVERSACION_DESPERTAR_BALDE_EXITO :int= 34; // SE HABLA MAN CON EL BALDE

//P6
public static final var MONOLOGO_CRUCETA_CARRO_NEGACION :int= 35; // SE HABLA AL CARRO QUE TIENE CRUCETA SIN NADIE
public static final var MONOLOGO_CRUCETA_CARRO_NEGACION_MARIO :int= 36; // SE HABLA AL CARRO QUE TIENE CRUCETA CON !!!!MARIO!!
public static final var MONOLOGO_CRUCETA_CARRO_EXITO_FRANCISCO :int= 37; // SE HABLA AL CARRO QUE TIENE CRUCETA CON !!FRANCISCO!! Y SE LOGRA ABRIR
public static final var MONOLOGO_CRUCETA_CARRO_EXITO :int= 38; // SE HABLA A UN CARRO ABIERTO 
public static final var CONVERSACION_CELADOR :int= 39;// Hablar por primera vez con el celador
public static final var MONOLOGO_FUSIBLES_INCORRECTO  :int= 40;//Fallar el puzzle de los fusibles
public static final var CONVERSACION_DINERO_COMPLETO  :int= 41;//Conseguir todo el dinero
public static final var CONVERSACION_FINAL_DINERO  :int= 42;//Hacer la fila con todo el dinero
public static final var CONVERSACION_FILA  :int= 43;//Hablar a la fila sin hablar al celador
public static final var CONVERSACION_NECESITA_ARMAS  :int= 44;//Hablar al grupo despues de rescatar a pedro
public static final var CONVERSACION_FINAL_REVUELTA  :int= 45;//Convencer a todos
public static final var CONVERSACION_FAMILIA  :int= 46;

////////////Resultados

public static final var RESULTADO_FUSIBLES :int= 0;
public static final var RESULTADO_CONVENCER_REVUELTA = 1;
public static final var RESULTADO_AMENAZAR = 2;
public static final var RESULTADO_REVUELTA = 3;
public static final var RESULTADO_NADA = 4;


// ================================================================================
// OnCreate
// ================================================================================

function Start(){

 inicializacionMonologoNegacionCarteraMario();
 inicializacionMonologoExitoCarteraFrancisco();	
 inicializacionMonologoExitoCarteraFabio();	
 inicializacionConversacionConvencerExitoMario();	
 inicializacionConversacionConvencerExitoFabio();	
 inicializacionConversacionConvencerExitoFabio2();	
 inicializacionMonologoHabitacionNegacionMario();	
 inicializacionMonologoMarioFusibles();		
 inicializacionConversacionConvencerFilaNegacionMario();	
 inicializacionConversacionDespertarNegacionMario();	
 inicializacionConversacionDespertarNegacionCarroMario();	
 inicializacionConversacionDespertarExitoCarro();	
 inicializacionConversacionDespertarBaldeMario();	
 inicializacionConversacionDespertarBaldeGrifoNegacionMario();	
 inicializacionMonologoCrucetaCarroNegacionMario();	
 inicializacionMonologoCrucetaCarroExitoFrancisco();	
}


// ================================================================================
// OnGui
// ================================================================================

function OnGUI () {
var pausa : boolean = GetComponent(MenuManager).estaPausado();
if(!pausa){
GUI.skin = customSkin;
	if(dialogosActivos){
		ventana = GUI.Window(0,ventana , WindowFunction,"");
		GUI.Box(Rect(0,50,Screen.width/2,Screen.height/2),texturaActual1);
		GUI.Box(Rect(Screen.width/2,50,Screen.width/2,Screen.height/2),texturaActual2);		
	}
	
	}
}

function WindowFunction (windowID : int) {


	if(enOpcion){
	
	
	if(GUI.Button(Rect (10, 20, ventana.width, 75), textoOpcion1)){
	print("Escogio Opcion 1:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo1());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	
	}
	if(GUI.Button(Rect (10, 95, ventana.width, 75), textoOpcion2)){
		print("Escogio Opcion 2:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo2());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	if(conversacionActual.getNodoActual().getHijo3()){
	
	if(GUI.Button(Rect (10, 170, ventana.width, 75), textoOpcion3)){
		print("Escogio Opcion 2:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo3());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	
	
	
	}
	
	}
	else{
	GUI.Label (Rect (10, 30, ventana.width, ventana.height), textoActivo);
	}
}


// ================================================================================
// OnMouseDown
// ================================================================================
function Update(){
var pausa : boolean = GetComponent(MenuManager).estaPausado();
if(!pausa){
if(dialogosActivos && Input.GetKeyDown(KeyCode.Mouse0) && !enOpcion){

	print("OnMouseDown");
		
	print("Tiene hijos?: " +conversacionActual.getNodoActual().tieneHijos());
	
	if(!conversacionActual.getNodoActual().estaTerminado()){
	print("Dialogo:");
		dibujarDialogo();
	}
	else if(conversacionActual.getNodoActual().estaTerminado()&&conversacionActual.getNodoActual().tieneHijos()){
		print("Opciones:");
		enOpcion = true;
		dibujarOpcion();
	}
	else if(conversacionActual.getNodoActual().estaTerminado() && !conversacionActual.getNodoActual().tieneHijos()){
		print("Fin dialogo");
		dialogosActivos = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
		manager.GetComponent(IEvent_manager).DialogSwitch(conversacionActual.getResultado());
		GetComponent(MenuManager).setBotonesHabilitado(true);
		
	}
}

}

}

// ================================================================================
// Metodos
// ================================================================================


function empezarDialogos(idConversacion:int ){
print("empezarDialogos");
var texturaPlayer:Texture2D;
var texturaPlayerSombreada:Texture2D;
GetComponent(MenuManager).setBotonesHabilitado(false);

switch(idConversacion){
/////////////////////////INICIO SWITCH



/////////////////////////P1
case CONVERSACION_CELADOR:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionCelador(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionCelador;
break;

case CONVERSACION_FAMILIA:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionFamilia(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionFamilia;
break;

case CONVERSACION_FILA:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionFila(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionFila;
break;

case CONVERSACION_NECESITA_ARMAS:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionNecesitaArmas(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionNecesitaArmas;
break;

case CONVERSACION_DINERO_COMPLETO:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionDineroCompleto(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionDineroCompleto;
break;

case MONOLOGO_NEGACION_CARTERA:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionMonologoNegacionCartera(texturaPlayer);
		conversacionActual = monologoNegacionCartera;


break;


case MONOLOGO_NEGACION_CARTERA_MARIO:

		conversacionActual = monologoNegacionCarteraMario;

break;

case MONOLOGO_NEGACION_CARTERA_FRANCISCO:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionMonologoNegacionCarteraFrancisco(texturaPlayer);
		conversacionActual = monologoNegacionCarteraFrancisco;

break;

case MONOLOGO_NEGACION_CARTERA_FABIO:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionMonologoNegacionCarteraFabio(texturaPlayer);
		conversacionActual = monologoNegacionCarteraFabio;
break;

case MONOLOGO_EXITO_CARTERA_FRANCISCO:
conversacionActual = monologoExitoCarteraFrancisco;

break;

case MONOLOGO_EXITO_CARTERA_FABIO:
conversacionActual = monologoExitoCarteraFabio;

break;
/////////////////////////////////////////P2
case CONVERSACION_CONVENCER_NEGACION:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionConvencerNegacion(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionConvencerNegacion;


break;
case CONVERSACION_CONVENCER_EXITO_MARIO:
conversacionActual = conversacionConvencerExitoMario;

break;
case CONVERSACION_CONVENCER_EXITO_FABIO:
conversacionActual = conversacionConvencerExitoFabio;

break;
case CONVERSACION_CONVENCER_EXITO_FABIO2:
conversacionActual = conversacionConvencerExitoFabio2;

break;
/////////////////////////////////////////P3

case MONOLOGO_HABITACION_NEGACION:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionMonologoHabitacionNegacion(texturaPlayer);
		conversacionActual = monologoHabitacionNegacion;


break;
case MONOLOGO_HABITACION_NEGACION_MARIO:
conversacionActual = monologoHabitacionNegacionMario;

break;
case MONOLOGO_MARIO_FUSIBLES:
conversacionActual = monologoMarioFusibles;

break;
case MONOLOGO_FUSIBLES:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionMonologoFusibles(texturaPlayer);
		conversacionActual = monologoFusibles;

break;

case MONOLOGO_CAJA:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionMonologoCaja(texturaPlayer);
		conversacionActual = monologoCaja;

break;

/////////////////////////P4

case CONVERSACION_CURAR_PERSONA_EXITO:
inicializacionConversacionCurarPersonaExito();	
conversacionActual = conversacionCurarPersonaExito;

break;
case CONVERSACION_CURAR_PERSONA_NEGACION:
inicializacionConversacionCurarPersonaNegacion();
conversacionActual = conversacionCurarPersonaNegacion;

break;
case CONVERSACION_ROBAR_PERSONA_EXITO:
inicializacionConversacionRobarPersonaExito();
conversacionActual = conversacionRobarPersonaExito;

break;
case CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO:
inicializacionConversacionRobarPersonaNegacionMario();
conversacionActual = conversacionRobarPersonaNegacionMario;

break;
case CONVERSACION_ROBAR_PERSONA_NEGACION:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionConversacionRobarPersonaNegacion(texturaPlayer);
		conversacionActual = conversacionRobarPersonaNegacion;

break;

/////////////////////////P5

case CONVERSACION_CONVENCER_FILA_NEGACION:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada = texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada = texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada = texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada = texturaFranciscoSombreada;
		}
		inicializacionConversacionConvencerFilaNegacion(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionConvencerFilaNegacion;

break;
case CONVERSACION_CONVENCER_FILA_NEGACION_MARIO:
conversacionActual = conversacionConvencerFilaNegacionMario;

break;
case CONVERSACION_CONVENCER_FILA_EXITO:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada = texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada = texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada = texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada = texturaFranciscoSombreada;
		}
		inicializacionConversacionConvencerFilaExito(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionConvencerFilaExito;

break;
case CONVERSACION_DESPERTAR_NEGACION_MARIO:
conversacionActual = conversacionDespertarNegacionMario;

break;
case CONVERSACION_DESPERTAR_NEGACION:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionConversacionDespertarNegacion(texturaPlayer);
		conversacionActual = conversacionDespertarNegacion;

break;
case CONVERSACION_DESPERTAR_EXITO:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada= texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada= texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada= texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada= texturaFranciscoSombreada;
		}
		inicializacionConversacionDespertarExito(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionDespertarExito;

break;
case CONVERSACION_DESPERTAR_NEGACION_CARRO:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionConversacionDespertarNegacionCarro(texturaPlayer);
		conversacionActual = conversacionDespertarNegacionCarro;

break;
case CONVERSACION_DESPERTAR_NEGACION_CARRO_MARIO:
conversacionActual = conversacionDespertarNegacionCarroMario;

break;
case CONVERSACION_DESPERTAR_EXITO_CARRO:
conversacionActual = conversacionDespertarExitoCarro;

break;
case CONVERSACION_DESPERTAR_BALDE:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionConversacionDespertarBalde(texturaPlayer);
		conversacionActual = conversacionDespertarBalde;

break;
case CONVERSACION_DESPERTAR_BALDE_MARIO:
conversacionActual = conversacionDespertarBaldeMario;

break;
case CONVERSACION_DESPERTAR_BALDE_GRIFO_EXITO:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionConversacionDespertarBaldeGrifoExito(texturaPlayer);
		conversacionActual = conversacionDespertarBaldeGrifoExito;

break;
case CONVERSACION_DESPERTAR_BALDE_GRIFO_NEGACION:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionConversacionDespertarBaldeGrifoNegacion(texturaPlayer);
		conversacionActual = conversacionDespertarBaldeGrifoNegacion;

break;
case CONVERSACION_DESPERTAR_BALDE_GRIFO_NEGACION_MARIO:
conversacionActual = conversacionDespertarBaldeGrifoNegacionMario;

break;
case CONVERSACION_DESPERTAR_BALDE_EXITO:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionDespertarBaldeExito(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionDespertarBaldeExito;

break;

/////////////////////////P6
case MONOLOGO_CRUCETA_CARRO_NEGACION:
if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionMonologoCrucetaCarroNegacion(texturaPlayer);
		conversacionActual = monologoCrucetaCarroNegacion;

break;

case MONOLOGO_CRUCETA_CARRO_NEGACION_MARIO:

		conversacionActual = monologoCrucetaCarroNegacionMario;

break;

case MONOLOGO_CRUCETA_CARRO_EXITO_FRANCISCO:

		conversacionActual = monologoCrucetaCarroExitoFrancisco;

break;

case MONOLOGO_CRUCETA_CARRO_EXITO:

	if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializacionMonologoCrucetaCarroExito(texturaPlayer);
		conversacionActual = monologoCrucetaCarroExito;

break;

case MONOLOGO_FUSIBLES_INCORRECTO:
		inicializacionMonologoFusiblesIncorrecto();
		conversacionActual = monologoFusiblesIncorrecto;
break;

case CONVERSACION_FINAL_DINERO:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionFinalDinero(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionFinalDinero;
break;

case CONVERSACION_FINAL_REVUELTA:

if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FABIO)
		{
			texturaPlayer=texturaFabio;
			texturaPlayerSombreada=texturaFabioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada=texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada=texturaMarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada=texturaFranciscoSombreada;
		}
		inicializacionConversacionFinalRevuelta(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionFinalRevuelta;
break;
/////////////////////////FIN SWITCH
}

GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
dialogosActivos = true;
}

function dibujarDialogo(){


if(conversacionActual.getNodoActual().getQuienLinea() == 1){
texturaActual1 = conversacionActual.getTexturaPj1();
texturaActual2 = conversacionActual.getTexturaPj2Sombreada();
}
else if (conversacionActual.getNodoActual().getQuienLinea() == 2){
texturaActual1 = conversacionActual.getTexturaPj1Sombreada();
texturaActual2 = conversacionActual.getTexturaPj2();
}

textoActivo = conversacionActual.getNodoActual().getTextoLinea();



}


function dibujarOpcion(){
textoOpcion1 = conversacionActual.getNodoActual().getHijo1().getTextoLinea();
textoOpcion2 = conversacionActual.getNodoActual().getHijo2().getTextoLinea();
textoActivo = "";
if(conversacionActual.getNodoActual().getHijo3()){
	textoOpcion3 = conversacionActual.getNodoActual().getHijo3().getTextoLinea();
}
texturaActual1 = conversacionActual.getTexturaPj1();
texturaActual2 = conversacionActual.getTexturaPj2Sombreada();
}


// ================================================================================
// Inicializacion de Arboles
// ================================================================================

function inicializacionMonologoNegacionCartera(texturaPlayer : Texture2D){

monologoNegacionCartera = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Alguien dejó una cartera allí, pero el carro está totalmente cerrado, ni modo.",1);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoNegacionCartera.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoNegacionCarteraMario(){

monologoNegacionCarteraMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Este parece el carro de la directora del departamento. Se que ella suele cargar mucho dinero.",1);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoNegacionCarteraMario.setRaiz(nodoRaiz);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoNegacionCarteraFrancisco(texturaPlayer : Texture2D){

monologoNegacionCarteraFrancisco = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Alguien dejó una cartera allí. ¿No mencionó Francisco que el sabía abrir cerraduras?",1);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoNegacionCarteraFrancisco.setRaiz(nodoRaiz);
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoNegacionCarteraFabio(texturaPlayer : Texture2D){

monologoNegacionCarteraFabio = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Alguien dejó una cartera en este carro. Tal vez pueda romper el vidrio con algo fuerte...",1);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoNegacionCarteraFabio.setRaiz(nodoRaiz);
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoExitoCarteraFrancisco(){

monologoExitoCarteraFrancisco = new ArbolConversacion(texturaFrancisco,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Muy bien, si queremos salir de aquí, tendremos que hacerlo a las malas.",1);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoExitoCarteraFrancisco.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoExitoCarteraFabio(){

monologoExitoCarteraFabio = new ArbolConversacion(texturaFabio,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Tendremos que hacer esto a las malas",1);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoExitoCarteraFabio.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionConvencerNegacion(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D){

conversacionConvencerNegacion = new ArbolConversacion(texturaPlayer,texturaGrupo,texturaPlayerSombreada,texturaGrupoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Esta gente parece tener sus propios problemas, mejor dejarlos en paz",1);
dialogos.Push(l);
l = new LineaDialogo("Déjenos salir celador abusivo",2);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionConvencerNegacion.setRaiz(nodoRaiz);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionConvencerExitoMario(){

conversacionConvencerExitoMario = new ArbolConversacion(texturaMario,texturaGrupo,texturaMarioSombreada,texturaGrupoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oigan, prestenme atencion un momento",1);
dialogos.Push(l);
l = new LineaDialogo("Mario, pensabamos que habías muerto. ¿Puedes creer lo que este celador abusivo está haciendo?",2);
dialogos.Push(l);
l = new LineaDialogo("Es cierto, a este ritmo moriremos. Tenemos que hacer algo, y necesito que me ayuden",1);
dialogos.Push(l);
l = new LineaDialogo("¿Y qué piensas hacer?",2);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

dialogos  = new Array();
l = new LineaDialogo("Somos más que él, obliguémoslo a que nos deje salir",1);
dialogos.Push(l);
l = new LineaDialogo("Mario tiene razón, si el no entinede por las buenas ¡Se lo haremos entender por las malas!",2);
dialogos.Push(l);
var nodoOp1:NodoDialogo = new NodoDialogo(dialogos, RESULTADO_CONVENCER_REVUELTA);
nodoRaiz.setHijo1(nodoOp1);

dialogos  = new Array();
l = new LineaDialogo("Este tipo solo entiende de dinero. prestenme plata.",1);
dialogos.Push(l);
l = new LineaDialogo("¿Plata? Si tuvieramos dinero, hace rato hubieramos salido.",2);
dialogos.Push(l);
l = new LineaDialogo("¿No lo entineden? Si entre todos juntamos suficiente dinero, saldremos más rápido",1);
dialogos.Push(l);
l = new LineaDialogo("Tienes razón Mario. Todos, junten el dinero que tengan, ya.",2);
dialogos.Push(l);
var nodoOp2:NodoDialogo = new NodoDialogo(dialogos, RESULTADO_AMENAZAR);
nodoRaiz.setHijo2(nodoOp2);


conversacionConvencerExitoMario.setRaiz(nodoRaiz);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionConvencerExitoFabio(){

conversacionConvencerExitoFabio = new ArbolConversacion(texturaFabio,texturaGrupo,texturaFabioSombreada,texturaGrupoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¡¡¡Esto es un abuso!!!!",2);
dialogos.Push(l);
l = new LineaDialogo("Oigan, un momento ¿Que está pasando aquí?",1);
dialogos.Push(l);
l = new LineaDialogo("¿Qué no lo ve? Podemos morir en cualquier momento, y ese celador inepto no nos quiere dejar salir.",2);
dialogos.Push(l);
l = new LineaDialogo("¿Hay algún problema acaso?",1);
dialogos.Push(l);
l = new LineaDialogo("¡Nada! Lo único en lo que ese tipo está pensando es en cobrar la cuota del hospotal",2);
dialogos.Push(l);
l = new LineaDialogo("Lo que faltaba, otra persona loca. Tendremos que hacer algo.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

dialogos  = new Array();
l = new LineaDialogo("No tenemos que aguantar esto, somos más y tenemos armas.",1);
dialogos.Push(l);
l = new LineaDialogo("Si, este tipo tiene razón, no tenemos que aguantar más a este celador.",2);
dialogos.Push(l);
var nodoOp1:NodoDialogo = new NodoDialogo(dialogos,RESULTADO_CONVENCER_REVUELTA );
nodoRaiz.setHijo1(nodoOp1);

dialogos = new Array();
l = new LineaDialogo("Bueno, ese es su problema, yo por mi parte... necesito que me den todo su dinero.",1);
dialogos.Push(l);
l = new LineaDialogo("¡¿Qué?!",2);
dialogos.Push(l);
l = new LineaDialogo("¡Lo que oyeron! No voy a quedarme aquí como un tonto sin hacer nada. ¡Me dan/n todo su dinero ahora mismo!",1);
dialogos.Push(l);
l = new LineaDialogo("¡Este hombre está completamente loco! Demosle el dinero a ver si nos deja en paz",2);
dialogos.Push(l);
var nodoOp2:NodoDialogo = new NodoDialogo(dialogos,RESULTADO_AMENAZAR);
nodoRaiz.setHijo2(nodoOp2);


conversacionConvencerExitoFabio.setRaiz(nodoRaiz);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionConvencerExitoFabio2( ){

conversacionConvencerExitoFabio2 = new ArbolConversacion(texturaFabio,texturaGrupo,texturaFabioSombreada,texturaGrupoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oigan todos ustedes",1);
dialogos.Push(l);
l = new LineaDialogo("Esta es una situación grave. Podemos morir en cualquier momento, y ese celador inepto\n no nos quiere dejar salir.",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

dialogos  = new Array();
l = new LineaDialogo("Bueno, ese es su problema, yo por mi parte... necesito que me den todo su dinero.",1);
dialogos.Push(l);
l = new LineaDialogo("¡¿Qué?!",2);
dialogos.Push(l);
l = new LineaDialogo("¡Lo que oyeron! No voy a quedarme aquí como un tonto sin hacer nada. ¡Me dan/n todo su dinero ahora mismo!",1);
dialogos.Push(l);
l = new LineaDialogo("¡Este hombre está completamente loco! Demosle el dinero a ver si nos deja en paz",2);
dialogos.Push(l);

var nodoOp1:NodoDialogo = new NodoDialogo(dialogos,RESULTADO_AMENAZAR);
nodoRaiz.setHijo1(nodoOp1);

dialogos  = new Array();
l = new LineaDialogo("(Será mejor buscar el dinero por nuestra cuenta)",1);
dialogos.Push(l);
l = new LineaDialogo("Tranquilos, no queremos molestar.",1);
dialogos.Push(l);

var nodoOp2:NodoDialogo = new NodoDialogo(dialogos,RESULTADO_NADA);
nodoRaiz.setHijo2(nodoOp2);

conversacionConvencerExitoFabio2.setRaiz(nodoRaiz);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoHabitacionNegacion( texturaPlayer : Texture2D){

monologoHabitacionNegacion = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Dios está muy oscuro, puede ser peligroso avanzar.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoHabitacionNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoHabitacionNegacionMario( ){

monologoHabitacionNegacionMario = new ArbolConversacion(texturaFabio,texturaMario,texturaFabioSombreada,texturaMarioSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Dios, esto está muy oscuro. Es peligroso avanzar",1);
dialogos.Push(l);
l = new LineaDialogo("Aquí se guarda parte del dinero de las cajas registradoras. Si logramos entrar, seguro encontramos algo de dinero.",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoHabitacionNegacionMario.setRaiz(nodoRaiz);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoMarioFusibles( ){

monologoMarioFusibles = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Aqui están los fusibles del cuarto de al lado. Recuerdo que en\n las oficinas guardan un mapa con la posición correcta de los fusibles.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, RESULTADO_FUSIBLES);

monologoMarioFusibles.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoFusibles( texturaPlayer : Texture2D){

monologoFusibles = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Es una caja de fusibles. Seguro controlan la luz del cuarto de al lado ",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, RESULTADO_FUSIBLES);

monologoFusibles.setRaiz(nodoRaiz);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionMonologoCaja( texturaPlayer : Texture2D){

monologoCaja = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Si, todavía hay algo de dinero aquí guardado. Estamos de suerte",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoCaja.setRaiz(nodoRaiz);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionCurarPersonaExito( ){

conversacionCurarPersonaExito = new ArbolConversacion(texturaDiana,texturaHerido,texturaDianaSombreada,texturaHeridoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oye, parece que sabes lo que haces, aquí necesito un poco de ayuda",2);
dialogos.Push(l);
l = new LineaDialogo("Podemos ayudarnos los dos, si tienes un poco de dinero con que ayudar...",1);
dialogos.Push(l);
l = new LineaDialogo("Bueno, supongo que es justo. Ten, es todo lo que cargo conmigo",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionCurarPersonaExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionCurarPersonaNegacion( ){

conversacionCurarPersonaNegacion = new ArbolConversacion(texturaDiana,texturaHerido,texturaDianaSombreada,texturaHeridoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oye, parece que sabes lo que haces, aquí necesito un poco de ayuda",2);
dialogos.Push(l);
l = new LineaDialogo("Me gustaria ayudarte, pero no tengo nada con que hacerlo, no tengo suministros",1);
dialogos.Push(l);
l = new LineaDialogo("Tranquila, al menos la buena intención es lo que cuenta",2);
dialogos.Push(l);
l = new LineaDialogo("Si... supongo que si.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionCurarPersonaNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionRobarPersonaExito( ){

conversacionRobarPersonaExito = new ArbolConversacion(texturaFrancisco,texturaHerido,texturaFranciscoSombreada,texturaHeridoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Al caido, caerle",1);
dialogos.Push(l);
l = new LineaDialogo("¿Huh? ¿Hay alguien ahí? ¡¡¡Ayuda!!!",2);
dialogos.Push(l);
l = new LineaDialogo("Jejeje, plata fácil",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionRobarPersonaExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionRobarPersonaNegacionMario( ){

conversacionRobarPersonaNegacionMario = new ArbolConversacion(texturaMario,texturaHerido,texturaMarioSombreada,texturaHeridoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Esta persona esta muy mal herida..puede que nos recompence por curarla\n....pero esta tan desprevenida que tal vez no se daria cuenta si algo pasase",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionRobarPersonaNegacionMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionRobarPersonaNegacion( texturaPlayer : Texture2D){

conversacionRobarPersonaNegacion = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Hay alguien que parece estar herido",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionRobarPersonaNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionConvencerFilaNegacion( texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D){

conversacionConvencerFilaNegacion = new ArbolConversacion(texturaPlayer,texturaFila,texturaPlayerSombreada,texturaFilaSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oigan, los de la fila. No tienen que aguantar todo esto.",1);
dialogos.Push(l);
 l = new LineaDialogo("¿De qué está hablando?",2);
dialogos.Push(l);
 l = new LineaDialogo("Somos muchos más que ese celador, podemos pasar por encima de él ¿Qué dicen?",1);
dialogos.Push(l);
 l = new LineaDialogo("No queremos más problemas. Nuestro amigo Pedro ya desapareció haciendo una locura de esas.\n Nosotros solo queremos salir de aquí lo más pronto posible.",2);
dialogos.Push(l);
l = new LineaDialogo("Tendré que convenserlo de alguna forma. Tal vez este Pedro ayude.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionConvencerFilaNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionConvencerFilaNegacionMario( ){

conversacionConvencerFilaNegacionMario = new ArbolConversacion(texturaMario,texturaFila,texturaMarioSombreada,texturaFilaSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Hey, ustedes. Son amigos de Pedro ¿Verdad?",1);
dialogos.Push(l);
l = new LineaDialogo("¿Mario? Te creiamos muerto. Que gusto verte con vida",2);
dialogos.Push(l);
l = new LineaDialogo("Fue solo suerte ¿Donde está Pedro?",1);
dialogos.Push(l);
l = new LineaDialogo("Lo sentimos, Mario. No encontramos a Pedro por ningún lado. Creemos lo peor.",2);
dialogos.Push(l);
l = new LineaDialogo("...",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionConvencerFilaNegacionMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function inicializacionConversacionConvencerFilaExito( texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D){

conversacionConvencerFilaExito = new ArbolConversacion(texturaPlayer,texturaFila,texturaPlayerSombreada,texturaFilaSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oigan, les traigo buenas noticias. Encontramos a Pedro.",1);
dialogos.Push(l);
l = new LineaDialogo("¿En serio? ¿Está Bien?",2);
dialogos.Push(l);
l = new LineaDialogo("Si, solo un poco atontado. Lo importante aquí es que quien lo atacó fue ese celador.",1);
dialogos.Push(l);
l = new LineaDialogo("Ese miserable. No ha hecho más que fastidiarnos",2);
dialogos.Push(l);
l = new LineaDialogo("Tienen razón. No hay que agunatar esto. Vamos, vengan conmigo, pondremos un punto final\n a esta situación.",1);
dialogos.Push(l);
l = new LineaDialogo("Si vamos, hagámoslo por Pedro.",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionConvencerFilaExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionDespertarNegacionMario(  ){

conversacionDespertarNegacionMario = new ArbolConversacion(texturaMario,texturaDormido,texturaMarioSombreada,texturaDormidoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Que le ha pasado al pobre de Pedro? Hay que despertarlo de alguna manera",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarNegacionMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionDespertarNegacion( texturaPlayer : Texture2D ){

conversacionDespertarNegacion = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Qué le habrá pasado a este sujeto? Está totalmente inconsciente.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarExito( texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionDespertarExito = new ArbolConversacion(texturaPlayer,texturaDormido,texturaPlayerSombreada,texturaDormidoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Pero qué...? ¿Qué...? ¿Qué es ese ruido infernal?",2);
dialogos.Push(l);
l = new LineaDialogo("Hasta que algo por fin lo despertó ¿Es usted Pedro?",1);
dialogos.Push(l);
l = new LineaDialogo("Si, soy yo ¿Qué me ha pasado?",2);
dialogos.Push(l);
l = new LineaDialogo("Diganos usted. Lo encontramos aquí en el piso.",1);
dialogos.Push(l);
l = new LineaDialogo("Dios, fue ese celador. Intenté pasar a las malas, y me golpeó hasta dejarme inconsciente",2);
dialogos.Push(l);
l = new LineaDialogo("Increible, esto se está saliendo totalmente de control",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarNegacionCarro( texturaPlayer : Texture2D ){

conversacionDespertarNegacionCarro = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Es un carro... si, se ve lo suficientemente normal para mi.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarNegacionCarro.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarNegacionCarroMario( ){

conversacionDespertarNegacionCarroMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Si lo que necesitamos es ruido, Francisco tal vez pueda activar la\n alarma de este caro.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarNegacionCarroMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
function inicializacionConversacionDespertarExitoCarro( ){

conversacionDespertarExitoCarro = new ArbolConversacion(texturaFrancisco,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Eso ese, una alarma bien ruidosa para despertar al dormilon.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarExitoCarro.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarBalde( texturaPlayer : Texture2D ){

conversacionDespertarBalde = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Alguien dejó un balde aquí. Supongo que podremos usarlo despues.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarBalde.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarBaldeMario( ){

conversacionDespertarBaldeMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¡Un balde! Si encontramos un grifo, podriamos llenarlo con agua.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarBaldeMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarBaldeGrifoExito(texturaPlayer : Texture2D ){

conversacionDespertarBaldeGrifoExito = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Listo, ya tenemos el balde lleno de agua.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarBaldeGrifoExito.setRaiz(nodoRaiz);
}/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarBaldeGrifoNegacion( texturaPlayer : Texture2D){

conversacionDespertarBaldeGrifoNegacion = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No puedo creer que este grifo todavía funcione",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarBaldeGrifoNegacion.setRaiz(nodoRaiz);
}/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionDespertarBaldeGrifoNegacionMario( ){

conversacionDespertarBaldeGrifoNegacionMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Este grifo todavia funciona. Si encontramos un alde, podemos llevar\n agua a cualquier parte.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarBaldeGrifoNegacionMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionDespertarBaldeExito(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionDespertarBaldeExito = new ArbolConversacion(texturaPlayer,texturaDormido,texturaPlayerSombreada,texturaDormidoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Fri...Fri...¡¡¡Fria!!!",2);
dialogos.Push(l);
l = new LineaDialogo("Lo siento amigo, teníamos que despertarlo con algo ¿Es usted Pedro?",1);
dialogos.Push(l);
l = new LineaDialogo("Si, soy yo ¿Qué me ha pasado?",2);
dialogos.Push(l);
l = new LineaDialogo("Diganos usted. Lo encontramos aquí en el piso.",1);
dialogos.Push(l);
l = new LineaDialogo("Dios, fue ese celador. Intenté pasar a las malas, y me golpeó hasta dejarme inconsciente",2);
dialogos.Push(l);
l = new LineaDialogo("Increible, esto se está saliendo totalmente de control",1);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarBaldeExito.setRaiz(nodoRaiz);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function inicializacionMonologoCrucetaCarroNegacion(texturaPlayer : Texture2D ){

monologoCrucetaCarroNegacion = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Es un carro ¿Qué se supone que haga al respecto?",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoCrucetaCarroNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionMonologoCrucetaCarroNegacionMario( ){

monologoCrucetaCarroNegacionMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Todos estos carros deben tener crucetas, solo que están cerrados.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoCrucetaCarroNegacionMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionMonologoCrucetaCarroExitoFrancisco( ){

monologoCrucetaCarroExitoFrancisco = new ArbolConversacion(texturaFrancisco,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Un toquesito por aquí, otro por acá, y listo, tenemos la cruceta del carro",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoCrucetaCarroExitoFrancisco.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionMonologoCrucetaCarroExito(texturaPlayer : Texture2D ){

monologoCrucetaCarroExito = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("La explosión debio abrir este carro. Supongo que el dueño no extrañará la cruceta",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoCrucetaCarroExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionCelador(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionCelador = new ArbolConversacion(texturaPlayer, texturaCelador,texturaPlayerSombreada,texturaCeladorSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Qué  pasa aquí? ¿Por qué nadie sale?",1);
dialogos.Push(l);
l = new LineaDialogo("Detengase ahí. Nadie sale sin el comprobante de pago",2);
dialogos.Push(l);
l = new LineaDialogo("¿De que demonios está hablando?",1);
dialogos.Push(l);
l = new LineaDialogo("El pago, amigo. Recivieron servicios en el hospital, y tienen que pagar por ellos",2);
dialogos.Push(l);
l = new LineaDialogo("No sea tan ridículo ¿No se da cuenta que el edificio se está cayendo?",1);
dialogos.Push(l);
l = new LineaDialogo("No voy a permitir que saquen excusas para robarle al hospital, que solo está aqui\n para prestarles un servicio. Sin el comprobante de pago nadie sale.",2);
dialogos.Push(l);
l = new LineaDialogo("Este hombre está completamente loco. Hay que pagar esa cuota de alguna forma, o tratar de buscar otra salida",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionCelador.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

function inicializacionMonologoFusiblesIncorrecto(){

monologoFusiblesIncorrecto = new ArbolConversacion(texturaFabio,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No, así no es, la habitación sigue a oscuras",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

monologoFusiblesIncorrecto.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionDineroCompleto(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionDineroCompleto = new ArbolConversacion(texturaPlayer, texturaCelador,texturaPlayerSombreada,texturaCeladorSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Muy bien, aquí está el dinero. Ahora déjenos salir",1);
dialogos.Push(l);
l = new LineaDialogo("¿Tengo cara de cajero? Tiene que hacer la fila en el punto de pago",2);
dialogos.Push(l);
l = new LineaDialogo("¿Es en serio? Solo tome la plata y déjenos salir",1);
dialogos.Push(l);
l = new LineaDialogo("Oiga, solo estoy aquí parahacer cumplir las reglas. Vaya al punto de pago si está tan\n apurado por salir.",2);
dialogos.Push(l);
l = new LineaDialogo("No hay forma de razonar con este tipo. Será mejor ir al punto de pago ya.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDineroCompleto.setRaiz(nodoRaiz);
}

///////////////////////////////////////////////////////////////////////////

function inicializacionConversacionFila(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionFila = new ArbolConversacion(texturaPlayer, texturaFila,texturaPlayerSombreada,texturaFilaSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Es una fila para ¿Pagar?",1);
dialogos.Push(l);
l = new LineaDialogo("Si, tenemos que pagar para salir de aquí.",2);
dialogos.Push(l);
l = new LineaDialogo("... ¿Qué?",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionFila.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////7

function inicializacionConversacionFinalDinero(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionFinalDinero = new ArbolConversacion(texturaPlayer, texturaFila,texturaPlayerSombreada,texturaFilaSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Aquí es el punto de pago?",1);
dialogos.Push(l);
l = new LineaDialogo("Si, este es. Hasta el final de la fila, todos queremos pagar",2);
dialogos.Push(l);
l = new LineaDialogo("Esto es ridículo, la fila es enorme",1);
dialogos.Push(l);
l = new LineaDialogo("Y no se mueve, llevamos aquí casi media hora",2);
dialogos.Push(l);
l = new LineaDialogo("¡No! A este ritmo... vamos a quedarnos sin tiempo.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionFinalDinero.setRaiz(nodoRaiz);
}

////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionNecesitaArmas(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionNecesitaArmas = new ArbolConversacion(texturaPlayer, texturaGrupo,texturaPlayerSombreada,texturaGrupoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oigan, cada vez hay mas gente en esto. !Ataquemos de una vez!",1);
dialogos.Push(l);
l = new LineaDialogo("No nos malinterpretes, estamos contigo, pero no creo que sea prudente, ese tipo está armado",2);
dialogos.Push(l);
l = new LineaDialogo("Si consigo con que defendernos ¿Lo harían?",1);
dialogos.Push(l);
l = new LineaDialogo("Claro que si, solo necesitamos saber que vamos a estar seguros.",2);
dialogos.Push(l);
l = new LineaDialogo("Bien, veré que puedo encontrar",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionNecesitaArmas.setRaiz(nodoRaiz);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionFinalRevuelta(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionFinalRevuelta = new ArbolConversacion(texturaPlayer, texturaGrupo,texturaPlayerSombreada,texturaGrupoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Es esto suficiente?",1);
dialogos.Push(l);
l = new LineaDialogo("¡Si!",2);
dialogos.Push(l);
l = new LineaDialogo("¿Vamos a terminar con el abuso de ese celador?",1);
dialogos.Push(l);
l = new LineaDialogo("¡Si!",2);
dialogos.Push(l);
l = new LineaDialogo("¡Pues acabemos con esto de una vez!",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, RESULTADO_REVUELTA);

conversacionFinalRevuelta.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionFamilia(texturaPlayer : Texture2D, texturaPlayerSombreada : Texture2D ){

conversacionFamilia = new ArbolConversacion(texturaPlayer, texturaCelador,texturaPlayerSombreada,texturaCeladorSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Hombre, debemos poder razonar de alguna manera.",1);
dialogos.Push(l);
l = new LineaDialogo("Tiene razón, lo más razonable ¡Es que pague de una vez la cuota!",2);
dialogos.Push(l);
l = new LineaDialogo("Oiga, usted tambien está aquí dentro. Si el edificio cae, usted tambien morirá",1);
dialogos.Push(l);
l = new LineaDialogo("Si ese es el caso, moriré haciendo bien mi trabajo",2);
dialogos.Push(l);
l = new LineaDialogo("¿Que es que acaso no le importa nada más? ¿No tiene familia?",1);
dialogos.Push(l);
l = new LineaDialogo("Claro que si, mi esposa SUSANA y mis hijos, FELIPE y ANA ¿Que tienen qie ver en esto?",2);
dialogos.Push(l);
l = new LineaDialogo("¿No quiere volverlos a ver?",1);
dialogos.Push(l);
l = new LineaDialogo("Claro que si. Pero sabe que, hay algo un poco más imortante",2);
dialogos.Push(l);
l = new LineaDialogo("¿Que?",1);
dialogos.Push(l);
l = new LineaDialogo("¡Pagar la cuota del hospital!",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionFamilia.setRaiz(nodoRaiz);
}