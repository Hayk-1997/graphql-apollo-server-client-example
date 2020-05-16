import {addNewItem, updateItem, deleteItem} from '../../db';

const rootMutationResolvers = {
  async addItem (rootObj, { name, desc, ownerId }) {
    return await addNewItem({ name, desc, ownerId })
  },
  async updateItem (rootObj, { name, desc, id }) {
    return await updateItem({ name, desc, id })
  },
  async deleteItem (rootObj, { id }) {
    return await deleteItem({ id })
  },
};

export default rootMutationResolvers
