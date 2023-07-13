# Shopping List Application

The main page includes statistics (number of created shopping lists and items) and a link to a page with a form to create new shopping lists and a list of all active shopping lists. Shopping lists can be deactivated by clicking the button under the name of the shopping list. Each list name is a link to a shopping list specific page with a form to add items to the list and a list of all items on the shopping list. Items can be marked collected by clicking the button under the name of the item.

The application uses a three-tier architecture (client, server, and database) and a layered architecture with four layers (views, controllers, services, and database).

The application can be accessed at http://localhost:7777 after running it locally with the command ```docker-compose up --build```. The tests in e2e-playwright can be run with the command ```docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf```. Remember to replace the database configurations for PostgreSQL, Flyway, and Deno's PostgreSQL driver in the template.env file with your own database credentials.