import {
  deleteDocumentBranch,
  postDocumentBranch,
} from '../apis/documentTree.api.js'
import { createStore } from '../core/createStore.js'

const documentTreeStore = createStore()

documentTreeStore.setState({
  documents: [],
  addDocument: async ({ title, parentId }) => {
    const newState = await postDocumentBranch({ title, parentId })
    documentTreeStore.setState({
      ...documentTreeStore.getState(),
      documents: [...documentTreeStore.getState().documents, newState],
    })
  },
  deleteDocument: async ({ id }) => {
    const newState = await deleteDocumentBranch({ id })
    documentTreeStore.setState(newState)
  },
})

export { documentTreeStore }
