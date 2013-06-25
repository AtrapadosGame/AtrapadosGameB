#pragma strict

private var dialogosActivos : boolean;
private var enOpcion: boolean = false;

//============================================================================
//Variables para las conversaciones
//============================================================================

private var conversacionActual : ArbolConversacion;
private var conversacionGabriela : ArbolConversacion;
private var conversacionConserje : ArbolConversacion;
private var conversacionSinConserje : ArbolConversacion;
private var conversacionF1 : ArbolConversacion;
private var conversacionF1Ayudar : ArbolConversacion;
private var conversacionLockerF1 : ArbolConversacion;
private var conversacionF2 : ArbolConversacion;
private var conversacionF2Ayudar : ArbolConversacion;
private var conversacionLockerF2 : ArbolConversacion;
private var conversacionF3 : ArbolConversacion;
private var conversacionF3Ayudar : ArbolConversacion;
private var conversacionF3Paila : ArbolConversacion;
private var conversacionF4 : ArbolConversacion;
private var conversacionF4Ayudar : ArbolConversacion;
private var conversacionF4Paila : ArbolConversacion;
private var conversacionF5 : ArbolConversacion;
private var conversacionF5Ayudar : ArbolConversacion;
private var conversacionF7 : ArbolConversacion;
private var conversacionF7Ayudar : ArbolConversacion;
private var conversacionF7Paila : ArbolConversacion;
private var conversacionNovia : ArbolConversacion;
private var conversacionLockerVacio : ArbolConversacion;
private var conversacionSinDesinfectar : ArbolConversacion;
private var conversacionPalanca : ArbolConversacion;
private var conversacionAlambre : ArbolConversacion;
private var conversacionMatarToalla : ArbolConversacion;
private var conversacionMatarPapel : ArbolConversacion;
private var conversacionNoPuedeMatar : ArbolConversacion;
private var conversacionPapel : ArbolConversacion;
private var conversacionTerminarPapel : ArbolConversacion;
private var conversacionSinPapel : ArbolConversacion;
private var conversacionTaza : ArbolConversacion;
private var conversacionExito : ArbolConversacion;
private var conversacionFracaso : ArbolConversacion;
private var conversacionCodigo : ArbolConversacion;

//=====================================================================================================
// Variables para el control de la ventana de dialogo
//=====================================================================================================

private var ventana : Rect = Rect(0,(Screen.height/2)+50, Screen.width,(Screen.height/3));
private var textoActivo: String;
private var textoOpcion1: String;
private var textoOpcion2: String;
private var textoOpcion3: String;

private var texturaActual1 : Texture2D;
private var texturaActual2 : Texture2D;

//Conexión con el LevelManager
var manager : GameObject;

//======================================================
// Texturas para los dialogos
//======================================================

var customSkin: GUISkin;
var texturaCristina: Texture2D;
var texturaGabriela: Texture2D;
var texturaConserje: Texture2D;
var texturaF1: Texture2D;
var texturaF2: Texture2D;
var texturaF3: Texture2D;
var texturaF4: Texture2D;
var texturaF5: Texture2D;
var texturaF7: Texture2D;

var texturaCristinaSombreada: Texture2D;
var texturaGabrielaSombreada: Texture2D;
var texturaConserjeSombreada: Texture2D;
var texturaF1Sombreada: Texture2D;
var texturaF2Sombreada: Texture2D;
var texturaF3Sombreada: Texture2D;
var texturaF4Sombreada: Texture2D;
var texturaF5Sombreada: Texture2D;
var texturaF7Sombreada: Texture2D;

//=================================================================
// Constantes de control para lanzar las conversaciones
//=================================================================

