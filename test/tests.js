const expect = chai.expect
const should = chai.should

describe('api', function () {
    it('is an object', function () {
        expect(api).to.be.a('object')
    })

    describe('#getImages', function () {

        beforeEach('setup fetch sandbox', () => {
            this.sandbox = sinon.sandbox.create()
            this.sandbox.stub(window, "fetch")

            window.fetch.returns(
                Promise.resolve({
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
            )


        })

        afterEach('restore fetch sandbox', () => {
            if (this.sandbox) {
                this.sandbox.restore()
            }
        })

        it('should be a function', function () {
            expect(api.getImages).to.be.a('function')
        })

        it('should resolve to an array of images', async () => { // this is really an integration test rn
            const arrOfObjs = await api.getImages()
            expect(Array.isArray(arrOfObjs)).to.equal(true)
            expect(arrOfObjs[0]).to.include.keys('url')
        })



    })

})