const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor(0xb7c3f3, 1)

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

// Global Variables
const start_position = 3
const end_position = -start_position 

function createCube(size, positonX, rotY = 0, color = 0xfbc851){
    const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
    const material = new THREE.MeshBasicMaterial( { color: color } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = positonX
    cube.rotation.y = rotY
    scene.add( cube );
    return cube; 
}

camera.position.z = 5;

const loader = new THREE.GLTFLoader();

class Doll {
    constructor(){
        loader.load("../model/scene.gltf", (gltf) => {
            scene.add(gltf.scene)
            gltf.scene.scale.set(.4, .4, .4); 
            gltf.scene.position.set(0, -1, 0)
            this.doll = gltf.scene;
        })
    }

    lookBackward(){
        gsap.to(this.doll.rotation, {y: -3.15, duration: .45})
    }

    lookForward(){
        gsap.to(this.doll.rotation, {y: 0, duration: .45})
    }
}

function createTrack(){
    createCube({w: start_position*2, h: 1.5, d: 1}, 0, 0).position.z = -.85
    createCube({w: .2, h: 1.5, d: 1}, start_position, -.35)
    createCube({w: .2, h: 1.5, d: 1}, end_position, .35)
}

createTrack()

let doll = new Doll()
setTimeout(() => {
    doll.lookBackward()
}, 1000)

function animate() {
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}