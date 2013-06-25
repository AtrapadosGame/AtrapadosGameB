#pragma strict
var posicionesX : float[] = new float[5];
var posicionesY : float[] = new float[5];
var posicionesZ : float[] = new float[5];
var speed : float;

private var escenaActiva : boolean = true;
private var movimientoActivo : boolean = false;
private var timer : float;
private var indice : int;

function Start () {
	timer = 1;
	indice = 0;
}

function Update () {
	
	if(escenaActiva){
		if(movimientoActivo){
			var targetPosition : Vector3 = new Vector3(posicionesX[indice],posicionesY[indice],posicionesZ[indice]);
			transform.position = Vector3.MoveTowards(transform.position, targetPosition, Time.deltaTime * speed);
		
			if(transform.position.Equals(targetPosition))
				movimientoActivo = false;
		}
		else{
			print("Timer: " + timer);
			timer-= Time.deltaTime;
			if(timer <= 0){
				movimientoActivo = true;
				timer = 1;
				indice++;
				if(indice >= posicionesX.Length)
					escenaActiva = false;
			}
		}
	}
	else{
		Application.LoadLevel("Nivel1");
	}
}