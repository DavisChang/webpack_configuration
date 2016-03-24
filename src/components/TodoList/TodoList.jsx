'use strict';
import React, { Component } from 'react';
import styles from './TodoList.css';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@CSSModules(styles)
class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {items: ['hello', 'world', 'click', 'me']};
	}

	handleAdd() {
		var newItems = this.state.items.concat([prompt('Enter some text')]);
	    this.setState({items: newItems});
	}

	handleRemove(i) {
		var newItems = this.state.items.slice();
	    newItems.splice(i, 1);
	    this.setState({items: newItems});
	}

	render() {
		var items = this.state.items.map(function(item, i) {
	      return (
	        <div className="item-list" key={item} onClick={this.handleRemove.bind(this, i)}>
	          {item}
	        </div>
	      );
	    }.bind(this));

		return(
			<div>
				<button onClick={this.handleAdd.bind(this)}>Add Item</button>
				<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					{items}
				</ReactCSSTransitionGroup>
			</div>

		);
	}

}

export default TodoList;