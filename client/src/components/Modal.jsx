import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import itemQueries from '../queries/item.queries.js';

class Modal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            id: '',
        };
    }

    componentDidMount () {
        const { item}  = this.props;
        const { name, desc, id } = item;
        this.setState({ name, desc, id });
    }

    handleUpdate = e => {
        e.preventDefault();
        const { name, desc, id } = this.state;
        this.props.mutate({ variables: { name, desc, id } });
        this.props.toggleModal(false);
    };

    closeModal = () => {
        this.props.toggleModal(false);
        this.setState({ name: '', desc: '', id: '' });
    };

    render () {
        const {name, desc} = this.state;
        return (
            <div
                className="modal"
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Item</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => this.closeModal()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => this.handleUpdate(e)}>
                                <div className="form-group">
                                    <label htmlFor="itemName">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="itemName"
                                        name="name"
                                        value={name}
                                        onChange={(e) => this.setState({name: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="itemDescription">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="itemDescription"
                                        name="desc"
                                        value={desc}
                                        onChange={(e) => this.setState({desc: e.target.value})}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    item: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
};

const updateItemMutation =  graphql(itemQueries.updateItem)(Modal);
export default updateItemMutation;