import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import itemQueries from '../queries/item.queries.js';

class AddItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      desc: ''
    }
  }

  handleSave = () => {
    const { name, desc } = this.state;
    const ownerId = 1;
    this.props.mutate({variables: { name, desc, ownerId }});
    const id = 1;
    this.props.history.push('/list');
  };

  render () {
    return (
        <form onSubmit={this.handleSave}>
           <div className="col-6">
               <div className="form-group">
                   <label htmlFor="desc">Description</label>
                   <input
                       type="text"
                       id="desc"
                       className="form-control"
                       value={this.state.desc}
                       onChange={(e) => this.setState({desc: e.target.value})}
                       placeholder='description'
                   />
               </div>
               <div className="form-group">
                   <label htmlFor="name">Name</label>
                   <input
                       type="text"
                       className="form-control"
                       id="name"
                       placeholder='name'
                       onChange={(e) => this.setState({name: e.target.value})}
                       value={this.state.name}
                   />
               </div>
               <button type="submit" className="btn btn-primary">Submit</button>
           </div>
        </form>
    )
  }
}

AddItem.propTypes = {
  mutate: PropTypes.func.isRequired,
  history: PropTypes.object
};

const AddItemWithMutation = graphql(itemQueries.addItem)(AddItem);

export default AddItemWithMutation;
