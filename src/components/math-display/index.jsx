import katex from 'katex';
import './katex.scss';
import './fonts.jsx';
import React, { Component, PropTypes } from 'react';

export default class MathDisplay extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    let math = '';
    try {
       math = katex.renderToString(this.props.data);
    } catch (e) {
      math = this.props.data;
    }

    return (<p dangerouslySetInnerHTML={ {__html: math} }/>);
  }
}