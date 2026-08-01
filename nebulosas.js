let nebulosas=[];
function crearNebulosas(){
  const cols=[0xff66ff,0x66ccff,0xaa66ff,0xff99cc];
  for(let i=0;i<25;i++){
    const g=new THREE.SphereGeometry(Math.random()*4+3,32,32);
    const m=new THREE.MeshBasicMaterial({color:cols[Math.floor(Math.random()*cols.length)], transparent:true, opacity:.08});
    const n=new THREE.Mesh(g,m);
    n.position.set((Math.random()-.5)*180,(Math.random()-.5)*60,(Math.random()-.5)*180);
    scene.add(n); nebulosas.push(n);
  }
}
function animarNebulosas(){nebulosas.forEach(n=>{n.rotation.y+=.0008; n.rotation.x+=.0003;});}
