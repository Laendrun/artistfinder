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

- [ ] PUT /api/v1/artists/:id
 - [ ] only the user who created the artist can update it
 - [ ] admins can update any artist
- [x] POST /api/v1/artists/
  - [x] only a connected user can create an artist
- [x] DELETE /api/v1/artists/:id
  - [x] only the user who created the artist can delete it.
  - [x] admins can delete any artists

- [ ] before publishing, artists have to be validated by an admin / moderator
- [ ] Modify the Artists route to add a way for admin and moderator to approve artists.
- [ ] Modify the database to add a field _artist.verified_ -> default to 0.

## Categories route

- [x] PUT /api/v1/categories/:id
  - [x] only admin can update a category
- [x] POST /api/v1/categories/
  - [x] only an admin can insert a new category
- [x] DELETE /api/v1/categories/:id
  - [x] only an admin can delete a category

## Places route

- [ ] PUT /api/v1/places/:id
  - [ ] only the owner can update it.
  - [ ] admins can update any places.
- [ ] POST /api/v1/places
  - [ ] only a connected user can create a new place
- [ ] DELETE /api/v1/places/:id
  - [ ] only the owner can delete the place.
  - [ ] admins can delete any places.

## Reservations route

 Basically, for the reservations, only the system will be able to post new reservations, before saving them, it has to be
 accepted by both parties (place + artist). If one of both doesn't accept the reservation, the reservation will not be 
 published.
 PUT /api/v1/reservations/:id
 To update a reservation, it will work like inserting a new one, only the system will be able to do it and updates to the 
 reservations have to be accepted by both parties.
 - admins can update any reservations
 POST /api/v1/types
 To insert new reservation, it will be done as said before, only the system will be able to do it and it has to be
 accepted by both parties
 - admins can insert new reservations manually
 DELETE /api/v1/types/:id
 To delete a reservation, only the system will be able to do it as well. 
 The cancellation of the event has not to be accepted by both parties but when one of the parties cancels, it has to leave
 a message explaining why it was cancelled
 - admins can cancel any reservation they want if they need to.


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

