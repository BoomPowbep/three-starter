import * as THREE from 'three';

export default class SceneManager {

    /**
     *
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color( 0xff3399 );
    };

    addGeometries(geometries) {
        for(let geometry of geometries) {
            this._scene.add(geometry);
        }
    }

    /**
     * Returns the scene object.
     * @returns {THREE.Scene|Scene}
     */
    get scene() {
        return this._scene;
    }
}
