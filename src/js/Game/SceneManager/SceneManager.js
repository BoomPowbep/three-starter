import * as THREE from 'three';

export default class SceneManager {

    /**
     *
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color( 0x000000 );
    };

    addThings(things) {
        for(let thing of things) {
            this._scene.add(thing);
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
