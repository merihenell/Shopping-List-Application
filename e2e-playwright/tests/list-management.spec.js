const { test, expect } = require("@playwright/test");

const listName = `My list: ${Math.random()}`;
const itemName = `My item: ${Math.random()}`;

test("Main page has expected title and content.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("a")).toHaveText("Lists");
  await expect(page.locator("a")).toHaveAttribute("href", "/lists");
});

test("Page for shopping lists has expected headings and content.", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator("h2")).toHaveText(["Add a list", "Active lists"]);
  await expect(page.locator("a >> text='Main page'")).toHaveAttribute("href", "/");
});

test("Can create a list.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit] >> text='Create list!'").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("Can open a list page with expected headings and content.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
  await expect(page.locator("h2")).toHaveText(["Add an item", "Items"]);
  await expect(page.locator("a >> text='Shopping lists'")).toHaveAttribute("href", "/lists");
});

test("Can add an item.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`a >> text='${listName}'`).click();
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit] >> text='Add item!'").click();
  await expect(page.locator(`li >> text='${itemName}'`)).toContainText(itemName);
});

test("Can mark an item as collected.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`a >> text='${listName}'`).click();
  await page.getByRole('listitem').filter({ hasText: `${itemName} Mark collected!` }).getByRole('button', { name: 'Mark collected!' }).click();
  await expect(page.locator(`del >> text='${itemName}'`)).toHaveText(itemName);
});

test("Can deactivate a list.", async ({ page }) => {
  await page.goto("/lists");
  await page.getByRole('listitem').filter({ hasText: `${listName} Deactivate list!` }).getByRole('button', { name: 'Deactivate list!' }).click();
  await expect(page.locator("a")).not.toContainText([listName]);
});