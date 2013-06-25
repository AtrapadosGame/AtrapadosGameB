#pragma strict
var vel : float;
private var mover : boolean = false;

function Update () {
	if(mover)
		transform.position.z += vel;
}

function activar(){
	mover = true;
}

function desactivar(){
	mover = false;
}

function setVelocidad(velocidad : float){
	vel = velocidad;
}