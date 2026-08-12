// ============================================================
// MI UNIVERSO
// PARA ARIANA ❤️
// ============================================================


// ============================================================
// CONFIGURACIÓN
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

const sceneContainer =
    document.getElementById("scene");

const intro =
    document.getElementById("intro");

const interfaceUI =
    document.getElementById("interface");

const enterButton =
    document.getElementById("enterButton");

const phrase =
    document.getElementById("phrase");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const cameraButton =
    document.getElementById("cameraButton");

const nextButton =
    document.getElementById("nextButton");

const previousButton =
    document.getElementById("previousButton");

const photoNumber =
    document.getElementById("photoNumber");

const photoTotal =
    document.getElementById("photoTotal");

const musicDisc =
    document.querySelector(".music-disc");


// ============================================================
// THREE.JS
// ============================================================

const scene =
    new THREE.Scene();


const camera =
    new THREE.PerspectiveCamera(

        60,

        window.innerWidth /
        window.innerHeight,

        .1,

        2000

    );


camera.position.set(
    0,
    0,
    60
);


const renderer =
    new THREE.WebGLRenderer({

        antialias: true,

        alpha: true,

        powerPreference:
            "high-performance"

    });


renderer.setPixelRatio(

    Math.min(
        window.devicePixelRatio,
        2
    )

);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


sceneContainer.appendChild(
    renderer.domElement
);


// ============================================================
// GRUPOS
// ============================================================

const universe =
    new THREE.Group();


const galaxyGroup =
    new THREE.Group();


const heartGroup =
    new THREE.Group();


const photosGroup =
    new THREE.Group();


const wordsGroup =
    new THREE.Group();


universe.add(
    galaxyGroup,
    heartGroup,
    photosGroup,
    wordsGroup
);


scene.add(
    universe
);


// ============================================================
// ESTRELLAS
// ============================================================

function crearEstrellas() {


    const geometry =
        new THREE.BufferGeometry();


    const positions = [];

    const colors = [];


    for (
        let i = 0;
        i < 17000;
        i++
    ) {


        const radius =
            40 +
            Math.random() *
            300;


        const theta =
            Math.random() *
            Math.PI *
            2;


        const phi =
            Math.acos(
                2 *
                Math.random()
                - 1
            );


        const x =

            radius *
            Math.sin(phi) *
            Math.cos(theta);


        const y =

            radius *
            Math.sin(phi) *
            Math.sin(theta);


        const z =

            radius *
            Math.cos(phi);


        positions.push(
            x,
            y,
            z
        );


        const color =
            new THREE.Color();


        const r =
            Math.random();


        if (
            r < .7
        ) {

            color.set(
                0xffffff
            );

        }

        else if (
            r < .88
        ) {

            color.set(
                0xff9bdd
            );

        }

        else {

            color.set(
                0xa6cfff
            );

        }


        colors.push(
            color.r,
            color.g,
            color.b
        );

    }


    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );


    geometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(
            colors,
            3
        )

    );


    const material =
        new THREE.PointsMaterial({

            size: .55,

            vertexColors: true,

            transparent: true,

            opacity: .85,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending

        });


    return new THREE.Points(
        geometry,
        material
    );

}


const stars =
    crearEstrellas();


scene.add(
    stars
);


// ============================================================
// GALAXIA
// ============================================================

function crearGalaxia() {


    const geometry =
        new THREE.BufferGeometry();


    const positions = [];

    const colors = [];


    const arms =
        5;


    for (
        let i = 0;
        i < 13000;
        i++
    ) {


        const radius =
            Math.pow(
                Math.random(),
                .7
            ) *
            70;


        const arm =
            Math.floor(
                Math.random() *
                arms
            );


        const angle =

            radius *
            .14

            +

            arm *
            (
                Math.PI *
                2 /
                arms
            )

            +

            (
                Math.random()
                - .5
            ) *
            .65;


        const spread =
            radius *
            .025;


        const x =

            Math.cos(angle) *
            radius

            +

            (
                Math.random()
                - .5
            ) *
            spread;


        const z =

            Math.sin(angle) *
            radius

            +

            (
                Math.random()
                - .5
            ) *
            spread;


        const y =

            (
                Math.random()
                - .5
            ) *

            (
                2 +
                radius *
                .04
            );


        positions.push(
            x,
            y,
            z
        );


        const color =
            new THREE.Color();


        if (
            Math.random() >
            .5
        ) {

            color.set(
                0xff4bc5
            );

        }

        else {

            color.set(
                0x9c6cff
            );

        }


        colors.push(
            color.r,
            color.g,
            color.b
        );

    }


    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );


    geometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(
            colors,
            3
        )

    );


    const material =
        new THREE.PointsMaterial({

            size: .15,

            vertexColors: true,

            transparent: true,

            opacity: .75,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending

        });


    return new THREE.Points(
        geometry,
        material
    );

}


