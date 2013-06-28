#pragma strict
var posicionesX : float[] = new float[20];
var posicionesY : float[] = new float[20];
var posicionesZ : float[] = new float[20];
var speed : float[] = new float[20];

private var escenaActiva : boolean = true;
private var movimientoActivo : boolean = true;
var timer : float[] = new float[20];
private var indice : int;

function Start () {
	
	indice = 0;
}

function Update () {
	
	if(escenaActiva){
		if(movimientoActivo){
			var targetPosition : Vector3 = new Vector3(posicionesX[indice],posicionesY[indice],posicionesZ[indice]);
			transform.position = Vector3.MoveTowards(transform.position, targetPosition, Time.deltaTime * speed[indice]);
		
			if(transform.position.Equals(targetPosition))
				movimientoActivo = false;
		}
		else{
			print("Timer: " + timer[indice]);
			timer[indice]-= Time.deltaTime;
			if(timer[indice] <= 0){
				movimientoActivo = true;
				
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