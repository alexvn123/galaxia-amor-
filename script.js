const universo = document.getElementById("universo");

//========================
// CREAR ESTRELLAS
//========================

for(let i=0;i<500;i++){

    const estrella=document.createElement("div");

    estrella.classList.add("estrella");

    const tamaño=Math.random()*3+1;

    estrella.style.width=tamaño+"px";
    estrella.style.height=tamaño+"px";

    estrella.style.left=Math.random()*window.innerWidth+"px";

    estrella.style.top=Math.random()*window.innerHeight+"px";

    estrella.style.animationDuration=
        (Math.random()*3+1)+"s";

    universo.appendChild(estrella);

}
//========================
// FRASES DE AMOR
//========================

const frases=[

"Eres mi estrella favorita ❤️",

"Mi universo comienza contigo 🌌",

"Siempre te elegiría 💖",

"Contigo todo brilla ✨",

"Eres mi galaxia favorita 🌠",

"Mi corazón viaja hacia ti ❤️",

"Te amo hasta el infinito 💫",

"Eres mi destino ⭐",

"Nuestro amor ilumina el universo 🌌",

"Siempre serás mi constelación ❤️"

];

//========================
// CLIC
//========================

document.addEventListener("click",function(e){

    const frase=document.createElement("div");

    frase.className="frase";

    frase.innerHTML=

frases[Math.floor(Math.random()*frases.length)];

    frase.style.left=e.pageX+"px";

    frase.style.top=e.pageY+"px";

    universo.appendChild(frase);

    setTimeout(()=>{

        frase.remove();

    },4000);

    // Corazón

    const corazon=document.createElement("div");

    corazon.className="corazon";

    corazon.innerHTML="❤️";

    corazon.style.left=e.pageX+"px";

    corazon.style.top=e.pageY+"px";

    universo.appendChild(corazon);

    setTimeout(()=>{

        corazon.remove();

    },3000);

});

//========================
// ESTRELLAS FUGACES
//========================

setInterval(()=>{

    const fugaz=document.createElement("div");

    fugaz.className="fugaz";

    fugaz.style.left=Math.random()*window.innerWidth+"px";

    fugaz.style.top=Math.random()*200+"px";

    universo.appendChild(fugaz);

    setTimeout(()=>{

        fugaz.remove();

    },2000);

},2500);
