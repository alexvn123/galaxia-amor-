// ==========================================
// MI UNIVERSO - ARIANA
// SIN THREE.JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const intro =
        document.getElementById("intro");

    const universe =
        document.getElementById("universe");

    const enterButton =
        document.getElementById("enterButton");

    const canvas =
        document.getElementById("galaxy");

    const ctx =
        canvas.getContext("2d");

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById("musicButton");

    const phrase =
        document.getElementById("phrase");

    const photosContainer =
        document.getElementById("photos");

    const previous =
        document.getElementById("previous");

    const next =
        document.getElementById("next");

    const current =
        document.getElementById("current");

    const total =
        document.getElementById("total");

    const finalMessage =
        document.getElementById("finalMessage");


    // ==========================================
    // FOTOS
    // ==========================================

    const fotos = [

        {
            src: "imagenes/ariana1.jpg",
            frase:
                "A veces una casualidad puede cambiarlo todo."
        },

        {
            src: "imagenes/ariana2.jpg",
            frase:
                "De todas las personas, tuve la suerte de encontrarte."
        },

        {
            src: "imagenes/ariana3.jpg",
            frase:
                "Quizás fue destino..."
        },

        {
            src: "imagenes/ariana4.jpg",
            frase:
                "...o quizás la casualidad más bonita."
        },

        {
            src: "imagenes/ariana5.jpg",
            frase:
                "Pero hoy sé que te elegiría una y otra vez."
        },

        {
            src: "imagenes/ariana6.jpg",
            frase:
                "Ariana, tú eres mi universo."
        }

    ];


    let fotoActual = 0;

    total.textContent =
        String(fotos.length).padStart(2, "0");


    // ==========================================
    // CANVAS
    // ==========================================

    let width = 0;

    let height = 0;

    let stars = [];

    let particles = [];


    function resize() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            width * ratio;

        canvas.height =
            height * ratio;

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";


        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        crearEstrellas();

        crearGalaxia();

    }


    window.addEventListener(
        "resize",
        resize
    );


    // ==========================================
    // ESTRELLAS
    // ==========================================

    function crearEstrellas() {

        stars = [];


        const cantidad =
            width < 600
                ? 700
                : 1400;


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            stars.push({

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

                speed:
                    Math.random() *
                    .5 +
                    .1,

                alpha:
                    Math.random()

            });

        }

    }


    // ==========================================
    // GALAXIA
    // ==========================================

    function crearGalaxia() {

        particles = [];


        for (
            let i = 0;
            i < 4500;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const radius =
                Math.sqrt(
                    Math.random()
                ) * 550;


            particles.push({

                angle:
                    angle,

                radius:
                    radius,

                size:
                    Math.random() *
                    1.8 +
                    .2,

                alpha:
                    Math.random(),

                speed:
                    .0001 +
                    Math.random() *
                    .0004

            });

        }

    }


    // ==========================================
    // DIBUJAR
    // ==========================================

    let tiempo = 0;


    function render() {

        tiempo += .01;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        // --------------------------
        // FONDO
        // --------------------------

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
            "#16051b"
        );


        fondo.addColorStop(
            .4,
            "#07020d"
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


        // --------------------------
        // ESTRELLAS
        // --------------------------

        stars.forEach(
            star => {

                star.y +=
                    star.speed;


                if (
                    star.y >
                    height
                ) {

                    star.y =
                        0;

                }


                const brillo =

                    .4 +

                    Math.sin(
                        tiempo * 3 +
                        star.alpha * 20
                    ) *
                    .3;


                ctx.globalAlpha =
                    brillo;


                ctx.beginPath();


                ctx.arc(

                    star.x,

                    star.y,

                    star.size,

                    0,
                    Math.PI * 2

                );


                ctx.fillStyle =
                    "#ffffff";


                ctx.fill();

            }
        );


        // --------------------------
        // GALAXIA
        // --------------------------

        const cx =
            width / 2;

        const cy =
            height / 2;


        particles.forEach(
            p => {

                const a =
                    p.angle +
                    tiempo *
                    p.speed *
                    100;


                const r =
                    p.radius;


                const x =
                    cx +
                    Math.cos(a) *
                    r;


                const y =
                    cy +
                    Math.sin(a) *
                    r *
                    .38;


                const alpha =

                    .15 +

                    (
                        1 -
                        r / 550
                    ) *
                    .7;


                ctx.globalAlpha =
                    alpha;


                ctx.beginPath();


                ctx.arc(

                    x,

                    y,

                    p.size,

                    0,
                    Math.PI * 2

                );


                ctx.fillStyle =

                    Math.random() > .5
                        ? "#ff43c7"
                        : "#b47cff";


                ctx.fill();

            }
        );


        // --------------------------
        // CORAZÓN
        // --------------------------

        dibujarCorazon();


        ctx.globalAlpha = 1;


        requestAnimationFrame(
            render
        );

    }


    // ==========================================
    // CORAZÓN
    // ==========================================

    function dibujarCorazon() {

        const cx =
            width / 2;


        const cy =
            height * .53;


        const escala =
            Math.min(
                width,
                height
            ) *
            .013;


        for (
            let i = 0;
            i < 1100;
            i++
        ) {

            const t =
                Math.random() *
                Math.PI *
                2;


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


            const dispersion =
                Math.random() *
                1.15;


            ctx.globalAlpha =
                .3 +
                Math.random() *
                .7;


            ctx.beginPath();


            ctx.arc(

                cx +
                x *
                escala *
                dispersion,

                cy -
                y *
                escala *
                dispersion,

                Math.random() *
                2.5 +
                .5,

                0,
                Math.PI * 2

            );


            ctx.fillStyle =

                Math.random() > .3
                    ? "#ff31bd"
                    : "#ffd0ed";


            ctx.fill();

        }

    }


    // ==========================================
    // CREAR FOTOS
    // ==========================================

    function crearFotos() {

        photosContainer.innerHTML = "";


        fotos.forEach(
            (foto, index) => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "photo";


                const img =
                    document.createElement(
                        "img"
                    );


                img.src =
                    foto.src;


                img.alt =
                    "Ariana";


                // Si no encuentra
                // la imagen NO rompe
                // la galaxia.

                img.onerror =
                    () => {

                        img.style.display =
                            "none";


                        div.style.background =
                            "linear-gradient(135deg,#ff4fba,#30102c)";

                    };


                div.appendChild(
                    img
                );


                photosContainer.appendChild(
                    div
                );

            }
        );

    }


    // ==========================================
    // POSICIONAR FOTOS
    // ==========================================

    function actualizarFotos() {

        const elementos =
            document.querySelectorAll(
                ".photo"
            );


        elementos.forEach(
            (elemento, index) => {

                const diferencia =
                    index -
                    fotoActual;


                const x =
                    diferencia *
                    180;


                const y =
                    Math.abs(
                        diferencia
                    ) *
                    30;


                const z =
                    Math.abs(
                        diferencia
                    ) *
                    -150;


                const escala =

                    diferencia === 0
                        ? 1.2
                        : .7;


                const opacidad =

                    Math.abs(
                        diferencia
                    ) > 2
                        ? 0
                        : 1;


                elemento.style.transform =

                    `translate3d(
                        calc(-50% + ${x}px),
                        calc(-50% + ${y}px),
                        ${z}px
                    )
                    scale(${escala})`;


                elemento.style.opacity =
                    opacidad;

            }
        );


        current.textContent =
            String(
                fotoActual + 1
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
                        fotoActual
                    ].frase;


                phrase.classList.add(
                    "show"
                );

            },
            200
        );

    }


    // ==========================================
    // ENTRAR
    // ==========================================

    enterButton.addEventListener(
        "click",
        () => {

            console.log(
                "ENTRANDO AL UNIVERSO..."
            );


            intro.classList.add(
                "hide"
            );


            universe.classList.add(
                "show"
            );


            crearFotos();


            actualizarFotos();


            // Intentar música

            music.volume =
                .65;


            music.play()
                .then(
                    () => {

                        musicButton.textContent =
                            "❚❚";

                    }
                )
                .catch(
                    error => {

                        console.log(
                            "Audio pendiente:",
                            error
                        );

                    }
                );

        }
    );


    // ==========================================
    // SIGUIENTE
    // ==========================================

    next.addEventListener(
        "click",
        () => {

            fotoActual++;

            if (
                fotoActual >=
                fotos.length
            ) {

                fotoActual = 0;

            }


            actualizarFotos();

        }
    );


    // ==========================================
    // ANTERIOR
    // ==========================================

    previous.addEventListener(
        "click",
        () => {

            fotoActual--;

            if (
                fotoActual < 0
            ) {

                fotoActual =
                    fotos.length - 1;

            }


            actualizarFotos();

        }
    );


    // ==========================================
    // MÚSICA
    // ==========================================

    musicButton.addEventListener(
        "click",
        () => {

            if (
                music.paused
            ) {

                music.play()
                    .then(
                        () => {

                            musicButton.textContent =
                                "❚❚";

                        }
                    );

            }

            else {

                music.pause();

                musicButton.textContent =
                    "♪";

            }

        }
    );


    // ==========================================
    // INICIAR
    // ==========================================

    resize();

    render();

});
