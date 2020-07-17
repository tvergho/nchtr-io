/* eslint-disable new-cap */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import { DrawField, Loading } from '../components/anonymize';
import { swapFiles } from '../actions';

const BUCKET_URL = 'https://nchtr-photos-bucket.s3.amazonaws.com';
const { Map } = require('immutable');

class AnonymizePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loading: true,
      retries: Map(),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.filenames.forEach((name, index) => {
        const img = new Image();
        img.onload = () => {
          this.setState((prevState) => {
            const images = [...prevState.images];
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
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.images !== prevState.images) {
      if (this.state.images.length === this.props.filenames.length && this.props.filenames.length > 0) {
        this.setState({ loading: false });
      }
    }
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
      <Container style={{ alignItems: 'center', justifyContent: 'center', width: '60vw' }}>
        <div className="title">Draw over any names or profile pictures.</div>
        {this.state.loading ? <Loading /> : <DrawField images={this.state.images} swap={this.swap} />}
      </Container>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    filenames: reduxState.file.filenames,
  };
};


export default connect(mapStateToProps, { swapFiles })(AnonymizePage);
