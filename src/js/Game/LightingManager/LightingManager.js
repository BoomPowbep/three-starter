import * as THREE from 'three';

export default class LightingManager {

    /**
     *
     * @param isDebugMode
     */
    constructor(isDebugMode) {

        this._lights = [];

        this._createAmbientLight();
    };

    /**
     *
     * @private
     */
    _createAmbientLight() {
        let ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        this._registerLight(ambientLight);
    }

    /**
     *
     * @param light
     * @private
     */
    _registerLight(light) {
        this._lights.push(light);
    }

    /**
     *
     * @returns {Array}
     */
    get lights() {
        return this._lights;
    }
}
