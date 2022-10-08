# Artistfinder - Backend

## To-Do

- [ ] Replace all console.log by console.error on SQL requests errors
- [ ] Update error messages sent from the API
- [ ] Update return messages sent from the API
  - Do not send DB response

### Auth Route

- [ ] POST /api/v1/auth/signup
  - make this route work, for now only Google signup works
- [ ] POST /api/v1/auth/signin
  - make this route work, for now ony Google signin works
- [ ] PUT /api/v1/auth/passwordChange
  - route to update the password 

### Artists route

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

### Users route

- [ ] Add a SOFT_DELETE route for the user
  - [ ] only the owner or admin can soft_delete a user
- [ ] admins can reset information of any users (they will only see the username and have access to reset password, email, etc)
- [ ] Add a route to change connection type (google -> email)
  - [ ] Only owner or admin can change this

### Middlewares

- [x] User middleware
- [x] isLoggedIn middleware
- [x] isOwner middleware
- [x] isOwnerOrAdmin middleware
- [x] isAdmin middleware
- [ ] isModeratorOrAdmin
  - Moderator role has to be clearly defined before creating this middleware