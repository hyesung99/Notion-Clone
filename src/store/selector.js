import createSelector from '../core/createSelector.js'
import { findBranch } from '../service/findBranch.js'

const getDocumentsTree = (state) => state.documentTree.documents
const getOpenedBranches = (state) => state.documentTree.openedBranches
const getTitle = (state) => state.documentDetail.title
const getContent = (state) => state.documentDetail.content

export const selectDocumentTree = (state) =>
  createSelector(
    (documentTree) => {
      return { documentTree }
    },
    () => getDocumentsTree(state)
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

export const selectDetailTitle = (state, id) =>
  createSelector(
    (documentTree) => {
      const target = findBranch(documentTree, id)
      return { title: target.title }
    },
    () => getDocumentsTree(state)
  )

export const selectDetailContent = (state) =>
  createSelector(
    (content) => {
      return { content }
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
