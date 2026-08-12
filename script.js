// ============================================================
// MI UNIVERSO - ARIANA
// MOTOR 3D SIN THREE.JS
// Canvas + CSS 3D
// ============================================================

const fotos = [
    {
        archivo: "imagenes/ariana1.jpg",
        frase: "A veces una casualidad puede cambiarlo todo."
    },
    {
        archivo: "imagenes/ariana2.jpg",
        frase: "De todas las personas, tuve la suerte de encontrarte."
    },
    {
        archivo: "imagenes/ariana3.jpg",
        frase: "Quizás fue destino..."
    },
    {
        archivo: "imagenes/ariana4.jpg",
        frase: "...o quizás la casualidad más bonita."
    },
    {
        archivo: "imagenes/ariana5.jpg",
        frase: "Pero hoy sé que te elegiría una y otra vez."
    },
    {
        archivo: "imagenes/ariana6.jpg",
        frase: "Ariana, tú eres mi universo."
    }
];


// ============================================================
// ELEMENTOS
// ============================================================

const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const interfaceUI = document.getElementById("interface");

const enterButton = document.getElementById("enterButton");

const phrase = document.getElementById("phrase");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");

const cameraButton = document.getElementById("cameraButton");

const photoNumber = document.getElementById("photoNumber");
const photoTotal = document.getElementById("photoTotal");

const musicDisc = document.querySelector(".music-disc");


// ============================================================
// VARIABLES
// ============================================================

let iniciado = false;

let reproduciendo = false;

let indiceActual = 0;

let zoom = 1;

let zoomObjetivo = 1;

let rotacionX = 0;

let rotacionY = 0;

let objetivoX = 0;

let objetivoY = 0;

let arrastrando = false;

let ultimoX = 0;

let ultimoY = 0;

let cinematica = true;

let intervaloFotos;


// ============================================================
// CANVAS
// ============================================================

const canvas = document.createElement("canvas");

canvas.className = "galaxy-canvas";

scene.appendChild(canvas);

const ctx = canvas.getContext("2d");


// ============================================================
// TAMAÑO
// ============================================================

let ancho = window.innerWidth;

let alto = window.innerHeight;

let dpr = Math.min(
    window.devicePixelRatio || 1,
    2
);


