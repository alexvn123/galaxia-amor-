//============================
// CARGA
//============================

const loader=document.getElementById("loader");

const inicio=document.getElementById("mensajeInicio");

const musica=document.getElementById("musica");

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

inicio.style.display="flex";

},1000);

},3000);

//============================

document
.getElementById("entrar")
.onclick=function(){

musica.play();

inicio.style.display="none";

// Aquí construiremos la galaxia
crearGalaxia();

}

//============================

function crearGalaxia(){

console.log("Universo iniciado");

}
