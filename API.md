# API "Documentation"

This will just be a simple "API Documentation" for me to know which routes are available.
It'll be easier to check this file instead of searching through the files.

# Artists

- GET /api/v1/artists/
  - isLoggedIn, isAdmin
- GET /api/v1/artists/groups/
  - isLoggedIn, isAdmin
- GET /api/v1/artists/notGroups
  - isLoggedIn, isAdmin
- GET /api/v1/artists/type/:type_id
  - isLoggedIn, isAdmin
- GET /api/v1/artists/type/name/:name
  - isLoggedIn, isAdmin
- GET /api/v1/artists/:id
  - isLoggedIn, isOwnerOrAdmin
- GET /api/v1/artists/name/:name
  - isLoggedIn, isAdmin

- POST /api/v1/artists/
  - isLoggedIn

- PUT /api/v1/artists/:id
  - isLoggedIn, isAdminOrOwner
- PUT /api/v1/artists/:id/verify
  - isLoggedIn, isAdmin
- PUT /api/v1/artists/:id/unverify
  - isLoggedIn, isAdmin

- DELETE /api/v1/artists/:id
  - isLoggedIn, isOwnerOrAdmin

## Verified artists

- GET /api/v1/artists/verified/
  - all
- GET /api/v1/artists/verified/groups/
  - all
- GET /api/v1/artists/verified/notGroups
  - all
- GET /api/v1/artists/verified/type/:type_id
  - all
- GET /api/v1/artists/verified/type/name/:name
  - all
- GET /api/v1/artists/verified/:id
  - all
- GET /api/v1/artists/verified/name/:name
  - all

## Unverified artists

- GET /api/v1/artists/unverified/
  - isLoggedIn, isAdmin
- GET /api/v1/artists/unverified/groups/
  - isLoggedIn, isAdmin
- GET /api/v1/artists/unverified/notGroups
  - isLoggedIn, isAdmin
- GET /api/v1/artists/unverified/type/:type_id
  - isLoggedIn, isAdmin
- GET /api/v1/artists/unverified/type/name/:name
  - isLoggedIn, isAdmin
- GET /api/v1/artists/unverified/:id
  - isLoggedIn, isOwnerOrAdmin
- GET /api/v1/artists/unverified/name/:name
  - isLoggedIn, isAdmin

# Auth

- POST /api/v1/auth/google/
  - all
- POST /api/v1/auth/signup/
  - all
- POST /api/v1/auth/signin
  - all

# Categories

- GET /api/v1/categories/
  - all
- GET /api/v1/categories/:id
  - all
- GET /api/v1/categories/name/:name
  - all

- POST /api/v1/categories/
  - isLoggedIn, isAdmin

- PUT /api/v1/categories/:id
  - isLoggedIn, isAdmin

- DELETE /api/v1/categories/:id
  - isLoggedIn, isAdmin

# Places

- GET /api/v1/places/
  - all
- GET /api/v1/places/:id
  - all
- GET /api/v1/places/name/:name
  - all
- GET /api/v1/places/post_code/:post_code
  - all
- GET /api/v1/places/city/:city
  - all
- GET /api/v1/places/capacity/min/:capacity
  - all
- GET /api/v1/places/capacity/max/:capacity
  - all
- GET /api/v1/places/capacity/is/:capacity
  - all

- POST /api/v1/places/
  - isLoggedIn

- PUT /api/v1/places/:id
  - isLoggedIn, isOwnerOrAdmin

- DELETE /api/v1/places/:id
  - isLoggedIn, isOwnerOrAdmin

# Reservations

- GET /api/v1/reservations/
  - all
- GET /api/v1/reservations/:id
  - all
- GET /api/v1/reservations/date/is/:date
  - all
- GET /api/v1/reservations/date/after/:date
  - all
- GET /api/v1/reservations/date/before/:date
  - all
- GET /api/v1/reservations/artist/:id
  - all
- GET /api/v1/reservations/artist/name/:name
  - all
- GET /api/v1/reservations/place/:id
  - all
- GET /api/v1/reservations/place/name/:name
  - all
- GET /api/v1/reservations/category/:id
  - all
- GET /api/v1/reservations/category/name/:name
  - all

- POST /api/v1/reservations/
  - all

- PUT /api/v1/reservations/:id
  - all

- DELETE /api/v1/reservations/:id
  - all

# Reviews

- GET /api/v1/reviews/
  - all
- GET /api/v1/reviews/:id
  - all
- GET /api/v1/reviews/artist/:id
  - all
- GET /api/v1/reviews/place/:id
  - all

- POST /api/v1/reviews/
  - isLoggedIn

- PUT /api/v1/reviews/:id
  - isLoggedIn, isOwnerOrAdmin

- DELETE /api/v1/reviews/:id
  - isLoggedIn, isOwnerOrAdmin

# Roles

- GET /api/v1/roles/
  - all
- GET /api/v1/roles/:id
  - all

- POST /api/v1/roles
  - isLoggedIn, isAdmin

- PUT /api/v1/roles/:id
  - isLoggedIn, isAdmin

- DELETE /api/v1/roles/:id
  - isLoggedIn, isAdmin

# Styles

- GET /api/v1/styles/
  - all
- GET /api/v1/styles/:id
  - all

- POST /api/v1/styles/
  - isLoggedIn, isAdmin

- PUT /api/v1/styles/:id
  - isLoggedIn, isAdmin

- DELETE /api/v1/styles/:id
  -isLoggedIn, isAdmin

# Types

- GET /api/v1/types/
  - all
- GET /api/v1/types/:id
  - all

- POST /api/v1/types
  - all

- PUT /api/v1/types/:id
  - all

- DELETE /api/v1/types/:id
  - all

# Users

- GET /api/v1/users/
  - all
- GET /api/v1/users/:id
  - isLoggedIn, isOwner

- POST /api/v1/users/
  - all

- PUT /api/v1/users/:id
  - isLoggedIn, isOwnerOrAdmin
- PUT /api/v1/users/:id/delete
  - isLoggedIn, isOwnerOrAdmin
- PUT /api/v1/users/:id/switchLogin
  - isLoggedIn, isOwnerOrAdmin
- PUT /api/v1/users/:id/changePassword
  - isLoggedIn, isOwner

- DELETE /api/v1/users/:id
  - isLoggedIn, isAdmin