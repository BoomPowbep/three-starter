import * as THREE from 'three';

export default class CameraManager {

    /**
     *
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 65);
    };

    /**
     *
     * @param x
     * @param y
     * @param z
     */
    setPosition(x = 0, y = 0, z = 0) {
        this._camera.position.x = x;
        this._camera.position.y = y;
        this._camera.position.z = z;
    }

    /**
     *
     * @param thing
     */
    lookAtSomething(thing) {
        this._camera.lookAt(thing);
    }

    /**
     *
     * @returns {THREE.PerspectiveCamera|PerspectiveCamera}
     */
    get camera() {
        return this._camera;
    }
}
