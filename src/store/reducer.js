import {
  getDocumentTree,
  postDocument,
  deleteDocument,
  getDocumentDetail,
  putDocument,
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
    dispatch({
      type: 'SET_TITLE',
      payload: documentDetail.title,
    })
    dispatch({
      type: 'SET_CONTENT',
      payload: documentDetail.content,
    })
  }

export const putDocumentTitleThunk =
  ({ title, id }) =>
  async (dispatch) => {
    await putDocument({ title, id })
    dispatch(setDocumentTreeThunk())
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
export const documentDetailReducer = (
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
    default:
      return state
  }
}
