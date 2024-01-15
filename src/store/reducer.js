import {
  getDocumentTree,
  postDocument,
  deleteDocument,
  putDocument,
} from '../apis/document.api.js'
import { findBranch } from '../service/findBranch.js'

export const openBranch = ({ id }) => ({
  type: 'OPEN_BRANCH',
  payload: id,
})

export const closeBranch = ({ id }) => ({
  type: 'CLOSE_BRANCH',
  payload: id,
})

export const setTree = () => ({
  type: 'SET_TREE',
})

export const setTreeSuccess = ({ documents }) => ({
  type: 'SET_TREE_SUCCESS',
  payload: { documents },
})

export const setTreeFail = (error) => ({
  type: 'SET_TREE_ERROR',
  payload: { error },
})

export const setBranchTitle = ({ title, id }) => ({
  type: 'SET_BRANCH_TITLE',
  payload: { title, id },
})

export const setContent = ({ content }) => ({
  type: 'SET_CONTENT',
  payload: content,
})

export const setDocumentTreeThunk = () => async (dispatch) => {
  dispatch(setTree())
  try {
    const documents = await getDocumentTree()
    dispatch(setTreeSuccess({ documents }))
  } catch (error) {
    dispatch(setTreeFail(error))
  }
}

export const addBranchThunk =
  ({ title, parentId }) =>
  async (dispatch) => {
    try {
      await postDocument({ title, parentId })
      dispatch(setDocumentTreeThunk())
      dispatch(openBranch({ id: parentId }))
    } catch {}
  }

export const deleteBranchThunk =
  ({ id }) =>
  async (dispatch) => {
    await deleteDocument({ id })
    dispatch(setDocumentTreeThunk())
  }

export const putDocumentTitleThunk =
  ({ title, id }) =>
  async () => {
    await putDocument({ title, id })
  }

export const putBranchTitle =
  ({ title, id }) =>
  (dispatch) =>
    dispatch(setBranchTitle({ title, id }))

export const putDocumentContentThunk =
  ({ content, id }) =>
  async (dispatch) => {
    await putDocument({ content, id })
    dispatch(setDocumentTreeThunk())
  }

const documentTreeInitialState = {
  documents: {
    loading: false,
    data: null,
    error: null,
  },
  openedBranches: new Set(),
}

const documentDetailInitialState = {
  content: '',
}

export const rootReducer = (state = {}, action = {}) => {
  return {
    documentTree: documentTreeReducer(state.documentTree, action),
    documentDetail: documentDetailReducer(state.documentDetail, action),
  }
}

export const documentTreeReducer = (
  state = documentTreeInitialState,
  action
) => {
  switch (action.type) {
    case 'SET_BRANCH_TITLE':
      const newState = Object.assign({}, state)
      const targetDocument = findBranch(newState.documents, action.payload.id)
      targetDocument.title = action.payload.title
      return newState

    case 'SET_TREE':
      return {
        ...state,
        documents: {
          loading: true,
          data: null,
          error: null,
        },
      }

    case 'SET_TREE_SUCCESS':
      return {
        ...state,
        documents: {
          loading: false,
          data: action.payload.documents,
          error: null,
        },
      }
    case 'SET_TREE_ERROR':
      return {
        ...state,
        documents: {
          loading: false,
          data: null,
          error: action.payload.error,
        },
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
export const documentDetailReducer = (
  state = documentDetailInitialState,
  action
) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.payload,
      }
    default:
      return state
  }
}
