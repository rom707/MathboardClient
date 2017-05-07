import React, { Component, PropTypes } from 'react';
import './math-input.scss'

export default class MathInput extends Component {

  static propTypes = {
    latexStringChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.latexStringChange = this.props.latexStringChange;
    this.onInputChange = this.onInputChange.bind(this);

  }

  onInputChange(e) {
    this.latexStringChange(e.target.value);
  }

  render() {
    return(
      <div className="latex-wrap">
        <input className="input" placeholder="Entet TeX" value={this.props.value} onChange={this.onInputChange}/>
      </div>
    );
  }
}
