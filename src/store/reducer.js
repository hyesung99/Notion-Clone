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

export const getTree = () => ({
  type: 'GET_TREE',
})

export const getTreeSuccess = ({ documents }) => ({
  type: 'GET_TREE_SUCCESS',
  payload: { documents },
})

export const getTreeFail = (error) => ({
  type: 'GET_TREE_ERROR',
  payload: { error },
})

export const setBranchTitle = ({ title, id }) => ({
  type: 'SET_BRANCH_TITLE',
  payload: { title, id },
})

export const getContent = ({ content }) => ({
  type: 'GET_CONTENT',
  payload: content,
})

export const getContentSuccess = ({ content }) => ({
  type: 'GET_CONTENT_SUCCESS',
  payload: { content },
})

export const getContentFail = (error) => ({
  type: 'GET_CONTENT_ERROR',
  payload: { error },
})

export const getDocumentTreeThunk = () => async (dispatch) => {
  dispatch(getTree())
  try {
    const documents = await getDocumentTree()
    dispatch(getTreeSuccess({ documents }))
  } catch (error) {
    dispatch(getTreeFail(error))
  }
}

export const addBranchThunk =
  ({ title, parentId }) =>
  async (dispatch) => {
    try {
      await postDocument({ title, parentId })
      dispatch(getDocumentTreeThunk())
      dispatch(openBranch({ id: parentId }))
    } catch {}
  }

export const deleteBranchThunk =
  ({ id }) =>
  async (dispatch) => {
    await deleteDocument({ id })
    dispatch(getDocumentTreeThunk())
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
    dispatch(getDocumentTreeThunk())
  }

const documentTreeInitialState = {
  documents: {
    loading: false,
    data: [],
    error: null,
  },
  openedBranches: new Set(),
}

const documentDetailInitialState = {
  content: {
    loading: false,
    data: null,
    error: null,
  },
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
      const targetDocument = findBranch(
        newState.documents.data,
        action.payload.id
      )

      targetDocument.title = action.payload.title
      return newState

    case 'GET_TREE':
      return {
        ...state,
        documents: {
          loading: true,
          data: state.documents.data ?? [],
          error: null,
        },
      }

    case 'GET_TREE_SUCCESS':
      return {
        ...state,
        documents: {
          loading: false,
          data: action.payload.documents,
          error: null,
        },
      }
    case 'GET_TREE_ERROR':
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
    case 'GET_CONTENT':
      return {
        ...state,
        content: {
          loading: true,
          data: null,
          error: null,
        },
      }
    case 'GET_CONTENT_SUCCESS':
      return {
        ...state,
        content: {
          loading: false,
          data: action.payload.content,
          error: null,
        },
      }

    case 'GET_CONTENT_ERROR':
      return {
        ...state,
        content: {
          loading: false,
          data: null,
          error: action.payload.error,
        },
      }
    default:
      return state
  }
}
