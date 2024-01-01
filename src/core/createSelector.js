const createSelector = (createReturnValue, ...selectors) => {
  let prevComputedStates = []
  let prevResult

  return (state) => {
    // 새로운 입력값들이 이전 입력값들과 같은지 확인
    const computedStates = selectors.map((selector) => selector(state))
    const isStatesEqual = computedStates.every(
      (computedState, index) => prevComputedStates[index] === computedState
    )

    // 입력값들이 변경되지 않았다면, 마지막 결과를 재사용
    if (isStatesEqual && prevComputedStates.length !== 0) {
      return prevResult
    }

    // 결과 계산 및 저장
    prevComputedStates = computedStates
    prevResult = createReturnValue(...computedStates)
    return prevResult
  }
}

export default createSelector
