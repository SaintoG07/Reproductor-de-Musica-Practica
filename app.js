// !Caja dónde se reproduce
const titulo = document.getElementById('Titulo-cancion');
const portada_principal = document.getElementById('portada-principal');
const artista = document.getElementById('artista-nombre');
const musica_reproducir = document.getElementById('musica-reproducir');
const progreso_barra = document.querySelector('input.progreso')

// ?Parte de controles(button)
const atras = document.querySelector('button.atras');
const play_pausa = document.querySelector('button.play-pausa');
const play_pausa_icon = document.getElementById('play-icon');
const siguiente = document.querySelector('button.siguiente');

// ?Portada
const portada_img = document.getElementById('portada-principal-img');

console.log(portada_img);


const lista_canciones = [
    {
        nombre: 'Shadow of the Days',
        artista: 'linkin park',
        ruta: 'music/Shadow Of The Day.mp3',
        ruta_portada: 'img/shadow of the days.jpg'
    },
    {
        nombre: ' Sharks',
        artista: 'PARIS the prince',
        ruta: 'music/Skrahs.mp3',
        ruta_portada: 'img/paris the prince-sharks.jpg'
    },
    {
        nombre: 'R-Windows',
        artista: 'Social Repose',
        ruta: 'music/M & S R-Windows.mp3',
        ruta_portada: 'img/Windows.jpg'
    },
    {
        nombre: 'A dónde voy',
        artista: ' Wuicho kun & Azul de Viena',
        ruta: 'music/A dónde voy - Wuicho kun & Azul de Viena.mp3',
        ruta_portada: 'img/A donde voy.jpg'
    },
    {
        nombre: 'SHADOWBORN',
        artista: 'Desconocido',
        ruta: 'music/SHADOWBORN.mp3',
        ruta_portada: 'img/shadowborn.webp'
    }
];

let indie_cancion_actual = 0;

function actualizar_inf_cancion(){
    titulo.textContent = lista_canciones[indie_cancion_actual].nombre;
    portada_img.src = lista_canciones[indie_cancion_actual].ruta_portada;
    artista.textContent = lista_canciones[indie_cancion_actual].artista;
    musica_reproducir.src = lista_canciones[indie_cancion_actual].ruta;
};


// !Funciones para reproducir:
function play_musica(){
    play_pausa_icon.classList.remove('bi-suit-heart')
    play_pausa_icon.classList.add('bi-suit-heart-fill')
    musica_reproducir.play();
};
function pasusar_musica(){
    play_pausa_icon.classList.remove('bi-suit-heart-fill');
    play_pausa_icon.classList.add('bi-suit-heart');
    musica_reproducir.pause();
};

// !Funciones para avanzar. play-pausa y siguiente:
function siguiente_cancion(){
    // indie_cancion_actual = indie_cancion_actual + 1;
    // let indice_maximo = lista_canciones.length;

    // if (indie_cancion_actual == indice_maximo){
    //     indie_cancion_actual = 0;
    // }

    //      4                        4+1=> 5        4%5=> 0
    indie_cancion_actual = (indie_cancion_actual + 1) % lista_canciones.length;
    actualizar_inf_cancion();
};
function atras_cancion() {
    //     4                                 4-1=> 3+5=> 8                 8%5=> 3
    indie_cancion_actual = (indie_cancion_actual - 1 + lista_canciones.length) % lista_canciones.length;
    actualizar_inf_cancion();
};
function reproducir_pausar(){
    if (musica_reproducir.paused){
        play_musica();
    } else{
        pasusar_musica();
    }
};



// !Eventos:
siguiente.addEventListener('click', ()=>{
    siguiente_cancion()
    play_musica();
});
atras.addEventListener('click', ()=>{
    atras_cancion();
    play_musica();
});
musica_reproducir.addEventListener('loadedmetadata', ()=>{
    progreso_barra.max = musica_reproducir.duration;
    progreso_barra.value = musica_reproducir.currentTime;
});

play_pausa.addEventListener('click', ()=>{
    reproducir_pausar();
});

musica_reproducir.addEventListener('timeupdate', ()=>{
    if(!musica_reproducir.paused){
        progreso_barra.value = musica_reproducir.currentTime;
    };
});

progreso_barra.addEventListener('input', ()=>{
    musica_reproducir.currentTime = progreso_barra.value;
});

actualizar_inf_cancion();