import React, { Component, PropTypes } from 'react';
import './math-block.scss';
import MathDisplay from '../math-display/index.jsx';

export default class MathBlock extends Component {

  static propTypes = {
    latexString: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  state = {
    latexString: '',
    isLoading: true,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.closeBlock = this.closeBlock.bind(this);
    this.setState({ latexString: this.props.latexString });
  }

  closeBlock(){
    this.props.onClose(this.props.index);
  }

  render() {
    const { latexString } = this.state;
    return(
      <div className="math-block">
        <div className="input-block">
          <p className="label">{latexString}</p>
          <div className="action-buttons">
            <button className="close last" onClick={this.closeBlock}><i className="fa fa-times"></i></button>
          </div>
        </div>
        <div className="outputBlock">
          <MathDisplay data={latexString}/>
        </div>
      </div>
    );
  }
}
