/* eslint-disable react/no-did-update-set-state */
/* eslint-disable new-cap */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { swapFiles, getFilenamesFromFirebase } from '../actions';

const BUCKET_URL = 'https://nchtr-photos-bucket.s3.amazonaws.com';
const { Map } = require('immutable');

function withImages(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        images: [],
        loading: true,
        retries: Map(),
        useBase64: false,
      };
    }

    componentDidMount() {
      if (this.props.location && this.props.location.state && this.props.location.state.useBase64 && this.props.base64.length > 0) {
        this.loadFromBase64();
        this.setState({ useBase64: true });
      } else if (this.props.match && this.props.match.params && this.props.match.params.id) {
        this.props.getFilenamesFromFirebase(this.props.match.params.id);
      } else {
        this.loadFromFilenames();
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.images !== prevState.images) {
        if (!this.state.useBase64) {
          if (this.state.images.length === this.props.filenames.length && this.props.filenames.length > 0 && !this.state.images.includes(undefined)) {
            this.setState({ loading: false });
          }
        } else if (this.state.images.length === this.props.base64.length && this.props.base64.length > 0 && !this.state.images.includes(undefined)) {
          this.setState({ loading: false });
        }
      }
      if (this.props.filenames !== prevProps.filenames) {
        this.loadFromFilenames(true);
      }
    }

    loadFromFilenames = (noTimeout) => {
      setTimeout(() => {
        this.props.filenames.forEach((name, index) => {
          const img = new Image();
          img.onload = () => {
            this.setState((prevState) => {
              const images = [...prevState.images];
              img.setAttribute('crossOrigin', 'Anonymous');
              images[index] = img;
              return { images };
            });
          };
          img.onerror = () => {
            if (!this.state.retries.has(name) || this.state.retries.get(name) < 10) {
              this.setState((prevState) => ({
                retries: prevState.retries.update(name, 1, (value) => value + 1),
              }));
              setTimeout(() => { img.src = `${BUCKET_URL}/${name}?${new Date().getTime()}`; }, 500);
            }
          };
          img.src = `${BUCKET_URL}/${name}`;
        });
      }, noTimeout ? 0 : 1000);
    }

    loadFromBase64 = () => {
      this.props.base64.forEach((base, index) => {
        const img = new Image();
        img.src = base;

        this.setState((prevState) => {
          const images = [...prevState.images];
          img.setAttribute('crossOrigin', 'Anonymous');
          images[index] = img;
          return { images };
        });
      });
    }

    swap = (i, j) => {
      this.props.swapFiles(i, j);

      this.setState((prevState) => {
        const images = [...prevState.images];
        const tempImage = images[i];
        images[i] = images[j];
        images[j] = tempImage;
        return { images };
      });
    }

    render() {
      return (
        <WrappedComponent {...this.props}
          images={this.state.images}
          loading={this.state.loading}
          swap={this.swap}
          startLoading={() => { this.setState({ loading: true }); }}
        />
      );
    }
  };
}

const mapStateToProps = (reduxState) => {
  return {
    filenames: reduxState.file.filenames,
    base64: reduxState.file.base64,
  };
};

export default compose(connect(mapStateToProps, { swapFiles, getFilenamesFromFirebase }), withImages);
