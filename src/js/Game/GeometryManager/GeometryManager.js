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

        this._createGroundSurface();
    };

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

    /**
     * Creates the ground surface.
     * @private
     */
    _createGroundSurface() {
        let groundShape = new THREE.PlaneGeometry(50, 50);
        let groundMaterial = new THREE.MeshLambertMaterial({
            color: 0xe67300,
            side: THREE.FrontSide
        });
        let ground = new THREE.Mesh(groundShape, groundMaterial);
        ground.receiveShadow = true;
        ground.rotation.x -= Math.PI / 2;
        this._registerGeometry(ground);
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
