import createSelector from './createSelector.js'

const getRootDocuments = (state) => state.documentTree.documents

export const selectRootDocuments = (state) =>
  createSelector(
    (documents) => documents,
    () => getRootDocuments(state)
  )
