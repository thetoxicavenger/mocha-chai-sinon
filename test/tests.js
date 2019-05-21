
const expect = chai.expect
const should = chai.should

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

            window.fetch.resolves(api.handleResHttpCode({
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
            }))

            const arrOfObjs = await api.getImages('http://localhost:3000/images')

            expect(Array.isArray(arrOfObjs)).to.equal(true)

            expect(arrOfObjs[0]).to.include.keys('url')
        })

        it('should reject when not given a url argument', () => {
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
            const spy = sinon.spy(api, "handleResHttpCode")
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

    describe('#handleResHttpCode', () => {

        it('should throw if not called on exactly one argument', () => {
            expect(api.handleResHttpCode).to.throw("handleResHttpCode only accepts one argument.")
            expect(api.handleResHttpCode.bind(null, {}, {})).to.throw("handleResHttpCode only accepts one argument.")
        })

        it('should throw if not called on an object literal', () => {
            expect(api.handleResHttpCode.bind(null, [])).to.throw("handleResHttpCode accepts an object argument.")
            expect(api.handleResHttpCode.bind(null, "")).to.throw("handleResHttpCode accepts an object argument.")
            expect(api.handleResHttpCode.bind(null, null)).to.throw("handleResHttpCode accepts an object argument.")
            expect(api.handleResHttpCode.bind(null, function () { })).to.throw("handleResHttpCode accepts an object argument.")
        })

        it('should throw if object does not contain the key "ok" of type "boolean', () => {
            expect(api.handleResHttpCode.bind(null, {})).to.throw('handleResHttpCode accepts an object containing key "ok')
            expect(api.handleResHttpCode.bind(null, { foo: 'bar' })).to.throw('handleResHttpCode accepts an object containing key "ok')
            expect(api.handleResHttpCode.bind(null, { ok: "true" })).to.throw('handleResHttpCode accepts an object with key "ok" of type "boolean".')
        })

        // should have a better test b/c this only should work on Response class instances

        it('should resolve to res if "res.ok" is true', () => {
            return api.handleResHttpCode({ ok: true })
                .then(res => {
                    expect(res).to.eql({ ok: true })
                })
        })

        it('should reject to "Bad status code from API" if "res.ok" is false', () => {
            return api.handleResHttpCode({ ok: false }).catch(e => {
                expect(e).to.equal("Bad status code from API")
            })
        })


    })

})

// describe('util', () => {
//     describe('#isObject', () => {

//     })
// })