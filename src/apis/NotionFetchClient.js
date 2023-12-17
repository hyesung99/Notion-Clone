import { NOTION_API_END_POINT } from '../constants/api.js'
import FetchClient from '../core/FetchClient.js'

const NotionFetchClient = new FetchClient({
  baseURL: NOTION_API_END_POINT,
  baseOption: {
    headers: {
      'Content-Type': 'application/json',
      'x-username': 'sungbird',
    },
  },
})

export default NotionFetchClient
