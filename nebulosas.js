// =======================================
// NEBULOSAS
// =======================================

let nebulosas = [];

function crearNebulosas(){

    const colores = [

        0xff66ff,
        0x66ccff,
        0xaa66ff,
        0xff99cc

    ];

    for(let i=0;i<25;i++){

        const geometria = new THREE.SphereGeometry(

            Math.random()*4+3,

            32,

            32

        );

        const material = new THREE.MeshBasicMaterial({

            color: colores[Math.floor(Math.random()*colores.length)],

            transparent:true,

            opacity:0.08

        });

        const nube = new THREE.Mesh(

            geometria,

            material

        );

        nube.position.set(

            (Math.random()-0.5)*180,

            (Math.random()-0.5)*60,

            (Math.random()-0.5)*180

        );

        scene.add(nube);

        nebulosas.push(nube);

    }

}

function animarNebulosas(){

    nebulosas.forEach(nube=>{

        nube.rotation.y += 0.0008;
        nube.rotation.x += 0.0003;

    });

}
