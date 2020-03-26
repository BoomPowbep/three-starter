import * as THREE from 'three';

export default class GeometryManager {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Construction.
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        console.log('🔳 Geometry constructor');

        // Array containing all geometries.
        this._geometries = [];

        if (isDebugMode) this._createDebugElements();

        this._createGroundSurface();
    };

    // ------------------------------------------------------------------- DEBUG

    /**
     * Creates geometries dedicated to debugging.
     * @private
     */
    _createDebugElements() {
        let axesHelper = new THREE.AxesHelper(2);
        this._registerGeometry(axesHelper);

        let gridHelper = new THREE.GridHelper(50, 50, 0xFFFFFF, 0xFFFFFF);
        this._registerGeometry(gridHelper);
    }

    // ------------------------------------------------------------------- MAKE

    /**
     * Creates a basic ground surface.
     * @private
     */
    _createGroundSurface() {
        let groundShape = new THREE.PlaneGeometry(50, 50);
        let groundMaterial = new THREE.MeshPhongMaterial({
            color: 0xe67300,
            side: THREE.FrontSide
        });
        let ground = new THREE.Mesh(groundShape, groundMaterial);
        ground.receiveShadow = true;
        ground.rotation.x -= Math.PI / 2;
        this._registerGeometry(ground);
    }

    /**
     * Adds the parameter geometry to the active geometries list.
     * @param geometry
     * @private
     */
    _registerGeometry(geometry) {
        this._geometries.push(geometry);
    }

    // ------------------------------------------------------------------- GETTERS

    /**
     * Returns the array containing all the geometries.
     * @returns {Array}
     */
    get geometries() {
        return this._geometries;
    }
}
