// ================================
// PLANETAS
// ================================

let planeta;
let anillo;

function crearPlanetas(){

    //------------------------
    // Planeta
    //------------------------

    const geometria = new THREE.SphereGeometry(4,64,64);

    const material = new THREE.MeshStandardMaterial({

        color:0x66ccff,

        roughness:0.6,

        metalness:0.2

    });

    planeta = new THREE.Mesh(
        geometria,
        material
    );

    planeta.position.set(35,10,-20);

    scene.add(planeta);

    //------------------------
    // Anillo
    //------------------------

    const ring = new THREE.RingGeometry(5.5,8,64);

    const ringMaterial = new THREE.MeshBasicMaterial({

        color:0xffddaa,

        side:THREE.DoubleSide,

        transparent:true,

        opacity:.7

    });

    anillo = new THREE.Mesh(

        ring,

        ringMaterial

    );

    anillo.rotation.x = Math.PI/2.5;

    planeta.add(anillo);

}

//=========================

function animarPlanetas(){

    if(planeta){

        planeta.rotation.y += 0.004;

    }

}
