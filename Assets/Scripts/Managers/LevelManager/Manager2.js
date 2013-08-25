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
var cinematicas : Texture2D[] = new Texture2D[7];

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



var texturaBalde: Texture2D;
var texturaBaldeLleno: Texture2D;
var texturaCruceta: Texture2D;

var siguienteNivel : String;
// ================================================================================
// Flags
// ================================================================================

private var flagDespertarAmigo: boolean = false;
private var flagHablarCelador: boolean = false;
private var flagHablarFila: boolean = false;
private var flagGrupoConvencido: boolean = false;
private var flagDineroCompleto: boolean = false;
private var flagGenteCompleta: boolean = false;
private var flagFinalDinero: boolean = false;
private var contadorDinero : int  = 0;
private var contadorConvencidos: int = 0;


private var cinematicaBalde: boolean = false;
private var cinematicaPala: boolean = false;
private var cinematicaPicklock: boolean = false;
private var cinematicaBilletera: boolean = false;
private var cinematicaCurar: boolean = false;
private var cinematicaEscapar: boolean = false;
private var cinematicaPuertas: boolean = false;
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

function Update(){
	if(contadorDinero == 6){
		flagDineroCompleto = true;
		contadorDinero = 0;
	}
	
	if(contadorConvencidos >= 2){
		flagGenteCompleta = true;
	}
}

//=================================================================================
// OnGUI
//=================================================================================

