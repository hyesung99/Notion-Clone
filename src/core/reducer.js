// Ducks pattern:
// Ducks is a modular pattern that collocates actions, action types, thunks and reducers.

import {
  deleteDocumentBranch,
  getDocumentTree,
  postDocumentBranch,
} from '../apis/documentTree.api.js'

export const rootReducer = (state = {}, action = {}) => {
  return {
    documentTree: documentTreeReducer(state.documentTree, action),
    documentEditor: documentEditorReducer(state.documentEditor, action),
  }
}

export const setDocumentTreeThunk = () => async (dispatch) => {
  const documents = await getDocumentTree()
  dispatch({
    type: 'SET_DOCUMENT_TREE',
    payload: documents,
  })
}

export const addDocumentThunk =
  ({ title, parentId }) =>
  async (dispatch) => {
    postDocumentBranch({ title, parentId })
    dispatch(setDocumentTreeThunk())
  }

export const deleteDocumentThunk =
  ({ id }) =>
  async (dispatch) => {
    await deleteDocumentBranch({ id })
    dispatch(setDocumentTreeThunk())
  }

export const documentTreeReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case 'SET_DOCUMENT_TREE':
      return {
        ...state,
        documents: action.payload,
      }
    default:
      return state
  }
}
export const documentEditorReducer = () => {}
