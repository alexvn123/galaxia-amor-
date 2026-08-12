// ======================================================
// MI UNIVERSO 3D ❤️
// ARIANA
// ======================================================


// ======================================================
// ELEMENTOS
// ======================================================

const sceneContainer =
    document.getElementById("scene");

const imageInput =
    document.getElementById("imageInput");

const musicInput =
    document.getElementById("musicInput");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const cameraButton =
    document.getElementById("cameraButton");

const zoomButton =
    document.getElementById("zoomButton");

const phraseElement =
    document.getElementById("phrase");


// ======================================================
// ESCENA
// ======================================================

const scene =
    new THREE.Scene();


// ======================================================
// CÁMARA
// ======================================================

const camera =
    new THREE.PerspectiveCamera(

        65,

        window.innerWidth /
        window.innerHeight,

        0.1,

        3000

    );


camera.position.set(
    0,
    0,
    55
);


// ======================================================
// RENDER
// ======================================================

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


// ======================================================
// GRUPOS
// ======================================================

const galaxyGroup =
    new THREE.Group();

const heartGroup =
    new THREE.Group();

const wordsGroup =
    new THREE.Group();

const photosGroup =
    new THREE.Group();


scene.add(
    galaxyGroup
);

scene.add(
    heartGroup
);

scene.add(
    wordsGroup
);

scene.add(
    photosGroup
);


// ======================================================
// ESTRELLAS
// ======================================================

const starGeometry =
    new THREE.BufferGeometry();

const starPositions = [];

const starColors = [];


for (
    let i = 0;
    i < 18000;
    i++
) {

    const radius =
        Math.random() *
        350;


    const angle =
        Math.random() *
        Math.PI *
        2;


    const x =
        Math.cos(angle) *
        radius;


    const z =
        Math.sin(angle) *
        radius;


    const y =
        (
            Math.random() -
            .5
        ) *
        150;


    starPositions.push(
        x,
        y,
        z
    );


    const color =
        new THREE.Color();


    const r =
        Math.random();


    if (r < .65) {

        color.set(
            0xffffff
        );

    }

    else if (r < .82) {

        color.set(
            0xff7ddd
        );

    }

    else {

        color.set(
            0x9acaff
        );

    }


    starColors.push(
        color.r,
        color.g,
        color.b
    );

}


starGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        starPositions,
        3
    )

);


starGeometry.setAttribute(

    "color",

    new THREE.Float32BufferAttribute(
        starColors,
        3
    )

);


const starMaterial =
    new THREE.PointsMaterial({

        size:
            .75,

        vertexColors:
            true,

        transparent:
            true,

        opacity:
            .9,

        blending:
            THREE.AdditiveBlending

    });


const stars =
    new THREE.Points(

        starGeometry,

        starMaterial

    );


scene.add(
    stars
);


// ======================================================
// GALAXIA CENTRAL
// ======================================================

const galaxyGeometry =
    new THREE.BufferGeometry();

const galaxyPositions = [];

const galaxyColors = [];


for (
    let i = 0;
    i < 15000;
    i++
) {

    const radius =
        Math.random() *
        60;


    const arm =
        Math.floor(
            Math.random() *
            5
        );


    const angle =

        radius *
        .16 +

        arm *
        (
            Math.PI *
            2 /
            5
        ) +

        (
            Math.random() -
            .5
        ) *
        .7;


    const x =
        Math.cos(angle) *
        radius;


    const z =
        Math.sin(angle) *
        radius;


    const y =
        (
            Math.random() -
            .5
        ) *
        (
            4 +
            radius *
            .07
        );


    galaxyPositions.push(
        x,
        y,
        z
    );


    const color =
        new THREE.Color();


    if (
        Math.random() >
        .45
    ) {

        color.set(
            0xff56ca
        );

    }

    else {

        color.set(
            0xa76aff
        );

    }


    galaxyColors.push(
        color.r,
        color.g,
        color.b
    );

}


galaxyGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        galaxyPositions,
        3
    )

);


galaxyGeometry.setAttribute(

    "color",

    new THREE.Float32BufferAttribute(
        galaxyColors,
        3
    )

);


const galaxyMaterial =
    new THREE.PointsMaterial({

        size:
            .18,

        vertexColors:
            true,

        transparent:
            true,

        opacity:
            .8,

        blending:
            THREE.AdditiveBlending

    });


const galaxy =
    new THREE.Points(

        galaxyGeometry,

        galaxyMaterial

    );


galaxyGroup.add(
    galaxy
);


// ======================================================
// CORAZÓN DE PARTÍCULAS
// ======================================================

const heartGeometry =
    new THREE.BufferGeometry();

