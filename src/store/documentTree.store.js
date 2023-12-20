import {
  deleteDocumentBranch,
  getDocumentTree,
  postDocumentBranch,
} from '../apis/documentTree.api.js'
import { createStore } from '../core/createStore.js'

const documentTreeStore = createStore({
  documents: [],
  selectedDocumentId: null,
  addDocument: null,
  deleteDocument: null,
})

documentTreeStore.setState({
  documents: await getDocumentTree(),
  selectedDocumentId: null,
  addDocument: async ({ title, parentId }) => {
    await postDocumentBranch({ title, parentId })
    documentTreeStore.setState({
      ...documentTreeStore.getState(),
      documents: await getDocumentTree(),
    })
  },
  deleteDocument: async ({ id }) => {
    await deleteDocumentBranch({ id })
    documentTreeStore.setState({
      ...documentTreeStore.getState(),
      documents: await getDocumentTree(),
    })
  },
})

export { documentTreeStore }
