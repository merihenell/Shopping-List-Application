import { sql } from "../database/database.js";

// create new list with given name
const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

// deactivate list with given id
const deactivate = async (id) => {
  await sql`UPDATE shopping_lists SET active = FALSE WHERE id = ${id}`;
};

// return all active lists
const findAllActive = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

// return list with given id if exists
const findById = async (id) => {
  let result = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
  
  if (result && result.length > 0) {
    return result[0];
  } else {
    return { id: 0, name: "Unknown" };
  }
};

// return total number of lists
const count = async () => {
  let result = await sql`SELECT COUNT(*) AS count FROM shopping_lists`;

  return result[0].count;
}

export { create, deactivate, findAllActive, findById, count };