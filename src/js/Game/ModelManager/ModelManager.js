import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Vector3} from "three";

export default class ModelManager {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Construction.
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        console.log('🔳 Model constructor');

        // Array containing all geometries.
        this._models = [];
    };

    // ------------------------------------------------------------------- DEBUG


    // ------------------------------------------------------------------- MAKE

    /**
     * Load the model passed as parameter
     * TODO handle more file types
     * @param path
     */
    loadModel(path) {
        let loader = new GLTFLoader();

        loader.load(path,
            // On loaded
            (object) => {
                console.log("Loaded model from " + path, object);
                let scale = 10;
                object.scene.scale.set(scale, scale, scale);
                this._registerModel(object.scene);
            },
            // On progress
            (status) => {
                let progress = [status.loaded, status.total];
                // Progress bar...
            },
            // On error
            (error) => {
                console.error(error);
            });
    }

    /**
     * Adds the parameter model to the active models list.
     * @param model
     * @private
     */
    _registerModel(model) {
        this._models.push(model);
    }

    // ------------------------------------------------------------------- GETTERS

    /**
     * Returns the array containing all the geometries.
     * @returns {Array}
     */
    get models() {
        return this._models;
    }
}
