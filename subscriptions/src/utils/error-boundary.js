import React from "react";

class ErrorBoundary extends React.Component{
    constructor(props) {
        super()
        this.state = {failure: false, exception: ''}
    }

    componentDidCatch() {
        this.setState({hasError: true})
    }
    static getDerivedStateFromError(error) {
        return { failure: true, exception: error };
    }

    render() {
        if (this.state.failure) {
            return <p>{this.state.exception}</p>
        }
        return this.props.children
    }
}

export default ErrorBoundary