#pragma strict



// ================================================================================
// TESTING ENVIRONMENT
// ================================================================================
var texturaCursorFabio: Texture2D;
var texturaCursorDiana: Texture2D;
var texturaCuadroFabio : Texture2D;
var texturaCuadroDiana : Texture2D;

var texturaPala : Texture2D;
var texturaBotiquin: Texture2D;
var texturaToalla: Texture2D;

function inicializarTest(){

inventario = new Item[4];
party = new Player[4];
//Se inicializa el nivel con diana y dario
party[0] = new Player(texturaCuadroFabio, Player_Manager.FABIO,"Fabio", texturaCursorFabio );
party[1] = new Player(texturaCuadroDiana, Player_Manager.DIANA,"Diana", texturaCursorDiana );


inventario[0]  = new Item(texturaPala,0,"Pala");
inventario[1]  = new Item(texturaBotiquin,1,"Botiquin");
inventario[2] = new Item(texturaToalla,2,"Toalla");


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


