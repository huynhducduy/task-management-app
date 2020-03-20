import PropTypes from 'prop-types';
import React from 'react';

export const logErrorToMyService = () => {
  // implement here
};

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    console.log('Error: ' + error); // eslint-disable-line
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    logErrorToMyService(error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
