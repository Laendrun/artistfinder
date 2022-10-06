# Artistfinder
Artistfinder - Maxime Collot

# To-Do - Backend

## User with multiple roles

- [ ] Find a way to add multiple roles to a user.
  - I think the quicker way to do it is to add an array containing all the roles of the user.
  - \["user", "moderator"\]
  - Then I can have a function that checks role(s) based on that array.

## Validation schemas && SQL requests

- [x] Update validations schema to accept the same field names as they are saved in the database
- [ ] Update SQL requests to get the correct values from the body of the request...
  - [x] artists routes
  - [ ] auth routes
  - [ ] categories routes
  - [ ] places routes
  - [ ] reservations routes
  - [ ] reviews routes
  - [ ] styles routes
  - [ ] types routes
  - [ ] users routes

## Authorization errors

Some errors could be more descriptive.

- Unauthorized (when updating or deleting an artist) could become _Unauthorized, not the artist owner_ or something like that.

## Roles route

Create a route for all the roles related endpoints

- [ ] GET api/v1/roles/
  - [ ] returns a list of all roles
- [ ] GET api/v1/roles/:id
  - [ ] returns all informations about the role specified with :id
- [ ] PUT api/v1/roles/:id
  - [ ] 

## Artists route

- [ ] Modify the Artists route to add a way for admin and moderator to approve artists.
- [ ] Modify the database to add a field _artist.verified_ -> default to 0.

## Middlewares

- [x] User middleware
  - [x] Verify JWT origin
  - [x] Decode JWT
  - [x] Set a _user_ property on the request with informations from the JWT
- [x] isLoggedIn middleware
  - [x] Check if _user_ property exists on the request
- [x] isOwner middleware
  - [x] check if the resource requested was created by the user who makes the request
- [x] isOwnerOrAdmin middleware
  - [x] check if the resource requested was created by the user who makes the request or
  - [x] that the user is an _admin_
- [x] isAdmin middleware
  - [x] must happen after isLoggedIn middleware
  - [x] check if _user.role_ is Admin

# To-Do - Frontend

- [ ] Take care of 404 errors 'cause the error message is disgusting for now
  - [ ] Create a "404 - Not found" page with a link to the homepage

# To-Do - Configuration

- [ ] Authorize all the possible origin on the Google App Dashboard 
	- [ ] https://artistfinder.world
	- [ ] https://www.artistfinder.world
	- [ ] http://artistfinder.world
	- [ ] http://www.artistfinder.world

- [ ] Switch the Google App to production
	- For now it's in _testing_ mode and only specific users can use the button.

For now we can only use the _login with Google_ button from https://artistfinder.world.
And for now only my Google User is authorized for testing purposes.

