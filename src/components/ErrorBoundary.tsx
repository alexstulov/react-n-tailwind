import React from "react"

type PropsType = {children: React.ReactNode}

class ErrorBoundary extends React.Component<PropsType, {hasError: boolean}> {
  constructor(props: PropsType) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error: Error) {
    console.log("getDerivedStateFromError", error)
    return {hasError: true}
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("componentDidCatch")
    console.error(error.message, errorInfo.componentStack)
  }

  render() {
    console.log("render", this.state)
    if (this.state.hasError) {
      return <>Error happened</>
    }

    return this.props.children
  }
}

export default ErrorBoundary