'use strict'

const storage = require('electron-json-storage')
const Rules = require('./rules')

class Rule {
  constructor(key) {
    this.key = key
  }

  exists() {
    return new Promise((resolve, reject) => {
      storage.has(this.key, (error, hasKey) => {
        if (error) {
          reject(error)
        } else {
          resolve(hasKey)
        }
      })
    })
  }

  retrieve() {
    return new Promise((resolve, reject) => {
      storage.get(this.key, (error, value) => {
        if (error) {
          reject(error)
        } else {
          resolve(value)
        }
      })
    })
  }

  store(value) {
    return new Promise((resolve, reject) => {
      storage.set(this.key, value, (error) => {
        if (error) {
          reject(error)
        } else {
          Rules.addKey(this.key).then(resolve).catch(reject)
        }
      })
    })
  }
}

module.exports = Rule
