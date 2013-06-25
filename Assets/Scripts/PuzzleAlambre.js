#pragma strict

// ================================================================================
// Variables
// ================================================================================
private var puzzleActivo : boolean;

//Usado para aplicar estilo a la ventana de puzzle

var customSkin: GUISkin;

//Dimensiones de la ventana del loot
private var ventana : Rect = Rect(Screen.width/4,Screen.height/4, Screen.width/2,(Screen.height/2));





//Dimensiones de los botones
private var ancho : int = 128;
private var alto : int = 64;

//texturas
var texturaInterruptor : Texture2D;







// ================================================================================
// OnCreate
// ================================================================================

function Start(){

}


// ================================================================================
// OnGui
// ================================================================================
//TODO
function OnGUI () {

//GUI.skin = customSkin;
	if(puzzleActivo){
		ventana = GUI.Window(0,ventana , WindowFunction,"");
		//GUI.Box(Rect(0,50,Screen.width/2,Screen.height/2),texturaActual1);
		//GUI.Box(Rect(Screen.width/2,50,Screen.width/2,Screen.height/2),texturaActual2);		
	}
}
//TODO
function WindowFunction (windowID : int) {
	GUI.Label(new Rect(ventana.width/2,10,ancho,alto), "¿Cual será el anillo? Solo tengo un intento");

	if(GUI.Button(new Rect(ventana.width/3, (ventana.height * 3)/4, ancho, alto ), "Anillo de oro")){
		GetComponent(Manager2).EventTrigger("AnilloOro");
		puzzleActivo = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
		
	}

	if(GUI.Button(new Rect((ventana.width/9)*5, (ventana.height * 3)/4, ancho, alto ), "Anillo de plata")){
		GetComponent(Manager2).EventTrigger("AnilloPlata");
		puzzleActivo = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();		
	}
	if(GUI.Button(new Rect((ventana.width/9)*7, (ventana.height * 3)/4, ancho, alto ), "Cancelar")){		
		puzzleActivo = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();		
	}
}

// ================================================================================
// Metodos
// ================================================================================


function empezarPuzzle(){
print("empezarLoot");
GetComponent(MenuManager).setBotonesHabilitado(false);
GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();

puzzleActivo = true;

}