const galaxy =
    crearGalaxia();


galaxyGroup.add(
    galaxy
);


// ============================================================
// CORAZÓN
// ============================================================

function crearCorazon() {


    const geometry =
        new THREE.BufferGeometry();


    const positions = [];

    const colors = [];


    for (
        let i = 0;
        i < 8000;
        i++
    ) {


        const t =
            Math.random() *
            Math.PI *
            2;


        const fill =
            Math.sqrt(
                Math.random()
            );


        const scale =
            .62;


        const x =

            16 *
            Math.pow(
                Math.sin(t),
                3
            ) *
            fill *
            scale;


        const y =

            (

                13 *
                Math.cos(t)

                -

                5 *
                Math.cos(
                    2 * t
                )

                -

                2 *
                Math.cos(
                    3 * t
                )

                -

                Math.cos(
                    4 * t
                )

            ) *
            fill *
            scale;


        const z =

            (
                Math.random()
                - .5
            ) *
            3;


        positions.push(
            x,
            y,
            z
        );


        const color =
            new THREE.Color();


        color.setHSL(

            .91 +
            Math.random() *
            .08,

            .95,

            .5 +
            Math.random() *
            .2

        );


        colors.push(
            color.r,
            color.g,
            color.b
        );

    }


    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );


    geometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(
            colors,
            3
        )

    );


    const material =
        new THREE.PointsMaterial({

            size: .2,

            vertexColors: true,

            transparent: true,

            opacity: 1,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending

        });


    return new THREE.Points(
        geometry,
        material
    );

}


const heart =
    crearCorazon();


heart.position.set(
    0,
    -1,
    -5
);


heartGroup.add(
    heart
);


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


function crearTexto(
    texto
) {


    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width = 600;

    canvas.height = 160;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.clearRect(
        0,
        0,
        600,
        160
    );


    ctx.font =
        "500 42px Georgia";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.shadowColor =
        "#ff36bb";


    ctx.shadowBlur =
        25;


    ctx.fillStyle =
        "rgba(255,215,242,.85)";


    ctx.fillText(
        texto,
        300,
        80
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );


    const material =
        new THREE.SpriteMaterial({

            map: texture,

            transparent: true,

            depthWrite: false

        });


    const sprite =
        new THREE.Sprite(
            material
        );


    sprite.scale.set(
        7,
        1.9,
        1
    );


    return sprite;

}


for (
    let i = 0;
    i < 45;
    i++
) {


    const word =
        crearTexto(

            palabras[
                Math.floor(
                    Math.random() *
                    palabras.length
                )
            ]

        );


    const radius =
        20 +
        Math.random() *
        30;


    const angle =
        Math.random() *
        Math.PI *
        2;


    word.position.set(

        Math.cos(angle) *
        radius,

        (
            Math.random()
            - .5
        ) *
        25,

        Math.sin(angle) *
        radius

    );


    word.userData.offset =
        Math.random() *
        10;


    wordsGroup.add(
        word
    );

}


// ============================================================
// FOTOS
// ============================================================

const photoObjects = [];


function crearFoto(
    item,
    index
) {


    const group =
        new THREE.Group();


    // ----------------------------------------
    // FOTO
    // ----------------------------------------

    const texture =
        new THREE.TextureLoader()
            .load(
                item.archivo
            );


    const material =
        new THREE.SpriteMaterial({

            map:
                texture,

            transparent:
                true,

            depthWrite:
                false

        });


    const photo =
        new THREE.Sprite(
            material
        );


    photo.scale.set(
        6,
        6,
        1
    );


    group.add(
        photo
    );


    // ----------------------------------------
    // BORDE
    // ----------------------------------------

    const ring =
        crearAnillo();


    group.add(
        ring
    );


    // ----------------------------------------
    // POSICIÓN
    // ----------------------------------------

    const angle =

        index *
        (
            Math.PI *
            2 /
            fotos.length
        );


    const radius =
        18;


    group.position.set(

        Math.cos(angle) *
        radius,

        Math.sin(angle) *
        7,

        Math.sin(angle) *
        radius

    );


    group.userData.base =
        group.position.clone();


    group.userData.angle =
        angle;


    group.userData.frase =
        item.frase;


    group.userData.index =
        index;


    photosGroup.add(
        group
    );


    photoObjects.push(
        group
    );

}


