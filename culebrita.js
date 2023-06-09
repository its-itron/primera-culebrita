let snakeLength = 1;
var lienzo = document.getElementById("lienzo");
var contexto = lienzo.getContext("2d");
var tamanoCuadrado = 20;

var serpiente = [];
var tamanoSerpiente = 5;
var direccion = "derecha";

var comida = {
    x: Math.floor(Math.random() * lienzo.width / tamanoCuadrado) * tamanoCuadrado,
    y: Math.floor(Math.random() * lienzo.height / tamanoCuadrado) * tamanoCuadrado
};

var puntuacion = 0;

function crearSerpiente() {
    for (var i = tamanoSerpiente - 1; i >= 0; i--) {
        serpiente.push({x: i * tamanoCuadrado, y: 0});
    }
}

function crearComida() {
    comida.x = Math.floor(Math.random() * lienzo.width / tamanoCuadrado) * tamanoCuadrado;
    comida.y = Math.floor(Math.random() * lienzo.height / tamanoCuadrado) * tamanoCuadrado;
}

function dibujarSerpiente() {
    for (var i = 0; i < serpiente.length; i++) {
        contexto.fillStyle = "#081000";
        contexto.fillRect(serpiente[i].x, serpiente[i].y, tamanoCuadrado, tamanoCuadrado);
    }
}

function dibujarComida() {
    contexto.fillStyle = "#145800";
    contexto.fillRect(comida.x, comida.y, tamanoCuadrado, tamanoCuadrado);
}

function moverSerpiente() {
    var cabeza = {x: serpiente[0].x, y: serpiente[0].y};
    if (direccion == "derecha") cabeza.x += tamanoCuadrado;
    else if (direccion == "izquierda") cabeza.x -= tamanoCuadrado;
    else if (direccion == "arriba") cabeza.y -= tamanoCuadrado;
    else if (direccion == "abajo") cabeza.y += tamanoCuadrado;

    serpiente.pop();
    serpiente.unshift(cabeza);

    if (cabeza.x == comida.x && cabeza.y == comida.y) {
        puntuacion++;
        document.getElementById("puntuacion").innerHTML = "Puntuación: " + puntuacion;
        crearComida();
    }
}

function detectarColision() {
    var cabeza = serpiente[0];
    if (cabeza.x < 0 || cabeza.y < 0 || cabeza.x >= lienzo.width || cabeza.y >= lienzo.height) {
        return true;
    }
    for (var i = 1; i < serpiente.length; i++) {
        if (cabeza.x == serpiente[i].x && cabeza.y == serpiente[i].y) {
            return true;
        }
    }
    return false;
}

function dibujar() {
    contexto.clearRect(0, 0, lienzo.width, lienzo.height);
    dibujarSerpiente();
    dibujarComida();
    moverSerpiente();
    if (detectarColision()) {
        clearInterval(intervalo);
        document.getElementById("mensaje-perdiste").style.display = "block";
    }
}

function reiniciarJuego() {
    serpiente = [];
    tamanoSerpiente = 5;
    direccion = "derecha";
    comida = {
        x: Math.floor(Math.random() * lienzo.width / tamanoCuadrado) * tamanoCuadrado,
        y: Math.floor(Math.random() * lienzo.height / tamanoCuadrado) * tamanoCuadrado
    };
    puntuacion = 0;
    document.getElementById("puntuacion").innerHTML = "Puntuación: 0";
    document.getElementById("mensaje-perdiste").style.display = "none";
    crearSerpiente();
    intervalo = setInterval(dibujar, 100);
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37 && direccion != "derecha") {
        direccion = "izquierda";
    }
    else if (event.keyCode == 38 && direccion != "abajo") {
        direccion = "arriba";
    }
    else if (event.keyCode == 39 && direccion != "izquierda") {
        direccion = "derecha";
    }
    else if (event.keyCode == 40 && direccion != "arriba") {
        direccion = "abajo";
    }
});

crearSerpiente();
var intervalo = setInterval(dibujar, 100);

document.getElementById("boton-reinicio").addEventListener("click", function() {
    reiniciarJuego();
});