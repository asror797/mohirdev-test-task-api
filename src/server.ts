import { AuthRoute, TaskRoute, UserRoute } from '@routes'
import App from './app'

const app = new App([new AuthRoute(), new TaskRoute(), new UserRoute()])

app.run()
