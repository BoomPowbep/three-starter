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