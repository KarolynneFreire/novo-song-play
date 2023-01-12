import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError: ', error)
    
    return {  
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    const { hasError }  = this.state
    
    if(hasError) {
      return <h1>Something went wrong...</h1>
    }

    return this.props.children
  }
}