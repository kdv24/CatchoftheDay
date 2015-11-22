import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import helpers from '../helpers.js';
import autobind from 'autobind-decorator';

@autobind

class Order extends React.Component {
  renderOrder(key) {
    var fish = this.props.fishes[key];
    var count = this.props.order[key];
    var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>

    if(!fish) {
      return <li key={key}>Sorry, fish no longer available!{removeButton}</li>
    }

    return (
      <li key={key}>
      <span>
        <CSSTransitionGroup
            component="span"
            transitionName="count"
            transitionLeaveTimeout={250}
            transitionEnterTimeout={250}>
          <span key={count}>{count}</span>
        </CSSTransitionGroup>
        lbs {fish.name} {removeButton}
      </span>
      <span className="price">{helpers.formatPrice(count * fish.price)}</span>
      </li>
    )
  }
  
  render() {
    var orderIds = Object.keys(this.props.order);
    var total = orderIds.reduce((prevTotal, key)=> {
      var fish = this.props.fishes[key];
      var count = this.props.order[key];
      var isAvailable = fish && fish.status === 'available';

      if (fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
      {/* react transition group needs to be parent above whatever is going to be animated */}
        <CSSTransitionGroup
            className="order"
            component="ul"
            transitionName="order"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
          {orderIds.map(this.renderOrder)}
          <li className="total"><strong>Total: </strong>{helpers.formatPrice(total)}</li>
        </CSSTransitionGroup>
      </div>
    )
  }
}
  Order.propTypes = {
    fishes : React.PropTypes.object.isRequired,
    order : React.PropTypes.object.isRequired,
    removeFromOrder : React.PropTypes.func.isRequired
  }

export default Order;
