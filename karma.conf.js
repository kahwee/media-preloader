'use strict'

const pkg = require('./package.json')
const browserifyTransform = [['browserify-istanbul', {
  instrumenter: require('babel-istanbul')
}]].concat(pkg.browserify.transform)
module.exports = function (config) {
  const globTestFiles = 'test/**/*.js'
  let preprocessors = {}
  preprocessors[globTestFiles] = ['browserify']
  let configuration = {
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
    }],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  }

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci']
    configuration.autoWatch = false
    configuration.singleRun = true
  }

  config.set(configuration)
}
