import Queue from '../src/queue'
let q
const URL = './base/test/fixtures/barack.jpg'
describe('Queue', function () {
  before(function () {
    q = new Queue()
  })

  describe('addition', function () {
    it('should add one', function (done) {
      q.addOne({key: 'barack', uri: URL})
      q.process().then((values) => {
        expect(values.length).to.equal(1)
        expect(q.items.length).to.equal(1)
        done()
      })
    })

    it('should add one without a key', function () {
      try {
        expect(q.addOne({uri: URL})).to.throw(Error)
      } catch (err) {
        console.log(err)
      }
    })

    it('should add multiple', function (done) {
      q.add([{key: 'barack', uri: URL}])
        .then((values) => {
          done()
        })
    })
  })

  describe('caching', function () {
    it('should retrieve a present key barack', function (done) {
      q.getByKey('barack', (err, media) => {
        expect(err).to.be.null
        expect(media.uri).to.equal(URL)
        expect(media.asset.src).to.contain('barack.jpg')
        done()
      })
    })

    it('should fetch key that is not present', function (done) {
      q.getByKey('trump', (err, media) => {
        expect(err).to.be.not.empty
        done()
      })
    })
  })
})
