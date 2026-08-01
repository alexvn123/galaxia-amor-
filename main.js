// ============================
// ELEMENTOS HTML
// ============================

const loader = document.getElementById("loader");
const inicio = document.getElementById("mensajeInicio");
const musica = document.getElementById("musica");

// ============================
// PANTALLA DE CARGA
// ============================

setTimeout(() => {

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";
        inicio.style.display = "flex";

    },1000);

},3000);

// ============================
// VARIABLES THREE.JS
// ============================

let scene;
let camera;
let renderer;

let galaxy;

// ============================

document.getElementById("entrar").onclick = () => {

    musica.play();

    inicio.style.display = "none";

    crearGalaxia();

}

// ============================
// CREAR ESCENA
// ============================

function crearGalaxia(){

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(

75,

window.innerWidth/window.innerHeight,

0.1,

2000

);

camera.position.z = 90;

//----------------------------

renderer = new THREE.WebGLRenderer({

antialias:true,

alpha:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

renderer.setPixelRatio(

window.devicePixelRatio

);

document.body.appendChild(

renderer.domElement

);

//----------------------------

crearEstrellas();

animar();

}

// ============================
// GALAXIA
// ============================

function crearEstrellas(){

galaxy = new THREE.Group();

scene.add(galaxy);

const geometry = new THREE.BufferGeometry();

const total = 50000;

const posiciones = [];

const colores = [];

for(let i=0;i<total;i++){

const radio = Math.random()*60;

const brazo = (i%4)*(Math.PI/2);

const angulo = radio*0.35+brazo;

const x =

Math.cos(angulo)*radio+

(Math.random()-0.5)*2;

const y =

(Math.random()-0.5)*4;

const z =

Math.sin(angulo)*radio+

(Math.random()-0.5)*2;

posiciones.push(x,y,z);

// Colores

const color = new THREE.Color();

const tipo = Math.random();

if(tipo<0.33){

color.set("#ffffff");

}

else if(tipo<0.66){

color.set("#8fd3ff");

}

else{

color.set("#ff9df5");

}

colores.push(

color.r,

color.g,

color.b

);

}

geometry.setAttribute(

'position',

new THREE.Float32BufferAttribute(

posiciones,

3

)

);

geometry.setAttribute(

'color',

new THREE.Float32BufferAttribute(

colores,

3

)

);

const material = new THREE.PointsMaterial({

size:0.12,

vertexColors:true,

transparent:true,

opacity:0.9

});

const stars = new THREE.Points(

geometry,

material

);

galaxy.add(stars);

}

// ============================
// ANIMACIÓN
// ============================

function animar(){

requestAnimationFrame(animar);

galaxy.rotation.y += 0.0008;

galaxy.rotation.z += 0.0002;

renderer.render(

scene,

camera

);

}

// ============================
// RESPONSIVE
// ============================

window.addEventListener("resize",()=>{

if(!camera)return;

camera.aspect=

window.innerWidth/

window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});
