import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
});

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  const earthTexture = new THREE.TextureLoader().load(new URL('./1.jpg', import.meta.url).href);
  earthTexture.colorSpace = THREE.SRGBColorSpace;
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.MeshStandardMaterial({ map: earthTexture, metalness: 0, roughness: 1 })
  );

  scene.add(sphere)



  const pointLight = new THREE.PointLight(0xffffff, 1000)
  pointLight.position.set(15,0,15)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
  scene.add(pointLight, ambientLight)
  
  // const lightHelper = new THREE.PointLightHelper(pointLight)
  // const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff} )
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star)
  }

  Array(200).fill().forEach(addStar)

  const spaceTexture = new THREE.TextureLoader().load(new URL('./black.jpg', import.meta.url).href);
  spaceTexture.colorSpace = THREE.SRGBColorSpace;

  scene.background = spaceTexture;

  function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
  }

  animate()