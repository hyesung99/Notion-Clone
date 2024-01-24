import { createHashRouter } from '../core/createHashRouter.js'
import HomePage from '../page/homePage.js'
import DetailPage from '../page/DetailPage.js'

const routes = {
  '/': HomePage,
  '/detail/(\\w+)': DetailPage,
}

export const hashRouter = createHashRouter(routes)
