import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await listController.viewMain();
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists();
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.createList(request);
  } else if (url.pathname.includes("/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await itemController.collectItem(request);
  } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.addItem(request);
  }

  return new Response("Not found", { status: 404 });
};

serve(handleRequest, { port: 7777 });