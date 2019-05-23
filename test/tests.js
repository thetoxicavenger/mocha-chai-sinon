
const expect = chai.expect

// let's make sure it's a booolean - if it's not, let's throw an error
// if we call the function with a truthy value, we expect it to resolve with that true value
// if we the function with a falsy value, we expect it to reject with that falsy value

describe('simplePromise', () => {
    it('should throw an error if not given a boolean', () => {
        expect(simplePromise.bind(null, "string")).to.throw("Argument should be a boolean.")
    })

    // we need to access the .then block and look at what parameter comes back in there
    it('should resolve with true if passed true as an argument', () => {
        return simplePromise(true)
            .then(shouldBeTrue => {
                expect(shouldBeTrue).to.equal(true)
            })
    })

    it('should reject with false if passed false as an argument', () => {
        return simplePromise(false)
            .catch(shouldBeFalse => {
                expect(shouldBeFalse).to.equal(false)
            })
    })

})

describe('simpleCallback', () => {
    // it('should throw an error if first argument is not a boolean', () => {
    //     expect(simpleCallback.bind(null, 24, 24)).to.throw()
    // })
    it('should callback with the value true when passed true', done => {
        simpleCallback(true, function (shouldBeTrue) {
            expect(shouldBeTrue).to.equal(true)
            done()
        })
    })
})

describe('anotherPromise', () => {
    // if provided an array of all negative items, it should reject with the message "Couldn't find any positive array items."
    it('if provided an array of all negative items, it should reject with the message "Couldn\'t find any positive array items."', () => {
        const allnegativeinput = [-1, -10, -12]
        return anotherPromise(allnegativeinput)
            .catch(e => {
                expect(e).to.equal("Couldn't find any positive array items.")
            })
    })

    it('should resolve with the first positive number it finds if provided with an array that has positive numbers in it', () => {
        const hasMultiplePostives = [-1, 2, 3]
        return anotherPromise(hasMultiplePostives)
            .then(shouldBe2 => {
                expect(shouldBe2).to.equal(2)
            })
    })
})

describe('anotherCallback', () => {
    // {}
    it('should return a callback with an error message of "age is a required key on obj argument." and null for successMsg if passed an object that does not have an age key', done => {
        const sampleInput = {}
        anotherCallback(sampleInput, function (errorMsg, successMsg) {
            expect(errorMsg).to.equal('age is a required key on obj argument.')
            expect(successMsg).to.equal(null)
            done()
        })
    })

    it('should return a callback with an error message of "age must be greater than zero." and success message with null if passed an object with age less than zero.', done => {
        const sampleinput = {
            age: -1
        }
        anotherCallback(sampleinput, function (errorMsg, successMsg) {
            expect(errorMsg).to.equal('age must be greater than zero.')
            expect(successMsg).to.equal(null)
            done()
        })
    })

    it('should return a callback with a null error message and a success message of "This person is a child."', done => {
        const age = { age: 10 }
        anotherCallback(age, function (errorMsg, successMsg) {
            expect(errorMsg, successMsg).to.equal(null, 'This person is a child.')
            done()
        })
    })

    it('should return a callback with a null error message and a success message of "This person is an adult" if passed an object that has an age greater than or equal to 18', done => {
        const sampleInput = {
            age: 100000
        }
        anotherCallback(sampleInput, function (errorMsg, successMsg) {
            expect(errorMsg, successMsg).to.equal(null, 'This person is an adult.')
            done()
        })
    })

    it('should throw an error if not given a number for age', () => {
        expect(anotherCallback.bind(null, { age: "" })).to.throw()
    })

})

describe('lastPromise', () => {

})