import React, { Component, PropTypes } from 'react';
import './math-query.scss';
import MathInput from '../math-input/index.jsx';
import MathDisplay from '../math-display/index.jsx';

export default class MathQuery extends Component {

  static propTypes = {
    onCalcSubmit: PropTypes.func.isRequired,
    latexString: PropTypes.string.isRequired,
  };

  state = {
    latexString: '',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.onCalcSubmit = this.onCalcSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.setState({ latexString: this.props.latexString });
  }

  onCalcSubmit() {
    const value = this.state.latexString;
    if (value && value.length !== 0) {
      this.props.onCalcSubmit(value);
    }
  }

  onInputChange(value) {
    this.setState({latexString: value});
  }

  clearInput(){
    this.setState({latexString: ''});
  }

  render() {
    const { latexString } = this.state;
    return(
      <div className="math-block">
        <div className="input-block">
          <MathInput latexStringChange={this.onInputChange} value={latexString}/>
          <div className="action-buttons">
            <button className="calc first" onClick={this.onCalcSubmit}>
              <i className="fa fa-arrow-right"></i></button>
            <button className="calc last" onClick={this.clearInput}><i className="fa fa-times"></i></button>
          </div>
        </div>
        <div className="outputBlock">
          <MathDisplay data={latexString}/>
        </div>
      </div>
    );
  }
}
