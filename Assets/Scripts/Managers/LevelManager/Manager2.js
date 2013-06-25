#pragma strict

private var currentPlayer : Player;

// ================================================================================
// Variables
// ================================================================================
private var managerDialogos: ManagerDialogos2;
private var playerManager : Player_Manager;
private var lootManager : LootManager2;
private var persistance : Persistance;
private var inventario : InventarioManager;
private var puzzle : Puzzle;
private var puzzleAlambre : PuzzleAlambre;
private var contadorPapel : int;
private var contadorFantasmas : int;
private var contadorExitos : int;

// ================================================================================
// Texturas
// ================================================================================
var cinematicas : Texture2D[] = new Texture2D[8];

var texturaCursorCristina : Texture2D;
var texturaCursorGabriela : Texture2D;
var texturaCuadroCristina : Texture2D;
var texturaCuadroGabriela : Texture2D;

var texturaPalanca : Texture2D;
var texturaAlambre : Texture2D;
var texturaAnilloOro : Texture2D;
var texturaAnilloPlata : Texture2D;
var texturaPapelHigienico : Texture2D;

// ================================================================================
// FLAGS
// ================================================================================
private var flagConserje : boolean = false;// Hablar con el conserje por primera vez
private var flagFCuerpo : boolean = false;// Hablar con el fantasma F1 (En la primera morgue)
private var flagFTrabado : boolean = false;// Hablar con el fantasma F2 (En el salón grande al lado de los baños)
private var flagEncontrarCuerpoF1 : boolean = false;// En contrar el cuerpo de F1
private var flagRescatarCuerpoF2 : boolean = false;// En contrar el cuerpo de F2
private var flagRescatarAnilloF3 : boolean = false;// Recuperar el anillo de F3
private var flagMatoNovia : boolean = false;//Matar a la novia de F5 en el baño
private var flagHabloF5 : boolean = false;// Hablar con el fantasma F5
private var flagPuedeCoger : boolean = true; // Controla el quest de conseguir papel higiénico
private var desinfectado : boolean = false;// Desinfectarse en una estación

private var cinematica1 : boolean = false;// Cinemática del fantasma F1
private var cinematica2 : boolean = false;// Cinemática del fantasma F2
private var cinematica3 : boolean = false;// Abrir el locker con una palanca
private var cinematica4 : boolean = false;// Cinemática del fantasma F3
private var cinematica5 : boolean = false;// Cinemática del fantasma F4
private var cinematica6 : boolean = false;// Cinemática del fantasma F5
private var cinematica7 : boolean = false;// Cinematica matando a la novia
private var cinematica8 : boolean = false;// Cinematica del fantasma F7

// ================================================================================
// Awake
// ================================================================================
function Awake () {


//Inicializacion de los managers y demas scripts
playerManager = GetComponent(Player_Manager);
managerDialogos = GetComponent(ManagerDialogos2);
lootManager = GetComponent(LootManager2);
inventario = GetComponent(InventarioManager);
persistance = GameObject.Find("Persistance").GetComponent(Persistance);

puzzle = GetComponent(Puzzle);
puzzleAlambre = GetComponent(PuzzleAlambre);
inventario.setItemsActuales(persistance.getInventario());
contadorPapel = 0;
contadorFantasmas = 0;
var tempPlayers: Player[] = persistance.getParty();
for(var i:int = 0 ; i <tempPlayers.Length ; i++){
	if(tempPlayers[i]){
		playerManager.addPlayer(new Player(tempPlayers[i].getTextura(),tempPlayers[i].getId(),tempPlayers[i].getNombre(),tempPlayers[i].getCursor()));
	}

}
currentPlayer = tempPlayers[0];
}

// ================================================================================
// OnGUI
// ================================================================================

function OnGUI(){
	if(cinematica1){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[0]);
	}
	if(cinematica2){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[1]);
	}
	if(cinematica3){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[2]);
	}
	if(cinematica4){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[3]);
	}
	if(cinematica5){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[4]);
	}
	if(cinematica6){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[5]);
	}
	if(cinematica7){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[6]);
	}
	if(cinematica8){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[7]);
	}
}

