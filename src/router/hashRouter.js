import { createHashRouter } from '../core/createHashRouter.js'
import HomePage from '../page/HomePage.js'
import DetailPage from '../page/DetailPage.js'
import ErrorPage from '../page/ErrorPage.js'

const routes = {
  '/': HomePage,
  '/detail/(\\w+)': DetailPage,
  '/error': ErrorPage,
}

export const hashRouter = createHashRouter(routes)
