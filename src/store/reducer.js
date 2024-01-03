import {
  getDocumentTree,
  postDocument,
  deleteDocument,
  getDocumentDetail,
} from '../apis/document.api.js'

export const openBranch = (id) => ({
  type: 'OPEN_BRANCH',
  payload: id,
})

export const closeBranch = (id) => ({
  type: 'CLOSE_BRANCH',
  payload: id,
})

export const setDocumentTreeThunk = () => async (dispatch) => {
  const documents = await getDocumentTree()
  dispatch({
    type: 'SET_DOCUMENT_TREE',
    payload: documents,
  })
}

export const addBranchThunk =
  ({ title, parentId }) =>
  async (dispatch) => {
    await postDocumentBranch({ title, parentId })
    dispatch(setDocumentTreeThunk())
    dispatch(openBranch(parentId))
  }

export const deleteBranchThunk =
  ({ id }) =>
  async (dispatch) => {
    await deleteDocumentBranch({ id })
    dispatch(setDocumentTreeThunk())
  }

export const setEditorThunk = async (id) => {
  const documentDetail = await getDocumentDetail({ id })
  dispatch({
    type: 'SET_TITLE',
    payload: documentDetail.title,
  })
  dispatch({
    type: 'SET_CONTENT',
    payload: documentDetail.content,
  })
}

export const rootReducer = (state = {}, action = {}) => {
  return {
    documentTree: documentTreeReducer(state.documentTree, action),
    documentEditor: documentEditorReducer(state.documentEditor, action),
  }
}

export const documentTreeReducer = (
  state = { documents: [], openedBranches: new Set() },
  action
) => {
  switch (action.type) {
    case 'SET_DOCUMENT_TREE':
      return {
        ...state,
        documents: action.payload,
      }
    case 'OPEN_BRANCH':
      return {
        ...state,
        openedBranches: state.openedBranches.add(action.payload),
      }
    case 'CLOSE_BRANCH':
      const newOpenedBranches = new Set(state.openedBranches)
      newOpenedBranches.delete(action.payload)
      return {
        ...state,
        openedBranches: newOpenedBranches,
      }
    default:
      return state
  }
}
export const documentEditorReducer = (
  state = {
    title: '',
    content: '',
  },
  action
) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload,
      }
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.payload,
      }
  }
}
