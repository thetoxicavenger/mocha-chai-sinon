const util = {
    handleResHttpCode: res => new Promise((resolve, reject) => {
        if (res.ok) {
            resolve(res)
        } else {
            reject('Bad status code from API')
        }
    })
}

const api = {
    getImages: () => new Promise((resolve, reject) => {
        return fetch('http://localhost:3000/images')
            .then(util.handleResHttpCode)
            .then(res => res.json())
            .then(resolve)
            .catch(e => {
                console.log(e)
                reject(e)
            })
    })
}
