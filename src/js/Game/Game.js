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

        this.debugMode = isDebugMode;
        this.highPerf = highPerf;

        if (this.debugMode) {
            // Init Stats.js
            this.stats = new Stats();
            this.stats.showPanel(0); // 0 = print fps
            document.body.appendChild(this.stats.dom);

            this.gui = new dat.GUI();
        }

        // Game components
        this.cameraManager = new CameraManager(this.debugMode);
        this.controlsManager = new ControlsManager(this.debugMode);
        this.geometryManager = new GeometryManager(this.debugMode);
        this.modelManager = new ModelManager(this.debugMode);
        this.lightingManager = new LightingManager(this.debugMode);
        this.sceneManager = new SceneManager(this.debugMode);

        let cover = document.getElementById("cover");
        cover.addEventListener("click", () => {
            cover.remove();

            // On iOS13 + devices, ask for device orientation events permission
            // https://medium.com/flawless-app-stories/how-to-request-device-motion-and-orientation-permission-in-ios-13-74fc9d6cd140
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                // iOS 13+
                DeviceOrientationEvent.requestPermission()
                    .then(response => {
                        if (response == 'granted') {
                            this.init();
                        }
                        else {
                            console.error("Device Orientation Event permission rejected by user: ", response);
                        }
                    })
                    .catch(console.error)
            } else {
                // non iOS 13+
                this.init();
            }
        });

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

        // 3D Models
        const models = [
            new Model('Fox', 'models/Fox.glb', .02),
            new Model('IceTruck', 'models/CesiumMilkTruck.glb', 1.5, {x: -5, y: 0, z: 0})
        ];

        // Lights
        this.lightingManager.createSpotLight({
            identifier: "MainSpotLight",
            intensity: 5,
            position: {x: 20, y: 20, z: 0},
            angle: .5
        });

        this.modelManager.loadModels(models, () => {
            // Scene init
            this.sceneManager.addThings(this.geometryManager.geometries);
            this.sceneManager.addThings(this.modelManager.models);
            this.sceneManager.addThings(this.lightingManager.lights);

            // Camera init
            this.cameraManager.setPosition(3, 5, 10);
            this.cameraManager.lookAtSomething(new THREE.Vector3(0, 0, 0));

            // Controls init
            this.controlsManager.initDeviceOrientation(this.cameraManager.camera);
            // this.controlsManager.initOrbitControls(this.cameraManager.camera, this.renderer.domElement);

            // Get reference of fox and change position
            let fox = this.modelManager.getModelReferenceByIdentifier('Fox');
            fox.position.x = 2;

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

        this.debugMode && this.stats.begin();

        this.controlsManager.controls.update(); // Only for device orientation controls
        this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);

        this.debugMode && this.stats.end();
    }
}
