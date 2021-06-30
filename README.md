# A-Fullstack-GroceryList

Fullstack - Grocery List

To create a full stack MERN application.

Use create-react-app and express-generator to setup skeleton for the frontend and backend.

Backend:

1. Set up /grocery route, connect router, controller and model

2. Create a grocery Model that has the following:
* grocery: String
* purchased: Boolean
* Date: Date.now

3. Set up all the functionalities in the Controller for these Routes:
* /get-all-groceries
* /create-grocery
* /update-grocery-by-id
* /delete-grocery-by-id

Frontend:

Similar set up to the todo app:

1. Should have an input text to add grocery list items.

2. After each item is added, you can see the grocery item below with 3 option buttons of edit, purchased and delete next to it
* Edit should toggle the grocery item to be able to edit and submit
* Purchased should toggle the grocery item to be crossed out if its purchased
* Delete should delete the grocery item from the list

3. Above the list of items, there should be 4 sorting options
* Sort by date added- Oldest to Newest
* Sort by date added- Newest to Oldest
* Sort by Purchased
* Sort by Not Purchased

Extra Credit- Add a checkbox next to each grocery list item called priority. If the checkbox is checked, the item should automatically go to the top and if it is unchecked, it should go back down the list. Think about what is needed in the front and back.

***Frontend and backend should have its own repo. Submit BOTH repo links in Essay.
***Use meaningful variable names
***Make components, folders and files as needed (Do not put everything in one file)