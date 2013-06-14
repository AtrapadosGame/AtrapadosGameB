#pragma strict



// ================================================================================
// TESTING ENVIRONMENT
// ================================================================================
var texturaCursorFabio: Texture2D;
var texturaCursorDiana: Texture2D;
var texturaCursorMario: Texture2D;
var texturaCursorFrancisco: Texture2D;


var texturaCuadroFabio : Texture2D;
var texturaCuadroDiana : Texture2D;
var texturaCuadroMario : Texture2D;
var texturaCuadroFrancisco : Texture2D;

var texturaPala : Texture2D;
var texturaBotiquin: Texture2D;
var texturaToalla: Texture2D;
var texturaExtintor: Texture2D;

function inicializarTest(){

inventario = new Item[4];
party = new Player[4];
//Se inicializa el nivel con diana y dario
party[0] = new Player(texturaCuadroFabio, Player_Manager.FABIO,"Fabio", texturaCursorFabio );
party[1] = new Player(texturaCuadroDiana, Player_Manager.DIANA,"Diana", texturaCursorDiana );
party[2] = new Player(texturaCuadroMario, Player_Manager.MARIO,"Mario", texturaCursorMario );
party[3] = new Player(texturaCuadroFrancisco, Player_Manager.FRANCISCO,"Francisco", texturaCursorFrancisco );


inventario[0]  = new Item(texturaPala,InventarioManager.PALA,"Pala");
inventario[1]  = new Item(texturaBotiquin,InventarioManager.BOTIQUIN,"Botiquin");
inventario[2]  = new Item(texturaExtintor,InventarioManager.EXTINTOR,"Extintor");
inventario[3] = new Item(texturaToalla,InventarioManager.TOALLA,"Toalla");


}
// ================================================================================
// Variables
// ================================================================================

private var inventario: Item[];  
private var party: Player[];

// ================================================================================
// Awake
// ================================================================================

function Awake () {
DontDestroyOnLoad (transform.gameObject);

//testing purpose
inicializarTest();
}

// ================================================================================
// Metodos
// ================================================================================

function finalizarNivel(items : Item[], players: Player[]){
inventario = items;
party =players;

}

// ================================================================================
// Getters y Setters
// ================================================================================


function getInventario(){
return inventario;

}

function getParty(){
return party;
}


