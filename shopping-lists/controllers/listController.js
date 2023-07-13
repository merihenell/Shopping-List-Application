import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

// create new list based on form and redirect to lists page
const createList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
    
  await listService.create(name);
    
  return requestUtils.redirectTo("/lists");
}

// deactivate list and redirect to lists page
const deactivateList = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];

  await listService.deactivate(id);

  return requestUtils.redirectTo("/lists");
};

// view all active lists by rendering lists page
const viewLists = async () => {
  const data = {
    lists: await listService.findAllActive(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

// view specific list and the items on it by rendering list specific page
const viewList = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  
  const data = {
    list: await listService.findById(parts[2]),
    items: await itemService.findByListId(parts[2]),
  };
  
  return new Response(await renderFile("list.eta", data), responseDetails);
};

// render main page to show total number of lists and items
const viewMain = async () => {
  const data = {
    lists: await listService.count(),
    items: await itemService.count(),
  };

  return new Response(await renderFile("main.eta", data), responseDetails);
}

export { createList, deactivateList, viewLists, viewList, viewMain };