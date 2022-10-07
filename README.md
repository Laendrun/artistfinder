# Artistfinder
Artistfinder

(Everything step that will be completed will be removed from the list to keep it clear.)

# To-Do - Backend

- [ ] Move all middlewares in the same file so that makes only one path to require in all files

## User with multiple roles

- [ ] Find a way to add multiple roles to a user.
  - I think the quicker way to do it is to add an array containing all the roles of the user.
  - \["user", "moderator"\]
  - Then I can have a function that checks role(s) based on that array.

## Validation schemas && SQL requestsm [x]

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
  - [ ] update a role in the db

## Artists route

Secure routes [x]

Think about this :

- [ ] before publishing, artists have to be validated by an admin / moderator
- [ ] Modify the Artists route to add a way for admin and moderator to approve artists.
- [ ] Modify the database to add a field _artist.verified_ -> default to 0.

## Categories route

Secure routes [x]

## Places route

Secure routes [x]

## Reservations route

Think about all of these :

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

## Reviews route

Secure routes [x]

## Styles route

Secure routes [x]

## Types route

Secure routes [x]

## Users route

Secure routes [ ] (partially done needs some work on other routes to finish it)

- [ ] Add a SOFT_DELETE route for the user
  - [ ] only the owner or admin can soft_delete a user
- [ ] admins can reset informations of any users (they will only see the username and have access to reset password, email, etc)
- [ ] Add a route to change connection type (google -> email)
  - [ ] Only owner or admin can change this

## Middlewares

- [x] User middleware
- [x] isLoggedIn middleware
- [x] isOwner middleware
- [x] isOwnerOrAdmin middleware
- [x] isAdmin middleware

# To-Do - Database

- [ ] Add a SOFT_DELETED field to user
- [ ] Add a BLOCKED field to user

# To-Do - Frontend

- [ ] Full front-end refactor

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

# Improvements / ideas

- [ ] Moderator role
  - [ ] Ability to block a user
  - [ ] Ability to unblock a user
  - [ ] Ability to force password change for a user
- [ ] Option to block a user
- [ ] Option to unlock a user
- [ ] Option to force a user to change password
  - User has to change password at next login (must first insert current pass)
- [ ] Cancel a soft_delete