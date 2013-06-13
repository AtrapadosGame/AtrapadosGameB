#pragma strict
//Ojo, para evitar problemas en el nivel 1.5:


//Variables para los managers
private var managerDialogos: ManagerDialogos1_5;
private var playerManager : Player_Manager;
private var lootManager : LootManager1_5;
private var persistance : Persistance;
private var inventario : InventarioManager;

private var puzzle : Puzzle;
//Texturas
var cinematicas : Texture2D[] = new Texture2D[5];

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




function Awake () {

GameObject.Find("Diana").renderer.enabled = false;
	GameObject.Find("Diana").collider.enabled = false;
GameObject.Find("Diana").renderer.enabled = false;
	GameObject.Find("Mario").collider.enabled = false;
	GameObject.Find("Mario").renderer.enabled = false;
	GameObject.Find("Francisco").collider.enabled = false;
	GameObject.Find("Francisco").renderer.enabled = false;

//Inicializacion de los managers y demas scripts
playerManager = GetComponent(Player_Manager);
managerDialogos = GetComponent(ManagerDialogos1_5);
lootManager = GetComponent(LootManager1_5);
inventario = GetComponent(InventarioManager);
persistance = GameObject.Find("Persistance").GetComponent(Persistance);
puzzle = GetComponent(Puzzle);

inventario.setItemsActuales(persistance.getInventario());

var tempPlayers: Player[] = persistance.getParty();

for(var i:int = 0 ; i <tempPlayers.Length ; i++){
	if(tempPlayers[i]){
		playerManager.addPlayer(new Player(tempPlayers[i].getTextura(),tempPlayers[i].getId(),tempPlayers[i].getNombre(),tempPlayers[i].getCursor()));
	}

}

}



//Implementación de la función Trigger()
function EventTrigger(objName : String){
	
}

//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	
	
	if(comando.Equals("puzzle")){
	
	puzzle.empezarPuzzle();
	}
	
}
//Se llama como resultado(al finalizar) de un dialogo, no todos los dialogos tiene resultado*
//Implementación de la función IEventDialog
function EventDialog(idResultado : int){



}


		





function DarCinematica(index : int){
	return cinematicas[index];
}