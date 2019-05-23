document.addEventListener('DOMContentLoaded', function () {
    api.getImages('http://localhost:3000/images')
        .then(domHelpers.addImages)
        .catch(dom.showImageError)
})


const util = {
    isObject: function (obj) {
        if (arguments.length !== 1) {
            throw new Error('util.isObject() takes one argument of any type.')
        }
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
            .then(res => {
                if (!res.ok) {
                    throw new Error("Bad status code from API.")
                }
                return res
            })
            .then(res => res.json())
            .then(resolve)
            .catch(() => {
                reject("Something went wrong with the network request.")
            })
    })
}

const domHelpers = {
    addImages: function (jsonImages) {
        if (!Array.isArray(jsonImages) || arguments.length !== 1 || jsonImages.length < 1) {
            throw new Error("domHelpers.addImages accepts one argument of type array with at least one item")
        }
        for (let i = 0; i < jsonImages.length; i++) {
            if (!jsonImages[i].url || typeof jsonImages[i].url !== "string") {
                dom.removeImages()
                dom.showImageError()
                throw new Error('Encountered an image object that did not meet the correct schema. Each object should contain a key "url" of type "string".')
            }
            dom.addImageToDom(jsonImages[i].url)
        }
    },
}


const dom = {
    addImageToDom: function (imgSrc) {
        const imgList = document.getElementById('imgList')
        if (imgList === null) {
            throw new Error("Could not find imgList container on DOM.")
        }
        const img = document.createElement('img')
        img.className = "block img"
        img.src = imgSrc
        imgList.appendChild(img)
    },
    removeImages: function () {
        // const imgs = document
    },
    showImageError: function () {

    }
}