import * as THREE from 'three';
import DeviceOrientationControls from 'three-device-orientation';
import OrbitControls from 'orbit-controls-es6';

export default class ControlsManager {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Constructor.
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        console.log('🕹 Controls constructor');

    };

    // ------------------------------------------------------------------- INITIALIZERS

    /**
     * Init an OrbitControls controller. Desktop & mobile.
     * @param camera
     * @param rendererDom
     */
    initOrbitControls(camera, rendererDom) {
        this._controls = new OrbitControls(camera, rendererDom);
    }

    /**
     * Inits a DeviceOrientation controller. Needs enabled gyro.
     * @param camera
     */
    initDeviceOrientation(camera) {
        this._controls = new DeviceOrientationControls(camera);
    }

    // ------------------------------------------------------------------- GETTERS

    /**
     * Get controls.
     * @returns {OrbitControls|DeviceOrientationControls}
     */
    get controls() {
        return this._controls;
    }
}
