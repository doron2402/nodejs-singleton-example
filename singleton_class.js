
let _instance = null;

class Singleton {

    constructor() {
        if (!_instance || _instance === null) {
            _instance = this;
        }

        return _instance;
    }

    setStatus(status) {
        _instance._status = status;
    }
    getStatus() {
        return _instance._status;
    }

}

module.exports = Singleton;