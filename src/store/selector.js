import createSelector from '../core/createSelector.js'
import { findBranch } from '../service/findBranch.js'

const getDocumentsTree = (state) => state.documentTree.documents
const getOpenedBranches = (state) => state.documentTree.openedBranches
const getContent = (state) => state.documentDetail.content

export const selectDocumentTree = (state) =>
  createSelector(
    ({ data, loading, error }) => {
      return { data, loading, error }
    },
    () => getDocumentsTree(state)
  )

export const selectDetailTitle = (state, id) =>
  createSelector(
    (documentTree) => {
      const target = findBranch(documentTree.data, id) || { title: '' }
      return { title: target.title }
    },
    () => getDocumentsTree(state)
  )

export const selectDetailContent = (state) =>
  createSelector(
    ({ data, loading, error }) => {
      return { data, loading, error }
    },
    () => getContent(state)
  )

export const selectOpenedBranches = (state) =>
  createSelector(
    (openedBranches) => {
      return { openedBranches }
    },
    () => getOpenedBranches(state)
  )
