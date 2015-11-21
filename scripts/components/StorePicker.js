/*
  StorePicker
  This will let us make StorePicker
*/

import React from 'react';
import { History } from 'react-router';
import helpers from '../helpers.js';
import reactMixin from 'react-mixin';
// allows binding in the methods (or whole class) below @autobind - ES7 feature
// - makes it so don't need `.bind(this)` at all
// but have to configure props in gulpfile transfigure: [babelify.configure({stage: 0})]
// import autobind from 'autobind-decorator';

// @autobind
class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    console.log(this);
    //get the data from the input
    var storeId = this.refs.storeId.value;
    //transition from <StorePicker /> to <App />
    this.history.pushState(null, '/store/storeId');
  }
  render() {
    console.log(this);

   return (
     <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
       <h2>Please Enter a Store </h2>
     <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required/>
     <input type="Submit"/>
     </form>
   )
  }
}
reactMixin.onClass(StorePicker, History);

export default StorePicker;
