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