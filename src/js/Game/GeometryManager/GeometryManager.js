import * as THREE from 'three';

export default class GeometryManager {

    /**
     *
     * @param isDebugMode
     */
    constructor(isDebugMode) {

        // Array containing all geometries.
        this._geometries = [];

        if (isDebugMode) this._createDebugElements();
    };

    /**
     * Creates geometries dedicated to debugging.
     * @private
     */
    _createDebugElements() {
        let axesHelper = new THREE.AxesHelper(2);
        this._registerGeometry(axesHelper);
    }

    /**
     * Adds a geometry to the geometries list.
     * @param geometry
     * @private
     */
    _registerGeometry(geometry) {
        this._geometries.push(geometry);
    }

    /**
     * Returns the array containing all the geometries.
     * @returns {Array}
     */
    get geometries() {
        return this._geometries;
    }
}
