import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import itemQueries from '../queries/item.queries.js';

class ItemList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: {},
            loading: true,
        };
    }

    componentDidUpdate () {
        const { data } = this.props;
        const  { loading } = this.state;
        if (loading) {
           this.setState({ data, loading: false });
        }
    }

    deleteItem = (id) => {
        this.props.mutate({ variables: { id } });
    };

    render () {
        const { data, loading } = this.state;
        if (data.loading) {
            return (<div>Loading</div>);
        }
        if (data.error) {
            return (<div>An unexpected error occurred</div>);
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Owner ID</th>
                </tr>
                </thead>
                <tbody>
                {
                    !loading && data.items.length ?
                        (
                           data.items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <th scope="row">{ item.id }</th>
                                        <td>{ item.name }</td>
                                        <td>{ item.desc }</td>
                                        <td>{ item.ownerId }</td>
                                        <td>
                                            <div className="buttons-group">
                                                <button type="button" className="btn btn-danger" onClick={() => this.deleteItem(item.id)}>Delete</button>
                                                <button type="button" className="btn btn-info">Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ): null
                }
                </tbody>
            </table>
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

const ItemListView = graphql(itemQueries.getItemList)(ItemList);

export default compose(
    graphql(itemQueries.getItemList),
    graphql(itemQueries.deleteItem),
)(ItemListView);

