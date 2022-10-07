# Artistfinder
Artistfinder

(Everything step that will be completed will be removed from the list to keep it clear.)

# To-Do - API DOC

/!\ This shit's becoming important

# To-Do - Backend

- [ ] Replace all console.log by console.error on SQL requests errors
- [ ] Update error messages sent from the API
- [ ] Update return messages sent from the API
  - Do not send DB response

## User with multiple roles

- [ ] Find a way to add multiple roles to a user.
  - I think the quicker way to do it is to add an array containing all the roles of the user.
  - \["user", "moderator"\]
  - Then I can have a function that checks role(s) based on that array.

## [x] Validation schemas && SQL requests

## Authorization errors

Some errors could be more descriptive.

- Unauthorized (when updating or deleting an artist) could become _Unauthorized, not the artist owner_ or something like that.

## Auth route

- [ ] POST /api/v1/auth/signup
  - make this route work, for now only Google signup works
- [ ] POST /api/v1/auth/signin
  - make this route work, for now ony Google signin works
- [ ] PUT /api/v1/auth/passwordChange
  - route to update the password 

## Roles route

[x] Create a route for all the roles related endpoints

## Artists route

Secure routes [x]

- [ ] Change all artists routes to only return information about verified artists for everyone
- [ ] Create all artists routes to return information about all artists
- [ ] Create all artists routes to return information about all unverified artists

- Modify the directory structure to have one directory for the different routes :
  - [ ] /api/v1/artists/
    - -> all artists, Admin access only
  - [ ] /api/v1/artists/verified
    - -> all verified artists, everyone can access this
  - [ ] /api/v1/artists/unverified
    - -> all unverified artists, admins or moderators

Think about this :

- [ ] before publishing, artists have to be validated by an admin / moderator
  - -> see To-Do Database section
- [ ] GET /api/v1/artists/verified
  - returns only verified artists
- [ ] GET /api/v1/artists/unverified
  - returns only unverified artists
- [x] Modify the Artists route to add a way for admin and moderator to approve artists.

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

[x] Secure routes

## Styles route

[x] Secure routes

## Types route

[x] Secure routes

## Users route

[ ] Secure routes (partially done needs some work on other routes to finish it)

- [ ] Add a SOFT_DELETE route for the user
  - [ ] only the owner or admin can soft_delete a user
- [ ] admins can reset information of any users (they will only see the username and have access to reset password, email, etc)
- [ ] Add a route to change connection type (google -> email)
  - [ ] Only owner or admin can change this

## Middlewares

- [x] User middleware
- [x] isLoggedIn middleware
- [x] isOwner middleware
- [x] isOwnerOrAdmin middleware
- [x] isAdmin middleware
- [ ] isModeratorOrAdmin
  - Moderator role has to be clearly defined before creating this middleware

# To-Do - Database

- [x] Add a SOFT_DELETED field to user -> defaults to 0/false
- [x] Add a BLOCKED field to user -> defaults to 0/false
- [x] Add a VALIDATED field to artists -> defaults to 0/false
- [x] Add a VALIDATED field to places -> defaults to 0/false

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