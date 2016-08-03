import dlImage from '../../src/util/download-image'

describe('util.download-image', function () {
  it('should fail when empty object specified', function (done) {
    dlImage({}).catch((img) => {
      expect(img.success).to.be.false
      done()
    })
  })

  it('should fail when nothing is specified', function (done) {
    dlImage().catch((img) => {
      expect(img.success).to.be.false
      done()
    })
  })

  it('should succeed loading .jpg', function (done) {
    dlImage({uri: './base/test/fixtures/barack.jpg'}).then((img) => {
      expect(img.asset).to.be.defined
      done()
    })
  })

  it('should succeed loading .png', function (done) {
    dlImage({uri: './base/test/fixtures/webuild.png'}).then((img) => {
      expect(img.asset).to.be.defined
      done()
    })
  })

  it('should fail loading a missing picture', function (done) {
    dlImage({uri: './base/test/fixtures/missing.jpg'}).catch((err) => {
      expect(err.success).to.be.false
      done()
    })
  })
})
