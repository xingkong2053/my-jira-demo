import React, { Component, PropsWithChildren } from "react";

type FallbackRender = (props : {error: Error | null}) => React.ReactElement
type PropsType = { fallbackRender: FallbackRender }
type StateType = {error: Error | null}

/**
 * 自定义错误边界
 * https://github.com/bvaughn/react-error-boundary
 */
class ErrorBoundary extends Component<PropsWithChildren<PropsType>, StateType> {

  state = {
    error: null
  }

  // 当子组件抛出异常时，这里会收到并且调用
  static getDerivedStateFromError(error: Error) {
    return {error}
  }


  render() {
    let { error } = this.state;
    let { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({error})
    }
    return children
  }
}

export default ErrorBoundary;