const heartPositions = [];

const heartColors = [];


for (
    let i = 0;
    i < 7000;
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
        .72;


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
            Math.random() -
            .5
        ) *
        3;


    heartPositions.push(
        x,
        y,
        z
    );


    const color =
        new THREE.Color();


    color.setHSL(

        .90 +
        Math.random() *
        .08,

        .95,

        .55

    );


    heartColors.push(
        color.r,
        color.g,
        color.b
    );

}


heartGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        heartPositions,
        3
    )

);


heartGeometry.setAttribute(

    "color",

    new THREE.Float32BufferAttribute(
        heartColors,
        3
    )

);


const heartMaterial =
    new THREE.PointsMaterial({

        size:
            .22,

        vertexColors:
            true,

        transparent:
            true,

        opacity:
            1,

        blending:
            THREE.AdditiveBlending

    });


const heart =
    new THREE.Points(

        heartGeometry,

        heartMaterial

    );


heart.position.set(
    0,
    2,
    -5
);


heartGroup.add(
    heart
);


// ======================================================
// PALABRAS
// ======================================================

const words = [

    "Amor",

    "Pasión",

    "Alegría",

    "Ternura",

    "Luz",

    "Magia",

    "Alma",

    "Infinito",

    "Siempre",

    "Tú y yo",

    "Felicidad",

    "Mi mundo",

    "Destino",

    "Casualidad",

    "Para siempre",

    "Constelación"

];


function createWord(
    text
) {


    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        512;

    canvas.height =
        128;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.font =
        "bold 44px Arial";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.shadowColor =
        "#ff19ae";


    ctx.shadowBlur =
        20;


    ctx.fillStyle =
        "#ffd5f1";


    ctx.fillText(
        text,
        256,
        64
    );


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
                false

        });


    const sprite =
        new THREE.Sprite(
            material
        );


    sprite.scale.set(
        7,
        1.75,
        1
    );


    return sprite;

}


for (
    let i = 0;
    i < 55;
    i++
) {


    const word =
        words[
            Math.floor(
                Math.random() *
                words.length
            )
        ];


    const sprite =
        createWord(
            word
        );


    sprite.position.set(

        (
            Math.random() -
            .5
        ) * 55,

        (
            Math.random() -
            .5
        ) * 32,

        (
            Math.random() -
            .5
        ) * 35

    );


    wordsGroup.add(
        sprite
    );

}


// ======================================================
// FOTOS
// ======================================================

const photoObjects = [];


// ======================================================
// CREAR FOTO CIRCULAR
// ======================================================

function createPhoto(
    file
) {


    const url =
        URL.createObjectURL(
            file
        );


    const loader =
        new THREE.TextureLoader();


    loader.load(

        url,

        texture => {


            // --------------------------------------
            // GRUPO
            // --------------------------------------

            const group =
                new THREE.Group();


            // --------------------------------------
            // FOTO
            // --------------------------------------

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


            const ratio =
                texture.image.width /
                texture.image.height;


            const size =
                6;


            photo.scale.set(

                size,

                size / ratio,

                1

            );


            // --------------------------------------
            // CÍRCULO LUMINOSO
            // --------------------------------------

            const ringCanvas =
                document.createElement(
                    "canvas"
                );


            ringCanvas.width =
                512;


            ringCanvas.height =
                512;


            const ringCtx =
                ringCanvas.getContext(
                    "2d"
                );


            ringCtx.clearRect(
                0,
                0,
                512,
                512
            );


            const center =
                256;


            const gradient =
                ringCtx.createRadialGradient(

                    center,
                    center,
                    180,

                    center,
                    center,
                    255

                );


            gradient.addColorStop(
                0,
                "rgba(255,0,180,0)"
            );


            gradient.addColorStop(
                .7,
                "rgba(255,0,180,.2)"
            );


            gradient.addColorStop(
                .9,
                "rgba(255,70,210,1)"
            );


            gradient.addColorStop(
                1,
                "rgba(150,0,255,0)"
            );


            ringCtx.fillStyle =
                gradient;


            ringCtx.beginPath();


            ringCtx.arc(

                center,
                center,

                245,

                0,
                Math.PI * 2

            );


            ringCtx.fill();


            const ringTexture =
                new THREE.CanvasTexture(
                    ringCanvas
                );


            const ringMaterial =
                new THREE.SpriteMaterial({

                    map:
                        ringTexture,

                    transparent:
                        true,

                    blending:
                        THREE.AdditiveBlending,

                    depthWrite:
                        false

                });


            const ring =
                new THREE.Sprite(
                    ringMaterial
                );


            ring.scale.set(
                7.2,
                7.2,
                1
            );


            group.add(
                ring
            );


            group.add(
                photo
            );


            // --------------------------------------
            // POSICIÓN
            // --------------------------------------

            group.position.set(

                (
                    Math.random() -
                    .5
                ) * 30,

                (
                    Math.random() -
                    .5
                ) * 18,

                (
                    Math.random() -
                    .5
                ) * 18

            );


            group.userData.basePosition =
                group.position.clone();


            group.userData.index =
                photoObjects.length;


            group.userData.angle =
                Math.random() *
                Math.PI *
                2;


            photosGroup.add(
                group
            );


            photoObjects.push(
                group
            );


            URL.revokeObjectURL(
                url
            );

        }

    );

}