function OnGUI(){
	if(cinematicaBalde){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[0]);
	}
	if(cinematicaPala){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[1]);
	}
	if(cinematicaPicklock){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[2]);
	}
	if(cinematicaBilletera){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[3]);
	}
	if(cinematicaCurar){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[4]);
	}
	if(cinematicaEscapar){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[5]);
	}
	if(cinematicaPuertas){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[6]);
	}
}
// ================================================================================
// Triggers
// ================================================================================
//Implementación de la función Trigger()
function EventTrigger(comando : String){
	currentPlayer = playerManager.getCurrentPlayer();
	if(comando.Equals("HabitacionOscura")){
		if(currentPlayer.getId() == Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_HABITACION_NEGACION_MARIO);
			GameObject.Find("HabitacionTrigger").GetComponent(Interactor_Trigger).Reactivar();
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_HABITACION_NEGACION);
			GameObject.Find("HabitacionTrigger").GetComponent(Interactor_Trigger).Reactivar();
		}
	}
	if(comando.Equals("SolucionCorrecta")){
		Destroy(GameObject.Find("HabitacionOscura"));
		Destroy(GameObject.Find("HabitacionTigger"));
		GameObject.Find("Fusibles").GetComponent(Interactor_Click).FlagOff();
	}
	if(comando.Equals("SolucionIncorrecta")){
		managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_FUSIBLES_INCORRECTO);
	}
}
// ================================================================================
// Switch
// ================================================================================
//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	currentPlayer = playerManager.getCurrentPlayer();
	
	if(comando.Equals("Celador")){
		if(!flagHablarCelador){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CELADOR);
			flagHablarCelador = true;
		}
		else if(flagGenteCompleta && !flagDineroCompleto){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_FINAL_REVUELTA);
		}
		else if(!flagDineroCompleto){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_FAMILIA);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DINERO_COMPLETO);
			flagDineroCompleto = false;
			flagFinalDinero = true;
		}
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("Cartera")){
		if(flagHablarCelador){
			if(currentPlayer.getId() == Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_NEGACION_CARTERA_MARIO);
			}
			else if(currentPlayer.getId() == Player_Manager.FRANCISCO){
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
					cinematicaPicklock = true;
					yield WaitForSeconds(3);
					cinematicaPicklock = false;
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
					managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_EXITO_CARTERA_FRANCISCO);
					contadorDinero++;
					GameObject.Find("CarroCartera").GetComponent(Interactor_Click).FlagOff();
			}
			else if(inventario.enInventario(InventarioManager.PALA)){
	
				if(currentPlayer.getId() == Player_Manager.FABIO){
					inventario.usarItem(InventarioManager.PALA);
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
					cinematicaPala = true;
					yield WaitForSeconds(3);
					cinematicaPala = false;
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
					managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_EXITO_CARTERA_FABIO);
					contadorDinero++;
					GameObject.Find("CarroCartera").GetComponent(Interactor_Click).FlagOff();
					
				}else{
					managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_NEGACION_CARTERA_FABIO);
				}
	
		
			}else if(playerManager.estaPersonaje(Player_Manager.FRANCISCO)){
	
			
				managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_NEGACION_CARTERA_FRANCISCO);
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_NEGACION_CARTERA);
		}
	}
	///////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("Grupo")){
		if(flagHablarCelador && !flagDespertarAmigo){
			if(currentPlayer.getId() == Player_Manager.FABIO){
	
				if(inventario.enInventario(InventarioManager.LLAVE)|| inventario.enInventario(InventarioManager.EXTINTOR)){
		
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_EXITO_FABIO);
				}else{
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_EXITO_FABIO2);
				}
	
			}else if (currentPlayer.getId() == Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_EXITO_MARIO);
			}
		}
		else if(flagDespertarAmigo){
			if(!flagGrupoConvencido)
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_NECESITA_ARMAS);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_NEGACION);
		}
	}
	
	//////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("Fusibles")){
		if(currentPlayer.getId() ==Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_MARIO_FUSIBLES);
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_FUSIBLES);
		}
		
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	
	if(comando.Equals("Caja")){
		
		managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_CAJA);
		contadorDinero++;
		
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	
	if(comando.Equals("Herido1")){
		if(flagHablarCelador){
			if(currentPlayer.getId() ==Player_Manager.DIANA){
				if(inventario.enInventario(InventarioManager.BOTIQUIN)){
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
					cinematicaCurar = true;
					yield WaitForSeconds(3);
					cinematicaCurar = false;
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CURAR_PERSONA_EXITO);
					contadorDinero++;
					GameObject.Find("Herido1").GetComponent(Interactor_Click).FlagOff();
				}
				else{
						managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CURAR_PERSONA_NEGACION);
				}
			}else if (currentPlayer.getId() ==Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO);
			}else if(currentPlayer.getId() ==Player_Manager.FRANCISCO){
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
				cinematicaBilletera = true;
				yield WaitForSeconds(3);
				cinematicaBilletera = false;
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_EXITO);
				contadorDinero++;
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO);
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	
	if(comando.Equals("Herido2")){
		if(flagHablarCelador){
			if(currentPlayer.getId() ==Player_Manager.DIANA){
				if(inventario.enInventario(InventarioManager.BOTIQUIN)){
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
					cinematicaCurar = true;
					yield WaitForSeconds(3);
					cinematicaCurar = false;
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CURAR_PERSONA_EXITO);
					contadorDinero++;
					GameObject.Find("Herido2").GetComponent(Interactor_Click).FlagOff();
				}
				else{
						managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CURAR_PERSONA_NEGACION);
				}
			}else if (currentPlayer.getId() ==Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO);
			}else if(currentPlayer.getId() ==Player_Manager.FRANCISCO){
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
				cinematicaBilletera = true;
				yield WaitForSeconds(3);
				cinematicaBilletera = false;
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_EXITO);
				contadorDinero++;
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO);
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	
	if(comando.Equals("Herido3")){
		if(flagHablarCelador){
			if(currentPlayer.getId() ==Player_Manager.DIANA){
				if(inventario.enInventario(InventarioManager.BOTIQUIN)){
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
					cinematicaCurar = true;
					yield WaitForSeconds(3);
					cinematicaCurar = false;
					GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CURAR_PERSONA_EXITO);
					contadorDinero++;
					GameObject.Find("Herido3").GetComponent(Interactor_Click).FlagOff();
				}
				else{
						managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CURAR_PERSONA_NEGACION);
				}
			}else if (currentPlayer.getId() ==Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO);
			}else if(currentPlayer.getId() ==Player_Manager.FRANCISCO){
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
				cinematicaBilletera = true;
				yield WaitForSeconds(3);
				cinematicaBilletera = false;
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_EXITO);
				contadorDinero++;
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ROBAR_PERSONA_NEGACION_MARIO);
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	if(comando.Equals("Fila")){
	
		if(flagFinalDinero){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_FINAL_DINERO);
		}
		else{
			if(flagDespertarAmigo){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_FILA_EXITO);
				contadorConvencidos++;
			}
			else{
				if(flagHablarCelador){
					if(currentPlayer.getId() ==Player_Manager.MARIO){
						managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_FILA_NEGACION_MARIO);
						flagHablarFila = true;
					}else{
						managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONVENCER_FILA_NEGACION);
						flagHablarFila = true;
					}
				}
				else{
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_FILA);
				}
			}
		}
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("Dormido")){
		if(flagHablarFila){
			if(flagDespertarAmigo){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_EXITO);
				GameObject.Find("Pedro").GetComponent(Interactor_Click).FlagOff();
			}
			else if(inventario.enInventario(InventarioManager.BALDE_LLENO)){
				inventario.usarItem(InventarioManager.BALDE_LLENO);
				inventario.addItem(new Item(texturaBalde,InventarioManager.BALDE,"Balde"));
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
				cinematicaBalde = true;
				yield WaitForSeconds(3);
				cinematicaBalde = false;
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_BALDE_EXITO);
				flagDespertarAmigo = true;
			}
			else if(currentPlayer.getId() ==Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_NEGACION_MARIO);
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_NEGACION);
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("Balde")){
	
		if(currentPlayer.getId() ==Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_BALDE_MARIO);
		
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_BALDE);
			inventario.addItem(new Item(texturaBalde,InventarioManager.BALDE,"Balde"));
		
		}
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("Grifo")){
		
		if(inventario.enInventario(InventarioManager.BALDE)){
			inventario.usarItem(InventarioManager.BALDE);
			inventario.addItem(new Item(texturaBaldeLleno,InventarioManager.BALDE_LLENO,"BaldeLleno"));
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_BALDE_GRIFO_EXITO);
		}
		else if(currentPlayer.getId() ==Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_BALDE_GRIFO_NEGACION_MARIO);
		}
		else{
		
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_BALDE_GRIFO_NEGACION);
		} 
		
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("AlarmaCarro")){
	
		if(flagHablarCelador){
	 		if(currentPlayer.getId() ==Player_Manager.FRANCISCO){
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
				cinematicaPicklock = true;
				yield WaitForSeconds(3);
				cinematicaPicklock = false;
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_EXITO_CARRO);
				flagDespertarAmigo = true;
	 		}else if(currentPlayer.getId() ==Player_Manager.MARIO){
	 			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_NEGACION_CARRO_MARIO);
	 		}
	 	}else{
	 		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESPERTAR_NEGACION_CARRO);
	 	}
	
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("CrucetaCarro")){
		if(flagHablarCelador){
			if(currentPlayer.getId() ==Player_Manager.FRANCISCO){
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
				cinematicaPicklock = true;
				yield WaitForSeconds(3);
				cinematicaPicklock = false;
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
				managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_CRUCETA_CARRO_EXITO_FRANCISCO);	
				inventario.addItem(new Item(texturaCruceta,InventarioManager.CRUCETA,"Cruceta"));
				contadorConvencidos++;
			}
			else if(currentPlayer.getId() ==Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_CRUCETA_CARRO_NEGACION_MARIO);	
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_CRUCETA_CARRO_NEGACION);
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	if(comando.Equals("CrucetaCarroAbierto")){
		inventario.addItem(new Item(texturaCruceta,InventarioManager.CRUCETA,"Cruceta"));
		managerDialogos.empezarDialogos(ManagerDialogos2.MONOLOGO_CRUCETA_CARRO_EXITO);
		contadorConvencidos++;
		
	}	
}

