import express from 'express'
import { Routes } from '@interfaces'
import { PORT } from '@config'
import { connect } from 'mongoose'
import { dbConnection } from '@database'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { errorMiddleware } from '@middlewares'

class App {
  public app: express.Application
  private PORT = PORT || 3030

  constructor(routes: Routes[]) {
    this.app = express()
    this.connectionToDatabase()
    this.initializeMiddlewares()
    this.initializeSwagger()
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
      this.app.use(`/`, route.router)
    })
  }

  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Marketplace HLD - App for catalogs to see and compare prices, buying products.',
        },
      },
      apis: ['swagger.yaml'],
    }

    const swaggerDocs = swaggerJSDoc(options)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}

export default App
