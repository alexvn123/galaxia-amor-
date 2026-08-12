document.addEventListener(
    "DOMContentLoaded",
    () => {


/* =====================================================
   ELEMENTOS
===================================================== */

const intro =
    document.getElementById("intro");

const universe =
    document.getElementById("universe");

const enterButton =
    document.getElementById("enterButton");

const canvas =
    document.getElementById("galaxyCanvas");

const ctx =
    canvas.getContext("2d");

const floatingMessages =
    document.getElementById(
        "floatingMessages"
    );

const photoWorld =
    document.getElementById(
        "photoWorld"
    );

const mainPhrase =
    document.getElementById(
        "mainPhrase"
    );

const music =
    document.getElementById(
        "backgroundMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const previousButton =
    document.getElementById(
        "previousButton"
    );

const nextButton =
    document.getElementById(
        "nextButton"
    );

const currentNumber =
    document.getElementById(
        "currentNumber"
    );

const totalNumber =
    document.getElementById(
        "totalNumber"
    );

const finalScene =
    document.getElementById(
        "finalScene"
    );


/* =====================================================
   📸 AQUÍ PONES TUS FOTOS
=====================================================

   Tus fotos deben estar dentro de:

   assets/img/

   Y aquí escribes sus nombres EXACTOS.

   Ejemplo:

   assets/img/foto1.jpg

===================================================== */

const FOTOS = [

    "assets/Img/foto1.jpg",

    "assets/Img/foto2.jpg",

    "assets/Img/foto3.jpg",

    "assets/Img/foto4.jpg",

    "assets/Img/foto5.jpg",

    "assets/Img/foto6.jpg"

];


/* =====================================================
   💕 AQUÍ CAMBIAS LOS MENSAJES
=====================================================

   Estos mensajes aparecerán FLOTANDO
   por toda la galaxia.

===================================================== */

const MENSAJES = [

    "Kerly ❤️",

    "Quizás fue destino...",

    "o quizás fue casualidad.",

    "Pero me alegra haberte encontrado.",

    "Tú haces diferente mi universo.",

    "Contigo todo parece más bonito.",

    "Eres esa casualidad que no quiero perder.",

    "Mi lugar favorito es donde estás tú.",

    "Siempre habrá una estrella que me recuerde a ti.",

    "Tú y yo ✨",

    "Por siempre...",

    "Te elegiría una y otra vez. ❤️",

    "Mi casualidad favorita.",

    "Tú eres mi constelación.",

    "Donde estés tú, quiero estar.",

    "A veces el destino tiene nombre.",

    "Y el mío tiene el tuyo."

];


/* =====================================================
   💬 FRASES DE LAS FOTOS
===================================================== */

const FRASES = [

    "A veces una casualidad puede cambiarlo todo.",

];


/* =====================================================
   VARIABLES
===================================================== */

let width =
    window.innerWidth;

let height =
    window.innerHeight;

let estrellas = [];

let polvo = [];

let estrellasFugaces = [];

let fotoActual = 0;

let tiempo = 0;

let zoom = 1;

let zoomObjetivo = 1;

let rotacionX = 0;

let rotacionY = 0;

let objetivoX = 0;

let objetivoY = 0;

let arrastrando = false;

let ultimoX = 0;

let ultimoY = 0;


/* =====================================================
   CANVAS
===================================================== */

function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


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
    resizeCanvas
);


resizeCanvas();


/* =====================================================
   ✨ CREAR ESTRELLAS
===================================================== */

function crearEstrellas() {

    estrellas = [];


    const cantidad =
        width < 600
            ? 1000
            : 1800;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        estrellas.push({

            x:
                Math.random() *
                width,

            y:
                Math.random() *
                height,

            size:
                Math.random() *
                1.8 +
                .2,

            brillo:
                Math.random(),

            velocidad:
                Math.random() *
                .25 +
                .03

        });

    }

}


/* =====================================================
   🌌 POLVO GALÁCTICO
===================================================== */

function crearPolvo() {

    polvo = [];


    for (
        let i = 0;
        i < 6000;
        i++
    ) {

        const angulo =
            Math.random() *
            Math.PI *
            2;


        const radio =
            Math.pow(
                Math.random(),
                .55
            ) * 600;


        polvo.push({

            radio:
                radio,

            angulo:
                angulo,

            tamaño:
                Math.random() *
                1.7 +
                .2,

            brillo:
                Math.random(),

            brazo:
                Math.floor(
                    Math.random() * 5
                )

        });

    }

}


/* =====================================================
   🌠 ESTRELLAS FUGACES
===================================================== */

function crearEstrellaFugaz() {

    estrellasFugaces.push({

        x:
            Math.random() *
            width,

        y:
            Math.random() *
            height *
            .5,

        velocidad:
            Math.random() *
            12 +
            10,

        vida:
            1,

        longitud:
            Math.random() *
            80 +
            50

    });

}


/* =====================================================
   💗 CORAZÓN
===================================================== */

function puntoCorazon(t) {

    return {

        x:
            16 *
            Math.pow(
                Math.sin(t),
                3
            ),

        y:

            13 *
            Math.cos(t)

            -

            5 *
            Math.cos(2 * t)

            -

            2 *
            Math.cos(3 * t)

            -

            Math.cos(4 * t)

    };

}


/* =====================================================
   🎨 DIBUJAR GALAXIA
===================================================== */

function dibujarGalaxia() {

    tiempo += .008;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* ================================================
       FONDO
    ================================================= */

    const fondo =
        ctx.createRadialGradient(

            width / 2,
            height / 2,
            0,

            width / 2,
            height / 2,
            Math.max(
                width,
                height
            )

        );


    fondo.addColorStop(
        0,
        "#19051c"
    );

    fondo.addColorStop(
        .35,
        "#08020e"
    );

    fondo.addColorStop(
        1,
        "#000000"
    );


    ctx.fillStyle =
        fondo;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* ================================================
       ESTRELLAS
    ================================================= */

    estrellas.forEach(
        estrella => {

            estrella.y +=
                estrella.velocidad;


            if (
                estrella.y >
                height
            ) {

                estrella.y = 0;

            }


            const brillo =

                .35 +

                Math.sin(
                    tiempo * 3 +
                    estrella.brillo * 20
                ) *
                .35;


            ctx.globalAlpha =
                brillo;


            ctx.beginPath();


            ctx.arc(

                estrella.x,

                estrella.y,

                estrella.size,

                0,
                Math.PI * 2

            );


            ctx.fillStyle =
                "#ffffff";


            ctx.fill();

        }
    );


    /* ================================================
       GALAXIA ESPIRAL
    ================================================= */

    const cx =
        width / 2 +
        objetivoX * .15;

    const cy =
        height / 2 +
        objetivoY * .15;


    polvo.forEach(
        particula => {

            const angulo =

                particula.angulo

                +

                particula.brazo *
                (
                    Math.PI * 2 / 5
                )

                +

                particula.radio *
                .012

                +

                tiempo;


            const x =

                cx

                +

                Math.cos(
                    angulo
                )

                *

                particula.radio
                *

                .85;


            const y =

                cy

                +

                Math.sin(
                    angulo
                )

                *

                particula.radio
                *

                .28;


            const profundidad =

                1 -

                particula.radio /
                600;


            ctx.globalAlpha =

                .08 +

                profundidad *
                .75;


            ctx.beginPath();


            ctx.arc(

                x,

                y,

                particula.tamaño,

                0,
                Math.PI * 2

            );


            ctx.fillStyle =

                particula.brazo % 2 === 0

                    ? "#ff42c7"

                    : "#b16dff";


            ctx.fill();

        }
    );


    /* ================================================
       CORAZÓN DE PARTÍCULAS
    ================================================= */

    const heartScale =
        Math.min(
            width,
            height
        ) *
        .014;


    const heartX =
        width / 2 +
        objetivoX * .25;


    const heartY =
        height * .52 +
        objetivoY * .25;


    for (
        let i = 0;
        i < 1400;
        i++
    ) {

        const t =
            Math.random() *
            Math.PI *
            2;


        const p =
            puntoCorazon(t);


        const dispersion =

            .75 +

            Math.random() *
            .55;


        const x =

            heartX +

            p.x *
            heartScale *
            dispersion;


        const y =

            heartY -

            p.y *
            heartScale *
            dispersion;


        ctx.globalAlpha =

            .25 +

            Math.random() *
            .7;


        ctx.beginPath();


        ctx.arc(

            x,

            y,

            Math.random() *
            2.5 +
            .3,

            0,
            Math.PI * 2

        );


          ctx.fillStyle =
          Math.random() > .25
          ? "#00aaff"
          : "#b8ecff";

        ctx.fill();

    }


    /* ================================================
       ESTRELLAS FUGACES
    ================================================= */

    if (
        Math.random() < .006
    ) {

        crearEstrellaFugaz();

    }


    estrellasFugaces.forEach(
        estrella => {

            estrella.x +=
                estrella.velocidad;

            estrella.y +=
                estrella.velocidad *
                .35;

            estrella.vida -=
                .025;


            ctx.globalAlpha =
                estrella.vida;


            const grad =
                ctx.createLinearGradient(

                    estrella.x,
                    estrella.y,

                    estrella.x -
                    estrella.longitud,

                    estrella.y -
                    estrella.longitud *
                    .35

                );


            grad.addColorStop(
                0,
                "white"
            );


            grad.addColorStop(
                1,
                "transparent"
            );


            ctx.strokeStyle =
                grad;


            ctx.lineWidth =
                2;


            ctx.beginPath();


            ctx.moveTo(
                estrella.x,
                estrella.y
            );


            ctx.lineTo(

                estrella.x -
                estrella.longitud,

                estrella.y -
                estrella.longitud *
                .35

            );


            ctx.stroke();

        }
    );


    estrellasFugaces =
        estrellasFugaces.filter(
            estrella =>
                estrella.vida > 0
        );


    ctx.globalAlpha =
        1;


    requestAnimationFrame(
        dibujarGalaxia
    );

}


/* =====================================================
   💕 MENSAJES FLOTANTES
===================================================== */

function crearMensajes() {

    floatingMessages.innerHTML =
        "";


    MENSAJES.forEach(
        (mensaje, index) => {

            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "floating-message";


            elemento.textContent =
                mensaje;


            const x1 =
                Math.random() *
                85 +
                5;


            const y1 =
                Math.random() *
                80 +
                5;


            const x2 =
                x1 +
                (
                    Math.random() *
                    120 -
                    60
                );


            const y2 =
                y1 +
                (
                    Math.random() *
                    100 -
                    50
                );


            const profundidad =
                Math.random() *
                400 -
                200;


            const duracion =
                Math.random() *
                8 +
                7;


            const opacidad =
                Math.random() *
                .45 +
                .35;


            const rotacion =
                Math.random() *
                10 -
                5;


            elemento.style.left =
                "0";


            elemento.style.top =
                "0";


            elemento.style.setProperty(
                "--x1",
                x1 + "vw"
            );


            elemento.style.setProperty(
                "--y1",
                y1 + "vh"
            );


            elemento.style.setProperty(
                "--x2",
                x2 + "vw"
            );


            elemento.style.setProperty(
                "--y2",
                y2 + "vh"
            );


            elemento.style.setProperty(
                "--depth",
                profundidad + "px"
            );


            elemento.style.setProperty(
                "--duration",
                duracion + "s"
            );


            elemento.style.setProperty(
                "--opacity",
                opacidad
            );


            elemento.style.setProperty(
                "--rotation",
                rotacion + "deg"
            );


            const tamaño =
                Math.random() *
                10 +
                13;


            elemento.style.fontSize =
                tamaño + "px";


            elemento.style.animationDelay =
                (
                    Math.random() *
                    -10
                ) + "s";


            floatingMessages.appendChild(
                elemento
            );

        }
    );

}


/* =====================================================
   📸 FOTOS
===================================================== */

function crearFotos() {

    photoWorld.innerHTML =
        "";


    FOTOS.forEach(
        (ruta, index) => {

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
                ruta;


            imagen.alt =
                "Foto de Ariana";


            /*

               Si el nombre está mal,
               la galaxia NO se rompe.

            */

            imagen.onerror =
                () => {

                    console.warn(
                        "No se encontró:",
                        ruta
                    );

                    tarjeta.style.opacity =
                        "0";

                };


            tarjeta.appendChild(
                imagen
            );


            photoWorld.appendChild(
                tarjeta
            );

        }
    );


    totalNumber.textContent =
        String(
            FOTOS.length
        ).padStart(
            2,
            "0"
        );


    actualizarFotos();

}


/* =====================================================
   🎥 POSICIÓN 3D DE LAS FOTOS
===================================================== */

function actualizarFotos() {

    const tarjetas =
        document.querySelectorAll(
            ".photo-card"
        );


    tarjetas.forEach(
        (tarjeta, index) => {

            const diferencia =
                index -
                fotoActual;


            const angulo =
                diferencia *
                .85;


            const radio =
                window.innerWidth <
                600
                    ? 145
                    : 240;


            const x =

                Math.sin(
                    angulo
                ) *
                radio;


            const y =

                Math.abs(
                    diferencia
                ) *
                25;


            const z =

                Math.cos(
                    angulo
                ) *
                radio;


            let escala =
                .72;


            let opacidad =
                .35;


            if (
                diferencia === 0
            ) {

                escala =
                    1.12;

                opacidad =
                    1;

            }


            if (
                Math.abs(
                    diferencia
                ) > 3
            ) {

                opacidad =
                    0;

            }


            tarjeta.style.opacity =
                opacidad;


            tarjeta.style.transform =

                `translate3d(
                    calc(-50% + ${x}px),
                    calc(-50% + ${y}px),
                    ${z}px
                )
                rotateY(${rotacionY * 20}deg)
                rotateX(${rotacionX * 20}deg)
                scale(${escala * zoom})`;

        }
    );


    currentNumber.textContent =
        String(
            fotoActual + 1
        ).padStart(
            2,
            "0"
        );


    mostrarFrase();

}


/* =====================================================
   💬 FRASE DE LA FOTO
===================================================== */

function mostrarFrase() {

    mainPhrase.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            mainPhrase
                .querySelector("span")
                .textContent =
                FRASES[
                    fotoActual %
                    FRASES.length
                ];


            mainPhrase.classList.add(
                "show"
            );

        },
        300
    );

}


