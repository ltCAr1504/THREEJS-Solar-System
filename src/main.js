import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FlyControls } from "three/addons/controls/FlyControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const loadingScreen = document.getElementById("loading-screen");
const loadingText = document.getElementById("loading-text");
const flyingText = document.getElementById("flying-text");

const manager = new THREE.LoadingManager(
  () => {
    loadingScreen.classList.add("hidden");
    flyingText.classList.remove("hidden");
    main(textures);
  },
  (url, loaded, total) => {
    loadingText.textContent = `Loading: ${Math.round((loaded / total) * 100)}%`;
  }
);

const loader = new THREE.TextureLoader(manager);
const textures = {
  mercury: loader.load("../public/Mercury.jpg", (mercuryTexture) => {
    mercuryTexture.minFilter = THREE.LinearFilter;
    mercuryTexture.magFilter = THREE.LinearFilter;
    mercuryTexture.generateMipmaps = false;
  }),
  venus: loader.load("../public/Venus.jpg", (venusTexture) => {
    venusTexture.minFilter = THREE.LinearFilter;
    venusTexture.magFilter = THREE.LinearFilter;
    venusTexture.generateMipmaps = false;
  }),
  earth: loader.load("../public/Earth.jpg", (earthTexture) => {
    earthTexture.minFilter = THREE.LinearFilter;
    earthTexture.magFilter = THREE.LinearFilter;
    earthTexture.generateMipmaps = false;
  }),
  moon: loader.load("../public/Moon.jpg", (moonTexture) => {
    moonTexture.minFilter = THREE.LinearFilter;
    moonTexture.magFilter = THREE.LinearFilter;
    moonTexture.generateMipmaps = false;
  }),
  mars: loader.load("../public/Mars.jpg", (marsTexture) => {
    marsTexture.minFilter = THREE.LinearFilter;
    marsTexture.magFilter = THREE.LinearFilter;
    marsTexture.generateMipmaps = false;
  }),
  jupiter: loader.load("../public/Jupiter.jpg", (jupiterTexture) => {
    jupiterTexture.minFilter = THREE.LinearFilter;
    jupiterTexture.magFilter = THREE.LinearFilter;
    jupiterTexture.generateMipmaps = false;
  }),
  saturn: loader.load("../public/Saturn.jpg", (saturnTexture) => {
    saturnTexture.minFilter = THREE.LinearFilter;
    saturnTexture.magFilter = THREE.LinearFilter;
    saturnTexture.generateMipmaps = false;
  }),
  saturnRingAlpha: loader.load(
    "../public/SaturnRingAlpha.png",
    (saturnRingsTexture) => {
      saturnRingsTexture.minFilter = THREE.LinearFilter;
      saturnRingsTexture.magFilter = THREE.LinearFilter;
      saturnRingsTexture.generateMipmaps = false;
    }
  ),
  mimas: loader.load("../public/Mimas.jpg", (mimasTexture) => {
    mimasTexture.minFilter = THREE.LinearFilter;
    mimasTexture.magFilter = THREE.LinearFilter;
    mimasTexture.generateMipmaps = false;
  }),

  
  tethys: loader.load("../public/Tethys.jpg", (tethysTexture) => {
    tethysTexture.minFilter = THREE.LinearFilter;
    tethysTexture.magFilter = THREE.LinearFilter;
    tethysTexture.generateMipmaps = false;
  }),
  
  dione: loader.load("../public/Dione.jpg", (dioneTexture) => {
    dioneTexture.minFilter = THREE.LinearFilter;
    dioneTexture.magFilter = THREE.LinearFilter;
    dioneTexture.generateMipmaps = false;
  }),

  
  enceladus: loader.load("../public/Enceladus.jpg", (enceladusTexture) => {
    enceladusTexture.minFilter = THREE.LinearFilter;
    enceladusTexture.magFilter = THREE.LinearFilter;
    enceladusTexture.generateMipmaps = false;
  }),
  
  
  iapetus: loader.load("../public/Iapetus.jpg", (iapetusTexture) => {
    iapetusTexture.minFilter = THREE.LinearFilter;
    iapetusTexture.magFilter = THREE.LinearFilter;
    iapetusTexture.generateMipmaps = false;
  }),
  
  
  hyperion: loader.load("../public/Hyperion.jpg", (hyperionTexture) => {
    hyperionTexture.minFilter = THREE.LinearFilter;
    hyperionTexture.magFilter = THREE.LinearFilter;
    hyperionTexture.generateMipmaps = false;
  }),
  
  titan: loader.load("../public/Titan.jpg", (titanTexture) => {
    titanTexture.minFilter = THREE.LinearFilter;
    titanTexture.magFilter = THREE.LinearFilter;
    titanTexture.generateMipmaps = false;
  }),
  
  rhea: loader.load("../public/Rhea.png", (rheaTexture) => {
    rheaTexture.minFilter = THREE.LinearFilter;
    rheaTexture.magFilter = THREE.LinearFilter;
    rheaTexture.generateMipmaps = false;
  }),
  
  uranus: loader.load("../public/Uranus.jpg", (uranusTexture) => {
    uranusTexture.minFilter = THREE.LinearFilter;
    uranusTexture.magFilter = THREE.LinearFilter;
    uranusTexture.generateMipmaps = false;
  }),
  neptune: loader.load("../public/Neptune.jpg", (neptuneTexture) => {
    neptuneTexture.minFilter = THREE.LinearFilter;
    neptuneTexture.magFilter = THREE.LinearFilter;
    neptuneTexture.generateMipmaps = false;
  }),
};

