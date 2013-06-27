#pragma strict

private var dialogosActivos : boolean;
private var enOpcion: boolean = false;
//P1
private var conversacionActual : ArbolConversacion;
private var conversacionCelador : ArbolConversacion;
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


//FIN 1
private var conversacionFinal1 : ArbolConversacion; 

//P5 P5: Hay personas haciendo fila en el punto de pago.
// Para convencerlos de dejarla y hacer revuelta, es necesario encontrar a su amigo que se perdió buscando otra salida.

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

var texturaDianaSombreada : Texture2D;
var texturaMarioSombreada: Texture2D;
var texturaFranciscoSombreada: Texture2D;
var texturaFabioSombreada: Texture2D;
var texturaCeladorSombreada: Texture2D;
var texturaGrupoSombreada: Texture2D;



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




////////////Resultados

public static final var RESULTADO_FUSIBLES :int= 0; // SE HABLA A UN CARRO ABIERTO 
public static final var RESULTADO_CONVENCER_REVUELTA = 1;
public static final var RESULTADO_AMENAZAR = 2;



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
 inicializacionConversacionCurarPersonaExito();	
 inicializacionConversacionCurarPersonaNegacion();	
 inicializacionConversacionRobarPersonaExito();	
 inicializacionConversacionRobarPersonaNegacionMario();	
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
conversacionActual = conversacionCurarPersonaExito;

break;
case CONVERSACION_CURAR_PERSONA_NEGACION:
conversacionActual = conversacionCurarPersonaNegacion;

break;
case CONVERSACION_ROBAR_PERSONA_EXITO:
conversacionActual = conversacionRobarPersonaExito;

break;
case CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO:
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
		inicializacionConversacionConvencerFilaNegacion(texturaPlayer);
		conversacionActual = conversacionConvencerFilaNegacion;

break;
case CONVERSACION_CONVENCER_FILA_NEGACION_MARIO:
conversacionActual = conversacionConvencerFilaNegacionMario;

break;
case CONVERSACION_CONVENCER_FILA_EXITO:
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
		inicializacionConversacionConvencerFilaExito(texturaPlayer);
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
		inicializacionConversacionDespertarExito(texturaPlayer);
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
		inicializacionConversacionDespertarBaldeExito(texturaPlayer);
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
l = new LineaDialogo("Este tipo solo entiende de dinero. presteneme plata.",1);
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
l = new LineaDialogo("Bueno, ese es su problema, yo por mi parte... necesito que me den todo su dinero.",1);
dialogos.Push(l);
l = new LineaDialogo("¡¿Qué?!",2);
dialogos.Push(l);
l = new LineaDialogo("¡Lo que oyeron! No voy a quedarme aquí como un tonto sin hacer nada. ¡Me dan/n todo su dinero ahora mismo!",1);
dialogos.Push(l);
l = new LineaDialogo("¡Este hombre está completamente loco! Demosle el dinero a ver si nos deja en paz",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

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

conversacionCurarPersonaExito = new ArbolConversacion(texturaDiana,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Gracias por la plata de la curacion",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionCurarPersonaExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionCurarPersonaNegacion( ){

conversacionCurarPersonaNegacion = new ArbolConversacion(texturaDiana,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Necesito un botiquin para poderlo curar",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionCurarPersonaNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionRobarPersonaExito( ){

conversacionRobarPersonaExito = new ArbolConversacion(texturaFabio,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Gracias por la plata !!!!",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionRobarPersonaExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionRobarPersonaNegacionMario( ){

conversacionRobarPersonaNegacionMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Uy esta persona esta mal herida..puede que nos recompence por curarla....pero esta tan desprevenida que tal vez no se daria cuenta si algo pasase !!!!",1);
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
function inicializacionConversacionConvencerFilaNegacion( texturaPlayer : Texture2D){

conversacionConvencerFilaNegacion = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Hay mucha gente haciendo fila",1);
dialogos.Push(l);
 l = new LineaDialogo("No encontramos a nuestro amigo",2);
dialogos.Push(l);
 l = new LineaDialogo("El celador no nos deja salir por que no se unen a nosotros en la revuelta",1);
dialogos.Push(l);
 l = new LineaDialogo("Esta bien pero primero necesitamos encontrar a nuestro amigo Pedro",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionConvencerFilaNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionConvencerFilaNegacionMario( ){

conversacionConvencerFilaNegacionMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Estos son los amigos de Pedro",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionConvencerFilaNegacionMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function inicializacionConversacionConvencerFilaExito( texturaPlayer : Texture2D){

conversacionConvencerFilaNegacionMario = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Listo Revoltemonos",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionConvencerFilaNegacionMario.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionDespertarNegacionMario(  ){

conversacionDespertarNegacionMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Este tipo es Pedro, esta dormido, pero podriamos despertarlo de varias maneras: un balde de agua o con mucho ruido",1);
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
var l: LineaDialogo = new LineaDialogo("Este tipo esta dormido ",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarNegacion.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarExito( texturaPlayer : Texture2D ){

conversacionDespertarExito = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Por fin se desperto, ahora hablemos con sus amigos ",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarNegacionCarro( texturaPlayer : Texture2D ){

conversacionDespertarExito = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No se como abrir este carro ",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarExito.setRaiz(nodoRaiz);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializacionConversacionDespertarNegacionCarroMario( ){

conversacionDespertarNegacionCarroMario = new ArbolConversacion(texturaMario,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Puede q francisco pueda abrir el carro para activar la alarma y hacer ruido ",1);
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
var l: LineaDialogo = new LineaDialogo("Con este ruido cualquiera se despertaria ",1);
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
var l: LineaDialogo = new LineaDialogo("Un balde!, que podremos hacer con este ",1);
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
var l: LineaDialogo = new LineaDialogo("Un balde!, podriamos llenarlo de agua en el grifo ",1);
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
var l: LineaDialogo = new LineaDialogo("Podemos llenar el balde en este grifo ",1);
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
var l: LineaDialogo = new LineaDialogo("En caso de que necesitemos agua aca podremos encontrar ",1);
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
var l: LineaDialogo = new LineaDialogo("Hay baldes por ahi, con este grifo podemos llenarlos ",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDespertarBaldeGrifoNegacionMario.setRaiz(nodoRaiz);
}/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function inicializacionConversacionDespertarBaldeExito(texturaPlayer : Texture2D ){

conversacionDespertarBaldeExito = new ArbolConversacion(texturaPlayer,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Por fin se desperto este tipo ",1);
dialogos.Push(l);

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
var l: LineaDialogo = new LineaDialogo("El carro esta cerrado",1);
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
var l: LineaDialogo = new LineaDialogo("El carro esta cerrado, pero fijo francisco puede abrirlo, ademas alcanzo a ver una cruceta ahi dentro",1);
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
var l: LineaDialogo = new LineaDialogo("Me tumbe la cruceta de este carro",1);
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
var l: LineaDialogo = new LineaDialogo("Me tumbe la cruceta de este carro que estaba abierto",1);
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
