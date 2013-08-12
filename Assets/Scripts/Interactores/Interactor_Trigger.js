#pragma strict
var actObject : String;
var manager : GameObject;
var encendido : boolean = true;
var reactivar : boolean = false;

function OnTriggerEnter (other : Collider) {
	if(encendido){
		manager.GetComponent(IEvent_manager).Trigger(actObject);
		apagar();
	}
}

function OnTriggerExit (other : Collider) {
	if(reactivar){
		encendido = true;
	}
}

function apagar(){
encendido = false;
}

function encender(){
encendido = true;
}

function Reactivar(){
reactivar = true;
}

