a# GET /api/v1/users/infos

Get informations about the loggedIn user.

This route requires the token of any logged in user.

See the [API Intro](https://docs.artistfinder.world/developper-docs/api) page to have a better understanding of what it is. (Not explained yet).

## Request example

```
GET https://www.artistfinder.world/api/v1/users/infos
```
Request Parameters
```
No required parameters.
```
Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoidG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.-1cuKLqVgi9GBF3Si-izWF_fGrP-rm70buOTVzsohAA
```
Body:
```
No required body.
```
## Header description

The **Authorization** must match the following regexp :
```regexp
/^(Bearer) ([A-Za-z0-9\-\_])+.([A-Za-z0-9\-\_])+.([A-Za-z0-9\-\_])+\w$/
```

## Response

### "Here you go"

Status: **200**
```json
{
	"user_id": 1,
	"user_fname": "fname",
	"user_lname": "lname",
	"user_username": "username",
	"artist_id": 1,
	"type_id": 1,
	"role_id": 1
}
```

### "You fucked up"

Status: **401**
```json
{
	"message": "🚫 Unauthorized 🚫"
}
```