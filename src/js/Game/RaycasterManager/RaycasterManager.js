import * as THREE from 'three';

export default class RaycasterManager {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Constructor.
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        console.log('👈 Raycaster constructor');

        this._raycaster = new THREE.Raycaster();
    };

    // ------------------------------------------------------------------- MAKE

    /**
     * Handles raycast.
     * @param mouse
     * @param camera
     * @returns {string}
     */
    getTouchedElementIdentifier(scene, mouse, camera) {
        // update the picking ray with the camera and mouse position
        this._raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        let intersects = this._raycaster.intersectObjects( scene.children, true );

        let identifier = "Generic";

        if (intersects.length > 0) {
            intersectsLoops: for(let i = 0; i < intersects.length; i++) {
                // Explore parents until identifier found (max times defined by maxIterations)
                // intersect
                // -> parent (no identifier)
                //      -> parent (no identifier)
                //          -> parent (has identifier!)
                let lastParent = intersects[i].object.parent;
                if(lastParent !== undefined) {
                    const maxIterations = 10;
                    parentsloop: for (let j = maxIterations; j > 0; j--) {
                        if(lastParent.identifier !== undefined) {
                            // Get identifier and break loop
                            identifier = lastParent.identifier;
                            break intersectsLoops;
                        }
                        else if (lastParent.parent !== null) {
                            // Iterate in higher level parent
                            lastParent = lastParent.parent;
                        }
                        else {
                            // No identifier or parent, break
                            break parentsloop;
                        }
                    }
                }
            }
        }

        return identifier;
    }

    // ------------------------------------------------------------------- GETTERS

    /**
     * Returns the raycaster object.
     * @returns {THREE.Raycaster}
     */
    get raycaster() {
        return this._raycaster;
    }
}
