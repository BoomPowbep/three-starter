import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Vector3} from "three";

class Model {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Construction.
     * @param path
     * @param scaleFactor
     * @param position
     */
    constructor(path, scaleFactor = 1, position = {x: 0, y: 0, z: 0}) {
        this.path = path;
        this.scaleFactor = scaleFactor;
        this.position = position;
    }
}

class ModelManager {

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
     * Load all models passed as argument.
     * @param modelsArray Model
     * @param callback
     */
    loadModels(modelsArray, callback) {

        let loadedCount = 0;
        const targetCount = modelsArray.length;

        modelsArray.map(model => {

            // TODO handle more file types
            const loader = new GLTFLoader();

            loader.load(model.path,
                // On loaded
                (object) => {
                    console.log("Loaded model from " + model.path, object);

                    object.scene.scale.set(model.scaleFactor, model.scaleFactor, model.scaleFactor);
                    object.scene.position.x = model.position.x;
                    object.scene.position.y = model.position.y;
                    object.scene.position.z = model.position.z;

                    this._registerModel(object.scene);

                    loadedCount++;

                    // If everything is loaded, execute callback
                    loadedCount === targetCount && callback()
                },
                // On progress
                (status) => {
                    let progress = [status.loaded, status.total];
                    // Progress bar...
                    // TODO Utiliser un singleton pour l'affichage du chargement ?
                },
                // On error
                (error) => {
                    console.error("Object loading error: ", error);
                    // FIXME on charge l'expérience même si un objet a sauté ou pas ? (Je pense non)
                });
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

export { ModelManager, Model };
