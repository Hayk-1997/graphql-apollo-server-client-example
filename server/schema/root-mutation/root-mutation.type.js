const RootMutation = `
  type RootMutation {
    addItem ( name: String!, desc: String, ownerId: ID! ): Item,
    updateItem ( name: String!, desc: String, id: ID! ): Item,
    deleteItem (id: ID!): [Item],
  }
`;
export default RootMutation;
