let planeta;
function crearPlanetas(){
  const g = new THREE.SphereGeometry(4,64,64);
  const m = new THREE.MeshStandardMaterial({color:0x66ccff, roughness:.6, metalness:.2});
  planeta = new THREE.Mesh(g,m); planeta.position.set(35,10,-20); scene.add(planeta);

  const rg = new THREE.RingGeometry(5.5,8,64);
  const rm = new THREE.MeshBasicMaterial({color:0xffddaa, side:THREE.DoubleSide, transparent:true, opacity:.7});
  const anillo = new THREE.Mesh(rg,rm); anillo.rotation.x=Math.PI/2.5; planeta.add(anillo);
}
function animarPlanetas(){if(planeta) planeta.rotation.y+=.004;}
