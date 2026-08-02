let estrellas = [];
let palabras = ["Amor", "Ternura", "Pasión", "Magia", "Para siempre", "Tú y yo",
                "Infinito", "Luz", "Alma", "Felicidad", "Mi universo", "Constelación"];
let activo = false;

function iniciarGalaxia(){ activo = true; }

function setup(){
  createCanvas(windowWidth, windowHeight);
  // Generar 5000 estrellas de la galaxia espiral
  for(let i=0; i<5000; i++){
    let angulo = random(TWO_PI);
    let radio = random(10, min(width,height)/2 - 50);
    estrellas.push({
      x: cos(angulo)*radio, y: sin(angulo)*radio,
      z: random(0.5, 2),
      c: random()<0.33 ? color(255) : random()<0.66 ? color(143,211,255) : color(255,157,245)
    });
  }
}

function draw(){
  background(0, 5);
  if(!activo) return;

  translate(width/2, height/2);
  rotate(frameCount * 0.002);

  // DIBUJAR GALAXIA DE ESTRELLAS
  noStroke();
  estrellas.forEach(e=>{ fill(e.c); circle(e.x, e.y, e.z); });

  // DIBUJAR CORAZÓN ROSA BRILLANTE EN EL CENTRO ❤️
  drawCorazon(0, 0, 16);

  // DIBUJAR PALABRAS FLOTANTES ALREDEDOR
  drawPalabras();
}

// FUNCIÓN DEL CORAZÓN PERFECTO
function drawCorazon(x, y, tam){
  fill(255, 30, 136, 220); noStroke();
  beginShape();
  for(let a=0; a<TWO_PI; a+=0.05){
    let sx = 16*pow(sin(a),3);
    let sy = -(13*cos(a)-5*cos(2*a)-2*cos(3*a)-cos(4*a));
    vertex(sx*tam/10, sy*tam/10);
  }
  endShape(CLOSE);
  // Brillo extra
  fill(255, 200, 230, 100);
  for(let i=0; i<200; i++){
    let a = random(TWO_PI); let r = random(8,16);
    circle(16*pow(sin(a),3)*r/10, -(13*cos(a)-5*cos(2*a)-2*cos(3*a)-cos(4*a))*r/10, random(1,2));
  }
}

// PALABRAS ROMÁNTICAS ALREDEDOR
function drawPalabras(){
  textFont('Arial'); textSize(22); textAlign(CENTER, CENTER);
  fill(255,255,255,220);
  for(let i=0; i<palabras.length; i++){
    let ang = map(i,0,palabras.length,0,TWO_PI)+frameCount*0.001;
    let r = min(width,height)/2 - 60;
    push(); translate(cos(ang)*r, sin(ang)*r); rotate(ang+HALF_PI);
    text(palabras[i], 0, 0); pop();
  }
}

function windowResized(){ resizeCanvas(windowWidth, windowHeight); }
