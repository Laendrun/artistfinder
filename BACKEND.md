# Artistfinder - Backend

## To-Do

- [ ] Make sure all db connections are closed when not used anymore
- [x] Take care of sql requests returning 0 rows
  - [x] in the utils, create a DBNotFound function that returns a 404 error
  - For get method check with rows.length
    - [x] done for all get routes (normally, I maybe forgot one or two)
  - For delete method check with affectedRows (maybe post & put too)
  - For POST method, I did it the same way as the GET method but I'll have to change it 
- [ ] Update error messages sent from the API
- [x] Send an error message when there's a problem with the SQL request
  - [x] artists
  - [x] auth
  - [x] categories
  - [x] places
  - [x] reservations
  - [x] reviews
  - [x] roles
  - [x] styles
  - [x] types
  - [x] users
- [x] Update return messages sent from the API
  - Do not send DB response

### Utils

- [x] Create a GET_ERROR for db related errors on SELECT
- [x] Create a PUT_ERROR for db related errors on UPDATE
- [x] Create a POST_ERROR for db related errors on INSERT
- [x] Create a DELETE_ERROR for db related errors on DELETE
- [x] Create a LOGDBERROR func, logging specific information about the sql error

### Auth Route

- [x] POST /api/v1/auth/signup
  - make this route work, for now only Google signup works
- [ ] POST /api/v1/auth/signin
  - make this route work, for now ony Google signin works
- [ ] PUT /api/v1/auth/passwordChange
  - route to update the password 

### Artists route

- [x] Change all artists routes to only return information about verified artists for everyone
  - all
- [x] Create all artists routes to return information about all artists
  - isLoggedIn, isAdmin
- [x] Create all artists routes to return information about all unverified artists
  - isLoggedIn, isAdmin

### Users route

- [x] Add a SOFT_DELETE route for the user
  - [x] only the owner or admin can soft_delete a user
- [ ] admins can reset information of any users (they will only see the username and have access to reset password, email, etc)
- [x] Add a route to change connection type (google -> email)
  - [x] Only owner or admin can change this

### Middlewares

- [x] User middleware
- [x] isLoggedIn middleware
- [x] isOwner middleware
- [x] isOwnerOrAdmin middleware
- [x] isAdmin middleware
- [ ] isModeratorOrAdmin
  - Moderator role has to be clearly defined before creating this middleware