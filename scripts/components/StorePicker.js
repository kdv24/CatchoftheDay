/*
  StorePicker
  This will let us make StorePicker
*/

import React from 'react';
import { Navigation } from 'react-router';
import { History } from 'react-router';
import helpers from '../helpers.js';

  var StorePicker = React.createClass({
    mixins : [Navigation, History],
    goToStore : function(event) {
      event.preventDefault();
      //get the data from the input
      var storeId = this.refs.storeId.value;
      //transition from <StorePicker /> to <App />
      this.history.pushState(null, '/store/storeId');
    },

    render : function() {
      return (
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter a Store </h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required/>
        <input type="Submit"/>
        </form>
      )
    }
  });

export default StorePicker;
