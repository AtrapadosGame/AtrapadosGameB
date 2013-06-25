#pragma strict


// ================================================================================
// Variables
// ================================================================================

private var itemsActuales : Item[] = new Item[4];
private var ancho : int;
private var alto : int;
var customSkin: GUISkin;
var texturaVacia : Texture2D;
private var lastTooltip : String =  "";
private var ventana : Rect = Rect(Screen.width/4,Screen.height/4, Screen.width/2,(Screen.height/2));
private var eliminarActivo : boolean = false;
private var itemEliminar : int = -1;

public static final var PALA : int = 0;
public static final var EXTINTOR : int = 1;
public static final var TOALLA : int = 2;
public static final var BOTIQUIN : int = 3;
public static final var LLAVE_INGLESA : int = 4;
public static final var CUERDA : int = 5;
public static final var TIJERAS : int = 6;
public static final var LLAVE  :int= 7;
public static final var PALANCA  :int= 8;
public static final var ALAMBRE  :int= 9;
public static final var ANILLO_ORO  :int= 10;
public static final var ANILLO_PLATA  :int= 11;
public static final var PAPEL_HIGIENICO  :int= 12;


// ================================================================================
// Start
// ================================================================================


function Start () {
	ancho = (Screen.width/8) - 50;
	alto = Screen.height/8;


}

// ================================================================================
// OnGUI
// ================================================================================
 
function OnGUI () {


GUI.skin = customSkin;
var pausa : boolean = GetComponent(MenuManager).estaPausado();
var botonesHabilitados : boolean = GetComponent(MenuManager).estaBotonesHabilitado();

if(!pausa&&botonesHabilitados){
for(var i:int = 0 ; i <4 ; i++){
	if (itemsActuales[i]){
		if(GUI.Button(new Rect(i*ancho,Screen.height - alto,ancho,alto), GUIContent(itemsActuales[i].getTextura(), "Button"))){
			eliminarActivo = true;
			itemEliminar = itemsActuales[i].getId();
		}
	}
	else{
		GUI.Box(new Rect(i*ancho,Screen.height - alto,ancho,alto), GUIContent(texturaVacia, "Button"));
	}
}
	
	if(eliminarActivo){
		ventana = GUI.Window(0,ventana , WindowFunction,"");
	}

	if (Event.current.type == EventType.Repaint && GUI.tooltip != lastTooltip) 
{
            if (lastTooltip != "")
                SendMessage (lastTooltip + "OnMouseOut", SendMessageOptions.DontRequireReceiver);
            if (GUI.tooltip != "")
                SendMessage (GUI.tooltip + "OnMouseOver", SendMessageOptions.DontRequireReceiver);
            lastTooltip = GUI.tooltip;
}

	}	
}


function WindowFunction (windowID : int) {
GUI.Label(new Rect(ventana.width/2,10,ancho,alto), "¿Eliminar este item?");
	if(GUI.Button(new Rect(ventana.width/3,alto+100,ancho,alto),GUIContent("Eliminar", "Button"))){
		usarItem(itemEliminar);
		itemEliminar = -1;
		eliminarActivo = false;	
	}
	if(GUI.Button(new Rect(2*ventana.width/3,alto+100,ancho,alto),GUIContent("Cancelar", "Button"))){
		eliminarActivo = false;	
	}
	
	if (Event.current.type == EventType.Repaint && GUI.tooltip != lastTooltip) 
	{
            if (lastTooltip != "")
                SendMessage (lastTooltip + "OnMouseOut", SendMessageOptions.DontRequireReceiver);
            if (GUI.tooltip != "")
                SendMessage (GUI.tooltip + "OnMouseOver", SendMessageOptions.DontRequireReceiver);
            lastTooltip = GUI.tooltip;
	}
}

// ================================================================================
// Metodos
// ================================================================================
function enInventario(idItem : int): boolean{

for(var i:int = 0 ; i <4 ; i++){
	if (itemsActuales[i])
		
	if (itemsActuales[i].getId() == idItem){
		usarItem(idItem);
		return  true;

	}

}
return false;
}

function addItem(item:Item):boolean{

for(var i:int = 0 ; i <4 ; i++){

if(!itemsActuales[i]){
	itemsActuales[i] =item;
	return true;
}
}

}

function usarItem(id:int ){

var tempItems: Item[] = new Item[4];
var encontro: boolean = false;
for(var i:int = 0 ; i <4 ; i++){


	if(itemsActuales[i]){
	
		
		if(encontro){
		
		
			tempItems[i-1] = itemsActuales[i];
			
			
		}	
		
		if (itemsActuales[i].getId() == id && !encontro){

			encontro = true;
		}else if(!encontro){
		tempItems[i] = itemsActuales[i];
		}
		
		
	
	}
}

itemsActuales = tempItems;

}
// ================================================================================
// Getters y Setters
// ================================================================================

function getItemsActuales(): Item[]{


return itemsActuales;
}
function setItemsActuales(items: Item[]){


itemsActuales = items;
}