function crearAnillo() {


    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        512;


    canvas.height =
        512;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.beginPath();


    ctx.arc(
        256,
        256,
        235,
        0,
        Math.PI * 2
    );


    ctx.lineWidth =
        18;


    ctx.shadowColor =
        "#ff00b7";


    ctx.shadowBlur =
        35;


    ctx.strokeStyle =
        "#ff4dc9";


    ctx.stroke();


    const texture =
        new THREE.CanvasTexture(
            canvas
        );


    const material =
        new THREE.SpriteMaterial({

            map:
                texture,

            transparent:
                true,

            depthWrite:
                false,

            blending:
                THREE.AdditiveBlending

        });


    const ring =
        new THREE.Sprite(
            material
        );


    ring.scale.set(
        7.2,
        7.2,
        1
    );


    return ring;

}


fotos.forEach(

    (
        item,
        index
    ) => {

        crearFoto(
            item,
            index
        );

    }

);


// ============================================================
// ESTADO
// ============================================================

let currentPhoto =
    0;


let cinematic =
    true;


let cameraTarget =
    new THREE.Vector3();


let targetZoom =
    60;


let cameraMoving =
    false;


let autoTimer =
    null;


// ============================================================
// MOSTRAR FOTO
// ============================================================

function mostrarFoto(
    index,
    acercar = true
) {


    if (
        photoObjects.length === 0
    ) {

        return;

    }


    currentPhoto =

        (
            index +
            photoObjects.length
        )

        %

        photoObjects.length;


    const object =
        photoObjects[
            currentPhoto
        ];


    photoNumber.textContent =

        String(
            currentPhoto + 1
        ).padStart(
            2,
            "0"
        );


    photoTotal.textContent =

        String(
            photoObjects.length
        ).padStart(
            2,
            "0"
        );


    // ----------------------------------------
    // FRASE
    // ----------------------------------------

    phrase.classList.remove(
        "show"
    );


    setTimeout(
        () => {


            phrase.textContent =
                object.userData.frase;


            phrase.classList.add(
                "show"
            );


        },
        500
    );


    // ----------------------------------------
    // CÁMARA
    // ----------------------------------------

    if (
        acercar
    ) {


        cameraTarget.copy(
            object.position
        );


        targetZoom =
            11;


        cameraMoving =
            true;

    }

}


// ============================================================
// SIGUIENTE
// ============================================================

nextButton.addEventListener(

    "click",

    () => {

        mostrarFoto(
            currentPhoto + 1
        );

        reiniciarAuto();

    }

);


// ============================================================
// ANTERIOR
// ============================================================

previousButton.addEventListener(

    "click",

    () => {

        mostrarFoto(
            currentPhoto - 1
        );

        reiniciarAuto();

    }

);


// ============================================================
// MÚSICA
// ============================================================

let playing =
    false;


function reproducirMusica() {


    music.play()

        .then(
            () => {

                playing =
                    true;

                musicButton.textContent =
                    "❚❚";

                musicDisc.classList.add(
                    "playing"
                );

            }
        )

        .catch(
            () => {

                console.log(
                    "El navegador bloqueó el audio."
                );

            }
        );

}


function pausarMusica() {


    music.pause();

    playing =
        false;


    musicButton.textContent =
        "▶";


    musicDisc.classList.remove(
        "playing"
    );

}


musicButton.addEventListener(

    "click",

    () => {


        if (
            playing
        ) {

            pausarMusica();

        }

        else {

            reproducirMusica();

        }

    }

);


// ============================================================
// CÁMARA
// ============================================================

cameraButton.addEventListener(

    "click",

    () => {


        cinematic =
            !cinematic;


        if (
            cinematic
        ) {

            cameraButton.style.opacity =
                "1";

        }

        else {

            cameraButton.style.opacity =
                ".45";

        }

    }

);


// ============================================================
// AUTO RECORRIDO
// ============================================================

function iniciarAuto() {


    clearInterval(
        autoTimer
    );


    autoTimer =

        setInterval(
            () => {


            
