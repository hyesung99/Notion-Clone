import {
  getDocumentTree,
  postDocument,
  deleteDocument,
  getDocumentDetail,
  putDocument,
} from '../apis/document.api.js'
import { findBranch } from '../service/findBranch.js'

export const openBranch = (id) => ({
  type: 'OPEN_BRANCH',
  payload: id,
})

export const closeBranch = (id) => ({
  type: 'CLOSE_BRANCH',
  payload: id,
})

export const setBranch = (documents) => ({
  type: 'SET_BRANCH',
  payload: documents,
})

export const setBranchTitle = (title, id) => ({
  type: 'SET_BRANCH_TITLE',
  payload: { title, id },
})

export const setContent = (content) => ({
  type: 'SET_CONTENT',
  payload: content,
})

export const setDocumentTreeThunk = () => async (dispatch) => {
  const documents = await getDocumentTree()
  dispatch(setBranch(documents))
}

export const addBranchThunk =
  ({ title, parentId }) =>
  async (dispatch) => {
    await postDocument({ title, parentId })
    dispatch(setDocumentTreeThunk())
    dispatch(openBranch(parentId))
  }

export const deleteBranchThunk =
  ({ id }) =>
  async (dispatch) => {
    await deleteDocument({ id })
    dispatch(setDocumentTreeThunk())
  }

export const setDocumentDetailThunk =
  ({ id }) =>
  async (dispatch) => {
    const documentDetail = await getDocumentDetail({ id })
    dispatch(setTitle(documentDetail.title))
    dispatch(setContent(documentDetail.content))
  }

export const putDocumentTitleThunk =
  ({ title, id }) =>
  async (dispatch) => {
    await putDocument({ title, id })
    dispatch(setBranchTitle(title, id))
  }

export const putDocumentContentThunk =
  ({ content, id }) =>
  async (dispatch) => {
    await putDocument({ content, id })
    dispatch(setDocumentTreeThunk())
  }

export const rootReducer = (state = {}, action = {}) => {
  return {
    documentTree: documentTreeReducer(state.documentTree, action),
    documentDetail: documentDetailReducer(state.documentDetail, action),
  }
}

export const documentTreeReducer = (
  state = { documents: [], openedBranches: new Set() },
  action
) => {
  switch (action.type) {
    case 'SET_BRANCH_TITLE':
      const newState = Object.assign({}, state)
      const targetDocument = findBranch(newState.documents, action.payload.id)
      targetDocument.title = action.payload.title
      return newState

    case 'SET_BRANCH':
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
export const documentDetailReducer = (
  state = {
    content: '',
  },
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
