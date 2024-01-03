import {
  getDocumentTree,
  postDocumentBranch,
  deleteDocumentBranch,
} from '../apis/documentTree.api.js'

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

export const rootReducer = (state = {}, action = {}) => {
  return {
    documentTree: documentTreeReducer(state.documentTree, action),
    documentEditor: documentEditorReducer(state.documentEditor, action),
  }
}

export const documentTreeReducer = (
  state = { documents: [], openedBranches: [] },
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
        openedBranches: [...state.openedBranches, action.payload],
      }
    case 'CLOSE_BRANCH':
      return {
        ...state,
        openedBranches: state.openedBranches.filter(
          (id) => id !== action.payload
        ),
      }
    default:
      return state
  }
}
export const documentEditorReducer = () => {}