function ajustarCanvas() {

    ancho = window.innerWidth;

    alto = window.innerHeight;

    dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width = ancho * dpr;

    canvas.height = alto * dpr;

    canvas.style.width = ancho + "px";

    canvas.style.height = alto + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


window.addEventListener(
    "resize",
    ajustarCanvas
);

ajustarCanvas();


// ============================================================
// ESTRELLAS
// ============================================================

const estrellas = [];

const cantidadEstrellas =
    window.innerWidth < 600
        ? 900
        : 1800;


for (
    let i = 0;
    i < cantidadEstrellas;
    i++
) {

    estrellas.push({

        x: Math.random() * ancho,

        y: Math.random() * alto,

        z: Math.random(),

        tamaño:
            Math.random() * 2 + .2,

        brillo:
            Math.random(),

        velocidad:
            Math.random() * .3 + .05

    });

}


// ============================================================
// PARTÍCULAS DE GALAXIA
// ============================================================

const particulas = [];


for (
    let i = 0;
    i < 5000;
    i++
) {

    const brazo =
        Math.floor(
            Math.random() * 5
        );

    const radio =
        Math.pow(
            Math.random(),
            .65
        ) * 550;

    const angulo =

        radio * .012 +

        brazo *
        (
            Math.PI * 2 / 5
        ) +

        (
            Math.random() - .5
        ) *
        .6;

    particulas.push({

        radio,

        angulo,

        x: 0,

        y: 0,

        tamaño:
            Math.random() * 1.5 + .2,

        brillo:
            Math.random(),

        tono:
            Math.random()

    });

}


// ============================================================
// PALABRAS
// ============================================================

const palabras = [

    "AMOR",
    "TERNURA",
    "MAGIA",
    "PASIÓN",
    "ALEGRÍA",
    "LUZ",
    "DESTINO",
    "CASUALIDAD",
    "SIEMPRE",
    "TÚ Y YO",
    "INFINITO",
    "FELICIDAD",
    "ALMA",
    "CONSTELACIÓN"

];


const palabras3D = [];


for (
    let i = 0;
    i < 35;
    i++
) {

    palabras3D.push({

        texto:
            palabras[
                Math.floor(
                    Math.random() *
                    palabras.length
                )
            ],

        x:
            Math.random() * ancho,

        y:
            Math.random() * alto,

        profundidad:
            Math.random(),

        velocidad:
            Math.random() * .3 + .1,

        fase:
            Math.random() * Math.PI * 2

    });

}


// ============================================================
// FOTOS
// ============================================================

const fotosDOM = [];

function crearFotos() {

    fotosDOM.length = 0;

    document
        .querySelectorAll(".photo-card")
        .forEach(
            elemento => elemento.remove()
        );


    fotos.forEach(
        (foto, index) => {

            const tarjeta =
                document.createElement(
                    "div"
                );

            tarjeta.className =
                "photo-card";


            const imagen =
                document.createElement(
                    "img"
                );


            imagen.src =
                foto.archivo;


            imagen.alt =
                "Foto de Ariana";


            imagen.loading =
                "eager";


            tarjeta.appendChild(
                imagen
            );


            scene.appendChild(
                tarjeta
            );


            const angulo =
                index *
                (
                    Math.PI * 2 /
                    fotos.length
                );


            const radio = 230;


            tarjeta.dataset.x =
                Math.cos(angulo) *
                radio;


            tarjeta.dataset.y =
                Math.sin(angulo) *
                110;


            tarjeta.dataset.z =
                Math.sin(angulo) *
                radio;


            tarjeta.dataset.angulo =
                angulo;


            fotosDOM.push(
                tarjeta
            );

        }
    );

}


crearFotos();


// ============================================================
// ESTILO DINÁMICO
// ============================================================

function aplicarEstilos3D() {

    const centroX =
        ancho / 2;

    const centroY =
        alto / 2;


    fotosDOM.forEach(
        (tarjeta, index) => {

            const x =
                parseFloat(
                    tarjeta.dataset.x
                );

            const y =
                parseFloat(
                    tarjeta.dataset.y
                );

            const z =
                parseFloat(
                    tarjeta.dataset.z
                );


            const movimiento =
                Math.sin(
                    Date.now() * .0005 +
                    index
                ) * 8;


            const profundidad =
                z + 500;


            const escala =
                Math.max(
                    .55,
                    Math.min(
                        1.25,
                        1 +
                        z / 1000
                    )
                );


            const posicionX =
                centroX +
                x +
                objetivoX;


            const posicionY =
                centroY +
                y +
                movimiento +
                objetivoY;


            tarjeta.style.transform =

                `translate3d(
                    ${posicionX}px,
                    ${posicionY}px,
                    ${profundidad}px
                )
                translate(-50%, -50%)
                scale(${escala * zoom})
                rotateY(${rotacionY * .2}deg)
                rotateX(${rotacionX * .2}deg)`;


            tarjeta.style.zIndex =
                Math.round(
                    z + 1000
                );


            if (
                index === indiceActual
            ) {

                tarjeta.classList.add(
                    "selected"
                );

            }

            else {

                tarjeta.classList.remove(
                    "selected"
                );

            }

        }
    );

}


// ============================================================
// CSS NECESARIO PARA LAS FOTOS
// ============================================================

const estilo =
    document.createElement("style");


estilo.textContent = `

.scene {

    perspective: 1200px;

    overflow: hidden;

    background:

        radial-gradient(
            circle at center,
            rgba(100,0,90,.18),
            transparent 40%
        ),

        #020106;

}

.galaxy-canvas {

    position: absolute;

    inset: 0;

    width: 100%;

    height: 100%;

    z-index: 1;

}

.photo-card {

    position: absolute;

    left: 0;

    top: 0;

    width: 150px;

    height: 190px;

    padding: 6px;

    border-radius: 18px;

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,.95),
            rgba(255,100,200,.7)
        );

    box-shadow:

        0 0 15px
        rgba(255,50,200,.7),

        0 0 50px
        rgba(255,0,180,.35);

    transform-style: preserve-3d;

    transition:
        box-shadow .5s ease;

    overflow: hidden;

    z-index: 5;

}

.photo-card img {

    width: 100%;

    height: 100%;

    object-fit: cover;

    border-radius: 13px;

    display: block;

}

.photo-card.selected {

    box-shadow:

        0 0 20px
        #ff3ac0,

        0 0 60px
        rgba(255,0,190,.8),

        0 0 120px
        rgba(255,0,150,.35);

}

@media(max-width:600px) {

    .photo-card {

        width: 115px;

        height: 145px;

    }

}

`;


document.head.appendChild(
    estilo
);


// ============================================================
// CORAZÓN DE PARTÍCULAS
// ============================================================

function puntoCorazon(t) {

    const x =
        16 *
        Math.pow(
            Math.sin(t),
            3
        );


    const y =

        13 *
        Math.cos(t)

        -

        5 *
        Math.cos(2 * t)

        -

        2 *
        Math.cos(3 * t)

        -

        Math.cos(4 * t);


    return {
        x,
        y
    };

}


// ============================================================
// DIBUJAR GALAXIA
// ============================================================

function dibujar() {

    const tiempo =
        Date.now() * .001;


    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );


    // --------------------------------------------
    // FONDO
    // --------------------------------------------

    const gradiente =
        ctx.createRadialGradient(

            ancho / 2,
            alto / 2,
            0,

            ancho / 2,
            alto / 2,
            Math.max(
                ancho,
                alto
            ) * .7

        );


    gradiente.addColorStop(
        0,
        "rgba(70,0,65,.35)"
    );


    gradiente.addColorStop(
        .45,
        "rgba(20,0,30,.25)"
    );


    gradiente.addColorStop(
        1,
        "rgba(0,0,0,1)"
    );


    ctx.fillStyle =
        gradiente;


    ctx.fillRect(
        0,
        0,
        ancho,
        alto
    );


    // --------------------------------------------
    // ESTRELLAS
    // --------------------------------------------

    estrellas.forEach(
        estrella => {

            estrella.y +=
                estrella.velocidad;


            if (
                estrella.y > alto
            ) {

                estrella.y = 0;

            }


            const parpadeo =

                .45 +

                Math.sin(
                    tiempo * 2 +
                    estrella.brillo * 20
                ) *
                .35;


            ctx.globalAlpha =
                parpadeo;


            ctx.beginPath();


            ctx.arc(

                estrella.x,

                estrella.y,

                estrella.tamaño *
                estrella.z,

                0,
                Math.PI * 2

            );


            ctx.fillStyle =
                estrella.z > .7
                    ? "#ffffff"
                    : "#ff9de4";


            ctx.fill();

        }
    );


    ctx.globalAlpha = 1;


    // --------------------------------------------
    // GALAXIA
    // --------------------------------------------

    const centroX =
        ancho / 2 +
        objetivoX * .15;


    const centroY =
        alto / 2 +
        objetivoY * .15;


    particulas.forEach(
        particula => {

            const angulo =

                particula.angulo +
                tiempo * .06;


            const radio =
                particula.radio;


            const x =

                centroX +

                Math.cos(angulo) *
                radio *
                .55;


            const y =

                centroY +

                Math.sin(angulo) *
                radio *
                .22;


            const tamaño =

                particula.tamaño *
                (
                    .6 +
                    particula.radio / 550
                );


            ctx.globalAlpha =

                .2 +

                Math.sin(
                    tiempo * 2 +
                    particula.brillo * 10
                ) *
                .2;


            ctx.beginPath();


            ctx.arc(

                x,

                y,

                tamaño,

                0,
                Math.PI * 2

            );


            ctx.fillStyle =

                particula.tono > .5
                    ? "#ff4fc7"
                    : "#a97cff";


            ctx.fill();

        }
    );


    ctx.globalAlpha = 1;


    // --------------------------------------------
    // CORAZÓN
    // --------------------------------------------

    const escala =
        Math.min(
            ancho,
            alto
        ) * .014;


    const corazonX =
        ancho / 2 +
        objetivoX * .25;


    const corazonY =
        alto / 2 +
        50 +
        objetivoY * .25;


    for (
        let i = 0;
        i < 900;
        i++
    ) {

        const t =
            Math.random() *
            Math.PI *
            2;


        const punto =
            puntoCorazon(t);


        const dispersión =
            Math.random() *
            1.2;


        const x =

            corazonX +

            punto.x *
            escala *

            (
                1 +
                dispersión *
                .08
            );


        const y =

            corazonY -

            punto.y *
            escala *

            (
                1 +
                dispersión *
                .08
            );


        ctx.globalAlpha =

            .25 +
            Math.random() *
            .65;


        ctx.beginPath();


        ctx.arc(

            x,

            y,

            Math.random() *
            2.5 +

            .4,

            0,
            Math.PI * 2

        );


        ctx.fillStyle =
            Math.random() > .25
                ? "#ff42c4"
                : "#ffd5f3";


        ctx.fill();

    }


    ctx.globalAlpha = 1;


    // --------------------------------------------
    // BRILLO CENTRAL
    // --------------------------------------------

    const brillo =
        ctx.createRadialGradient(

            corazonX,
            corazonY,
            0,

            corazonX,
            corazonY,
            180

        );


    brillo.addColorStop(
        0,
        "rgba(255,30,190,.12)"
    );


    brillo.addColorStop(
        1,
        "rgba(255,0,150,0)"
    );


    ctx.fillStyle =
        brillo;


    ctx.beginPath();


    ctx.arc(
        corazonX,
        corazonY,
        180,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // --------------------------------------------
    // PALABRAS
    // --------------------------------------------

    palabras3D.forEach(
        palabra => {

            palabra.y +=
                palabra.velocidad;


            if (
                palabra.y >
                alto + 50
            ) {

                palabra.y =
                    -50;

            }


            const escalaTexto =

                .5 +

                palabra.profundidad *
                .8;


            ctx.globalAlpha =

                .25 +

                palabra.profundidad *
                .55;


            ctx.font =

                `${12 * escalaTexto}px Georgia`;


            ctx.textAlign =
                "center";


            ctx.fillStyle =
                "#ffc5ec";


            ctx.shadowColor =
                "#ff20b8";


            ctx.shadowBlur =
                12;


            ctx.fillText(

                palabra.texto,

                palabra.x,

                palabra.y +
                Math.sin(
                    tiempo +
                    palabra.fase
                ) *
                5

            );


            ctx.shadowBlur = 0;

        }
    );


    ctx.globalAlpha = 1;


    aplicarEstilos3D();


    requestAnimationFrame(
        dibujar
    );

}


dibujar();


// ============================================================
// MOSTRAR FRASE
// ============================================================

function mostrarFoto(
    numero
) {

    indiceActual =

        (
            numero +
            fotos.length
        ) %
        fotos.length;


    photoNumber.textContent =

        String(
            indiceActual + 1
        ).padStart(
            2,
            "0"
        );


    photoTotal.textContent =

        String(
            fotos.length
        ).padStart(
            2,
            "0"
        );


    phrase.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            phrase.textContent =
                fotos[
                    indiceActual
                ].frase;


            phrase.classList.add(
                "show"
            );

        },
        300
    );


    // --------------------------------------------
    // ACERCAMIENTO
    // --------------------------------------------

    zoomObjetivo =
        1.35;


    setTimeout(
        () => {

            zoomObjetivo =
                1;

        },
        3500
    );

}


// ============================================================
// ENTRAR
// ============================================================

enterButton.addEventListener(
    "click",
    () => {

        if (
            iniciado
        ) return;


        iniciado = true;


        // ----------------------------------------
        // OCULTAR INTRO
        // ----------------------------------------

        intro.classList.add(
   
