const loader = document.getElementById("loader");
const mensajeInicio = document.getElementById("mensajeInicio");
const entrar = document.getElementById("entrar");
const musica = document.getElementById("musica");

let scene, camera, renderer, galaxy;

function crearGalaxia(){
scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const luz = new THREE.PointLight(0xffffff, 3);
luz.position.set(20,20,20); scene.add(luz);
scene.add(new THREE.AmbientLight(0x888888));

camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,2000);
camera.position.z = 65; camera.lookAt(0,0,0);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

crearEstrellas();
if(typeof crearPlanetas==="function") crearPlanetas();
if(typeof crearNebulosas==="function") crearNebulosas();
animar();
}

function crearEstrellas(){
galaxy = new THREE.Group(); scene.add(galaxy);
const g = new THREE.BufferGeometry();
const total = 50000; const pos=[]; const col=[];
for(let i=0;i<total;i++){
  const r=Math.random()*60; const brazo=(i%4)*(Math.PI/2);
  const ang=r*0.35+brazo;
  pos.push(Math.cos(ang)*r+(Math.random()-.5)*2, (Math.random()-.5)*4, Math.sin(ang)*r+(Math.random()-.5)*2);
  const c=new THREE.Color(); let t=Math.random();
  c.set(t<.33?"#fff":t<.66?"#8fd3ff":"#ff9df5");
  col.push(c.r,c.g,c.b);
}
g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
const m = new THREE.PointsMaterial({size:.12, vertexColors:true, transparent:true, opacity:.9});
galaxy.add(new THREE.Points(g,m));
}

function animar(){
requestAnimationFrame(animar);
galaxy.rotation.y += .0008; galaxy.rotation.z += .0002;
if(typeof animarPlanetas==="function") animarPlanetas();
if(typeof animarNebulosas==="function") animarNebulosas();
renderer.render(scene,camera);
}

addEventListener("resize",()=>{
if(!camera)return; camera.aspect=innerWidth/innerHeight;
camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight);
});
