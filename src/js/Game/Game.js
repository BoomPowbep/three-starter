import * as THREE from 'three';
import Stats from 'stats-js';

import CameraManager from './CameraManager/CameraManager';
import ControlsManager from './ControlsManager/ControlsManager';
import GeometryManager from './GeometryManager/GeometryManager';
import LightingManager from './LightingManager/LightingManager';
import SceneManager from './SceneManager/SceneManager';

export default class Game {

    /**
     *
     * @param isDebugMode
     * @param highPerf
     */
    constructor(isDebugMode = true, highPerf = true) {
        console.log('🎮 Game constructor');

        this.highPerf = highPerf;

        if (isDebugMode) {
            // Init Stats.js
            this.stats = new Stats();
            this.stats.showPanel(0); // 0 = fps
            document.body.appendChild(this.stats.dom);
        }

        this.cameraManager = new CameraManager(isDebugMode);
        this.controlsManager = new ControlsManager(isDebugMode);
        this.geometryManager = new GeometryManager(isDebugMode);
        this.lightingManager = new LightingManager(isDebugMode);
        this.sceneManager = new SceneManager(isDebugMode);

        this.init();
        this.loop();

        window.addEventListener('resize', this.resizeViewport.bind(this));
    }

    /**
     *
     */
    init() {
        this.sceneManager = new SceneManager();
        this.renderer = new THREE.WebGLRenderer({
            antialias: this.highPerf
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);


        this.sceneManager.addThings(this.geometryManager.geometries);

        this.sceneManager.addThings(this.lightingManager.lights);

        this.cameraManager.setPosition(4, 2, 4);
        this.cameraManager.lookAtSomething( new THREE.Vector3(0, 0, 0) );
    }

    /**
     *
     */
    loop() {
        requestAnimationFrame(this.loop.bind(this));

        this.stats.begin();

        this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);

        this.stats.end();
    }

    resizeViewport() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        this.renderer.setSize(width, height);
        this.cameraManager.camera.aspect = width / height;
        this.cameraManager.camera.updateProjectionMatrix();
    }
}
