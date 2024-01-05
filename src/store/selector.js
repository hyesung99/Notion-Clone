import createSelector from '../core/createSelector.js'

const getRootDocuments = (state) => state.documentTree.documents
const getOpenedBranches = (state) => state.documentTree.openedBranches
const getTitle = (state) => state.documentDetail.title
const getContent = (state) => state.documentDetail.content

export const selectRootDocuments = (state) =>
  createSelector(
    (documents) => documents,
    () => getRootDocuments(state)
  )

export const selectDocumentDetail = (state) =>
  createSelector(
    (title, content) => {
      return {
        title,
        content,
      }
    },
    () => getTitle(state),
    () => getContent(state)
  )

export const selectOpenedBranches = (state) =>
  createSelector(
    (openedBranches) => openedBranches,
    () => getOpenedBranches(state)
  )
