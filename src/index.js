function simplePromise(bool) {
    if (typeof bool !== 'boolean') {
        throw new Error("Argument should be a boolean.")
    }
    return new Promise((resolve, reject) => {
        if (bool) {
            resolve(bool)
        }
        reject(bool)
    })
}

// simplePromise(true)
// .then(bool => {

// })
// .catch(bool => {

// })

// function sync(bool) {
//     if (bool) {
//         return true
//     }
//     return false
// }

// if we call the function with a truthy value, we expect it to resolve with that true value
// if we the function with a falsy value, we expect it to reject with that falsy value
// let's make sure it's a booolean - if it's not, let's throw an error

// callback should be a function
// bool is a boolean
// if we pass true, callback should bring back true
// if we pass false, callback should bring back false
function simpleCallback(bool, cb) {
    cb(bool)
}

function anotherPromise(arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > 0) {
                resolve(arr[i])
            }
        }
        reject("Couldn't find any positive array items.")
    })
}

// anotherPromise([2, 1])
// .then(shouldBe2 => {

// })

// [-1, -2, -200, 1]

function anotherCallback(obj, cb) {
    if (!obj.hasOwnProperty('age')) {
        return cb('age is a required key on obj argument.', null)
    }
    if (obj.age < 0) {
        return cb('age must be greater than zero.', null)
    }
    if (obj.age < 18) {
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