import * as THREE from 'three';

export default class LightingManager {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Constructor.
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        console.log('🔦 LightingManager constructor');

        this._lights = [];

        this._createAmbientLight();
    };

    // ------------------------------------------------------------------- MAKE

    /**
     * Create a basic generic ambient light.
     * @private
     */
    _createAmbientLight() {
        let ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        this._registerLight(ambientLight);
    }

    /**
     * Register a new light.
     * @param light
     * @private
     */
    _registerLight(light) {
        this._lights.push(light);
    }

    // ------------------------------------------------------------------- GETTERS

    /**
     * Returns the array containing the lighting.
     * @returns {Array}
     */
    get lights() {
        return this._lights;
    }
}
