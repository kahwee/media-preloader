'use strict'

const pkg = require('./package.json')
const browserifyTransform = [['browserify-istanbul', {
  instrumenter: require('babel-istanbul')
}]].concat(pkg.browserify.transform)
module.exports = function (config) {
  const globTestFiles = 'test/**/*.js'
  let preprocessors = {}
  preprocessors[globTestFiles] = ['browserify']
  config.set({
    basePath: '.',
    frameworks: ['browserify', 'mocha', 'chai'],
    files: [globTestFiles].concat([
      {
        pattern: './test/fixtures/barack.jpg',
        included: false
      },
      {
        pattern: './test/fixtures/webuild.png',
        included: false
      }
    ]),
    browsers: ['Chrome'],
    preprocessors: preprocessors,
    reporters: ['mocha', 'coverage'],
    browserify: {
      debug: true,
      transform: browserifyTransform
    },
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },
    logLevel: config.LOG_INFO,
    coverageReporter: [{
      type: 'html',
      dir: 'coverage/'
    }]
  })
}
