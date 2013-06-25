#pragma strict

// ================================================================================
// Variables
// ================================================================================
private var puzzleActivo : boolean;

//Usado para aplicar estilo a la ventana de puzzle

var customSkin: GUISkin;

//Dimensiones de la ventana del loot
private var ventana : Rect = Rect(Screen.width/4,Screen.height/4, Screen.width/2,(Screen.height/2));

private var cantidadSeleccionados: int = 0;




//Dimensiones de los botones
private var ancho : int = 128;
private var alto : int = 64;

//texturas
var texturaInterruptor : Texture2D;

private var puzzle: boolean[,] = new boolean[3,3];

//Constantes
private var SOLUCION: boolean[,] = new boolean[3,3];
private var NOMBRES = ["Susana", "Andrea", "Maria", "Andres","Felipe","Laura", "Estela","Ana", "Marina"];








// ================================================================================
// OnCreate
// ================================================================================

function Start(){
SOLUCION[0,0]= true;
SOLUCION[0,1]= false;
SOLUCION[0,2]=false;


SOLUCION[1,0]=false;
SOLUCION[1,1]=true;
SOLUCION[1,2]=false;


SOLUCION[2,0]=false;
SOLUCION[2,1]=true;
SOLUCION[2,2]=false;
 


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
GUI.Label(new Rect(ventana.width/2,10,ancho,alto), "Son mi esposa, un niño y una niña ¿Cuales son sus nombres?");
var contadorNombres: int = 0 ;
for(var i:int = 0 ; i <3 ; i++){

	for(var j:int = 0 ; j <3 ; j++){
	if(cantidadSeleccionados <3){
		puzzle[i,j] = GUI.Toggle (Rect ((i*ancho)+(ventana.width/3), (j*alto)+100, ancho, alto), puzzle[i,j], NOMBRES[contadorNombres]);
		
	}else if(puzzle[i,j]){
		puzzle[i,j] = GUI.Toggle (Rect ((i*ancho)+(ventana.width/3), (j*alto)+100, ancho, alto), puzzle[i,j], NOMBRES[contadorNombres]);
	
	}
	else{
		GUI.Box (Rect ((i*ancho)+(ventana.width/3), (j*alto)+100, ancho, alto),  NOMBRES[contadorNombres]);
	}
	
	contadorNombres++;
	}
}
if(GUI.changed){
print("Se hizo click en un boton");
print("La cantidad de seleccionados antes es: " + cantidadSeleccionados);
verificarCantidadSeleccionados();
print("La cantidad de seleccionados despues es: " + cantidadSeleccionados);

		}

if(GUI.Button(new Rect(ventana.width/3, (ventana.height * 3)/4, ancho, alto ), "Probar")){
		
		if(esSolucion()){
			GetComponent(Manager2).EventTrigger("SolucionCorrecta");
			puzzleActivo = false;
			GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
		}else{
			GetComponent(Manager2).EventTrigger("SolucionIncorrecta");
		}		
}

if(GUI.Button(new Rect((ventana.width/9)*5, (ventana.height * 3)/4, ancho, alto ), "Cancelar")){
		
		puzzleActivo = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();		
		}


}



// ================================================================================
// Metodos
// ================================================================================


function empezarPuzzle(){
GetComponent(MenuManager).setBotonesHabilitado(false);
GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
puzzleActivo = true;

}


function esSolucion() : boolean{

var esDiferente: boolean= false;
for(var i:int = 0 ; i <3 && !esDiferente; i++){

	for(var j:int = 0 ; j <3  && !esDiferente; j++){

		if(puzzle[i,j] != SOLUCION[i,j]){
		
		 esDiferente = true;
		 } 
	
	}
}


return !esDiferente;
}

function verificarCantidadSeleccionados(){


cantidadSeleccionados = 0;
for(var i:int = 0 ; i <3 ; i++){

	for(var j:int = 0 ; j <3 ; j++){

		if(puzzle[i,j]){
		cantidadSeleccionados++;
		}
	
	}
}

}