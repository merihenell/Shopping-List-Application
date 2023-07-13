import * as requestUtils from "../utils/requestUtils.js";
import * as itemService from "../services/itemService.js";

// add item to list and redirect to list specific page
const addItem = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const formData = await request.formData();
  const name = formData.get("name");
  
  await itemService.add(parts[2], name);
  
  return requestUtils.redirectTo(`/lists/${parts[2]}`);
};

// mark item as collected and redirect to list specific page
const collectItem = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");

  await itemService.collect(parts[4]);
  
  return requestUtils.redirectTo(`/lists/${parts[2]}`);
}
  
export { addItem, collectItem };