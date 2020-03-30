import * as THREE from 'three';

export default class CameraManager {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Constructor
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        console.log('🎥 CameraManager constructor');

        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 5000);
    };

    // ------------------------------------------------------------------- CAMERA MOTION

    /**
     * Set the camera position.
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
     * Make the camera look at a point.
     * @param thing
     */
    lookAtSomething(thing) {
        this._camera.lookAt(thing);
    }

    // ------------------------------------------------------------------- SETTERS

    /**
     * Attach objects to the camera (audio for example).
     * @param things []
     */
    attach(things) {
        for(let thing in things) {
            this._camera.add(thing);
        }
    }

    // ------------------------------------------------------------------- GETTERS

    /**
     * Returns the camera object.
     * @returns {PerspectiveCamera}
     */
    get camera() {
        return this._camera;
    }
}
