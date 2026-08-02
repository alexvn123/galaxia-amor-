function crearCorazon(){
corazon = new THREE.Group();
const totalPuntos = 2500;
const geometry = new THREE.BufferGeometry();
const pos = [];
const color = new THREE.Color(0xff2e88);

for(let i=0;i<totalPuntos;i++){
  const t = Math.random() * Math.PI * 2;
  const a = 16 * Math.pow(Math.sin(t),3);
  const b = 13 * Math.cos(t) - 5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
  const escala = Math.random()*0.4+0.6;
  pos.push(a*escala, b*escala+(Math.random()-.5)*1.5, (Math.random()-.5)*2);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos,3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(Array(7500).fill([1,0.2,0.6]).flat(),3));
const mat = new THREE.PointsMaterial({size:.22, vertexColors:true, transparent:true, opacity:.95});
const pts = new THREE.Points(geometry, mat);
corazon.add(pts);
corazon.position.set(0,0,-10);
scene.add(corazon);
}
