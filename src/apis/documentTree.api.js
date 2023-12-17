import NotionFetchClient from './NotionFetchClient.js'
import { END_POINTS } from '../constants/api.js'

export const getDocumentTree = async () => {
  const data = await NotionFetchClient.get(END_POINTS.DOCUMENT_TREE)
  return data
}
