export function rootReducer(state = {}, action) {
  return {
    documentTreeReducer: documentTreeReducer(state.documentTreeReducer, action),
    documentEditorReducer: documentEditorReducer(
      state.documentEditorReducer,
      action
    ),
  }
}