/* =====================================================
   🚀 ENTRAR AL UNIVERSO
===================================================== */

enterButton.addEventListener(
    "click",
    () => {

        console.log(
            "Entrando al universo..."
        );


        intro.classList.add(
            "hide"
        );


        universe.classList.add(
            "show"
        );


        crearMensajes();

        crearFotos();


        /* ==========================================
           MÚSICA
        ========================================== */

        music.volume =
            .65;


        music.play()
            .then(
                () => {

                    musicButton.classList.add(
                        "playing"
                    );

                    musicButton.textContent =
                        "❚❚";

                }
            )
            .catch(
                error => {

                    console.log(
                        "La música necesita iniciar manualmente:",
                        error
                    );

                }
            );


        /* ==========================================
           EFECTO CÁMARA
        ========================================== */

        zoomObjetivo =
            1.25;


        setTimeout(
            () => {

                zoomObjetivo =
                    1;

            },
            3500
        );

    }
);


/* =====================================================
   ⏭ SIGUIENTE FOTO
===================================================== */

nextButton.addEventListener(
    "click",
    () => {

        fotoActual++;

        if (
            fotoActual >=
            FOTOS.length
        ) {

            fotoActual =
                0;

        }


        zoomObjetivo =
            1.35;


        setTimeout(
            () => {

                zoomObjetivo =
                    1;

            },
            2000
        );


        actualizarFotos();

    }
);


