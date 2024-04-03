import express from 'express'
import { Routes } from './interfaces'

class App {

  public app: express.Application
  
  constructor(routes: Routes[]) {
    this.app = express()
    this.initializeMiddlwares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public async run() {
    this.app.listen(5000, () => {
      console.log(`Server is runing`)
    })
  }

  private initializeRoutes(routes: Routes[]) {}
  private initializeMiddlwares() {}
  private initializeErrorHandling() {}
}

export default App
