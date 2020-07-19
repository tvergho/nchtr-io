/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getResponsesFromFirebase } from '../actions';

function withResponses(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        currentId: '',
        responses: [],
      };
    }

    componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
        this.setState({ currentId: this.props.match.params.id });
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.response.currentShot !== prevProps.response.currentShot) {
        this.setState({ currentId: this.props.response.currentShot });
      }
      if (this.state.currentId !== prevState.currentId) {
        this.props.getResponsesFromFirebase(this.state.currentId);
      }
      if (this.props.response.responses !== prevProps.response.responses) {
        this.setState({ responses: this.props.response.responses });
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} responsesLoading={this.props.response.responsesLoading} responses={this.state.responses} />
      );
    }
  };
}

const mapStateToProps = (reduxState) => {
  return {
    response: reduxState.response,
  };
};

export default compose(connect(mapStateToProps, { getResponsesFromFirebase }), withResponses);
