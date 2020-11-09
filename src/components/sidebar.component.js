import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { IoIosAlbums, IoMdPerson, IoIosLogOut } from 'react-icons/io';

import AuthService from '../services/auth.service';

export default class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			modal: false
		};
	}

	handleLogout() {
		this.props.history.push('/login');
		AuthService.logout();
	}

	capitalizeFirstLetter(string) {
	  	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	render() {
		const { currentUser, modal } = this.state;
		return (
			<>
				<div className="sidebar-head">
					<h4 className="name">
			          	{this.capitalizeFirstLetter(currentUser.username)}
			        </h4>
			        {currentUser.roles && currentUser.roles.map((role, index) => <span className="role">{role}</span>)}
				</div>
		        <div className="sidebar-body">
		        	<h5 className="pl-2 pt-3">Master Data</h5>
		        	<div className="sidebar-card">
		        		<div>
		        			<IoIosAlbums className="icon"/> Goods
		        		</div>
		        	</div>
		        	<div className="sidebar-card">
		        		<div>
		        			<IoMdPerson className="icon"/> Users
		        		</div>
		        	</div>
			        <hr/>
			        <div className="sidebar-card" onClick={() => this.setState({modal: true})}>
			        	<div>
			        		<IoIosLogOut className="icon"/> Logout
			        	</div>
			        </div>
			    </div>
	        	<Modal isOpen={modal}>
		          	<ModalHeader>Confirmation</ModalHeader>
		          	<ModalBody>
		            	Are you sure want to Logout?
		          	</ModalBody>
		          	<ModalFooter>
		            	<Button color="light" onClick={() => this.setState({modal: false})}>Cancel</Button>
		            	<Button color="danger" onClick={() => this.handleLogout()}>Logout</Button>
		          	</ModalFooter>
		        </Modal>
	        </>
		)
	}
}