// ================================================================================
// Trigger
// ================================================================================
//Implementación de la función Trigger()
function EventTrigger(objName : String){
	currentPlayer = playerManager.getCurrentPlayer();
	if(objName.Equals("PuertaEntrada1")){
		var puertaA : GameObject = GameObject.Find("PuertaCorrediza1");
		//puertaA.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaA.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaA.GetComponent(TrasladarVertical).desactivar();
		//puertaA.GetComponent(Interactor_Click).FlagOn();
		puertaA.collider.enabled = true;
		puertaA.renderer.enabled = true;
		GameObject.Find("PuertaSTrigger1").GetComponent(Interactor_Trigger).encender();
	}
	if(objName.Equals("PuertaEntrada2")){
		var puertaB : GameObject = GameObject.Find("PuertaCorrediza2");
		//puertaA.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaA.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaA.GetComponent(TrasladarVertical).desactivar();
		//puertaA.GetComponent(Interactor_Click).FlagOn();
		puertaB.collider.enabled = true;
		puertaB.renderer.enabled = true;
		GameObject.Find("PuertaSTrigger2").GetComponent(Interactor_Trigger).encender();
	}
	if(objName.Equals("PuertaEntrada3")){
		var puertaC : GameObject = GameObject.Find("PuertaCorrediza3");
		//puertaA.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaA.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaA.GetComponent(TrasladarVertical).desactivar();
		//puertaA.GetComponent(Interactor_Click).FlagOn();
		puertaC.collider.enabled = true;
		puertaC.renderer.enabled = true;
		GameObject.Find("PuertaSTrigger3").GetComponent(Interactor_Trigger).encender();
	}
	if(objName.Equals("PuertaEntrada4")){
		var puertaD : GameObject = GameObject.Find("PuertaCorrediza4");
		//puertaA.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaA.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaA.GetComponent(TrasladarVertical).desactivar();
		//puertaA.GetComponent(Interactor_Click).FlagOn();
		puertaD.collider.enabled = true;
		puertaD.renderer.enabled = true;
		GameObject.Find("PuertaSTrigger4").GetComponent(Interactor_Trigger).encender();
	}
	if(objName.Equals("PuertaSalida1")){
		var puertaE : GameObject = GameObject.Find("PuertaCorrediza1");
		//puertaB.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaB.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaB.GetComponent(TrasladarVertical).desactivar();
		//puertaB.GetComponent(Interactor_Click).FlagOn();
		puertaE.collider.enabled = true;
		puertaE.renderer.enabled = true;
		GameObject.Find("PuertaETrigger1").GetComponent(Interactor_Trigger).encender();
		desinfectado = false;
	}
	if(objName.Equals("PuertaSalida2")){
		var puertaF : GameObject = GameObject.Find("PuertaCorrediza2");
		//puertaB.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaB.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaB.GetComponent(TrasladarVertical).desactivar();
		//puertaB.GetComponent(Interactor_Click).FlagOn();
		puertaF.collider.enabled = true;
		puertaF.renderer.enabled = true;
		GameObject.Find("PuertaETrigger2").GetComponent(Interactor_Trigger).encender();
		desinfectado = false;
	}
	if(objName.Equals("PuertaSalida3")){
		var puertaG : GameObject = GameObject.Find("PuertaCorrediza3");
		//puertaB.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaB.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaB.GetComponent(TrasladarVertical).desactivar();
		//puertaB.GetComponent(Interactor_Click).FlagOn();
		puertaG.collider.enabled = true;
		puertaG.renderer.enabled = true;
		GameObject.Find("PuertaETrigger3").GetComponent(Interactor_Trigger).encender();
		desinfectado = false;
	}
	if(objName.Equals("PuertaSalida4")){
		var puertaH : GameObject = GameObject.Find("PuertaCorrediza4");
		//puertaB.GetComponent(TrasladarVertical).setVelocidad(0.11);
		//puertaB.GetComponent(TrasladarVertical).activar();
		//yield WaitForSeconds(0.1);
		//puertaB.GetComponent(TrasladarVertical).desactivar();
		//puertaB.GetComponent(Interactor_Click).FlagOn();
		puertaH.collider.enabled = true;
		puertaH.renderer.enabled = true;
		GameObject.Find("PuertaETrigger4").GetComponent(Interactor_Trigger).encender();
		desinfectado = false;
	}
	if(objName.Equals("AnilloOro")){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F3AYUDAR);
			GameObject.Find("F3").renderer.enabled = false;
			GameObject.Find("F3").collider.enabled = false;
			contadorFantasmas++;
			contadorExitos++;
			inventario.addItem(new Item(texturaAnilloOro, inventario.ANILLO_ORO));
	}
	if(objName.Equals("AnilloPlata")){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F3PAILA);
			GameObject.Find("F3").renderer.enabled = false;
			GameObject.Find("F3").collider.enabled = false;
			inventario.addItem(new Item(texturaAnilloPlata, inventario.ANILLO_PLATA));
			contadorFantasmas++;
	}
	if(objName.Equals("SolucionCorrecta")){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F7AYUDAR);
			GameObject.Find("F7").renderer.enabled = false;
			GameObject.Find("F7").collider.enabled = false;
			contadorFantasmas++;
			contadorExitos++;
	}
	if(objName.Equals("SolucionIncorrecta")){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F7PAILA);
			contadorFantasmas++;
	}
}
// ================================================================================
// Switch
// ================================================================================
//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	currentPlayer = playerManager.getCurrentPlayer();
	//Hablar a gabriela apenas empieza el nivel
	if(comando.Equals("Gabriela")){
	
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_GABRIELA);
	}
	if(comando.Equals("Puzzle")){
		if(flagConserje){
			if(currentPlayer.getId() == Player_Manager.CRISTINA){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F7);
			}
			else{
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
				cinematica8 = true;
				yield WaitForSeconds(5);
				cinematica8 = false;
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SIN);
		}
	}
	//Hablar con el conserje
	if(comando.Equals("Conserje")){
		if(contadorFantasmas >= 6){
			if(contadorFantasmas == contadorExitos)
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_EXITO);
			else
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_FRACASO);
		}
		else if(flagConserje){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CODIGO);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CONSERJE);
		}
		
	}
	//Fantasma buscando su cuerpo en la morgue 1
	if(comando.Equals("F1")){
		if(!flagEncontrarCuerpoF1){
			if(currentPlayer.getId() == Player_Manager.CRISTINA){
				if(flagConserje)
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F1);
				else
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SIN);
			}
			else{
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
				cinematica1 = true;
				yield WaitForSeconds(5);
				cinematica1 = false;
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F1AYUDAR);
			GameObject.Find("F1").renderer.enabled = false;
			GameObject.Find("F1").collider.enabled = false;
			contadorFantasmas++;
			contadorExitos++;
		}	
	}
	
	//Fantasma en el salon de abajo con el cuerpo atrapado en la morgue 1
	if(comando.Equals("F2")){
		if(!flagRescatarCuerpoF2){
			if(currentPlayer.getId() == Player_Manager.CRISTINA){
				if(flagConserje)
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F2);
				else
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SIN);
			}
			else{
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
				cinematica2 = true;
				yield WaitForSeconds(5);
				cinematica2 = false;
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
			}
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F2AYUDAR);
			GameObject.Find("F2").renderer.enabled = false;
			GameObject.Find("F2").collider.enabled = false;
			contadorFantasmas++;
			contadorExitos++;
		}	
	}
	
	//Fantasma tapando una de las estaciones
	if(comando.Equals("F3")){
		if(flagConserje){
			if(inventario.enInventario(InventarioManager.ALAMBRE)){
				puzzleAlambre.empezarPuzzle();	
			}
			else{
				if(currentPlayer.getId() == Player_Manager.CRISTINA){
				
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F3);
				
				}
				else{
					currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
					cinematica4 = true;
					yield WaitForSeconds(5);
					cinematica4 = false;
					currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
				}
			}
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SIN);	
	}
	
	//Fantasma en el baño de mujeres
	if(comando.Equals("F4")){
		if(flagConserje){
			if(currentPlayer.getId() == Player_Manager.CRISTINA){
				if(inventario.enInventario(InventarioManager.ANILLO_ORO)){
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F4AYUDAR);
					GameObject.Find("F4").renderer.enabled = false;
					GameObject.Find("F4").collider.enabled = false;
					contadorFantasmas++;
					contadorExitos++;
				}
				else if(inventario.enInventario(InventarioManager.ANILLO_PLATA)){
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F4PAILA);
					GameObject.Find("F4").renderer.enabled = false;
					GameObject.Find("F4").collider.enabled = false;
					contadorFantasmas++;
				}
				else
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F4);
			}
			else{
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
				cinematica5 = true;
				yield WaitForSeconds(5);
				cinematica5 = false;
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
			}
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SIN);	
	}
	if(comando.Equals("F5")){
		if(flagConserje){
			if(flagMatoNovia){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F5AYUDAR);
				GameObject.Find("F5").renderer.enabled = false;
				GameObject.Find("F5").collider.enabled = false;
				contadorFantasmas++;
				contadorExitos++;
			}
			else{
				if(currentPlayer.getId() == Player_Manager.CRISTINA){
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_F5);
					flagHabloF5 = true;
				}
				else{
					currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
					cinematica6 = true;
					yield WaitForSeconds(5);
					cinematica6 = false;
					currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
				}
			}
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SIN);	
	}
	if(comando.Equals("Novia")){
		if(flagHabloF5){
			if(inventario.enInventario(InventarioManager.TOALLA)){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_MATARTOALLA);
			}
			else if(inventario.enInventario(InventarioManager.PAPEL_HIGIENICO)){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_MATARPAPEL);
			}
			else
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_NOPUEDEMATAR);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_NOVIA);
		}	
	}
	//Locker donde está el cuerpo del fantasma F1
	if(comando.Equals("LockerF1")){
		if(flagFCuerpo){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_LOCKERF1);
			flagEncontrarCuerpoF1 = true;
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
		}
	}
	//Locker trabado donde está el cuerpo del fantasma F2
	if(comando.Equals("LockerF2")){
		if(flagFTrabado){
			var pala : boolean =inventario.enInventario(InventarioManager.PALA);
			var palanca : boolean = inventario.enInventario(InventarioManager.PALANCA);
			if(pala || palanca){
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
				cinematica3 = true;
				yield WaitForSeconds(3);
				cinematica3 = false;
				currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
				flagRescatarCuerpoF2 = true;
			}
			else
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_LOCKERF2);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
		}
	}
	//Cualquier locker que no contenga algo importante
	if(comando.Equals("LockerVacio")){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_VACIO);
	}
	//Locker con la palanca
	if(comando.Equals("LockerPalanca")){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PALANCA);
		inventario.addItem(new Item(texturaPalanca, inventario.PALANCA));
	}
	// Lavabo con el alambre
	if(comando.Equals("Alambre")){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ALAMBRE);
		inventario.addItem(new Item(texturaAlambre, inventario.ALAMBRE));
	}
	//Baño con papel higiénico
	if(comando.Equals("Papel1")){
		if(flagHabloF5){
			CogerPapel();
			GameObject.Find("Taza1").GetComponent(Interactor_Click).FlagOff();
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TAZA);
	}
	if(comando.Equals("Papel2")){
		if(flagHabloF5){
			CogerPapel();
			GameObject.Find("Taza2").GetComponent(Interactor_Click).FlagOff();
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TAZA);
			
	}
	if(comando.Equals("Papel3")){
		if(flagHabloF5){
			CogerPapel();
			GameObject.Find("Taza3").GetComponent(Interactor_Click).FlagOff();
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TAZA);
	}
	if(comando.Equals("Papel4")){
		if(flagHabloF5){
			CogerPapel();
			GameObject.Find("Taza4").GetComponent(Interactor_Click).FlagOff();
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TAZA);
	}
	if(comando.Equals("SinPapel")){
		if(flagHabloF5)
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SINPAPEL);
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TAZA);
	}
	//Puertas corrediza para entrar a las morgues
	if(comando.Equals("Puerta1")){
		if(desinfectado){
			var puerta1 : GameObject = GameObject.Find("PuertaCorrediza1");
			//puerta.GetComponent(TrasladarVertical).setVelocidad(-0.1);
			//puerta.GetComponent(TrasladarVertical).activar();
			//yield WaitForSeconds(0.1);
			//puerta.GetComponent(TrasladarVertical).desactivar();
			//puerta.GetComponent(Interactor_Click).FlagOff();
			puerta1.collider.enabled = false;
			puerta1.renderer.enabled = false;
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESINFECTAR);	
	}
	if(comando.Equals("Puerta2")){
		if(desinfectado){
			var puerta2 : GameObject = GameObject.Find("PuertaCorrediza2");
			//puerta.GetComponent(TrasladarVertical).setVelocidad(-0.1);
			//puerta.GetComponent(TrasladarVertical).activar();
			//yield WaitForSeconds(0.1);
			//puerta.GetComponent(TrasladarVertical).desactivar();
			//puerta.GetComponent(Interactor_Click).FlagOff();
			puerta2.collider.enabled = false;
			puerta2.renderer.enabled = false;
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESINFECTAR);	
	}
	if(comando.Equals("Puerta3")){
		if(desinfectado){
			var puerta3 : GameObject = GameObject.Find("PuertaCorrediza3");
			//puerta.GetComponent(TrasladarVertical).setVelocidad(-0.1);
			//puerta.GetComponent(TrasladarVertical).activar();
			//yield WaitForSeconds(0.1);
			//puerta.GetComponent(TrasladarVertical).desactivar();
			//puerta.GetComponent(Interactor_Click).FlagOff();
			puerta3.collider.enabled = false;
			puerta3.renderer.enabled = false;
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESINFECTAR);	
	}
	if(comando.Equals("Puerta4")){
		if(desinfectado){
			var puerta4 : GameObject = GameObject.Find("PuertaCorrediza4");
			//puerta.GetComponent(TrasladarVertical).setVelocidad(-0.1);
			//puerta.GetComponent(TrasladarVertical).activar();
			//yield WaitForSeconds(0.1);
			//puerta.GetComponent(TrasladarVertical).desactivar();
			//puerta.GetComponent(Interactor_Click).FlagOff();
			puerta4.collider.enabled = false;
			puerta4.renderer.enabled = false;
		}
		else
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_DESINFECTAR);	
	}
	if(comando.Equals("Estacion")){
		print("presiono la estacion");
		desinfectado = true;
	}	
}
// ================================================================================
// Switch
// ================================================================================
//Se llama como resultado(al finalizar) de un dialogo, no todos los dialogos tiene resultado*
//Implementación de la función IEventDialog
function EventDialog(idResultado : int){

switch(idResultado){

case ManagerDialogos2.GABRIELA:
	playerManager.addPlayer(new Player(texturaCuadroGabriela,Player_Manager.GABRIELA, "Gabriela" , texturaCursorGabriela));
	var pl : GameObject = GameObject.Find("Gabriela");
	pl.AddComponent(MoverClick);
	pl.GetComponent(Interactor_Click).FlagOff();
	pl.renderer.enabled = false;
	pl.collider.enabled = false;
break;

case ManagerDialogos2.CONSERJE:
	flagConserje = true;
break;

case ManagerDialogos2.FANTASMA1:
	flagFCuerpo = true;
break;

case ManagerDialogos2.FANTASMA2:
	flagFTrabado = true;
break;

case ManagerDialogos2.MATAR_NOVIA:
	currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
	cinematica7 = true;
	yield WaitForSeconds(3);
	cinematica7 = false;
	currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
	flagMatoNovia = true;
break;

case ManagerDialogos2.F7_PUZZLE:
	puzzle.empezarPuzzle();
break;
}


		
}

// =================================================================================
// Funciones auxiliares
// =================================================================================

// Retorna una cinemática en específico
function DarCinematica(index : int){
	return cinematicas[index];
}

// Función para controlar el quest de conseguir papel higiénico
private function CogerPapel(){
	if(contadorPapel >= 3 && flagPuedeCoger){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TERMINARPAPEL);
		inventario.addItem(new Item(texturaPalanca, inventario.PAPEL_HIGIENICO));
		flagPuedeCoger = false;
	}
	else if(flagPuedeCoger){
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PAPEL);
		contadorPapel++;
	}
}