function simplePromise(bool) {
    return new Promise((resolve, reject) => {
        if (bool) {
            resolve(bool)
        }
        reject(bool)
    })
}

function simpleCallback(bool, cb) {
    cb(bool)
}