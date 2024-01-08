export const findBranch = (tree, id) => {
  let result = null
  const find = (tree, id) => {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id.toString() === id) {
        result = tree[i]
        break
      } else {
        find(tree[i].documents, id)
      }
    }
  }
  find(tree, id)
  return result
}