/* =====================================================
   ⏮ FOTO ANTERIOR
===================================================== */

previousButton.addEventListener(
    "click",
    () => {

        fotoActual--;

        if (
            fotoActual < 0
        ) {

            fotoActual =
                FOTOS.length - 1;

        }


        actualizarFotos();

    }
);


/* =====================================================
   🎵 MÚSICA
===================================================== */

musicButton.addEventListener(
    "click",
    () => {

        if (
            music.paused
        ) {

            music.play()
                .then(
                    () => {

                        musicButton.classList.add(
                            "playing"
                        );

                        musicButton.textContent =
                            "❚❚";

                    }
                );

        }

        else {

            music.pause();


            musicButton.classList.remove(
                "playing"
            );


            musicButton.textContent =
                "♪";

        }

    }
);


/* =====================================================
   🖐️ MOVIMIENTO CON EL DEDO / MOUSE
===================================================== */

universe.addEventListener(
    "pointerdown",
    event => {

        arrastrando =
            true;


        ultimoX =
            event.clientX;


        ultimoY =
            event.clientY;

    }
);


window.addEventListener(
    "pointermove",
    event => {

        if (
            !arrastrando
        ) return;


        const dx =
            event.clientX -
            ultimoX;


        const dy =
            event.clientY -
            ultimoY;


        objetivoX +=
            dx;


        objetivoY +=
            dy;


        objetivoX =
            Math.max(
                -150,
                Math.min(
                    150,
                    objetivoX
                )
            );


        objetivoY =
            Math.max(
                -100,
                Math.min(
                    100,
                    objetivoY
                )
            );


        rotacionY +=
            dx *
            .002;


        rotacionX +=
            dy *
            .002;


        ultimoX =
            event.clientX;


        ultimoY =
            event.clientY;

    }
);


window.addEventListener(
    "pointerup",
    () => {

        arrastrando =
            false;

    }
);


/* =====================================================
   🔍 ZOOM CON RUEDA
===================================================== */

universe.addEventListener(
    "wheel",
    event => {

        zoomObjetivo +=
            event.deltaY *
            -.001;


        zoomObjetivo =
            Math.max(
                .7,
                Math.min(
                    1.6,
                    zoomObjetivo
                )
            );

    },
    {
        passive: true
    }
);


/* =====================================================
   🎥 SUAVIZADO DE CÁMARA
===================================================== */

function actualizarCamara() {

    zoom +=
        (
            zoomObjetivo -
            zoom
        ) *
        .035;


    objetivoX *=
        .985;


    objetivoY *=
        .985;


    actualizarFotos();


    requestAnimationFrame(
        actualizarCamara
    );

}


/* =====================================================
   INICIO
===================================================== */

crearEstrellas();

crearPolvo();

dibujarGalaxia();

actualizarCamara();


});
