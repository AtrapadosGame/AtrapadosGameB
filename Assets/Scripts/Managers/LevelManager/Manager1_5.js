#pragma strict
//Ojo, para evitar problemas en el nivel 1.5:


// ================================================================================
// Variables
// ================================================================================
//Variables para los managers
private var managerDialogos: ManagerDialogos1_5;
private var playerManager : Player_Manager;
private var lootManager : LootManager1_5;
private var persitance : Persistance;
private var inventario : InventarioManager;


var cinematicas : Texture2D[] = new Texture2D[5];

// ================================================================================
// Texturas
// ================================================================================

var texturaCursorDario : Texture2D;
var texturaCursorCristina : Texture2D;
var texturaCursorFabio : Texture2D;
var texturaCursorDiana : Texture2D;
var texturaCursorMario : Texture2D;
var texturaCursorFrancisco : Texture2D;



var texturaCuadroDario : Texture2D;
var texturaCuadroCristina : Texture2D;
var texturaCuadroFabio : Texture2D;
var texturaCuadroDiana : Texture2D;
var texturaCuadroMario : Texture2D;
var texturaCuadroFrancisco : Texture2D;

var siguienteNivel : String;
function Awake () {
//Inicializacion de los managers y demas scripts
playerManager = GetComponent(Player_Manager);;
managerDialogos = GetComponent(ManagerDialogos1_5);
lootManager = GetComponent(LootManager1_5);
inventario = GetComponent(InventarioManager);
persitance = GameObject.Find("Persistance").GetComponent(Persistance);

playerManager.addPlayer(new Player(texturaCuadroFabio,Player_Manager.FABIO, "Fabio" , texturaCursorFabio));

}


// ================================================================================
// Trigger
// ================================================================================
//Implementación de la función Trigger()
function EventTrigger(objName : String){
	
}


// ================================================================================
// Switch
// ================================================================================
//Imlementación de la funcion Switch()
function EventSwitch(comando : String){

	if(comando.Equals("Diana")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5.CONVERSACION_DIANA);
	GameObject.Find("Diana").GetComponent(Interactor_Click).FlagOff();
	Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
	}
	
	if(comando.Equals("Dario")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5.CONVERSACION_DARIO);
	GameObject.Find("Dario").GetComponent(Interactor_Click).FlagOff();
	Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
	}
	
	if(comando.Equals("Cristina")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5.CONVERSACION_CRISTINA);
	GameObject.Find("Cristina").GetComponent(Interactor_Click).FlagOff();
	Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
	}
	
	if(comando.Equals("Mario")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5.CONVERSACION_MARIO);
	GameObject.Find("Mario").GetComponent(Interactor_Click).FlagOff();
	Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
	}
	
	if(comando.Equals("Francisco")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5.CONVERSACION_FRANCISCO);
	GameObject.Find("Francisco").GetComponent(Interactor_Click).FlagOff();
	Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
	}
	if(comando.Equals("Armario 1")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5.CONVERSACION_ARMARIO1);
	
	}
	if(comando.Equals("Armario 2")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5.CONVERSACION_ARMARIO2);
	
	}//TEST PARA REALIZAR EL CAMBIO DE LEVEL
	if(comando.Equals("CambioLevel")){
	persitance.finalizarNivel(inventario.getItemsActuales(), playerManager.getPlayers());
	Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
	    Application.LoadLevel (siguienteNivel);
	
	}
	
}


// ================================================================================
// EventDialog
// ================================================================================
//Se llama como resultado(al finalizar) de un dialogo, no todos los dialogos tiene resultado*
//Implementación de la función IEventDialog
function EventDialog(idResultado : int){

switch(idResultado){

case ManagerDialogos1_5.NEGACION:

break;
case ManagerDialogos1_5.ACEPTACION_DIANA:
playerManager.addPlayer(new Player(texturaCuadroDiana,Player_Manager.DIANA, "Diana" , texturaCursorDiana));
break;

case ManagerDialogos1_5.ACEPTACION_MARIO:
playerManager.addPlayer(new Player(texturaCuadroMario,Player_Manager.MARIO, "Mario" , texturaCursorMario));
break;

case ManagerDialogos1_5.ACEPTACION_FRANCISCO:
playerManager.addPlayer(new Player(texturaCuadroFrancisco,Player_Manager.FRANCISCO, "Francisco" , texturaCursorFrancisco));
break;

case ManagerDialogos1_5.DIALOGO_ARMARIO1:
lootManager.empezarLoot(LootManager1_5.LOOT_ARMARIO1);
break;

case ManagerDialogos1_5.DIALOGO_ARMARIO2:
lootManager.empezarLoot(LootManager1_5.LOOT_ARMARIO2);
break;


}


		
}




function DarCinematica(index : int){
	return cinematicas[index];
}