import React, { Component } from 'react';
import { IoIosAddCircle, IoIosMenu } from 'react-icons/io';

export default class NavbarBottom extends Component {
	render() {
		return(
			<div className="navbar-bottom">
				<div className="container navbar-child">
					<a onClick={this.props.toggleSidebar}>
						<IoIosMenu className="icon menu"/>
					</a>
					<a onClick={this.props.openModal}>
				    	<IoIosAddCircle className="icon add" />
		    		</a>
	    		</div>
			</div>
		)
	}
}