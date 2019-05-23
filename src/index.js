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

function anotherPromise(arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > -1) {
                resolve(arr[i])
            }
        }
        reject("Couldn't find any positive array items.")
    })
}

function anotherCallback(obj, cb) {
    if (!obj.hasOwnProperty('age')) {
        return cb('age is a required key on obj argument.', null)
    }
    if (age < 0) {
        return cb('age must be greater than zero.', null)
    }
    if (age < 18) {
        return cb(null, 'This person is a child.')
    }
    return cb(null, 'This person is an adult.')
}

function lastPromise(url) {
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Bad status code.')
                }
                return res
            })
            .then(res => res.json())
            .catch(reject)
    })
}