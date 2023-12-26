export const rootReducer = (state = {}, action = {}) => {
  return {
    documentTree: documentTreeReducer(state.documentTree, action),
    documentEditor: documentEditorReducer(state.documentEditor, action),
  }
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