// ======================================================
// CARGAR FOTOS
// ======================================================

imageInput.addEventListener(

    "change",

    function() {


        for (
            const file
            of this.files
        ) {


            if (
                file.type.startsWith(
                    "image/"
                )
            ) {


                createPhoto(
                    file
                );

            }

        }

    }

);


// ======================================================
// MÚSICA
// ======================================================

musicInput.addEventListener(

    "change",

    function() {


        const file =
            this.files[0];


        if (
            !file
        ) return;


        const url =
            URL.createObjectURL(
                file
            );


        music.src =
            url;


        music.play()
            .then(
                () => {

                    musicButton.textContent =
                        "⏸ MÚSICA";

                }
            )
            .catch(
                () => {}
            );

    }

);


// ======================================================
// CONTROL MÚSICA
// ======================================================

musicButton.addEventListener(

    "click",

    function() {


        if (
            !music.src
        ) {


            alert(
                "Selecciona primero tu canción."
            );


            return;

        }


        if (
            music.paused
        ) {


            music.play();


            musicButton.textContent =
                "⏸ MÚSICA";

        }

        else {


            music.pause();


            musicButton.textContent =
                "▶ MÚSICA";

        }

    }

);


// ======================================================
// FRASES
// ======================================================

const phrases = [

    "Ariana ❤️",

    "Entre millones de estrellas, te elegiría a ti.",

    "Tú eres mi estrella favorita. ✨",

    "Quizás fue destino... quizás casualidad.",

    "Pero encontrarte fue mi casualidad favorita. ❤️",

    "Mi universo es más bonito desde que estás tú.",

    "Tú y yo bajo el mismo cielo. 🌌",

    "Si el universo es infinito, imagina lo que siento por ti.",

    "De todas las estrellas, siempre buscaría la tuya.",

    "Para siempre, tú y yo. ❤️"

];


let phraseIndex =
    0;


function showPhrase() {


    phraseElement.classList.remove(
        "visible"
    );


    setTimeout(
        () => {


            phraseElement.textContent =
                phrases[
                    phraseIndex
                ];


            phraseElement.classList.add(
                "visible"
            );


            phraseIndex++;


            if (
                phraseIndex >=
                phrases.length
            ) {

                phraseIndex =
                    0;

            }

        },
        400
    );

}


showPhrase();


setInterval(
    showPhrase,
    5000
);


// ======================================================
// CÁMARA CINEMATOGRÁFICA
// ======================================================

let cinematicCamera =
    true;


let selectedPhoto =
    0;


let cameraTarget =
    new THREE.Vector3();


let cameraMoving =
    false;


function focusPhoto(
    index
) {


    if (
        photoObjects.length === 0
    ) {

        return;

    }


    selectedPhoto =
        index %
        photoObjects.length;


    const photo =
        photoObjects[
            selectedPhoto
        ];


    cameraMoving =
        true;


    cameraTarget.copy(
        photo.position
    );


    targetZoom =
        10;

}


// ======================================================
// BOTÓN CÁMARA
// ======================================================

cameraButton.addEventListener(

    "click",

    function() {


        cinematicCamera =
            !cinematicCamera;


        cameraButton.textContent =

            cinematicCamera

                ? "🎥 CÁMARA"

                : "⏸ CÁMARA";

    }

);


// ======================================================
// ZOOM
// ======================================================

let targetZoom =
    55;


let currentZoom =
    55;


zoomButton.addEventListener(

    "click",

    function() {


        if (
            photoObjects.length > 0
        ) {


            focusPhoto(
                selectedPhoto
            );

        }


        else {


            targetZoom =
                targetZoom === 55
                    ? 25
                    : 55;

        }

    }

);


// ======================================================
// CONTROL MANUAL
// ======================================================

let dragging =
    false;


let previousX =
    0;


let previousY =
    0;


renderer.domElement.addEventListener(

    "pointerdown",

    event => {


        dragging =
            true;


        previousX =
            event.clien
