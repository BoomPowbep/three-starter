import * as THREE from 'three';

export default class SceneManager {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Constructor.
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        console.log('🌴 SceneManager constructor');

        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color( 0x000000 );
    };

    // ------------------------------------------------------------------- MAKE

    /**
     * Add an array of objects the the scene.
     * @param things
     */
    addThings(things) {
        for(let thing of things) {
            this._scene.add(thing);
        }
    }

    // ------------------------------------------------------------------- GETTERS

    /**
     * Returns the scene object.
     * @returns {Scene}
     */
    get scene() {
        return this._scene;
    }
}
