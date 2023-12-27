// Ducks pattern:
// Ducks is a modular pattern that collocates actions, action types, thunks and reducers.

import {
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
    await postDocumentBranch({ title, parentId })
    dispatch({
      type: 'ADD_DOCUMENT',
      payload: { title, parentId },
    })
  }

export const deleteDocument = (document) => {
  return {
    type: 'DELETE_DOCUMENT',
    payload: document,
  }
}

export const documentTreeReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.payload],
      }
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(
          (document) => document.id !== action.payload.id
        ),
      }
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
