import express from 'express'
import { Routes } from '@interfaces'
import { PORT } from '@config'
import { connect } from 'mongoose'
import { dbConnection } from '@database'
import cors from 'cors'

class App {
  public app: express.Application
  private PORT = PORT || 3030
  
  constructor(routes: Routes[]) {
    this.app = express()
    this.connectionToDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public async run() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is runing at ${this.PORT}`)
    })
  }

  private async connectionToDatabase() {
    try {
      await connect(dbConnection.url, dbConnection.options)
      console.log('Connected to database')
    } catch (error) {
      console.log(error)
    }
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(`/`,route.router)
    })
  }

  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private initializeErrorHandling() {}
}

export default App
