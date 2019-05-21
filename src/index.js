const util = {
    isObject: function (obj) {
        var type = typeof obj;
        return type === 'object' && !!obj && Object.prototype.toString.call(obj) !== '[object Array]';
    }
}

const api = {
    getImages: url => new Promise((resolve, reject) => {
        if (!url) {
            reject("No url given.")
        }
        return fetch(url)
            .then(this.handleResHttpCode)
            .then(res => res.json())
            .then(resolve)
            .catch(() => {
                reject("Something went wrong with the network request.")
            })
    }),
    handleResHttpCode: function (res) {
        if (arguments.length !== 1) {
            throw new Error("handleResHttpCode only accepts one argument.")
        }
        if (!util.isObject(res)) {
            throw new Error("handleResHttpCode accepts an object argument.")
        }
        if (!res.hasOwnProperty('ok')) {
            throw new Error('handleResHttpCode accepts an object containing key "ok".')
        }
        if (typeof res.ok !== 'boolean') {
            throw new Error('handleResHttpCode accepts an object with key "ok" of type "boolean".')
        }

        return new Promise((resolve, reject) => {
            if (res.ok) {
                resolve(res)
            } else {
                reject('Bad status code from API')
            }
        })
    }
}
