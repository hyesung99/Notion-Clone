import { createHashRouter } from '../core/createHashRouter.js'
import HomePage from '../page/home.page.js'
import DetailPage from '../page/detail.page.js'

const routes = {
  '/': HomePage,
  '/detail/(\\w+)': DetailPage,
}

export const hashRouter = createHashRouter(routes)
