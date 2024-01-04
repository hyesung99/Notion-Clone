import { hashRouter } from '../router/hashRouter.js'

export const getDetailId = () => {
  return hashRouter.getHash().split('/').pop()
}
