let secuenciaMaquina = [];
let secuenciaUsuario = [];

let ronda = 0

document.querySelector('button[type=button]').onclick = comenzarJuego;

actualizarEstado('Presione comenzar para jugar');
actualizarNumeroRonda('-');
bloquearInputUsuario();

function comenzarJuego() {
    reiniciarEstados();
    manejarRonda();
};

function reiniciarEstados() {
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    ronda= 0;
};

function manejarRonda() {
    actualizarEstado('La máquina está jugando');
    bloquearInputUsuario();
    
    const $nuevoCuadro = seleccionarCuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(function($cuadro, index) {
        const RETRASO_MAQUINA = (index + 1) * 1000;
        setTimeout(function() {
            resaltar($cuadro)
        }, RETRASO_MAQUINA);
    });

    setTimeout(function(){
        actualizarEstado('Su turno');
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR);

    secuenciaUsuario = [];
    actualizarNumeroRonda(ronda++);
    
};

function actualizarEstado(estado) {
    document.querySelector('#estado').textContent = estado;
};

function actualizarNumeroRonda(numeroRonda) {
    document.querySelector('#numero-ronda').textContent = numeroRonda
};

function bloquearInputUsuario() {
    const $cuadros = document.querySelectorAll('.cuadro');

    $cuadros.forEach(function($cuadro) {
        $cuadro.onclick = function() {};
    });
};

function seleccionarCuadroAleatorio () {
    const $cuadros = document.querySelectorAll('.cuadro');
    const index = Math.floor(Math.random() * $cuadros.length)
    return $cuadros[index];
};

function resaltar($cuadro) {
    $cuadro.style.opacity = 1;

    setTimeout(function() {
        $cuadro.style.opacity = 0.5;
    }, 500);
};

function desbloquearInputUsuario() {
    const $cuadros = document.querySelectorAll('.cuadro');

    $cuadros.forEach(function($cuadro){
        $cuadro.onclick = manejarInputUsuario;
    });
};

function manejarInputUsuario(event) {
    const $cuadro = event.target;
    resaltar($cuadro);

    secuenciaUsuario.push($cuadro);

    const cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];

    if($cuadro.id !== cuadroMaquina.id) {
        actualizarEstado('¡Perdiste! Dale a comenzar para jugar otra vez');
        bloquearInputUsuario();
    };

    if(secuenciaUsuario.length === secuenciaMaquina.length) {
        bloquearInputUsuario()
        setTimeout(manejarRonda, 1000);
    };
};