function main(textures) {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true,
    canvas,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setPixelRatio(window.devicePixelRatio * 2);

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(800, 800, 800);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.enablePan = false;
  controls.update();

  const flyControls = new FlyControls(camera, canvas);
  flyControls.movementSpeed = 600;
  flyControls.rollSpeed = Math.PI / 4.5;
  flyControls.autoForward = false;
  flyControls.dragToLook = true;

  let activeControls = controls;
  let flying = false;
  const flyingText = document.getElementById("flying-text");
  gsap.to(flyingText, {
    y: -5,
    ease: "power1.inOut",
    duration: 0.5,
    repeat: -1,
    yoyo: true,
  });

  function toggleControls() {
    flying = !flying;
    activeControls = flying ? flyControls : controls;
    if (flying) {
      gsap.to(flyingText, { opacity: 0 });
    } else {
      gsap.to(flyingText, { opacity: 1 });
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
      samples: 4,
    }
  );

  const composer = new EffectComposer(renderer, renderTarget);
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.renderToScreen = true;
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  composer.addPass(bloomPass);

  const sunLight = new THREE.DirectionalLight(0xffffff, 3);
  sunLight.position.set(100, 0, 100);
  sunLight.target.position.set(0, 0, 0);
  sunLight.castShadow = true;
  sunLight.intensity = 1.5;
  sunLight.shadow.bias = -0.0001;
  scene.add(sunLight);

  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

  const mercuryTexture = textures.mercury;
  mercuryTexture.anisotropy = maxAnisotropy;

  const venusTexture = textures.venus;
  venusTexture.anisotropy = maxAnisotropy;

  const earthTexture = textures.earth;
  earthTexture.anisotropy = maxAnisotropy;

  const moonTexture = textures.moon;
  moonTexture.anisotropy = maxAnisotropy;

  const marsTexture = textures.mars;
  marsTexture.anisotropy = maxAnisotropy;

  const jupiterTexture = textures.jupiter;
  jupiterTexture.anisotropy = maxAnisotropy;

  const saturnTexture = textures.saturn;
  saturnTexture.anisotropy = maxAnisotropy;

  const uranusTexture = textures.uranus;
  uranusTexture.anisotropy = maxAnisotropy;

  const neptuneTexture = textures.neptune;
  neptuneTexture.anisotropy = maxAnisotropy;

  const radius = 1;
  const sphereGeometry = new THREE.SphereGeometry(radius, 64, 64);

  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff66,
    side: THREE.DoubleSide,
    roughness: 1,
    metalness: 0,
  });

  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(100, 100, 100);
  scene.add(sunMesh);

  const planets = [
    {
      name: "Mercurio",
      distance: 400,
      magnitude: 1,
      orbitSpeed: 0.0415,
      rotationSpeed: 0.0001,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          map: mercuryTexture,
        })
      ),
    },
    {
      name: "Venus",
      distance: 800,
      magnitude: 2,
      orbitSpeed: 0.0162,
      rotationSpeed: 0.000017,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          map: venusTexture,
        })
      ),
    },
    {
      name: "Tierra",
      distance: 1200,
      magnitude: 2.5,
      orbitSpeed: 0.01,
      rotationSpeed: 0.005,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          map: earthTexture,
          normalMap: null,
          roughness: 1,
          metalness: 0,
        })
      ),
    },
    {
      name: "Marte",
      distance: 1400,
      magnitude: 1.5,
      orbitSpeed: 0.0053,
      rotationSpeed: 0.0049,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          map: marsTexture,
          roughness: 1,
          metalness: 0,
        })
      ),
    },
    {
      name: "Jupiter",
      distance: 2200,
      magnitude: 25,
      orbitSpeed: 0.0084,
      rotationSpeed: 0.012,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          map: jupiterTexture,
          roughness: 1,
          metalness: 0,
        })
      ),
    },
    {
      name: "Saturno",
      distance: 2600,
      magnitude: 20,
      orbitSpeed: 0.0034,
      rotationSpeed: 0.01,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          map: saturnTexture,
          roughness: 1,
          metalness: 0,
        })
      ),
    },
    {
      name: "Urano",
      distance: 3400,
      magnitude: 11,
      orbitSpeed: 0.0012,
      rotationSpeed: 0.007,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          map: uranusTexture,
          roughness: 1,
          metalness: 0,
        })
      ),
    },
    {
      name: "Nepturno",
      distance: 3800,
      magnitude: 10,
      orbitSpeed: 0.0006,
      rotationSpeed: 0.0062,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
          map: neptuneTexture,
          roughness: 1,
          metalness: 0,
        })
      ),
    },
  ];

  const saturnMoonsGeo = new THREE.SphereGeometry(1, 32, 32);

  const mimasMaterial = new THREE.MeshPhongMaterial({ map: textures.mimas });
  const tethysMaterial = new THREE.MeshPhongMaterial({ map: textures.tethys });
  const dioneMaterial = new THREE.MeshPhongMaterial({ map: textures.dione });
  const enceladusMaterial = new THREE.MeshPhongMaterial({ map: textures.enceladus });
  const iapetusMaterial = new THREE.MeshPhongMaterial({ map: textures.iapetus });
  const hyperionMaterial = new THREE.MeshPhongMaterial({ map: textures.hyperion });
  const titanMaterial = new THREE.MeshPhongMaterial({ map: textures.titan });
  const rheaMaterial = new THREE.MeshPhongMaterial({ map: textures.rhea });


  const saturnMoons = [
    {
      name: "Titan",
      distance: 360, // convertido a tu escala
      magnitude: 1.2,
      orbitSpeed: 0.02,
      rotationSpeed: 0.0005,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(saturnMoonsGeo, titanMaterial),
    },
    {
      name: "Rhea",
      distance: 320,
      magnitude: 0.6,
      orbitSpeed: 0.034,
      rotationSpeed: 0.0005,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(saturnMoonsGeo, rheaMaterial),
    },
    {
      name: "Iapetus",
      distance: 600,
      magnitude: 0.9,
      orbitSpeed: 0.006,
      rotationSpeed: 0.0004,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(saturnMoonsGeo, iapetusMaterial),
    },
    {
      name: "Dione",
      distance: 220,
      magnitude: 0.45,
      orbitSpeed: 0.05,
      rotationSpeed: 0.0005,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(saturnMoonsGeo, dioneMaterial),
    },
    {
      name: "Tethys",
      distance: 160,
      magnitude: 0.4,
      orbitSpeed: 0.058,
      rotationSpeed: 0.0005,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(saturnMoonsGeo, tethysMaterial),
    },
    {
      name: "Enceladus",
      distance: 120,
      magnitude: 0.3,
      orbitSpeed: 0.075,
      rotationSpeed: 0.0005,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(saturnMoonsGeo, enceladusMaterial),
    },
    {
      name: "Mimas",
      distance: 100,
      magnitude: 0.2,
      orbitSpeed: 0.02,
      rotationSpeed: 0.0005,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(saturnMoonsGeo, mimasMaterial),
    },
    {
      name: "Hyperion",
      distance: 450,
      magnitude: 0.5,
      orbitSpeed: 0.015,
      rotationSpeed: 0.0004,
      initialAngle: Math.random() * Math.PI * 2,
      mesh: new THREE.Mesh(saturnMoonsGeo, hyperionMaterial),
    },
  ];

  const ringAlpha = textures.saturnRingAlpha;

  planets.forEach((planet) => {
    planet.mesh.scale.set(planet.magnitude, planet.magnitude, planet.magnitude);
    scene.add(planet.mesh);

    if (planet.name === "Saturno") {
      const inner = 0.07 * planet.magnitude;
      const outer = 0.15 * planet.magnitude;
      const ringGeo = new THREE.RingGeometry(inner, outer, 256);
      const pos = ringGeo.attributes.position;
      const uv = ringGeo.attributes.uv;

      for (let i = 0; i < uv.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const r = Math.sqrt(x * x + y * y);
        uv.setXY(i, (r - inner) / (outer - inner), 1);
      }

      const ringMat = new THREE.MeshStandardMaterial({
        alphaMap: ringAlpha,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const rings = new THREE.Mesh(ringGeo, ringMat);
      rings.rotation.x = Math.PI / 2;
      rings.rotation.z = THREE.MathUtils.degToRad(26.7);
      planet.mesh.add(rings);
    }
  });

  const moon = {
    distance: 15,
    orbitSpeed: 0.05,
    rotationSpeed: 0.01,
    mesh: new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshPhongMaterial({
        map: moonTexture,
        roughness: 1,
        metalness: 0,
      })
    ),
  };
  moon.mesh.scale.set(0.5, 0.5, 0.5);
  scene.add(moon.mesh);

  saturnMoons.forEach((moon) => {
    moon.mesh.scale.set(moon.magnitude, moon.magnitude, moon.magnitude);
    scene.add(moon.mesh);
  });

  const gui = new GUI();
  planets.forEach((planet) => {
    const folder = gui.addFolder(planet.name);
    folder.add(planet, "orbitSpeed", 0, 0.4).name("Órbita");
    folder.add(planet, "rotationSpeed", 0, 0.1).name("Rotación");
    planet.mesh.castShadow = true;
    planet.mesh.receiveShadow = true;
  });
  const moonFolder = gui.addFolder("Luna");
  moonFolder.add(moon, "orbitSpeed", 0, 0.1).name("Órbita");
  moonFolder.add(moon, "rotationSpeed", 0, 0.1).name("Rotación");

  moon.mesh.castShadow = true;
  moon.mesh.receiveShadow = true;

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

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function goToPlanet(planet) {
    const offset = new THREE.Vector3(
      planet.magnitude * 5,
      planet.magnitude * 1.1,
      0
    );
    camera.position.copy(planet.mesh.position).add(offset);

    controls.target.copy(planet.mesh.position);
    controls.update();
  }

  window.addEventListener("mousedown", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planets.map((p) => p.mesh));
    if (intersects.length > 0) {
      const planet = planets.find((p) => p.mesh === intersects[0].object);
      goToPlanet(planet);
    }
  });

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

    planets.forEach((planet) => {
      const angle = time * planet.orbitSpeed + planet.initialAngle;
      planet.mesh.position.set(
        Math.cos(angle) * planet.distance,
        0,
        Math.sin(angle) * planet.distance
      );

      planet.mesh.rotation.y += planet.rotationSpeed;
    });

    const earth = planets.find((p) => p.name === "Tierra");
    const moonAngle = time * moon.orbitSpeed;
    moon.mesh.position.set(
      earth.mesh.position.x + Math.cos(moonAngle) * moon.distance,
      0,
      earth.mesh.position.z + Math.sin(moonAngle) * moon.distance
    );

    const saturn = planets.find((p) => p.name === "Saturno");
    saturnMoons.forEach((moon) => {
      const angle = time * moon.orbitSpeed + moon.initialAngle;
      moon.mesh.position.set(
        saturn.mesh.position.x + Math.cos(angle) * moon.distance,
        0,
        saturn.mesh.position.z + Math.sin(angle) * moon.distance
      );
      moon.mesh.rotation.y += moon.rotationSpeed;
    });

    moon.mesh.rotation.y += moon.rotationSpeed;

    sunMesh.rotation.y += 0.001;

    composer.render();

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}


