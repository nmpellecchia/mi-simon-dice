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
    

};