// ================================================================================
// Dialogos
// ================================================================================
//Se llama como resultado(al finalizar) de un dialogo, no todos los dialogos tiene resultado*
//Implementación de la función IEventDialog
function EventDialog(idResultado : int){
	
	switch(idResultado){

	case ManagerDialogos2.RESULTADO_FUSIBLES:

		puzzle.empezarPuzzle();
	break;

	case ManagerDialogos2.RESULTADO_CONVENCER_REVUELTA:
		contadorConvencidos++;
		flagGrupoConvencido = true;	
	break;
	
	case ManagerDialogos2.RESULTADO_AMENAZAR:
		contadorDinero++;
		GameObject.Find("PersonaPeleando1").GetComponent(Interactor_Click).FlagOff();
		GameObject.Find("PersonaPeleando2").GetComponent(Interactor_Click).FlagOff();
		GameObject.Find("PersonaPeleando3").GetComponent(Interactor_Click).FlagOff();
	break;
	
	case ManagerDialogos2.RESULTADO_NADA:
		GameObject.Find("PersonaPeleando1").GetComponent(Interactor_Click).FlagOn();
		GameObject.Find("PersonaPeleando2").GetComponent(Interactor_Click).FlagOn();
		GameObject.Find("PersonaPeleando3").GetComponent(Interactor_Click).FlagOn();
	break;
	
	case ManagerDialogos2.RESULTADO_REVUELTA:
		Application.LoadLevel(siguienteNivel);
	break;
	}
}

function DarCinematica(index : int){
	return cinematicas[index];
}