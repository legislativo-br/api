const serverConfig = require('../../config/server')
const databasePlugin = require('../plugins/database')
const graphqlPlugin = require('../plugins/graphql')
const loadRoutesPlugin = require('../plugins/routes')

require('dotenv').config()

const setupServer = fastify => {
  // setup config
  const server = fastify(serverConfig)

  // setup plugins
  databasePlugin(server)
  graphqlPlugin(server)
  loadRoutesPlugin(server)

  // ready
  server
    .listen(process.env.PORT, process.env.HOST)
    .then((address) => {
      server.log.info(`server listening on ${address}`)
    })
    .catch(err => {
      server.log.error(err)
    })
}

module.exports = setupServer
