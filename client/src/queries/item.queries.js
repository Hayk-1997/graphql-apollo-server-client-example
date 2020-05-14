import gql from 'graphql-tag'

export default {
  // this is a feature called template tags
  // https://developers.google.com/web/updates/2015/01/ES6-Template-Strings#tagged_templates

  getItemList: gql`query ItemListQuery {
    items {
      id
      name,
      desc,
      owner {
        username
      }
    }
  }`,

  addItem: gql`mutation addNewItem ($name: String!, $desc: String, $ownerId: ID!) {
    addItem(name: $name, desc: $desc, ownerId: $ownerId) {
      id
      name
    }
  }`,

  updateItem: gql`mutation updateItem ($name: String!, $desc: String, $ownerId: ID!) {
    updateItem(name: $name, desc: $desc, ownerId: $ownerId) {
      id
      name
    }
  }`,

  deleteItem: gql`mutation deleteItem ($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }`
}