public static final var CONVERSACION_GABRIELA  :int= 0;
public static final var CONVERSACION_CONSERJE  :int= 1;
public static final var CONVERSACION_SIN  :int= 2;
public static final var CONVERSACION_F1  :int= 3;
public static final var CONVERSACION_LOCKERF1  :int= 4;
public static final var CONVERSACION_VACIO  :int= 5;
public static final var CONVERSACION_DESINFECTAR  :int= 6;
public static final var CONVERSACION_F1AYUDAR  :int= 7;
public static final var CONVERSACION_F2  :int= 8;
public static final var CONVERSACION_F2AYUDAR  :int= 9;
public static final var CONVERSACION_LOCKERF2  :int= 10;
public static final var CONVERSACION_PALANCA  :int= 11;
public static final var CONVERSACION_F3  :int= 12;
public static final var CONVERSACION_F3AYUDAR  :int= 13;
public static final var CONVERSACION_ALAMBRE  :int= 14;
public static final var CONVERSACION_F3PAILA  :int= 15;
public static final var CONVERSACION_F4  :int= 16;
public static final var CONVERSACION_F4AYUDAR  :int= 17;
public static final var CONVERSACION_F4PAILA  :int= 18;
public static final var CONVERSACION_F5  :int= 19;
public static final var CONVERSACION_F5AYUDAR  :int= 20;
public static final var CONVERSACION_MATARTOALLA  :int= 21;
public static final var CONVERSACION_MATARPAPEL  :int= 22;
public static final var CONVERSACION_NOVIA  :int= 23;
public static final var CONVERSACION_NOPUEDEMATAR :int= 24;
public static final var CONVERSACION_PAPEL :int= 25;
public static final var CONVERSACION_TERMINARPAPEL :int= 26;
public static final var CONVERSACION_SINPAPEL :int= 27;
public static final var CONVERSACION_TAZA :int= 28;
public static final var CONVERSACION_F7  :int= 29;
public static final var CONVERSACION_F7AYUDAR  :int= 30;
public static final var CONVERSACION_F7PAILA  :int= 31;
public static final var CONVERSACION_EXITO  :int= 32;
public static final var CONVERSACION_FRACASO  :int= 33;
public static final var CONVERSACION_CODIGO  :int= 34;

public static final var GABRIELA = 1;
public static final var CONSERJE = 2;
public static final var FANTASMA1 = 3;
public static final var FANTASMA2 = 4;
public static final var MATAR_NOVIA = 5;
public static final var F7_PUZZLE = 6;

// ================================================================================
// OnCreate
// ================================================================================

