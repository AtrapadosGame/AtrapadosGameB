#pragma strict
//Ojo, para evitar problemas en el nivel 1.5:


//Variables para los managers
// ================================================================================
// Managers
// ================================================================================
private var managerDialogos: ManagerDialogos2;
private var playerManager : Player_Manager;
private var lootManager : LootManager1_5;
private var persistance : Persistance;
private var inventario : InventarioManager;
private var currentPlayer : Player;
private var puzzle : Puzzle;

// ================================================================================
// Texturas
// ================================================================================
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

// ================================================================================
// Flags
// ================================================================================


private var contadorDinero : int  = 0;

// ================================================================================
// Awake
// ================================================================================
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
managerDialogos = GetComponent(ManagerDialogos2);
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


// ================================================================================
// Triggers
// ================================================================================
//Implementación de la función Trigger()
function EventTrigger(objName : String){
	if(comando.Equals("HabitacionOscura")){
		if(currentPlayer.getId() == Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_HABITACION_NEGACION_MARIO);
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_HABITACION_NEGACION);
		}
	}
	
}
// ================================================================================
// Switch
// ================================================================================
//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	currentPlayer = playerManager.getCurrentPlayer();
	
	if(comando.Equals("Cartera")){
	
	if(inventario.enInventario(InventarioManager.PALA)){
	
		if(currentPlayer.getId() == Player_Manager.FABIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_EXITO_CARTERA_FABIO);
			contadorDinero++;
			
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_NEGACION_CARTERA_FABIO);
		}
	
		
	}else if(playerManager.estaPersonaje(Player_Manager.FRANCISCO)){
	
		if(currentPlayer.getId() == Player_Manager.FRANCISCO){
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_EXITO_CARTERA_FRANCISCO);
			contadorDinero++;
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_NEGACION_CARTERA_FRANCISCO);
		}
	
	}else{
	
		managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_NEGACION_CARTERA);
	}
	
	
	}
	///////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("Grupo")){
	
		if(currentPlayer.getId() == Player_Manager.FABIO){
	
			if(inventario.enInventario(InventarioManager.LLAVE)|| inventario.enInventario(InventarioManager.EXTINTOR)){
		
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_EXITO_FABIO);
			}else{
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_EXITO_FABIO2);
				contadorDinero++;
			}
	
		}else if (currentPlayer.getId() == Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_EXITO_MARIO);
		
		}else{
			managerDialogos.empezarDialogos(CONVERSACION_CONVENCER_NEGACION);
		
		}
	
	
	}
	
	//////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("Fusibles")){
		if(currentPlayer.getId() ==Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_MARIO_FUSIBLES);
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_FUSIBLES);
		}
		puzzle.empezarPuzzle();
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	
	if(comando.Equals("Caja")){
		
		managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_CAJA);
		contadorDinero++;
		
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	
	if(comando.Equals("Herido")){
		
		if(currentPlayer.getId() ==Player_Manager.DIANA){
			
			
			if(inventario.enInventario(InventarioManager.BOTIQUIN)){
				manejadorDialogos.empezarDialogo(CONVERSACION_CURAR_PERSONA_EXITO);
				contadorDinero++;
					
			}
			else{
					manejadorDialogos.empezarDialogo(CONVERSACION_CURAR_PERSONA_NEGACION);
			}
		}else if (currentPlayer.getId() ==Player_Manager.MARIO){
			manejadorDialogos.empezarDialogo(CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO);
		}else if(currentPlayer.getId() ==Player_Manager.FRANCISCO){
		
			manejadorDialogos.empezarDialogo(CONVERSACION_ROBAR_PERSONA_EXITO);
		}
	}
}

// ================================================================================
// Dialogos
// ================================================================================
//Se llama como resultado(al finalizar) de un dialogo, no todos los dialogos tiene resultado*
//Implementación de la función IEventDialog
function EventDialog(idResultado : int){



}


		





function DarCinematica(index : int){
	return cinematicas[index];
}