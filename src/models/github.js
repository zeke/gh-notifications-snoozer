'use strict'

const fs = require('fs')
const path = require('path')
const Config = require('../config.json')
const Fetcher = require('./fetcher')

class GitHub extends Fetcher {
  // https://developer.github.com/v3/activity/notifications/#list-your-notifications
  getNotifications() {
    return this.get('notifications')
  }

  getPandaRocketTasks() {
    const urlPath = 'search/issues?q=team=identity-team-panda-rocket'
    return this.get(urlPath).then(({ items }) => {
      return items.map(item => {
        return {
          title: item.title,
          body: item.body,
          state: item.state,
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at),
          isPullRequest: !!item.pull_request,
        }
      })
    })
  }

  static getToken() {
    const tokenPath = path.join(__dirname, '..', '..', '.env')
    return fs.readFileSync(tokenPath).toString().trim()
  }

  get(relativeUrl) {
    const url = `${Config.githubApiUrl}/${relativeUrl}`
    const token = GitHub.getToken()
    const options = {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
    }
    return super.get(url, options)
  }
}

module.exports = GitHub