function Start(){

 inicializarConversacionGabriela();
 inicializarConversacionConserje();
 inicializarConversacionF1();
 inicializarConversacionLockerF1();
 inicializarConversacionF1Ayudar();
 inicializarConversacionF2();
 inicializarConversacionF2Ayudar();
 inicializarConversacionPalanca();
 inicializarConversacionF3();
 inicializarConversacionF3Ayudar();
 inicializarConversacionF3Paila();
 inicializarConversacionF4();
 inicializarConversacionF4Ayudar();
 inicializarConversacionF4Paila();
 inicializarConversacionAlambre();
 inicializarConversacionF5();
 inicializarConversacionF5Ayudar();
 inicializarConversacionMatarToalla();
 inicializarConversacionMatarPapel();
 inicializarConversacionNovia();
 inicializarConversacionNoPuedeMatar();
 inicializarConversacionTerminarPapel();
 inicializarConversacionF7();
 inicializarConversacionF7Ayudar();
 inicializarConversacionF7Paila();
 inicializarConversacionExito();
 inicializarConversacionFracaso();
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
	
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo1());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	
	}
	if(GUI.Button(Rect (10, 95, ventana.width, 75), textoOpcion2)){
		
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo2());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	if(conversacionActual.getNodoActual().getHijo3()){
	
	if(GUI.Button(Rect (10, 170, ventana.width, 75), textoOpcion3)){
		
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

	
		
	
	
	if(!conversacionActual.getNodoActual().estaTerminado()){
	
		dibujarDialogo();
	}
	else if(conversacionActual.getNodoActual().estaTerminado()&&conversacionActual.getNodoActual().tieneHijos()){
		
		enOpcion = true;
		dibujarOpcion();
	}
	//Aqui se acaba la conversación
	else if(conversacionActual.getNodoActual().estaTerminado() && !conversacionActual.getNodoActual().tieneHijos()){
		
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

// Switch para comenzar los dialogos
function empezarDialogos(idConversacion:int ){
GetComponent(MenuManager).setBotonesHabilitado(false);

switch(idConversacion){

case CONVERSACION_GABRIELA:

conversacionActual = conversacionGabriela;

break;

case CONVERSACION_CONSERJE:

conversacionActual = conversacionConserje;

break;

case CONVERSACION_SIN:
inicializarConversacionSinConserje();
conversacionActual = conversacionSinConserje;

break;

case CONVERSACION_F1:

conversacionActual = conversacionF1;

break;

case CONVERSACION_F1AYUDAR:
conversacionActual = conversacionF1Ayudar;

break;

case CONVERSACION_LOCKERF1:

conversacionActual = conversacionLockerF1;

break;

case CONVERSACION_F2:

conversacionActual = conversacionF2;

break;

case CONVERSACION_F2AYUDAR:
conversacionActual = conversacionF2Ayudar;

break;

case CONVERSACION_LOCKERF2:
inicializarConversacionLockerF2();
conversacionActual = conversacionLockerF2;

break;

case CONVERSACION_F3:

conversacionActual = conversacionF3;

break;

case CONVERSACION_F3AYUDAR:
conversacionActual = conversacionF3Ayudar;
dibujarDialogo();

break;

case CONVERSACION_F3PAILA:
conversacionActual = conversacionF3Paila;
dibujarDialogo();

break;

case CONVERSACION_F4:

conversacionActual = conversacionF4;

break;

case CONVERSACION_F4AYUDAR:
conversacionActual = conversacionF4Ayudar;

break;

case CONVERSACION_F4PAILA:
conversacionActual = conversacionF4Paila;

break;

case CONVERSACION_F5:

conversacionActual = conversacionF5;

break;

case CONVERSACION_F5AYUDAR:
conversacionActual = conversacionF5Ayudar;

break;

case CONVERSACION_NOVIA:

conversacionActual = conversacionNovia;

break;

case CONVERSACION_F7:

conversacionActual = conversacionF7;

break;

case CONVERSACION_F7AYUDAR:
conversacionActual = conversacionF7Ayudar;
dibujarDialogo();

break;

case CONVERSACION_F7PAILA:
inicializarConversacionF7Paila();
conversacionActual = conversacionF7Paila;
dibujarDialogo();

break;

case CONVERSACION_VACIO:
inicializarConversacionLockerVacio();
conversacionActual = conversacionLockerVacio;

break;

case CONVERSACION_DESINFECTAR:
inicializarConversacionSinDesinfectar();
conversacionActual = conversacionSinDesinfectar;

break;

case CONVERSACION_PALANCA:

conversacionActual = conversacionPalanca;

break;

case CONVERSACION_ALAMBRE:

conversacionActual = conversacionAlambre;

break;

case CONVERSACION_MATARTOALLA:

conversacionActual = conversacionMatarToalla;

break;

case CONVERSACION_MATARPAPEL:

conversacionActual = conversacionMatarPapel;

break;

case CONVERSACION_NOPUEDEMATAR:

conversacionActual = conversacionNoPuedeMatar;

break;

case CONVERSACION_PAPEL:
inicializarConversacionPapel();
conversacionActual = conversacionPapel;

break;

case CONVERSACION_TERMINARPAPEL:

conversacionActual = conversacionTerminarPapel;

break;

case CONVERSACION_SINPAPEL:
inicializarConversacionSinPapel();
conversacionActual = conversacionSinPapel;

break;

case CONVERSACION_TAZA:
inicializarConversacionTaza();
conversacionActual = conversacionTaza;

break;

case CONVERSACION_EXITO:
conversacionActual = conversacionExito;

break;

case CONVERSACION_FRACASO:
conversacionActual = conversacionFracaso;

break;

case CONVERSACION_CODIGO:
inicializarConversacionCodigo();
conversacionActual = conversacionCodigo;

break;
}

GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();

dialogosActivos = true;
}

// Dibujo de la raiz de dialogo

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

//Dibujo de una opcion rama del árbol
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

//Introducción Gabriela
function inicializarConversacionGabriela(){
conversacionGabriela = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Bueno, aquí estoy ¿Cómo puedo ayudar a los seres que mencionas?",1);
dialogos.Push(l);
l = new LineaDialogo("Tranquila, hay que encontrar primero al conserje. Yo te sigo",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos,GABRIELA);

conversacionGabriela.setRaiz(nodoRaiz);
}

//Introducción conserje
function inicializarConversacionConserje(){
conversacionConserje = new ArbolConversacion(texturaCristina,texturaConserje,texturaCristinaSombreada,texturaConserjeSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Dios ¿Se encuentra usted bien?",1);
dialogos.Push(l);
l = new LineaDialogo("¿Quien está ahí?",2);
dialogos.Push(l);
l = new LineaDialogo("Pero si es solo una muchacha. Despreocupate por mi, deberia estar muerto desde hace mucho",2);
dialogos.Push(l);
l = new LineaDialogo("Gabriela me piedio que bajara, me dijo que necesitaba ayuda",1);
dialogos.Push(l);
l = new LineaDialogo("¿Gabriela? Ah, ya entiendo. Pero no, yo no soy quien necesita ayuda",2);
dialogos.Push(l);
l = new LineaDialogo("Pero si usted está muy malherido",1);
dialogos.Push(l);
l = new LineaDialogo("Esto no es nada, los que de verdad tienen problemas son los otros, los que ya murieron, \npero todavia no pueden desprenderse de este mundo",2);
dialogos.Push(l);
l = new LineaDialogo("¿Ellos son los que necesitan mi ayuda?",1);
dialogos.Push(l);
l = new LineaDialogo("Si ¿Por que no te paseas por la morgue? Mira a quien puedes ayudar",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos,CONSERJE);

conversacionConserje.setRaiz(nodoRaiz);
}

//Hablar con un fantasma sin haber hablado con el conserje
function inicializarConversacionSinConserje(){
conversacionSinConserje = new ArbolConversacion(texturaCristina,texturaConserje,texturaCristinaSombreada,texturaConserjeSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No me molestes",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionSinConserje.setRaiz(nodoRaiz);
}

//Fantasma F1
function inicializarConversacionF1(){
conversacionF1 = new ArbolConversacion(texturaCristina,texturaF1,texturaCristinaSombreada,texturaF1Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Es usted un... ¿Necesita algún tipo de ayuda?",1);
dialogos.Push(l);
l = new LineaDialogo("¿Ayuda? ¿Quieres ayudarme?",2);
dialogos.Push(l);
l = new LineaDialogo("Si, en lo que pueda. Solo quiero que usted logre descansar en paz",1);
dialogos.Push(l);
l = new LineaDialogo("¿Como quieres que descanse en paz si nisiquiera sé donde reposa mi cuerpo?",2);
dialogos.Push(l);
l = new LineaDialogo("Debe de estar en alguno de esto refrigeradores",1);
dialogos.Push(l);
l = new LineaDialogo("Pero ¿En cual? Llevo aquí un buen tiempo, pero simplemente no lo recuerdo.",2);
dialogos.Push(l);
l = new LineaDialogo("Bueno, trataré de averiguar donde se encuentra tu cuerpo",1);
dialogos.Push(l);

  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, FANTASMA1);

conversacionF1.setRaiz(nodoRaiz);
}

// Locker con el cuerpo de F1
function inicializarConversacionLockerF1(){
conversacionLockerF1 = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Será este el cuerpo que buscamos?",1);
dialogos.Push(l);
l = new LineaDialogo("Tiene que ser, es el refrigerador que estaba en su memoria",2);
dialogos.Push(l);
l = new LineaDialogo("Contémosle al fantasma entonces",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionLockerF1.setRaiz(nodoRaiz);
}

//Click a un locker vacío
function inicializarConversacionLockerVacio(){
conversacionLockerVacio = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Es un refrigerador de morgue. Aqui hay un cuerpo.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionLockerVacio.setRaiz(nodoRaiz);
}

//Click a una puerta sin desinfectarse
function inicializarConversacionSinDesinfectar(){
conversacionSinDesinfectar = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Al parecer primero necesitas desinfectarte en una estación",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionSinDesinfectar.setRaiz(nodoRaiz);
}

//Terminar la mision de F1
function inicializarConversacionF1Ayudar(){
conversacionF1Ayudar = new ArbolConversacion(texturaCristina,texturaF1,texturaCristinaSombreada,texturaF1Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Si, ese es mi cuerpo, lo recuerdo claramente... Dios, está horrible",2);
dialogos.Push(l);
l = new LineaDialogo("No esperarás que haga algo al respecto ¿Verdad?",1);
dialogos.Push(l);
l = new LineaDialogo("No, tranquila, ya has hecho suficiente por mi, ya puedo irme en paz",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF1Ayudar.setRaiz(nodoRaiz);
}

//Fantasma F2
function inicializarConversacionF2(){
conversacionF2 = new ArbolConversacion(texturaCristina,texturaF2,texturaCristinaSombreada,texturaF2Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Hola... Se te ve angustiado ¿Puedo hacer algo por ti?",1);
dialogos.Push(l);
l = new LineaDialogo("Es posible, si. Tu todavia puedes agarrar cosas",2);
dialogos.Push(l);
l = new LineaDialogo("¿Qué necesitas que haga?",1);
dialogos.Push(l);
l = new LineaDialogo("Mi cuerpo está en el refrigerador 12 de la morgue 1, pero no tengo acceso a el, \nla puerta está trabada",2);
dialogos.Push(l);
l = new LineaDialogo("Entiendo... veré que puedo hacer.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, FANTASMA2);

conversacionF2.setRaiz(nodoRaiz);
}

//Terminar la mision de F2
function inicializarConversacionF2Ayudar(){
conversacionF2Ayudar = new ArbolConversacion(texturaCristina,texturaF2,texturaCristinaSombreada,texturaF2Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Ya está, no fue fácil, pero logré abrir la puerta del refirgerador",1);
dialogos.Push(l);
l = new LineaDialogo("Te agradezco, de verdad necesitaba darle un último vistazo. Ya puedo irme en paz.",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF2Ayudar.setRaiz(nodoRaiz);
}

// Locker atorado con el cuerpo de F2
function inicializarConversacionLockerF2(){
conversacionLockerF2 = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Aquí está el locker, pero necesitaré algo para forzar la puerta",1);
dialogos.Push(l);
l = new LineaDialogo("¿Una palanca tal vez? Hay que buscar algo que se le parezca",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionLockerF2.setRaiz(nodoRaiz);
}

// Encontrar la palanca en el locker de la morgue 2
function inicializarConversacionPalanca(){
conversacionPalanca = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Esto puede que sirva como palanca.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionPalanca.setRaiz(nodoRaiz);
}

// Conversación fantasma F3
function inicializarConversacionF3(){
conversacionF3 = new ArbolConversacion(texturaCristina,texturaF3,texturaCristinaSombreada,texturaF3Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Lo siento, pero no puedo dejarte usar esta estación",2);
dialogos.Push(l);
l = new LineaDialogo("¿Algún problema?",1);
dialogos.Push(l);
l = new LineaDialogo("Mi argolla, la perdí allí. Mi esposa no me lo ha perdonado, y ahora no puedo pensar mas que en sacarla.",2);
dialogos.Push(l);
l = new LineaDialogo("Veré que puedo hacer, necesitaré algo para sacarlo.",1);
dialogos.Push(l);


var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF3.setRaiz(nodoRaiz);
}

//Ayudar al fantasma F3
function inicializarConversacionF3Ayudar(){
conversacionF3Ayudar = new ArbolConversacion(texturaCristina,texturaF3,texturaCristinaSombreada,texturaF3Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Es este ¿Verdad?",1);
dialogos.Push(l);
l = new LineaDialogo("¡¡Si, es ese!! Volveré a ver sonreir a mi esposa, grácias.",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF3Ayudar.setRaiz(nodoRaiz);
}

//En el armario con el alambre
function inicializarConversacionAlambre(){
conversacionAlambre = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Aqui hay un alambre",1);
dialogos.Push(l);
l = new LineaDialogo("Cógelo, puede ser útil",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionAlambre.setRaiz(nodoRaiz);
}

//Elegir el anillo incorrecto
function inicializarConversacionF3Paila(){
conversacionF3Paila = new ArbolConversacion(texturaCristina,texturaF3,texturaCristinaSombreada,texturaF3Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Es este ¿Verdad?",1);
dialogos.Push(l);
l = new LineaDialogo("... No, no es ese. El mio era de oro",2);
dialogos.Push(l);
l = new LineaDialogo("No puede ser, el alambre se a roto. Tal vez si...",1);
dialogos.Push(l);
l = new LineaDialogo("No te desgates, ya me acostumbré a fallarle a mi esposa. Puedo morir como un fracasado, \ngrácias por tu esfuerzo",2);
dialogos.Push(l);
l = new LineaDialogo("Esto no está bien...",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF3Paila.setRaiz(nodoRaiz);
}

//Conversación con F4
function inicializarConversacionF4(){
conversacionF4 = new ArbolConversacion(texturaCristina,texturaF4,texturaCristinaSombreada,texturaF4Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Disculpe, necesito pasar",1);
dialogos.Push(l);
l = new LineaDialogo("No pierdas tu tiempo, no pienso moverme de aquí",2);
dialogos.Push(l);
l = new LineaDialogo("¿Puedo preguntar por qué?",1);
dialogos.Push(l);
l = new LineaDialogo("No voy a permitir que el fracasado de mi marido se salga con la suya",2);
dialogos.Push(l);
l = new LineaDialogo("¿Ha hecho algo malo?",1);
dialogos.Push(l);
l = new LineaDialogo("Perdio su argolla de matrimonio ¡Otra vez! No pienso irme de aquí hasta que la recupere, asi me muera aqui parada",2);
dialogos.Push(l);
l = new LineaDialogo("... Claro, la entinedo",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF4.setRaiz(nodoRaiz);
}

//Ayudar a F4
function inicializarConversacionF4Ayudar(){
conversacionF4Ayudar = new ArbolConversacion(texturaCristina,texturaF4,texturaCristinaSombreada,texturaF4Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Su esporso me mandó para mostrarle esto",1);
dialogos.Push(l);
l = new LineaDialogo("¡Es su anillo, lo recuperó!",2);
dialogos.Push(l);
l = new LineaDialogo("Asi es",1);
dialogos.Push(l);
l = new LineaDialogo("Bien, no es un total fracaso despues de todo. Creo que ya puedo irme.",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionF4Ayudar.setRaiz(nodoRaiz);
}

//Paila con F4
function inicializarConversacionF4Paila(){
conversacionF4Paila = new ArbolConversacion(texturaCristina,texturaF4,texturaCristinaSombreada,texturaF4Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Su esporso me mandó para mostrarle esto",1);
dialogos.Push(l);
l = new LineaDialogo("¿Qué es eso? ¿Alguna broma?",2);
dialogos.Push(l);
l = new LineaDialogo("¿No es su anillo de matrominio?",1);
dialogos.Push(l);
l = new LineaDialogo("No, esa no es. El fracasado intenta engallame, pero ni siquiera le atinó al material correcto",2);
dialogos.Push(l);
l = new LineaDialogo("Lo siento tanto",1);
dialogos.Push(l);
l = new LineaDialogo("Tu no eres la que está casada. Creo que me iré, siento como se se me hubiera ido la vida aquí parada",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF4Paila.setRaiz(nodoRaiz);
}

//Conversación con F5
function inicializarConversacionF5(){
conversacionF5 = new ArbolConversacion(texturaCristina,texturaF5,texturaCristinaSombreada,texturaF5Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Mmmm, ¿Será que te puedo molestar?",2);
dialogos.Push(l);
l = new LineaDialogo("Claro ¿En qué puedo ayudarte?",1);
dialogos.Push(l);
l = new LineaDialogo("Se que estoy, bueno, muerto",2);
dialogos.Push(l);
l = new LineaDialogo("Si... creo que no puedo hacer nada al respecto",1);
dialogos.Push(l);
l = new LineaDialogo("No, no es eso. Temo es por mi novia. No la veo por ninguna parte. La verdad, \nme preocupa irme y dejarla a ella aquí sola.",2);
dialogos.Push(l);
l = new LineaDialogo("No te preocupes, yo la busco",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionF5.setRaiz(nodoRaiz);
}

//Ayudar a F5
function inicializarConversacionF5Ayudar(){
conversacionF5Ayudar = new ArbolConversacion(texturaCristina,texturaF5,texturaCristinaSombreada,texturaF5Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Bueno... la encontré",1);
dialogos.Push(l);
l = new LineaDialogo("¿Y? ¿Qué pasó?",2);
dialogos.Push(l);
l = new LineaDialogo("Ya está descansando, creo que tu deberias hacer lo mismo",1);
dialogos.Push(l);
l = new LineaDialogo("Eso me alegra, la buscaré en el otro lado, seguro me recordará",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionF5Ayudar.setRaiz(nodoRaiz);
}

//Matar a novia de F5 con la toalla
function inicializarConversacionMatarToalla(){
conversacionMatarToalla = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Espero no sufra mucho con esto",1);
dialogos.Push(l);
l = new LineaDialogo("No sufrirá mas de lo que ya está sufriendo. Es lo mejor, hazlo",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, MATAR_NOVIA);
conversacionMatarToalla.setRaiz(nodoRaiz);
}

//Matar a novia de F5 con papel higiénico
function inicializarConversacionMatarPapel(){
conversacionMatarPapel = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Dios, esto es horrible, no me siento capaz de hecerlo.",1);
dialogos.Push(l);
l = new LineaDialogo("Tienes que hacerlo. Está sufriendo, y si no la matas, ni ella ni su novio descansarán en paz.",2);
dialogos.Push(l);
l = new LineaDialogo("Si, tienes razón, debo hacerlo.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, MATAR_NOVIA);
conversacionMatarPapel.setRaiz(nodoRaiz);
}

//Encontrar a la novia sin haber hablado con F5
function inicializarConversacionNovia(){
conversacionNovia = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Aqui hay una pobre mujer medio muerta.",1);
dialogos.Push(l);
l = new LineaDialogo("Morirá en cualquier momento, ignórala por ahora",2);
dialogos.Push(l);
l = new LineaDialogo("¿No debería ayudarla?",1);
dialogos.Push(l);
l = new LineaDialogo("Nuestra prioridad son los fantasmas, despues nos ocuparemos de ella",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionNovia.setRaiz(nodoRaiz);
}

//No tiene items para matar a la novia
function inicializarConversacionNoPuedeMatar(){
conversacionNoPuedeMatar = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Tiene que ser ella, la novia del fantasma. ¿Que deberiamos hacer por ella?",1);
dialogos.Push(l);
l = new LineaDialogo("Ayudarla",2);
dialogos.Push(l);
l = new LineaDialogo("¿Cómo? No se nada de medicina, y ella apenas si está viva",1);
dialogos.Push(l);
l = new LineaDialogo("Entonces ahorrale el sufrimiento, mátala",2);
dialogos.Push(l);
l = new LineaDialogo("Si, es lo mejor. ¿Cómo será mejor hacerlo?",1);
dialogos.Push(l);
l = new LineaDialogo("Ahógala",2);
dialogos.Push(l);
l = new LineaDialogo("¿Con qué?",1);
dialogos.Push(l);
l = new LineaDialogo("Con una toalla puede ser. Si no tienes ninguna, algo nos ha de servir, busquemos por aquí",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionNoPuedeMatar.setRaiz(nodoRaiz);
}

//Coger papel Higiénico
function inicializarConversacionPapel(){
conversacionPapel = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Esto tal vez sirva",1);
dialogos.Push(l);
l = new LineaDialogo("Si, pero necesitaremos más",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionPapel.setRaiz(nodoRaiz);
}

//Terminar con el papel higiénico
function inicializarConversacionTerminarPapel(){
conversacionTerminarPapel = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Con esto será suficiente, creo",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionTerminarPapel.setRaiz(nodoRaiz);
}

//Terminar con el papel higiénico
function inicializarConversacionSinPapel(){
conversacionSinPapel = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Rayos, aquí no hay papel",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionSinPapel.setRaiz(nodoRaiz);
}

//En el baño sin hablar con F5
function inicializarConversacionTaza(){
conversacionTaza = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Oh, un baño....No tengo ganas.",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionTaza.setRaiz(nodoRaiz);
}

//Conversacion con F7
function inicializarConversacionF7(){
conversacionF7 = new ArbolConversacion(texturaCristina,texturaF7,texturaCristinaSombreada,texturaF7Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Disculpa... ¿Estas llorando?",1);
dialogos.Push(l);
l = new LineaDialogo("Estoy muerto, claro que estoy llorando. Dios... mi esposa... mis hijos",2);
dialogos.Push(l);
l = new LineaDialogo("No tiene que ponerse así. Si guarda un recuerdo bonito de ellos, podrá atesorarlo el resto de su existencia",1);
dialogos.Push(l);
l = new LineaDialogo("Un recuerdo, claro.... pero",2);
dialogos.Push(l);
l = new LineaDialogo("Pero...¿Qué?",1);
dialogos.Push(l);
l = new LineaDialogo("¡Sus nombres, no los recuerdo!",2);
dialogos.Push(l);
l = new LineaDialogo("Quisas pueda ayudarlo de alguna manera",1);
dialogos.Push(l);
l = new LineaDialogo("Claro que si. Sus nombres, dime cuales son sus nombres",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, F7_PUZZLE);
conversacionF7.setRaiz(nodoRaiz);
}

//Conversacion con F7 despues de ayudarlo
function inicializarConversacionF7Ayudar(){
conversacionF7Ayudar = new ArbolConversacion(texturaCristina,texturaF7,texturaCristinaSombreada,texturaF7Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¡Si, esos son, ya me acuerdo! Gracias, es imposible que se me vuelvan a olvidar",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionF7Ayudar.setRaiz(nodoRaiz);
}

//Conversacion con F7 al fallar el puzzle
function inicializarConversacionF7Paila(){
conversacionF7Paila = new ArbolConversacion(texturaCristina,texturaF7,texturaCristinaSombreada,texturaF7Sombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("No, no me suenan, esos no son.",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, F7_PUZZLE);
conversacionF7Paila.setRaiz(nodoRaiz);
}

//Conversacion de exito con el conserje
function inicializarConversacionExito(){
conversacionExito = new ArbolConversacion(texturaCristina,texturaConserje,texturaCristinaSombreada,texturaConserjeSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Listo, todos los fantasma descansan ahora sin ningun remordimiento",1);
dialogos.Push(l);
l = new LineaDialogo("Si, es verdad, se siente mucha más paz en este lugar",2);
dialogos.Push(l);
l = new LineaDialogo("¿Y ahora qué?",1);
dialogos.Push(l);
l = new LineaDialogo("Bueno, ya has ayudado a todos los que podias, creo que es hora de que tu tambien descanses",2);
dialogos.Push(l);
l = new LineaDialogo("... Si, tienes razon... ya es hora",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionExito.setRaiz(nodoRaiz);
}

//Conversacion de exito con el conserje
function inicializarConversacionFracaso(){
conversacionFracaso = new ArbolConversacion(texturaCristina,texturaConserje,texturaCristinaSombreada,texturaConserjeSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Ya he hablado con todos, pero...",1);
dialogos.Push(l);
l = new LineaDialogo("Si, hay algo extraño. Ya no veo fantasmas, pero todavía no siento paz en este lugar",2);
dialogos.Push(l);
l = new LineaDialogo("Es mi culpa, no he podido ayudar correctamente a nadie. Soy un fracaso.",1);
dialogos.Push(l);
l = new LineaDialogo("No te atormentes así, hiciste lo que podiste. Solo falta que tu descanses, si creo que eso es lo que falta",2);
dialogos.Push(l);
l = new LineaDialogo("... Si, tal vez tengas razon",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionFracaso.setRaiz(nodoRaiz);
}

//Conversacion de exito con el conserje
function inicializarConversacionCodigo(){
conversacionCodigo = new ArbolConversacion(texturaCristina,texturaGabriela,texturaCristinaSombreada,texturaGabrielaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Creo que ha muerto",1);
dialogos.Push(l);
l = new LineaDialogo("No, solo ahorra fuerzas",2);
dialogos.Push(l);
l = new LineaDialogo("Creo.. creo que tiene algo en la mano. Lo está sujetando con fuerza",1);
dialogos.Push(l);
l = new LineaDialogo("Tal vez sea importante",2);
dialogos.Push(l);
l = new LineaDialogo("Es un papel, tien algo escrito. ''Codigo caja fuerte en la oficina: 181651'' ¿Que significa eso?",1);
dialogos.Push(l);
l = new LineaDialogo("No lo se, es posible que signifique algo para otra persona.",2);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
conversacionCodigo.setRaiz(nodoRaiz);
}