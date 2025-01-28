import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



    
    // const textContainer = document.getElementById('textContainer');
    

const scene = new THREE.Scene();
scene.background = new THREE.Color("#000");

// Camera
const camera = new THREE.PerspectiveCamera(
    15,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


const loader = new GLTFLoader();
loader.load(
    'car.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, 0);
    }
);

let azimuthalAngle = 0; 
const radius = 15;
const scrollSensitivity = 0.3;
let fullRotations = 0;


window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        azimuthalAngle += scrollSensitivity;
    } else if (event.deltaY < 0) {
        azimuthalAngle -= scrollSensitivity;
    }

    const rotations = Math.floor(azimuthalAngle / (2 * Math.PI));
    const leftText = document.getElementById('leftText');
    const rightText = document.getElementById('rightText');
    const topText = document.getElementById('topText');
    if (rotations > fullRotations) {
        fullRotations = rotations;
        console.log(fullRotations);

        if (fullRotations === 3) {
            leftText.style.left = '10%';
            rightText.style.right = '10%';
            topText.style.top = '10%';
        }
    }
});

function updateCameraPosition() {
    camera.position.x = radius * Math.sin(azimuthalAngle);
    camera.position.z = radius * Math.cos(azimuthalAngle);
    camera.lookAt(0, 0, 0);
}

function animate() {
    requestAnimationFrame(animate);

    updateCameraPosition();
    controls.update();
    renderer.render(scene, camera);
}

animate();
