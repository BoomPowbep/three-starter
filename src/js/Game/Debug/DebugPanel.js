class DebugButton {

    /**
     * Constructor.
     */
    constructor(text = "default", callback = () => {console.log("default")}) {
        this.text = text;
        this.callback = callback;
    }
}

class DebugPanel {

    /**
     * Constructor.
     */
    constructor() {
        this._opened = false;

        // Main container
        this._wrapper = document.createElement("div");
        this._wrapper.classList.add("debugPanelWrapper");
        document.body.appendChild(this._wrapper);

        // Buttons container
        this._buttonsContainer = document.createElement("div");
        this._buttonsContainer.classList.add("debugButtonsWrapper");
        this._wrapper.appendChild(this._buttonsContainer);

        // Handle
        let handle = document.createElement("div");
        handle.classList.add("debugPanelHandle");
        handle.innerHTML = "<svg viewBox=\"0 0 451.85 451.85\">\n" +
            "\n" +
            "\t<path d=\"m345.44 248.29-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z\"/>\n" +
            "\n" +
            "</svg>\n";
        this._wrapper.appendChild(handle);

        handle.addEventListener("touchend", (event) => {
            // Cancel click under
            event.stopPropagation();
            event.preventDefault();
            // Update drawer
            this._opened = !this._opened;
            this._updateStatus();
        });
    }

    /**
     * Update drawer status.
     */
    _updateStatus() {
        if(this._opened) {
            this._wrapper.style.left = "0";
        }
        else {
            this._wrapper.style.left = "-250px";
        }
    }

    /**
     * Add buttons to the panel.
     * @param buttonsArray
     */
    addButtons(buttonsArray) {
        buttonsArray.forEach((button) => {
            let buttonElement = document.createElement("div");
            buttonElement.classList.add("debugButton");
            buttonElement.innerHTML = button.text;
            buttonElement.addEventListener("touchend", (event) => {
                // Cancel click under
                event.stopPropagation();
                event.preventDefault();
                button.callback();
                // Close drawer
                this._opened = false;
                this._updateStatus();
            });
            this._buttonsContainer.appendChild(buttonElement);
        });
    }

}

export {DebugPanel, DebugButton};