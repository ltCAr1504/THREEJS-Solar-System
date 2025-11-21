import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FlyControls } from "three/addons/controls/FlyControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(300, 100, 30);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.enablePan = false
  controls.update();

  const flyControls = new FlyControls(camera, canvas);
  flyControls.movementSpeed = 200;
  flyControls.rollSpeed = Math.PI /4.5;
  flyControls.autoForward = false ;
  flyControls.dragToLook = true;

  // Iniciamos con OrbitControls activo
  let activeControls = controls;
  let flying = false;
  const flyingText = document.getElementById('flying-text')
  gsap.to(flyingText, {y: -5, ease: 'power1.inOut', duration: 0.5, repeat: -1, yoyo: true})

  function toggleControls() {
    flying = !flying;
    activeControls = flying ? flyControls : controls;
    if(flying){
      gsap.to(flyingText, {opacity: 0})
    } else {
      gsap.to(flyingText, {opacity: 1})
    }

    controls.enabled = !flying;
    flyControls.enabled = flying;
  }

  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "c") {
      toggleControls();
    }
  });

  const scene = new THREE.Scene();

  scene.add(new THREE.AmbientLight("WHITE", 0.1));

  const renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      samples: 4, // anti-aliasing si tu GPU lo soporta
    }
  );

  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 3;

  const composer = new EffectComposer(renderer, renderTarget);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2,
    0.4,
    0.9
  );
  composer.addPass(bloomPass);

  {
    const color = 0xffffff;
    const light = new THREE.PointLight(color, 10000, 0);
    light.position.set(0, 0, 0);
    scene.add(light);
  }

  const radius = 1;
  const sphereGeometry = new THREE.SphereGeometry(radius, 1000, 1000);

  // Sol
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff66,
  });
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(30, 30, 30);
  scene.add(sunMesh);

  const bloomSun = new THREE.Mesh(sphereGeometry, sunMaterial);
  bloomSun.scale.set(30 * 0.9, 30 * 0.9, 30 * 0.9);
  scene.add(bloomSun);

  // Planetas
  const planets = [
    {
      name: "Mercurio",
      distance: 100,
      magnitude: 1,
      orbitSpeed: 0.0415,
      rotationSpeed: 0.0001,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          color: "#c6ac8f",
          emissive: "#7f5539",
          shininess: 150,
        })
      ),
    },
    {
      name: "Venus",
      distance: 200,
      magnitude: 2,
      orbitSpeed: 0.0162,
      rotationSpeed: 0.000017,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          color: "#ffcad4",
          emissive: "#f4acb7",
          shininess: 150,
        })
      ),
    },
    {
      name: "Tierra",
      distance: 300,
      magnitude: 2.5,
      orbitSpeed: 0.01,
      rotationSpeed: 0.005,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          color: 0x2233ff,
          emissive: 0x112244,
          shininess: 150,
        })
      ),
    },
    {
      name: "Marte",
      distance: 400,
      magnitude: 1.5,
      orbitSpeed: 0.0053,
      rotationSpeed: 0.0049,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          color: "#e63946",
          emissive: "#780000",
          shininess: 150,
        })
      ),
    },
    {
      name: "Jupiter",
      distance: 600,
      magnitude: 5,
      orbitSpeed: 0.0084,
      rotationSpeed: 0.012,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          color: "#ee9b00",
          emissive: "#ca6702",
          shininess: 150,
        })
      ),
    },
    {
      name: "Saturno",
      distance: 700,
      magnitude: 4,
      orbitSpeed: 0.0034,
      rotationSpeed: 0.01,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          color: "#D8C999",
          emissive: "#302A22",
          shininess: 150,
        })
      ),
    },
    {
      name: "Urano",
      distance: 800,
      magnitude: 3.5,
      orbitSpeed: 0.0012,
      rotationSpeed: 0.007,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          color: "#7FFFD4",
          emissive: "#003333",
          shininess: 150,
        })
      ),
    },
    {
      name: "Nepturno",
      distance: 900,
      magnitude: 3,
      orbitSpeed: 0.0006,
      rotationSpeed: 0.0062,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          color: "#2E3BFF",
          emissive: "#000033",
          shininess: 150,
        })
      ),
    },
  ];

  planets.forEach((planet) => {
    planet.mesh.scale.set(planet.magnitude, planet.magnitude, planet.magnitude);
    planet.mesh.layers.set(0);
    scene.add(planet.mesh);
  });

  // Luna
  const moon = {
    distance: 5,
    orbitSpeed: 0.05,
    rotationSpeed: 0.1,
    mesh: new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })
    ),
  };
  moon.mesh.scale.set(0.5, 0.5, 0.5);
  moon.mesh.layers.set(0);
  scene.add(moon.mesh);

  // GUI para ajustar velocidades
  const gui = new GUI();
  planets.forEach((planet) => {
    const folder = gui.addFolder(planet.name);
    folder.add(planet, "orbitSpeed", 0, 0.4).name("Órbita");
    folder.add(planet, "rotationSpeed", 0, 0.1).name("Rotación");
  });
  const moonFolder = gui.addFolder("Luna");
  moonFolder.add(moon, "orbitSpeed", 0, 0.1).name("Órbita");
  moonFolder.add(moon, "rotationSpeed", 0, 0.1).name("Rotación");

  let lastTime = 0;

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    const delta = time - lastTime;
    lastTime = time;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    activeControls.update(flying ? delta : undefined);

    // Revoluciones alrededor del sol
    planets.forEach((planet) => {
      const angle = time * planet.orbitSpeed;
      planet.mesh.position.set(
        Math.cos(angle) * planet.distance,
        0,
        Math.sin(angle) * planet.distance
      );

      // Rotación sobre su eje
      planet.mesh.rotation.y += planet.rotationSpeed;
    });

    // Revolución de la luna alrededor de la Tierra
    const earth = planets.find((p) => p.name === "Tierra");
    const moonAngle = time * moon.orbitSpeed;
    moon.mesh.position.set(
      earth.mesh.position.x + Math.cos(moonAngle) * moon.distance,
      0,
      earth.mesh.position.z + Math.sin(moonAngle) * moon.distance
    );

    // Rotación sobre su eje
    moon.mesh.rotation.y += moon.rotationSpeed;

    // Rotación del sol sobre su eje (opcional)
    sunMesh.rotation.y += 0.001;

    composer.render();

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
