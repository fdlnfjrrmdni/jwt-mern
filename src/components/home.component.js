import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, UncontrolledAlert } from 'reactstrap';
import { IoIosRemoveCircle, IoMdBuild } from 'react-icons/io';

import AuthService from '../services/auth.service';
import GoodsService from '../services/goods.service';
import GroupService from '../services/group.service';

import Sidebar from './sidebar.component';
import NavbarBottom from './navbar.component';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.onChangeCode = this.onChangeCode.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeGroup = this.onChangeGroup.bind(this);
		this.state = {
			goods: [],
			groups: [],
			response: [],
			message: {
				type: '',
				text: ''
			},
			currentGoods: {
				_id: null,
				code: '',
				description: '',
				group: '',
				by: ''
			},
			loading: false,
			modalAdd: false,
			modalDelete: false,
			modalUpdate: false,
			sidebar: false
		};
	}

	onChangeCode(e) { 
		const code = e.target.value;
		this.setState(function(prevState) {
			return {
				currentGoods: {
					...prevState.currentGoods,
					code: code
				}
			}
		});
	}

	onChangeDescription(e) { 
		const description = e.target.value;
		this.setState(function(prevState) {
			return {
				currentGoods: {
					...prevState.currentGoods,
					description: description
				}
			}
		});
	}

	onChangeGroup(e) { 
		const group = e.target.value;
		this.setState(function(prevState) {
			return {
				currentGoods: {
					...prevState.currentGoods,
					group: group
				}
			}
		});
	}

	componentDidMount() {
		this.getGoods();
		this.getGroups();
	}

	getGoods() {
	    GoodsService.getAll().then(response => {
	        this.setState({
	          goods: response.data
	        });
	    }).catch(e => {
			console.log(e);
      	});
	}

	getGroups() {
		GroupService.getAll().then(response => {
	        this.setState({
	          groups: response.data
	        });
	    }).catch(e => {
			console.log(e);
      	});
	}

	createGoods() {
		const { code, description, group } = this.state.currentGoods;
		const id = AuthService.getCurrentUser().id
		const data = {
			by: id,
			code: code,
			description: description,
			group: group
		}

		this.setState({ loading: true });
		GoodsService.create(data).then(response => {
	        this.setState({
	          	response: response,
	          	loading: false,
	          	modalAdd: false,
	          	message: {
					type: 'success',
					text: 'Successfully added item.'
				} 
	        });
	        this.getGoods();
	    }).catch(e => {
	    	console.log(e)
			this.setState({ 
				loading: false, 
				message: {
					type: 'danger',
					text: 'Failed to add item.'
				} 
			});
      	});
	}

	updateGoods() {
		this.setState({ loading: true });
	    GoodsService.update(
	      	this.state.currentGoods._id,
	      	this.state.currentGoods
	    ).then(response => {
	        this.setState({
	        	response: response,
	        	loading: false,
	        	modalUpdate: false,
	          	message: {
					type: 'success',
					text: 'Goods was updated successfully!'
				}
	        });
	        this.getGoods();
	    }).catch(e => {
	    	console.log(e)
			this.setState({ 
				loading: false, 
				message: {
					type: 'danger',
					text: 'Failed to update item.'
				} 
			});
	    });
	}

	deleteGoods() {
		GoodsService.delete(this.state.currentGoods._id).then(response => {
	        this.setState({
	          	response: response,
	          	loading: false,
	          	modalDelete: false,
	          	message: {
					type: 'success',
					text: 'Successfully deleted item.'
				} 
	        });
	        this.getGoods();
	    }).catch(e => {
	    	console.log(e)
			this.setState({ 
				loading: false, 
				message: {
					type: 'danger',
					text: 'Failed to delete item.'
				} 
			});
      	});
	}

	openModalAdd() {
		this.setState({ 
			modalAdd: true, 
			currentGoods: {
				_id: null,
				code: '',
				description: '',
				group: '',
				by: ''
			} 
		});
	}

	render() {
		const { goods, groups, message, modalAdd, modalUpdate, modalDelete, loading, currentGoods, sidebar } = this.state;
		console.log(currentGoods)
		return (
			<div className="parent">
				{AuthService.getCurrentUser() && (
					<div className="h-100 sidebar" style={{display: !sidebar && 'none'}}>
				    	<Sidebar history={this.props.history} currentUser={AuthService.getCurrentUser()}/>
				    </div>
			    )}
				<div className="container">
			        {AuthService.getCurrentUser() ? (
			        	<>
			        		<div className="head">
			        			<h3>Goods</h3>
			        			<Input type="text" placeholder="Search by description"/>
			        		</div>
			        		<Table size="sm" className="g-table" borderless>
			        			<thead>
			        				<tr>
			        					<th>CODE</th>
			        					<th>DESCRIPTION</th>
			        					<th>GROUP</th>
			        					<th>LAST UPDATE</th>
			        					<th>BY</th>
			        					<th>ACTION</th>
			        				</tr>
			        			</thead>
			        			<tbody>
			        				{
				        				goods && goods.map((goods, index) => (
				        					<tr key={index}>
					        					<td>{goods.code}</td>
					        					<td>{goods.description}</td>
					        					<td>{goods.group}</td>
					        					<td>{goods.updatedAt}</td>
					        					<td>{goods.by}</td>
					        					<td className="action">
					        						<a onClick={() => this.setState({ modalDelete: true, currentGoods: goods })}>
												    	<IoIosRemoveCircle className="icon remove"/>
									        		</a>
									        		<a onClick={() => this.setState({ modalUpdate: true, currentGoods: {...goods, by: AuthService.getCurrentUser().id} })}>
												    	<IoMdBuild className="icon update"/>
									        		</a>
					        					</td>
					        				</tr>
				        				))
				        			}
			        			</tbody>
			        		</Table>
			        		
			        		<Modal isOpen={modalAdd || modalUpdate}>
					          	<ModalHeader>Goods</ModalHeader>
					          	<ModalBody>
					          		<Form>
					          			<FormGroup>
									        <Input 
									        	type="text" 
									        	name="code"
									        	value={currentGoods.code}
	                							onChange={this.onChangeCode}
									        	placeholder="Code" 
									        	required 
									        />
									    </FormGroup>
									    <FormGroup>
									        <Input 
									        	type="text" 
									        	name="description" 
									        	value={currentGoods.description}
	                							onChange={this.onChangeDescription}
									        	placeholder="Description" 
									        />
									    </FormGroup>
									    <FormGroup>
									    	<Input 
									    		type="select" 
									    		name="group"
	                							onChange={this.onChangeGroup}
	                							value={currentGoods.group}
									    	>
									          	<option>Select Group</option>
									          	{
									          		groups && groups.map((group, index) => (
									          			<option selected={currentGoods.group === group.name && true} key={index} value={group.name}>{group.name}</option>
									          		))
									          	}
									        </Input>
									    </FormGroup>
									    <FormGroup>
									    	<Input type="file" name="image" />
									    </FormGroup>
					          		</Form>
					          	</ModalBody>
					          	<ModalFooter>
					            	<Button color="light" onClick={() => this.setState({modalAdd: false, modalUpdate: false})}>Cancel</Button>
					            	<Button color="success" disabled={loading} onClick={() => this.state.modalAdd ? this.createGoods() : this.updateGoods()}>
					            		{loading ? (
						                  	<span className="spinner-border spinner-border-sm"></span>
						                ) : (
						                	<span>Save</span>
						                )}
					            	</Button>
					          	</ModalFooter>
					        </Modal>

					        <Modal isOpen={modalDelete}>
					        	<ModalHeader>Confirmation</ModalHeader>
					          	<ModalBody>
					            	Are you sure want to Delete?
					          	</ModalBody>
					          	<ModalFooter>
					            	<Button color="light" onClick={() => this.setState({modalDelete: false})}>Cancel</Button>
					            	<Button color="danger" onClick={() => this.deleteGoods()}>Delete</Button>
					          	</ModalFooter>
					        </Modal>
			        	</>
			        ) : (
			        	<Button color="primary" onClick={() => this.props.history.push('/login')}>
			        		Login
			        	</Button>
			        )}
			        {message.text && (
			        	<UncontrolledAlert className="alert-message" color={message.type}>
					      	{message.text}
					    </UncontrolledAlert>
		            )}
			    </div>
			    {AuthService.getCurrentUser() && (
		    		<NavbarBottom toggleSidebar={() => this.setState({ sidebar: !sidebar })} openModal={() => this.openModalAdd()}/>
		    	)}
		    </div>
		)
	}
}