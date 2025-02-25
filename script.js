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

// ✅ Enable mouse controls to rotate the cube (ADD THIS HERE)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

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

window.addEventListener('click', (event) => {
    // Cast a ray to detect which cubie was clicked
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubies);

    if (intersects.length > 0) {
        rotateFace(intersects[0].object);
    }
});

function rotateFace(cubie) {
    const rotationAxis = new THREE.Vector3(0, 1, 0); // Rotate around Y-axis
    const angle = Math.PI / 2;
    
    // Rotate all cubies that belong to the same layer
    cubies.forEach(c => {
        if (Math.abs(c.position.y - cubie.position.y) < 0.1) {
            c.rotateOnAxis(rotationAxis, angle);
        }
    });
}

