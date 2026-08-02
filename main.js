const loader = document.getElementById("loader");
const mensajeInicio = document.getElementById("mensajeInicio");
const entrar = document.getElementById("entrar");
const musica = document.getElementById("musica");

let scene, camera, renderer, galaxy, corazon, palabras = [];

function crearGalaxia(){
scene = new THREE.Scene();
scene.background = new THREE.Color(0x000212);

const luz = new THREE.PointLight(0xffffff, 3.5); luz.position.set(25,25,25); scene.add(luz);
scene.add(new THREE.AmbientLight(0x9977aa));

camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,2000);
camera.position.z = 70; camera.lookAt(0,0,0);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

crearEstrellas();
if(typeof crearPlanetas==="function") crearPlanetas();
if(typeof crearNebulosas==="function") crearNebulosas();
animar();
}

function crearEstrellas(){
galaxy = new THREE.Group(); scene.add(galaxy);
const g = new THREE.BufferGeometry();
const total = 55000; const pos=[]; const col=[];
for(let i=0;i<total;i++){
  const r=Math.random()*65; const brazo=(i%4)*(Math.PI/2); const ang=r*0.33+brazo;
  pos.push(Math.cos(ang)*r+(Math.random()-.5)*2.5, (Math.random()-.5)*5, Math.sin(ang)*r+(Math.random()-.5)*2.5);
  const c=new THREE.Color(); let t=Math.random();
  c.set(t<.25?"#ffffff":t<.5?"#aaddff":t<.75?"#ff99ee":"#ff55cc");
  col.push(c.r,c.g,c.b);
}
g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
const m = new THREE.PointsMaterial({size:.13, vertexColors:true, transparent:true, opacity:.92});
galaxy.add(new THREE.Points(g,m));
}

function animar(){
requestAnimationFrame(animar);
galaxy.rotation.y += .0007; galaxy.rotation.z += .00015;
if(corazon) corazon.rotation.z += 0.001;
if(palabras && palabras.length>0){
  palabras.forEach(p=>{
    p.rotation.y += 0.0005;
    p.position.y += Math.sin(Date.now()*0.001+p.userData.offset)*0.003;
  });
}
if(typeof animarPlanetas==="function") animarPlanetas();
if(typeof animarNebulosas==="function") animarNebulosas();
renderer.render(scene,camera);
}

window.addEventListener("resize",()=>{
if(!camera)return; camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth,window.innerHeight);
});
