import * as THREE from 'three';
import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper';

export default class SoundManager {

    // ------------------------------------------------------------------- OBJECT INITIALIZATION

    /**
     * Construction.
     * @param isDebugMode
     */
    constructor(isDebugMode) {
        console.log('🎼 Sound constructor');

        this._debugMode = isDebugMode;

        // Elements that will be added to the camera (listeners)
        this._forCamera = [];
    };


    /**
     * Do the setup.
     * @param camera
     */
    setup(camera) {
        this._camera = camera;
    }

    // ------------------------------------------------------------------- DEBUG


    // ------------------------------------------------------------------- MAKE

    /**
     * Creates a global audio source.
     * @param identifier
     * @param path
     * @param callback
     */
    createGlobalAudio(identifier, path, callback) {
        let listener = new THREE.AudioListener();
        this._camera.add(listener);

        let sound = new THREE.Audio( listener );

        let audioLoader = new THREE.AudioLoader();
        audioLoader.load(path, ( buffer ) => {
            sound.setBuffer( buffer );
            sound.identifier = identifier;
            callback(true, sound);
        });
        callback(false);
    }

    /**
     * Creates a positional audio in a parent.
     * @param parent
     * @param path
     * @param callback
     */
    createPositionalAudio(parent, path, callback) {
        let listener = new THREE.AudioListener();
        this._camera.add(listener);

        let sound = new THREE.PositionalAudio( listener );

        if(this._debugMode) {
            sound.add(new PositionalAudioHelper( sound ));
        }

        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( path, ( buffer ) => {
            sound.setBuffer( buffer );
            parent.add( sound );
            callback(true, sound);
        });
    }

    // ------------------------------------------------------------------- GETTERS

    /**
     * TODO change to get global sound in camera by identifier
     * Returns the global sound identified by string.
     * @param identifier
     */
    getGlobalSoundReferenceByIdentifier(identifier) {
    //     for (let sound of this._globalSounds) {
    //         if(sound.identifier === identifier) return sound; // Reference
    //     }
    //     console.error("Couldn't find global sound with identifier " + identifier);
    //     return null;
    }
}
