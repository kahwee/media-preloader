import { default as dlImage } from './util/download-image'
export default class Queue {
  constructor () {
    this.items = []
    this.itemsLazyCache = {}
    this.queue = []
  }

  add (items) {
    items.forEach((item) => {
      this.addOne(item)
    }, this)
    return this.process()
  }

  /**
   * Should consist of:
   * * key
   * * uri
   * @param {object}
   */
  addOne (item) {
    if (!item.key) {
      throw new Error('A valid key is required so that it can be queried later.')
    }
    this.queue.push(Object.assign({}, item))
  }

  /**
   * Processes the queue
   */
  process () {
    const all = Promise.all(this.queue.map((item) => dlImage(item)))
    this.queue = []
    all.then((items) => {
      this.items = this.items.concat(items)
    })
    return all
  }

  fetch (item, done) {
    dlImage(item).then(done)
  }

  /**
   * @param  {[type]}
   * @param  {Function}
   * @return {[type]}
   */
  getByKey (key, done) {
    if (this.itemsLazyCache[key]) {
      done(null, this.itemsLazyCache[key])
      return this.itemsLazyCache[key]
    } else {
      const validItems = this.items.filter((item) => item.key === key)
      if (validItems.length !== 0) {
        // Always get the first
        const item = validItems[0]
        this.itemsLazyCache[item.key] = item
        done(null, item)
        return item
      } else {
        done({error: 'Not found'})
        return
      }
    }
  }

}
