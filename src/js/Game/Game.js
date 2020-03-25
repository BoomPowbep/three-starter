import * as THREE from 'three';
import Stats from 'stats-js';
import * as dat from 'dat.gui';

import CameraManager from './CameraManager/CameraManager';
import ControlsManager from './ControlsManager/ControlsManager';
import GeometryManager from './GeometryManager/GeometryManager';
import ModelManager from './ModelManager/ModelManager';
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
        this.sceneManager = new SceneManager(isDebugMode);

        // Game core
        this.init();
        this.loop();

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

        // Models init
        this.modelManager.loadModel('models/Fox.glb');

        // Scene init
        this.sceneManager.addThings(this.geometryManager.geometries);
        this.sceneManager.addThings(this.modelManager.models);
        this.sceneManager.addThings(this.lightingManager.lights);

        // Camera init
        this.cameraManager.setPosition(0, 5, 10);
        this.cameraManager.lookAtSomething( new THREE.Vector3(0, 0, 0) );
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

        this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);

        this.stats.end();
    }
}
