import React, { Component } from 'react';
import MathQuery from '../../components/math-query/index.jsx';
import MathBlock from '../../components/math-block/index.jsx';
import './mathboard.scss';
import _remove from 'lodash.remove';

export default class Mathboard extends Component {

  state = {
    mathBlocks: [],
  };

  constructor(props) {
    super(props);

    this.sendMathToApi = this.sendMathToApi.bind(this);
    this.onCalcSubmit = this.onCalcSubmit.bind(this);
    this.onBlockClose = this.onBlockClose.bind(this);
  }

  componentWillMount(){

  }

  sendMathToApi(latexString){
    console.log(`REQUEST TO SERVER\n ${latexString}`);
  }

  onCalcSubmit(data) {
    const mathBlocks = this.state.mathBlocks;
    mathBlocks.push({
      value: data,
      index: Math.round(Math.random()*100),
    });
    this.sendMathToApi(data);
    this.setState({ mathBlocks });
  }

  onBlockClose(index){
    const mathBlocks = this.state.mathBlocks;
    _remove(mathBlocks, (block) => block.index === index);
    this.setState({ mathBlocks})
  }

  renderMathBlocks(){
    const blocks = this.state.mathBlocks;
    return blocks.map((block) => {
      if(block.value && block.value.length != 0) {
        const value = block.value;
        return (
          <MathBlock
            key={block.index}
            latexString={value}
            index={block.index}
            onClose={this.onBlockClose}/>);
      }
    });
  }

  render() {
    return (
      <div className="wrap">
        <section className="content">
          <MathQuery
            latexString=''
            onCalcSubmit={this.onCalcSubmit}/>
          { this.renderMathBlocks() }
        </section>
      </div>
    );
  }
}
