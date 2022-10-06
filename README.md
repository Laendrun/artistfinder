# Artistfinder
Artistfinder - Maxime Collot

# To-Do - Backend

- [x] Update validations schema to accept the same field names as they are saved in the database
- [ ] Update SQL requests to get the correct values from the body of the request...

- [ ] Check the validationError function 
  - it gives me a _res.status is not a function_ so yeah not good

- [x] User middleware
  - [x] Verify JWT origin
  - [x] Decode JWT
  - [x] Set a _user_ property on the request with informations from the JWT
- [ ] isLoggedIn middleware
  - [ ] Check if _user_ property exists on the request
- [ ] isAdmin middleware
  - [ ] must happen after isLoggedIn middleware
  - [ ] check if _user.role_ is Admin

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

