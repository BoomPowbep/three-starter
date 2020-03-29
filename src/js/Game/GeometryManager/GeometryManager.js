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
     * @param identifier
     * @returns {Mesh}
     */
    createBasicGroundSurface(identifier = "Unnamed") {
        let groundShape = new THREE.PlaneGeometry(50, 50);
        let groundMaterial = new THREE.MeshPhongMaterial({
            color: 0xe67300,
            side: THREE.FrontSide
        });
        let ground = new THREE.Mesh(groundShape, groundMaterial);
        ground.receiveShadow = true;
        ground.rotation.x -= Math.PI / 2;
        ground.identifier = identifier;

        return ground;
    }

    /**
     * Creates a basic shape.
     * @param identifier
     * @param size
     * @param position
     * @param color
     * @returns {Mesh}
     */
    createBasicShape({
                        identifier = "Unnamed",
                        size = {x: 1, y: 1, z: 1},
                        position = {x: 0, y: 0, z: 0},
                        color = 0x00ff00
                    }) {
        let geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
        let material = new THREE.MeshBasicMaterial({color: color});
        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;
        cube.identifier = identifier;

        return cube;
    }

    /**
     * Register all created geometries.
     * @param geometriesArray
     */
    loadGeometries(geometriesArray) {
        for (let geometry of geometriesArray) {
            this._registerGeometry(geometry);
        }
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
