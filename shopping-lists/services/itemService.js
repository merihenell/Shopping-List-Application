import { sql } from "../database/database.js";

// add item with given name to list with given id
const add = async (listId, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name})`;
};

// mark item with given id as collected
const collect = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = TRUE WHERE id = ${id}`;
};

// return all items, first not collected and then collected, in alphabetical order, from list with given id
const findByListId = async (listId) => {
  let notCollected = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} AND collected = FALSE ORDER BY name`;
  let collected = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} AND collected = TRUE ORDER BY name`;
  return notCollected.concat(collected);
};

// return total number of items
const count = async () => {
  let result = await sql`SELECT COUNT(*) AS count FROM shopping_list_items`;

  return result[0].count;
}

export { add, collect, findByListId, count };