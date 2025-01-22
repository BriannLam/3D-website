import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color("#000");

// Camera
const camera = new THREE.PerspectiveCamera(
    50, // Increased FOV to capture more of the scene
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 10); // Start farther back on the z-axis

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

// Load 3D model
const loader = new GLTFLoader();
loader.load(
    'car.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, 0);
    }
);

// Variables to track camera rotation
let azimuthalAngle = 0; // Horizontal rotation angle
const radius = 15; // Increased radius to move the camera farther away
const scrollSensitivity = 0.3; // Adjust this value to control the speed of rotation

// Event listener for mouse wheel scroll
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        // Scrolling down moves the camera to the right
        azimuthalAngle += scrollSensitivity;
    } else if (event.deltaY < 0) {
        // Scrolling up moves the camera to the left
        azimuthalAngle -= scrollSensitivity;
    }
});

// Update camera position based on azimuthal angle
function updateCameraPosition() {
    camera.position.x = radius * Math.sin(azimuthalAngle);
    camera.position.z = radius * Math.cos(azimuthalAngle);
    camera.lookAt(0, 0, 0); // Ensure the camera always looks at the center
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    updateCameraPosition(); // Update camera based on azimuthal angle
    controls.update();
    renderer.render(scene, camera);
}

animate();
