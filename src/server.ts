import { TaskRoute, UserRoute } from '@routes'
import App from './app'

const app = new App([
  new TaskRoute(),
  new UserRoute()
])

app.run()
