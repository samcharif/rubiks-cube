// Import Three.js (only needed if using npm)
// import * as THREE from 'three';

// Create the Scene
const scene = new THREE.Scene();

// Create the Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Move the camera back to see the cube

// Create the Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Attach it to the page

// Add Lighting
const light = new THREE.AmbientLight(0xffffff, 1.5); // White light
scene.add(light);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Create a 3x3x3 Rubik's Cube
const cubies = [];
const cubeSize = 1.1; // Slightly spaced apart to look real

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            
            // Different colors for each face
            const materials = [
                new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
                new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
                new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
                new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
                new THREE.MeshBasicMaterial({ color: 0xffa500 }), // Orange
                new THREE.MeshBasicMaterial({ color: 0xffffff })  // White
            ];

            const cubie = new THREE.Mesh(geometry, materials);
            cubie.position.set(x * cubeSize, y * cubeSize, z * cubeSize);
            scene.add(cubie);
            cubies.push(cubie);
        }
    }
}

