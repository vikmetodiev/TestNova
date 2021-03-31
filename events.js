module.exports = {
    callbacks: {},

    /**
     * @param {string} eventName
     * @param {*} data
     */
    triggerEvent(eventName, data = null) {
        if (this.callbacks && this.callbacks[eventName]) {
            Object.values(this.callbacks[eventName]).forEach(callback => {
                callback(data);
            });
        }
    },

    triggerEventById(eventName, id, data = null) {
        if (this.callbacks && this.callbacks[eventName] && this.callbacks[eventName][id]) {
            this.callbacks[eventName][id](data)
        }
    },

    /**
     * @param {string} eventName name of event
     * @param {string} id callback identifier
     * @param {Function} callback
     */
    listenEvent(eventName, id, callback) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = {};
        }
        this.callbacks[eventName][id] = callback;
    },

    /**
     * @param {string} eventName name of event
     * @param {string} id callback identifier
     */
    unlistenEvent(eventName, id) {
        if (this.callbacks && this.callbacks[eventName] && this.callbacks[eventName][id]) {
            delete this.callbacks[eventName][id];
        }
    },
};