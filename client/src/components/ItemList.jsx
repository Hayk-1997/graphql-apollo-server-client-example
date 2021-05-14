import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import itemQueries from '../queries/item.queries.js';
import Modal from './Modal';


class ItemList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
            isModalShow: false,
            item: {},
            updatedKey: null
        };
    }


    componentDidUpdate () {
        const { loading} = this.state;
        const { data } = this.props;
        if (data.items.length && !data.loading && loading) {
            this.setState({ data, loading: false });
        }
    }

    deleteItem = (id, key) => {
        const { data } = this.state
        const items = [...data.items]
        const filteredItems = this.state.data.items.filter((item) => item.id !== id);
        this.setState({ data: filteredItems, loading: true });
        this.props.mutate({ variables: { id } });
        items.splice(key, 1)
        data.items = items
        this.setState({ data })
    };

    openModal = (item, updatedKey) => {
        this.setState({ item, updatedKey });
        this.toggleModal(true);
    };

    toggleModal = arg => {
        this.setState({ isModalShow: arg });
    };

    changeDataAfterUpdate = (item) => {
        const { data, updatedKey } = this.state
        const items = [...data.items]
        items[updatedKey] = item
        data.items = items
        this.setState({ data })
    }

    render () {
        const { data, isModalShow, item } = this.state;
        if (data.loading) {
            return (<div>Loading</div>);
        }
        if (data.error) {
            return (<div>An unexpected error occurred</div>);
        }

        return (
           <div>
               <table className="table">
                   <thead>
                   <tr>
                       <th scope="col">#</th>
                       <th scope="col">Name</th>
                       <th scope="col">Description</th>
                       <th scope="col">Owner</th>
                       <th scope="col">Actions</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                       !data.loading && data.items ?
                           (
                               data.items.map((item, key) => {
                                   return (
                                       <tr key={Math.random()}>
                                           <th scope="row">{ item.id }</th>
                                           <td>{ item.name }</td>
                                           <td>{ item.desc }</td>
                                           <td>{ item.owner.id }</td>
                                           <td>
                                               <div className="buttons-group">
                                                   <button
                                                       type="button"
                                                       className="btn btn-danger"
                                                       onClick={() => this.deleteItem(item.id, key)}>
                                                       Delete
                                                   </button>
                                                   <button
                                                       type="button"
                                                       className="btn btn-info"
                                                       onClick={() => this.openModal(item, key)}
                                                   >
                                                       Edit
                                                   </button>
                                               </div>
                                           </td>
                                       </tr>
                                   )
                               })
                           ): null
                   }
                   </tbody>
               </table>
               {
                   isModalShow ? (
                       <Modal
                           item={item}
                           changeDataAfterUpdate={this.changeDataAfterUpdate}
                           toggleModal={this.toggleModal}
                       />
                   ) : null
               }
           </div>
        );
    }
}

ItemList.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
        items: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    mutate: PropTypes.func.isRequired,
    history: PropTypes.object,
};

// const ItemListView = graphql(itemQueries.getItemList)(ItemList);

export default compose(
    graphql(itemQueries.deleteItem, {
        name : 'mutate'
    }),
    graphql(itemQueries.getItemList, {
        name : 'data'
    }),

)(ItemList);

