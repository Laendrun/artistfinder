# Artistfinder
Artistfinder - Maxime Collot

# To-Do - Backend

- [ ] User middleware
  - [ ] Verify JWT origin
  - [ ] Decode JWT
  - [ ] Set a _user_ property on the request with informations from the JWT
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

