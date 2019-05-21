# Getting Started with Mocha in the Browser

This repository is designed to get you started with running Mocha tests in the browser.

## Installation

Begin by forking and cloning this repository. Then run the following:

```bash
npm install
```

## Setup

You can create a browser test setup by doing the following:

```bash
npm run mocha init ./test
```

This command will do the following:

1. Create a `test/` folder
1. Add an `index.html`, `mocha.css`, `mocha.js`, and a `tests.js` file where you can put your test.

Add the following line to the `index.html` file that was created:

```html
<!-- Add this line below the line that requires the mocha.js script -->
<script src="../node_modules/chai/chai.js" charset="utf-8"></script>
```

Open up the `index.html` file in your browser and you should see in the top right-hand corner some text. You now have Mocha running tests!

Add the following to the `tests.js` file.

```js
const expect = chai.expect

describe('calculator', function () {
  it('is an object', function () {
    expect(calculator).to.be.a('object')
  })

  describe('#add', function () {
    it('should be a function', function () {
      expect(calculator.add).to.be.a('function')
    })

    it('should add two numbers together', function () {
      expect(calculator.add(10,20)).to.equal(30)
    })
  })
})
```

Go back to your page and refresh. You should now see three failing tests. You're now running your tests with Chai!

Finally, we will want to start writing some code to make everything pass. There are a number of places you could put your code, but we will put it in a `src/` directory. From the root directory of this project, run the following:

```bash
mkdir src && touch src/calculator.js
```

Add the following to the new file you've created:

```js
var calculator = {}
```

And then add the following to the `index.html` file that is inside of the `test/` folder.

```html
<!-- Add this line below the line that you required earlier -->
<script src="../src/calculator.js" charset="utf-8"></script>
```

Go back to the page where your tests are running and refresh. You should have a single passing test now!

## Instructions

To finish this project, get the two failing `#add` tests to pass. Then, add a new `describe` block for a `#subtract` method. Add your own tests and get those to pass.
