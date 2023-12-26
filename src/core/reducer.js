// Ducks pattern:
// Ducks is a modular pattern that collocates actions, action types, thunks and reducers.

export const rootReducer = (state = {}, action = {}) => {
  return {
    documentTree: documentTreeReducer(state.documentTree, action),
    documentEditor: documentEditorReducer(state.documentEditor, action),
  }
}

export const setDocumentTreeThunk = async (dispatch) => {
  const documents = await getDocumentTree()
  dispatch({
    type: 'SET_DOCUMENT_TREE',
    payload: documents,
  })
}

export const documentTreeReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documentTree, action.payload],
      }
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documentTree.filter(
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
