/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getResponsesFromFirebase, addResponse, subscribeToResponses, unsubscribeToResponses,
} from '../actions';

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
        this.setState({ currentId: this.props.response.currentShot, responses: [], loading: true });
      }
      if (this.state.currentId !== prevState.currentId) {
        unsubscribeToResponses(prevState.currentId);
        this.props.subscribeToResponses(this.state.currentId);
        this.props.getResponsesFromFirebase(this.state.currentId);
      }
      if (this.props.response.responses !== prevProps.response.responses) {
        this.setState({ responses: this.props.response.responses });
      }
      if (this.props.match && this.props.match.params && this.props.match.params.id !== prevProps.match.params.id) {
        this.setState({ loading: true, currentId: this.props.match.params.id, responses: [] });
      }
    }

    componentWillUnmount() {
      unsubscribeToResponses(this.state.currentId);
    }

    addResponse = (name, message) => {
      addResponse(name, message, this.state.currentId);
      this.setState((prevState) => {
        const responses = [...prevState.responses];
        responses.push({ name, message });
        return { responses };
      });
    }

    render() {
      return (
        <WrappedComponent {...this.props}
          responsesLoading={this.props.response.responsesLoading}
          responses={this.state.responses}
          addResponse={this.addResponse}
        />
      );
    }
  };
}

const mapStateToProps = (reduxState) => {
  return {
    response: reduxState.response,
  };
};

export default compose(connect(mapStateToProps, { getResponsesFromFirebase, subscribeToResponses }), withResponses);
