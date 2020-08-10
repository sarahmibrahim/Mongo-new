# Week-11-Todo-API-Example

Example of the complete API project for week 11.
 

The app has been deployed to Heroku so can be tested using the following requests:


### create a to do item:
post - https://wk11exampletodoapi.herokuapp.com/todo/create

n.b. request body must contain name field

### Show list of items
get - https://wk11exampletodoapi.herokuapp.com/todo/

### Show an item by id 
get - https://wk11exampletodoapi.herokuapp.com/todo/<id>

### update an item
put - https://wk11exampletodoapi.herokuapp.com/todo/<id>

n.b. request body must contain name field and id must exist in the list.

### delete an item 
delete - https://wk11exampletodoapi.herokuapp.com/todo/<id>


n.b. id must exist in the list.
