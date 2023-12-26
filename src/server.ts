/* eslint-disable no-console */
import app from './app'
import config from './app/config'
import { Server } from 'http'
// const mongoose = require("mongoose");
import mongoose from 'mongoose'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

/**
 * unhandledRejection --- async error
 */
// gracefully turning the server off
process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected🤣 sutting down the server')

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

/** Example of uncaught exeption */
// console.log(x)

// turning off server when uncaught Exception is occured.
process.on('uncaughtException', () => {
  console.log(
    '🤣🤣🤣 uncaughtException  is detected 🤬 sutting down the server',
  )
  process.exit(1)
})
