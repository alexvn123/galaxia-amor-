let nebulosas=[];
function crearNebulosas(){
  const cols=[0xff66ff,0x66ccff,0xaa66ff,0xff99cc,0xff66aa];
  for(let i=0;i<30;i++){
    const g=new THREE.SphereGeometry(Math.random()*5+3,32,32);
    const m=new THREE.MeshBasicMaterial({color:cols[Math.floor(Math.random()*cols.length)], transparent:true, opacity:.07});
    const n=new THREE.Mesh(g,m);
    n.position.set((Math.random()-.5)*200,(Math.random()-.5)*70,(Math.random()-.5)*200);
    scene.add(n); nebulosas.push(n);
  }
}
function animarNebulosas(){nebulosas.forEach(n=>{n.rotation.y+=.0006; n.rotation.x+=.00025;});}
