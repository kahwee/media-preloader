import { expect } from 'chai'
import Queue from '../src/queue'
let q
describe('Queue', function () {
  before(function () {
    q = new Queue()
  })

  it('should addOne', function (done) {
    q.addOne({key: 'barack', uri: './base/test/fixtures/barack.jpg'})
    q.process().then((values) => {
      expect(values.length).to.equal(1)
      done()
    })
  })
  // it('should fail when nothing is specified', function (done) {
  //   dlImage('').catch((img) => {
  //     expect(img.success).to.be.false
  //     done()
  //   })
  // })

  // it('should succeed loading .jpg', function (done) {
  //   dlImage('./base/test/fixtures/barack.jpg').then((img) => {
  //     console.log(img.asset)
  //     expect(img.asset).to.be.defined
  //     // document.querySelector('body').appendChild(img.asset)
  //     done()
  //   })
  // })

// it('should succeed loading .png', function (done) {
//   dlImage('./base/test/fixtures/webuild.png').then((img) => {
//     expect(img.asset).to.be.defined
//     done()
//   })
// })
})
