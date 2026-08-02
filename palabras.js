function crearPalabras(){
const lista = [
  "Amor", "Ternura", "Pasión", "Magia", "Para siempre", "Tú y yo",
  "Infinito", "Luz", "Alma", "Felicidad", "Mi universo", "Constelación"
];
const canvas = document.createElement('canvas'); canvas.width=512; canvas.height=256;
const ctx = canvas.getContext('2d'); ctx.font="bold 38px Arial"; ctx.textAlign="center";

lista.forEach((texto,i)=>{
  ctx.clearRect(0,0,512,256); ctx.fillStyle="#fff"; ctx.shadowColor="#ff66cc"; ctx.shadowBlur=20;
  ctx.fillText(texto,256,130);
  const tex = new THREE.CanvasTexture(canvas); tex.needsUpdate=true;
  const mat = new THREE.SpriteMaterial({map:tex, transparent:true, opacity:.8});
  const sp = new THREE.Sprite(mat);
  const ang = (i/lista.length)*Math.PI*2; const radio=40;
  sp.position.set(Math.cos(ang)*radio, Math.sin(ang)*radio+12, -15);
  sp.scale.set(14,7,1); sp.userData.offset=i;
  palabras.push(sp); scene.add(sp);
});
}
