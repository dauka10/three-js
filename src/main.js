import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
});

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  const texture = new THREE.TextureLoader().load('/pls.png');
  texture.colorSpace = THREE.SRGBColorSpace;

  // Create coin geometry (flat cylinder)
  const coinGeometry = new THREE.CylinderGeometry(10, 10, 1, 96, 1, false);
  const coinMaterial = new THREE.MeshStandardMaterial({ 
    map: texture,
    metalness: 0.3,
    roughness: 0.7
  });
  
  const mesh = new THREE.Mesh(coinGeometry, coinMaterial);
  mesh.rotation.x = Math.PI/2 ;
  mesh.rotation.z = Math.PI/2 + Math.PI/6; // 90 degrees + 30 degrees = 120 degrees
  mesh.position.set(0, 0, 0); 
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.scale.set(0.9,0.9,0.9);
  scene.add(mesh);

  const mtlLoader = new MTLLoader();
  const objLoader = new OBJLoader();
  
  mtlLoader.load('/10868_birthday-cake_v3.mtl', (materials) => {
    materials.preload();
    objLoader.setMaterials(materials);
    
    objLoader.load('/10868_birthday-cake_v3.obj', (object) => {
      object.rotation.x = Math.PI*1.85;
      object.rotation.y = Math.PI/6;
      object.rotation.z = Math.PI/6;
      object.scale.set(1, 1, 1); 
      object.position.set(-22, -8, -5); 
      object.castShadow = true;
      object.receiveShadow = true;
      
      scene.add(object);
    });
  });

 
  objLoader.load('/20813_Number_3_v1.obj', (object) => {
    
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x0066ff, 
          metalness: 0.3,
          roughness: 0.7
        });
      }
    });
    
    object.rotation.x = Math.PI*1.5;
    object.rotation.y = Math.PI/6.7;
    object.rotation.z = Math.PI*1.85;
    object.scale.set(0.3, 0.3, 0.3);
    object.position.set(12, 4, 7); 
    object.castShadow = true;
    object.receiveShadow = true;
    
    scene.add(object);
    object.userData = { 
      rotationSpeed: 0.024,
      floatSpeed: 0.02,
      floatOffset: 0
    };
  });

  objLoader.load('/20815_Number_5_v1.obj', (object) => {
    
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x0066ff,
          metalness: 0.3,
          roughness: 0.7
        });
      }
    });
    
    object.rotation.x = Math.PI*1.5;
    object.rotation.y = Math.PI/4.4;
    object.rotation.z = Math.PI*1.85;
    object.scale.set(0.3, 0.3, 0.3);
    object.position.set(10, 6, 5); 
    object.castShadow = true;
    object.receiveShadow = true;
    
    scene.add(object);
    object.userData = { 
      rotationSpeed: 0.024,
      floatSpeed: 0.025,
      floatOffset: Math.PI/2
    };
  });

  import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
  import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

  const fontLoader = new FontLoader();
  fontLoader.load(new URL('./Brich_Regular.json', import.meta.url).href, (font) => {
    const textGeometry = new TextGeometry('by Daulet Ozgeldi', {
      font,
      size: 4.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    });

    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.7 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-30, 0, -15);
    textMesh.rotation.x = Math.PI*3/2;
    textMesh.rotation.z = Math.PI/4;
    textMesh.castShadow = true;
    textMesh.receiveShadow = true;
    scene.add(textMesh);
  });

  const pointLight = new THREE.PointLight(0xffffff, 1000)
  pointLight.position.set(15,0,15)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
  scene.add(pointLight, ambientLight)
  


  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff} )
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(400));

    star.position.set(x,y,z);
    scene.add(star)
  }

  Array(500).fill().forEach(addStar)

  const spaceTexture = new THREE.TextureLoader().load('/black.jpg');
  spaceTexture.colorSpace = THREE.SRGBColorSpace;

  scene.background = spaceTexture;

  function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.z -= 0.02; 
    
    
    // scene.children.forEach(child => {
    //   if (child.userData && child.userData.rotationSpeed) {
        // Add multiple axis rotations for space-like movement
    //     child.rotation.x += child.userData.rotationSpeed * 0.5;
    //     child.rotation.y += child.userData.rotationSpeed;
    //     child.rotation.z += child.userData.rotationSpeed * 0.3;
        
    //     // Add floating motion
    //     if (child.userData.floatSpeed) {
    //       child.position.y += Math.sin(Date.now() * 0.001 + child.userData.floatOffset) * child.userData.floatSpeed;
    //     }
    //   }
    // });

    controls.update();

    renderer.render(scene, camera);
  }

  animate()