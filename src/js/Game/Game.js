import * as THREE from 'three';
import Stats from 'stats-js';
import * as dat from 'dat.gui';

import CameraManager from './CameraManager/CameraManager';
import ControlsManager from './ControlsManager/ControlsManager';
import GeometryManager from './GeometryManager/GeometryManager';
import {ModelManager, Model} from './ModelManager/ModelManager';
import LightingManager from './LightingManager/LightingManager';
import SceneManager from './SceneManager/SceneManager';

export default class Game {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Constructor.
     * Inits all components ans starts the loop.
     * @param isDebugMode
     * @param highPerf
     */
    constructor(isDebugMode = true, highPerf = true) {
        console.log('🎮 Game constructor');

        this.highPerf = highPerf;

        if (isDebugMode) {
            // Init Stats.js
            this.stats = new Stats();
            this.stats.showPanel(0); // 0 = print fps
            document.body.appendChild(this.stats.dom);

            this.gui = new dat.GUI();
        }

        // Game components
        this.cameraManager = new CameraManager(isDebugMode);
        this.controlsManager = new ControlsManager(isDebugMode);
        this.geometryManager = new GeometryManager(isDebugMode);
        this.modelManager = new ModelManager(isDebugMode);
        this.lightingManager = new LightingManager(isDebugMode);
        this.controlsManager = new ControlsManager(isDebugMode);
        this.sceneManager = new SceneManager(isDebugMode);

        // Game core
        this.init(); // Loop started inside

        // Event listeners
        window.addEventListener('resize', this.resizeViewport.bind(this));
    }

    /**
     * Creates the scene & creates essentials.
     */
    init() {
        // Renderer init
        this.renderer = new THREE.WebGLRenderer({
            antialias: this.highPerf
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        const models = [
            new Model('models/Fox.glb', .02),
            new Model('models/CesiumMilkTruck.glb', 1.5, {x: -5, y: 0, z: 0})
        ];

        this.modelManager.loadModels(models, () => {
            // Scene init
            this.sceneManager.addThings(this.geometryManager.geometries);
            this.sceneManager.addThings(this.modelManager.models);
            this.sceneManager.addThings(this.lightingManager.lights);

            // Camera init
            this.cameraManager.setPosition(0, 5, 10);
            this.cameraManager.lookAtSomething(new THREE.Vector3(0, 0, 0));

            // Controls init
            // this.controlsManager.initDeviceOrientation(this.cameraManager.camera);
            this.controlsManager.initOrbitControls(this.cameraManager.camera, this.renderer.domElement);

            // Start loop!
            this.loop();
        });
    }

    // ------------------------------------------------------------------- CALLBACKS

    /**
     * Window resize callback.
     */
    resizeViewport() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        this.renderer.setSize(width, height);
        this.cameraManager.camera.aspect = width / height;
        this.cameraManager.camera.updateProjectionMatrix();
    }

    // ------------------------------------------------------------------- RENDER

    /**
     * Render loop.
     */
    loop() {
        requestAnimationFrame(this.loop.bind(this));

        this.stats.begin();

        // this.controlsManager.controls.update();
        this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);

        this.stats.end();
    }
}
