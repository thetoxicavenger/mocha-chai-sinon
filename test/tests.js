
const expect = chai.expect

describe('util', () => {

    it('is an object', function () {
        expect(util).to.be.a('object')
    })

    describe('#isObject', () => {

        it('should be a function', function () {
            expect(util.isObject).to.be.a('function')
        })

        it('should throw an error if not given a single argument', () => {
            expect(util.isObject.bind(null)).to.throw('util.isObject() takes one argument of any type.')
            expect(util.isObject.bind(null, {}, "")).to.throw('util.isObject() takes one argument of any type.')
        })

    })

})

describe('api', function () {

    it('is an object', function () {
        expect(api).to.be.a('object')
    })

    describe('#getImages', function () {

        beforeEach('setup fetch sandbox', () => {
            sinon.stub(window, "fetch")
        })

        afterEach('restore fetch sandbox', () => {
            window.fetch.restore()
        })

        it('should be a function', function () {
            expect(api.getImages).to.be.a('function')
        })

        it('should resolve to an array of image objects, each of which has a url key', async () => {

            window.fetch.resolves({
                ok: true,
                json: () => new Promise((resolve, reject) => {
                    resolve(
                        [
                            {
                                "albumId": 1,
                                "id": 1,
                                "title": "accusamus beatae ad facilis cum similique qui sunt",
                                "url": "https://via.placeholder.com/600/92c952",
                                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
                            }
                        ]
                    )
                })
            })

            const arrOfObjs = await api.getImages('http://localhost:3000/images')

            expect(Array.isArray(arrOfObjs)).to.equal(true)

            expect(arrOfObjs[0]).to.include.keys('url')
        })

        it('should reject when not given a url argument', () => { // refactor to should reject when fetch is not able to receive a response from the api with multiple test cases
            return api.getImages().catch(e => {
                expect(e).to.equal("No url given.")
            })
        })

        it('should reject when fetch receives a non-ok response from the API', () => {

            window.fetch.resolves({
                ok: false
            })

            return api.getImages("http://localhost:3000/not_a_route").catch(e => {
                expect(e).to.equal("Something went wrong with the network request.")
            })

        })

        it('should call "fetch" once', () => {
            window.fetch.resolves({
                ok: true,
                json: () => new Promise((resolve, reject) => {
                    resolve(
                        [
                            {
                                "albumId": 1,
                                "id": 1,
                                "title": "accusamus beatae ad facilis cum similique qui sunt",
                                "url": "https://via.placeholder.com/600/92c952",
                                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
                            }
                        ]
                    )
                })
            })
            return api.getImages('http://localhost:3000/it-doesnt-matter')
                .then(() => {
                    expect(fetch.calledOnce).to.equal(true)
                })

        })

    })

})

// describe('util', () => {
//     describe('#isObject', () => {

//     })
// })

describe('domHelpers', () => {

    beforeEach('setup dom stubs', () => {
        sinon.stub(document, 'getElementById')
        const imgList = {
            appendChild: img => true
        }
        document.getElementById.returns(imgList)
    })

    afterEach('teardown dom stubs', () => {
        document.getElementById.restore()
    })

    it('should be an object', () => {
        expect(typeof domHelpers).to.equal("object")
    })

    describe('#addImages', () => {

        it('should be a function', () => {
            expect(typeof domHelpers.addImages).to.equal('function')
        })

        it('should throw if not given a single non-empty array argument', () => {
            expect(domHelpers.addImages.bind(null)).to.throw("domHelpers.addImages accepts one argument of type array with at least one item")
            expect(domHelpers.addImages.bind(null, null, null)).to.throw("domHelpers.addImages accepts one argument of type array with at least one item")
            expect(domHelpers.addImages.bind(null, null)).to.throw("domHelpers.addImages accepts one argument of type array with at least one item")
            expect(domHelpers.addImages.bind(null, [])).to.throw("domHelpers.addImages accepts one argument of type array with at least one item")
        })

        it('should call "dom.removeImages()" and "dom.displayImageError()" and throw if it encounters an array item that does not meet the following schema: { url: Non-Empty String }', () => {

            sinon.spy(dom, "removeImages")
            sinon.spy(dom, "showImageError")

            expect(domHelpers.addImages.bind(null, [{}])).to.throw('Encountered an image object that did not meet the correct schema. Each object should contain a key "url" of type "string".')

            expect(dom.removeImages.calledOnce).to.equal(true)
            expect(dom.showImageError.calledOnce).to.equal(true)

            expect(domHelpers.addImages.bind(null, [{ url: "" }])).to.throw('Encountered an image object that did not meet the correct schema. Each object should contain a key "url" of type "string".')

            dom.removeImages.restore()
            dom.showImageError.restore()

        })

        // it should call dom.addImage() each time we iterate
        it('should call "dom.addImageToDom()" on the current image each time we iterate if given well-formed array argument', () => {

            sinon.spy(dom, "addImageToDom")

            const wellFormedArray = [
                {
                    url: "https://via.placeholder.com/600/92c952"
                },
                {
                    url: "https://via.placeholder.com/600/771796"
                }
            ]

            domHelpers.addImages(wellFormedArray)

            expect(dom.addImageToDom.callCount).to.equal(wellFormedArray.length)

            expect(dom.addImageToDom.firstCall.args[0]).to.equal(wellFormedArray[0].url)
            expect(dom.addImageToDom.secondCall.args[0]).to.equal(wellFormedArray[1].url)

        })



    })

})

describe('dom', () => {

    describe('#addImageToDom', () => {

        it('should throw an error if the images container is not selectable', () => {
            expect(dom.addImageToDom).to.throw("Could not find imgList container on DOM.")
        })

    })
})