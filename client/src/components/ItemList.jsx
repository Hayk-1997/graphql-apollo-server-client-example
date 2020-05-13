import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
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
                                    <tr key={Math.random()}>
                                        <th scope="row">{ item.id }</th>
                                        <td>{ item.name }</td>
                                        <td>{ item.description }</td>
                                        <td>{ item.ownerId }</td>
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
    }).isRequired
};

const ItemListView = graphql(itemQueries.getItemList)(ItemList);

export default ItemListView;
